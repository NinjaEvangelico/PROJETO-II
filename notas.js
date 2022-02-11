const BASE_URL = "http://localhost:3000";

let notas = [];

const refresh = () => {
  getNotas()
    .then(notasDoServidor => carregarNotasNaTela(notasDoServidor));
}

const getNotas = async () => {
  const result = await axios.get(`${BASE_URL}/`);
  return result.data || [];
}

const salvarNota = () => {
  const elementoInput = document.getElementById("nova-nota");
  const valorInput = elementoInput.value;

  const elementoCategoria = document.getElementById("categoria");
  const valorCategoria = elementoCategoria.value;

  const elementoTags = document.getElementById("tags");
  let valorTags = [];
  if (elementoTags.value) {
   valorTags = elementoTags.value.split(";"); 
  }

  elementoInput.value = null;
  elementoCategoria.value = null;
  elementoTags.value = null;

  axios.post(`${BASE_URL}/`, { nota: valorInput, categoria: valorCategoria, tags: valorTags })
    .then(() => refresh())
    .finally(() => elementoInput.value = "");

}

const carregarNotasNaTela = (notas) => {
  const elementoDaLista = document.getElementById("lista-notas");
  elementoDaLista.innerHTML = "";
  let index = 0;
  for (const anotacao of notas) {
    const elementoNota = document.createElement('li');
    const elementoBtnEdicao = document.createElement('button');
    const elementoBtnExcluir = document.createElement('button');
    const elementoInput = document.createElement('input');
    elementoInput.value = `Nota: ${anotacao.nota} | Categoria: ${anotacao.categoria} ${anotacao.tags ? ' | Tags: ' + anotacao.tags.join(";") : '' }`;
    elementoInput.classList.add('hide');
    elementoNota.classList.add('show');
    elementoBtnEdicao.innerText = "Editar";
    elementoBtnEdicao.onclick = async () => {
      if (elementoInput.classList.contains('show')) {
        const valorInput = elementoInput.value;
        await axios.put(`${BASE_URL}/${index}`, { nota: valorInput })
        elementoInput.value = "";
        refresh();
      } else {
        elementoNota.classList.replace('show', 'hide');
        elementoInput.classList.replace('hide', 'show');
      }
    }
    elementoBtnExcluir.innerText = 'Excluir';
    elementoBtnExcluir.onclick = async () => {
      await axios.delete(`${BASE_URL}/${index}`);
      refresh();
    }
    elementoNota.innerText = `Nota: ${anotacao.nota} | Categoria: ${anotacao.categoria} ${anotacao.tags ? ' | Tags: ' + anotacao.tags.join(" ") : '' }`;;
    elementoDaLista.appendChild(elementoNota);
    elementoDaLista.appendChild(elementoBtnEdicao);
    elementoDaLista.appendChild(elementoBtnExcluir);
    elementoDaLista.appendChild(elementoInput);

    index++;
  }
}