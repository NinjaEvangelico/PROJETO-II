const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

const notas = [];

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(notas);
})

app.get('/:id', (req, res) => {
  res.send(notas[req.params.id]);
})

app.post('/', (req, res) => {
  const { nota, categoria, tags } = req.body
  const length = notas.push({
    nota, categoria, tags
  });
  res.send(notas[length - 1]);
})

app.put('/:id', (req, res) => {
  notas[req.params.id] = req.body.nota;
  res.send('Alterado')
})

app.delete('/:id', (req, res) => {
  notas.splice(req.params.id, 1)
  res.send('Removido')
})

app.listen(3000, '', () => {
  console.log('rodando')
})