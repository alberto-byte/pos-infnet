const { v4: uuidv4 } = require("uuid");
const { cursos } = require("./cursoController");
const { validateDataaluno } = require("../model/alunoModel");

let alunos = [];

const getAlunos = (req, res) => {
  res.status(200).json(alunos);
};

const addAlunos = (req, res) => {
  const aluno = req.body;
  try {
    const validR = validateDataaluno(aluno);
    if (!validR.valid) {
      return res
        .status(400)
        .json({ message: "Dados Invalido", errors: validR.errors });
    }

    if (alunos.some((e) => e.email === req.body.email)) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    if (!cursos.includes(aluno.curso)) {
      return res.status(404).json({ message: "Curso Invalido" });
    }

    aluno.id = uuidv4();
    alunos.push(aluno);
    res.status(200).json(aluno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateAlunos = (req, res) => {
  const id = req.params.id;
  const aluno = req.body;

  try {
    const index = alunos.findIndex((e) => e.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Aluno não encontrado!" });
    }
    alunos[index] = { ...alunos[index], ...aluno };
    res.status(200).json(alunos[index]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const removeAlunos = (req, res) => {
  const id = req.params.id;
  try {
    const index = alunos.findIndex((e) => e.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Aluno nao encontrado" });
    }
    alunos.splice(index, 1);
    res.status(200).json({ message: "Aluno Deletado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAlunos,
  addAlunos,
  updateAlunos,
  removeAlunos,
};
