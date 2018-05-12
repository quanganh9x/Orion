const express = require('express');
const router = express.Router();
// routes //
let coreRoute = require('./core/index');
////////////
module.exports = function () {
    coreRoute(router);
    return router;
};
