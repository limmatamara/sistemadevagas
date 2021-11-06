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

const validaNovaVaga = () => {
    let inputTitulo = document.getElementById('input-titulo')
    let inputDescricao = document.getElementById('input-descricao')
    let inputRemuneracao = document.getElementById('input-remuneracao')

    if(inputTitulo.length){
        console.log(inputTitulo.value)
    }
}

let botaoNovaVaga = document.querySelector('.oi')
botaoNovaVaga.addEventListener('click', validaNovaVaga)  

const cadastrarNovaVaga = async () => {

    let inputTitulo = document.getElementById('input-titulo')
    let inputDescricao = document.getElementById('input-descricao')
    let inputRemuneracao = document.getElementById('input-remuneracao')
    let novaVaga = new Vaga(inputTitulo.value, inputDescricao.value, inputRemuneracao.value)
    
    try {
        await axios.post('http://localhost:3000/vagas', novaVaga)

    } catch (err) {
        console.log('Deu erro => ' + err)
    }

    alert('Cadastro concluiído com suscesso')
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
}

listarVagas();