const express = require("express");
const router = express.Router();

// Array inicial com 3 professores
let professores = [
  {
    id: 1,
    nome: "Maria Silva",
    email: "maria.silva@escola.com",
    cpf: "12345678901",
    curso: "Matemática",
    disciplina: "Cálculo I",
  },
  {
    id: 2,
    nome: "João Pereira",
    email: "joao.pereira@escola.com",
    cpf: "98765432100",
    curso: "História",
    disciplina: "História do Brasil",
  },
  {
    id: 3,
    nome: "Ana Costa",
    email: "ana.costa@escola.com",
    cpf: "45678912377",
    curso: "Informática",
    disciplina: "Programação",
  },
];

// Middleware para validar campos obrigatórios
function validarCampos(req, res, next) {
  const { nome, email, cpf, curso, disciplina } = req.body;
  if (!nome || !email || !cpf || !curso || !disciplina) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }
  next();
}

// GET - Listar todos os professores
router.get("/", (req, res) => {
  res.json(professores);
});

// GET/:id - Buscar professor por ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const professor = professores.find((p) => p.id === id);

  if (!professor) {
    return res.status(404).json({ erro: "Professor não encontrado." });
  }
  res.json(professor);
});

// POST - Criar novo professor
router.post("/", validarCampos, (req, res) => {
  const { nome, email, cpf, curso, disciplina } = req.body;

    // Verifica duplicatas por CPF ou email
  const existe = professores.find(
    (p) => p.cpf === cpf || p.email === email
  );
  if (existe) {
    return res.status(400).json({ erro: "Professor já cadastrado." });
  }

   const novoProfessor = {
    id: professores.length > 0 ? professores[professores.length - 1].id + 1 : 1,
    nome,
    email,
    cpf,
    curso,
    disciplina,
};

  professores.push(novoProfessor);
  res.status(201).json(novoProfessor);
});

// PUT/:id - Atualizar professor
router.put("/:id", validarCampos, (req, res) => {
  const id = parseInt(req.params.id);
  const index = professores.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Professor não encontrado." });
  }

  const { nome, email, cpf, curso, disciplina } = req.body;

   // Evita duplicatas em atualização (exceto para o próprio)
  const duplicado = professores.find(
    (p) => (p.cpf === cpf || p.email === email) && p.id !== id
  );
  if (duplicado) {
    return res.status(400).json({ erro: "CPF ou e-mail já cadastrados." });
  }
  
   professores[index] = { id, nome, email, cpf, curso, disciplina };
  res.json(professores[index]);
});

// DELETE/:id - Remover professor
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = professores.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Professor não encontrado." });
  }

  const removido = professores.splice(index, 1);
  res.json({ mensagem: "Professor removido com sucesso.", removido });
});

module.exports = router;