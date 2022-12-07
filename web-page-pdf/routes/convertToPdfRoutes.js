const express = require("express");
const router = express.Router();
const { getDataFromWebPAge } = require("../controller/convertToPdf");
const { urlValidate } = require("../../validations/convertToPdf");
const { catchErrors } = require("../../helpers/error");

router.post("/web-page-data", urlValidate, catchErrors(getDataFromWebPAge));

module.exports = router;
