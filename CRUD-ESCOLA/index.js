const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas de alunos - Membro 1: Kaio Daniel Almeida Santos
const alunosRouter = require('./Routes/alunos');
app.use('/alunos', alunosRouter);


// Rotas de Professores - Membro 2: Jamylle Cesario Soares Silva
const professoresRouter = require('./Routes/professores')
app.use('/professores', professoresRouter)


app.listen(3000, () => {
console.log('Server is running on http://localhost:3000')
})