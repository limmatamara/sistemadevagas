var idAtual = 0
class Vaga {
    id;
    titulo = ''
    remuneracao = 0
    candidatos = []

    constructor(titulo, remuneracao) {
        this.titulo = titulo
        this.remuneracao = remuneracao
    }
}

// const cadastrarNovaVaga = () => {
//     let novaVaga = new Vaga()
// }

const listarVagas = async () => {
    const { data } = await axios.get('http://localhost:3000/vagas');

    data.forEach(vaga => {
        let div = document.createElement('div');
        let li = document.createElement('li');
        let titleSpan = document.createElement('span');
        let remunerationSpan = document.createElement('span');

        titleSpan.innerText = `Titulo: ${vaga.title}`
        remunerationSpan.innerText = `Remuneração: ${vaga.remuneration}`;

        li.appendChild(titleSpan);
        li.appendChild(remunerationSpan);
        div.appendChild(li);

        let userList = document.getElementById('job-oportunity')
        userList.appendChild(div)

    })

    console.log(data);
}

listarVagas();