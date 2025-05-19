document.addEventListener('DOMContentLoaded', () => {
  fetch('/dashboard/resultados')
    .then(res => res.json())
    .then(data => {
      const painel = document.getElementById('painel-perguntas');
      painel.innerHTML = '';

      data.forEach(pergunta => {
        const divPergunta = document.createElement('div');
        divPergunta.classList.add('pergunta-box');

        const titulo = document.createElement('h2');
        titulo.textContent = pergunta.texto;
        divPergunta.appendChild(titulo);

        const lista = document.createElement('ul');
        pergunta.alternativas.forEach(alt => {
          const item = document.createElement('li');
          item.textContent = `${alt.texto} — ${alt.totalRespostas} resposta(s)`;
          lista.appendChild(item);
        });

        divPergunta.appendChild(lista);
        painel.appendChild(divPergunta);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar os resultados:', err);
      document.getElementById('painel-perguntas').innerHTML = '<p>Erro ao carregar os dados.</p>';
    });
});