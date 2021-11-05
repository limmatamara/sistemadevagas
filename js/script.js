
var idAtual = 0
class Vaga {
    id;
    titulo = ''
    descricao = ''
    remuneracao = 0
    candidatos = []

    constructor(titulo, descricao, remuneracao) {
        
        this.titulo = titulo
        this.descricao = descricao
        this.remuneracao = remuneracao
    }
}

const irPara = (origem, destino) => {
    let elementoOrigem = document.getElementById(origem);
    let elementoDestino = document.getElementById(destino);
    elementoDestino.className = elementoDestino.className.replace('esconder', ' ');
    elementoOrigem.className = 'container esconder';
}

const cadastrarNovaVaga = () => {
    let inputTitulo = document.getElementById('input-titulo')
    let inputDescricao = document.getElementById('input-descricao')
    let inputRemuneracao = document.getElementById('input-remuneracao')
    let novaVaga = new Vaga(inputTitulo.value, inputDescricao.value, inputRemuneracao.value)

    axios.post('http://localhost:3000/vagas', novaVaga)
    console.log(novaVaga)
}

const listarVagas = async () => {
    const { data } = await axios.get('http://localhost:3000/vagas');

    data.forEach(vaga => {
        let div = document.createElement('div');
        let li = document.createElement('li');
        let titleSpan = document.createElement('span');
        let remunerationSpan = document.createElement('span');

        titleSpan.innerText = `Titulo: ${vaga.titulo}`
        remunerationSpan.innerText = `Remuneração: ${vaga.remuneracao}`;

        li.appendChild(titleSpan);
        li.appendChild(remunerationSpan);
        div.appendChild(li);

        let userList = document.getElementById('job-oportunity')
        userList.appendChild(div)

    })

    console.log(data);
}

listarVagas();