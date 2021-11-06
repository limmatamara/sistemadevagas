
const listVagas = async() => {
  const {data} = await axios.get('http://localhost:3000/vagas');

  data.forEach( vaga => {
    let div = document.createElement ('div');
    let li = document.createElement ('li');
    let remuneration = document.createElement ('span'); 
    let tituloDaVaga = document.createElement ('span');

    tituloDaVaga.innerText = 'Titulo: ${vaga.title}'
    remuneration.innerText = 'Remuneração: ${vaga.remuneration}';

    li.appendChild(tituloDaVaga);
    li.appendChild(remuneration);
    div.appendChild(li);

    let vagasEmprego = document.getElementById('job');
    vagasEmprego.appendChild(div);


  });


  console.log(data)
}

listVagas();