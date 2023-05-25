const express = require("express");
const app = express();

const alunoRoutes = require("./routes/alunoRoutes");
const cursoRoutes = require("./routes/cursoRoutes");
// const professorRoutes = require("./routes/professorRoutes");

const host = "127.0.0.1";
const port = 4200;

app.use(express.json());
app.use("/alunos", alunoRoutes);
app.use("/cursos", cursoRoutes);
// app.use("/professores", professoresRoutes);

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
