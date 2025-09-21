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

// listar todos os alunos
router.get('/', (req, res) => {
  res.json(alunos);
});

// buscar aluno por id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const aluno = alunos.find(a => a.id === id);

  if (!aluno) {
    return res.status(404).json({ erro: 'Aluno não encontrado.' });
  }

  res.json(aluno);
});

// criar um novo aluno
router.post('/', (req, res) => {
  const { nome, email, cpf, telefone, dataNascimento } = req.body;

  // checar campos obrigatórios
  if (!nome || !email || !cpf || !telefone || !dataNascimento) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  // evitar duplicação de cpf ou email
  if (alunos.some(a => a.cpf === cpf)) {
    return res.status(400).json({ erro: 'Já existe um aluno com esse CPF.' });
  }
  if (alunos.some(a => a.email === email)) {
    return res.status(400).json({ erro: 'Já existe um aluno com esse e-mail.' });
  }

    const novoAluno = {
    id: alunos.length ? alunos[alunos.length - 1].id + 1 : 1,
    nome,
    email,
    cpf,
    telefone,
    dataNascimento
  };

  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

// atualizar aluno
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { nome, email, cpf, telefone, dataNascimento } = req.body;

  const index = alunos.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Aluno não encontrado.' });
  }

  if (!nome || !email || !cpf || !telefone || !dataNascimento) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  if (alunos.some(a => a.cpf === cpf && a.id !== id)) {
    return res.status(400).json({ erro: 'CPF já está em uso.' });
  }
  if (alunos.some(a => a.email === email && a.id !== id)) {
    return res.status(400).json({ erro: 'E-mail já está em uso.' });
  }

  alunos[index] = { id, nome, email, cpf, telefone, dataNascimento };
  res.json(alunos[index]);
});

// deletar aluno
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = alunos.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Aluno não encontrado.' });
  }

  const removido = alunos.splice(index, 1)[0];
  res.json({ mensagem: 'Aluno removido com sucesso.', aluno: removido });
});

module.exports = router;