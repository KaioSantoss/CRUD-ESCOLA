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
