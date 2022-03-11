const AWS = require("aws-sdk");

const config = new AWS.Config({
    region: "us-east-1",
    secretAccessKey: process.env.SECRET,
    accessKeyId: process.env.KEY_ID
});
const ses = new AWS.SES(config);

function sendResetLink(email, id) {
    const params = {
        Destination: {
            ToAddresses: [
                email,
            ]
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: `Para recuperar contraseña da click en el link:marmolesmendoza@gmail.com`
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Instrucciones de reinicio de contraseña"
            }
        },
        Source: "marmolesmendoza@gmail.com",
    };

    ses.sendEmail(params, (err) => {
        if (err) {
            console.log(err);
        }
    });
}


module.exports = sendResetLink;