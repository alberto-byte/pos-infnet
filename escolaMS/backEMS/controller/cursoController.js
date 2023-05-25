let cursos = [
  "Farmacia",
  "Processamento de dados",
  "Engenharia",
  "Contabilidade",
  "Enfermagem",
  "Direito",
];

const getCursos = (req, res) => {
  res.status(200).json(cursos);
};

const addCursos = (req, res) => {
  const curso = req.body;
  try {
    cursos.push(curso.curso);
    res.status(200).json(cursos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const removeCursos = (req, res) => {
  const curso = req.body.curso;
  try {
    const index = cursos.findIndex((d) => d === curso);
    dados;

    if (index === -1) {
      return res.status(404).json({ message: "Curso nao encontrado" });
    }
    cursos.splice(index, 1);
    res.status(200).json({ message: " Curso Deletado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  cursos,
  getCursos,
  addCursos,
  removeCursos,
};
