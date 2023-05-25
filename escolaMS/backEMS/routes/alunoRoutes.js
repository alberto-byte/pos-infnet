const express = require("express");
const router = express.Router();

const alunoController = require("../controller/alunoFileController");

router.get("/", alunoController.getAlunos);

router.post("/add", alunoController.addAlunos);

//router.put('/:id',employeeController.updateEmployees )

// router.delete("/:id", alunoController.removeAlunos);

module.exports = router;
