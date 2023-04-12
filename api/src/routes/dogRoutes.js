const { Router } = require("express");

const {
  dogHandlers,
  dogId,
  createDogHandler,
} = require("../handler/dogHandler");

const router = Router();

router.get("/", dogHandlers);
router.get("/:id", dogId);
router.post("/", createDogHandler);

module.exports = router;
