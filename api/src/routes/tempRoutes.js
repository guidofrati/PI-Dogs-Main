const { Router } = require("express");

const { tempHandlers } = require("../handler/tempHandler");

const router = Router();

router.get("/", tempHandlers);

module.exports = router;
