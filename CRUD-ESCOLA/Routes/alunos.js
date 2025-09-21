const express = require('express');
const router = express.Router();

// Lista inicial de alunos
let alunos = [
  {
    id: 1,
    nome: 'Kaio Santos',
    email: 'kaiosantos@iesb.com',
    cpf: '123.456.789-10',
    telefone: '(61) 94002-8922',
    dataNascimento: '2004-08-03'
  },
  {
    id: 2,
    nome: 'Jamylle Cesario',
    email: 'jamyllecesario@iesb.com',
    cpf: '999.999.999-99',
    telefone: '(61) 91919-1919',
    dataNascimento: '2004-03-24'
  },
   {
    id: 3,
    nome: 'Miguel ALmeida',
    email: 'miguelalmeida@iesb.com',
    cpf: '555.555.555-55',
    telefone: '(61) 95151-5151',
    dataNascimento: '2004-12-31'
  }
];