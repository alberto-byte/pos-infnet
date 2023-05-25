const express = require("express");
const router = express.Router();

const cursoController = require("../controller/cursoController");

router.get("/", cursoController.getCursos);
router.post("/add", cursoController.addCursos);
router.delete("/delete", cursoController.removeCursos);

module.exports = router;
