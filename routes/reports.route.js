const { Router } = require ('express');
const { getDataReports } = require('../controllers/reports.controller');


const route = Router();

route.get('/', getDataReports );

module.exports = route;