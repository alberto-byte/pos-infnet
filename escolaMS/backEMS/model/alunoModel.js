const { Validator } = require("jsonschema");
const validator = new Validator();

const alunoSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    // codAluno: { type: "number", minimum: 6 },
    nome: { type: "string" },
    endereco: { type: "string" },
    cidade: { type: "string" },
    estado: { type: "string" },
    idade: { type: "number", minimum: 18 },
    email: { type: "string" },
    curso: { type: "string" },
  },
  required: ["nome", "endereco", "cidade", "estado", "idade", "email", "curso"],
};

const validateDataAluno = (e) => {
  return validator.validate(e, alunoSchema);
};

module.exports = { validateDataAluno };
