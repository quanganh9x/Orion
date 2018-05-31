const express = require('express');
const router = express.Router();
// routes //
let coreRoute = require('./core/index');
let apiRoutes = require('./core/apis');
////////////
module.exports = function (bot) {
    coreRoute(router);
    apiRoutes(router, bot);
    return router;
};
