const { Router } = require ('express');
const { getDataReports, getDataReportsByUser } = require('../controllers/reports.controller');


const route = Router();

route.get('/', getDataReports );
route.get('/byUser', getDataReportsByUser );

module.exports = route;