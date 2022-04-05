const User  = require("../models/user");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send("email incorrecto");

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

      if (res) res.status(200).send("password reset link sent to your email account");
    } catch (error) {
        res.status(500).send("An error occured");
        console.log(error);
    }
});

router.post("/:userId/:token", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();
        await token.delete();

        res.status(200).json();
    } catch (error) {
        res.status(500).send("An error occured");
        console.log(error);
    }
});

module.exports = router;