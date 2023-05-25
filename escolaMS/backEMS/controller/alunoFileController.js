const { v4: uuidv4 } = require("uuid");
const { cursos } = require("./cursoController");
const { validateDataAluno } = require("../model/alunoModel");
const fs = require("fs");

//GET
function getAlunosPromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("../backEMS/model/alunos.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let alunos = JSON.parse(data);
        resolve(alunos);
      }
    });
  });
}

const getAlunos = (req, res) => {
  getAlunosPromise()
    .then((alunos) => res.status(200).json(alunos))
    .catch((err) => res.status(500).send(err.message));
};

//POST
function addAlunosPromise(aluno) {
  return new Promise((resolve, reject) => {
    fs.readFile("../backEMS/model/alunos.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let alunos = JSON.parse(data);

        if (alunos.some((e) => e.email === alunos.email)) {
          reject(new Error("Email already exists"));
        }

        const id = uuidv4();
        const alunoNew = { id, ...alunos };

        alunos.push(alunoNew);

        fs.writeFile(
          "../backEMS/model/alunos.json",
          JSON.stringify(alunos),
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(alunoNew);
            }
          }
        );
      }
    });
  });
}

const addAlunos = (req, res) => {
  const aluno = req.body;

  const validResult = validateDataAluno(aluno);

  if (!validResult.valid) {
    return res
      .status(400)
      .json({ message: "Dado de Aluno invalido!", errors: validResult.errors });
  }

  if (!cursos.includes(aluno.curso)) {
    return res.status(404).json({ message: "Curso Invalido" });
  }

  addAlunosPromise(aluno)
    .then((alunoNew) => res.status(200).json(alunoNew))
    .catch((err) => res.status(500).send(err.message));
};

module.exports = { getAlunos, addAlunos };
