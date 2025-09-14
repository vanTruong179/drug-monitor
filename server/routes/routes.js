const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

// Import middleware
const checkName = require('../middleware/checkName');
const checkDosage = require('../middleware/checkDosage');
const checkCard = require('../middleware/checkCard');
const checkPack = require('../middleware/checkPack');
const checkPerDay = require('../middleware/checkPerDay');

// Page routes
route.get('/', services.home);
route.get('/manage', services.manage);
route.get('/dosage', services.dosage);
route.get('/purchase', services.purchase);
route.get('/add-drug', services.addDrug);
route.get('/update-drug', services.updateDrug);

// API routes (CRUD)
route.post('/api/drugs', [checkName, checkDosage, checkCard, checkPack, checkPerDay],
  controller.create
);

route.post('/purchase', (req, res) => {
  let days = parseInt(req.body.days) || 30;

  axios.get(`${BASE_URI}:${PORT}/api/drugs`)
    .then(function (response) {
      res.render('purchase', {
        drugs: response.data,
        title: 'Purchase Drugs',
        days: days   // 👈 lấy từ input
      });
    })
    .catch(err => {
      res.send(err);
    });
});

route.post('/api/purchase', controller.purchase);
route.get('/api/drugs', controller.find);
route.put('/api/drugs/:id', controller.update);
route.delete('/api/drugs/:id', controller.delete);

module.exports = route;
