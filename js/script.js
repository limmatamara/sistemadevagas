
var idVaga = 0
var idCandidato = 0
var idUsuario = 0
var tipoDeUsuario = ''

class Vaga {
    id;
    titulo = '';
    descricao = '';
    remuneracao = 0;
    candidatos = [];

    constructor(titulo, descricao, remuneracao) {

        this.titulo = titulo;
        this.descricao = descricao;
        this.remuneracao = remuneracao;
    }
}

class Candidatura {
    idVaga = 0;
    idCandidato = 0;
    reprovado = false;

    constructor(idVaga, idCandidato, reprovado) {
        this.idVaga = idVaga;
        this.idCandidato = idCandidato;
        this.reprovado = reprovado;
    }
}

class Usuario {
    id;
    tipoDeUsuario = '';
    nome = '';
    dataNascimento = '';
    email = '';
    senha = '';
    primeiroEmprego = false

    constructor(tipoDeUsuario, nome, dataNascimento, email, senha, primeiroEmprego) {
        this.tipoDeUsuario = tipoDeUsuario;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
        this.primeiroEmprego = primeiroEmprego;
    }
}

const get = async (req) => {
    const { data: vagas } = await axios.get(`http://localhost:3000/${req}`)
    return vagas

}

const irPara = (origem, destino) => {
    let elementoOrigem = document.getElementById(origem);
    let elementoDestino = document.getElementById(destino);
    elementoDestino.className = elementoDestino.className.replace('esconder', '');
    if ((destino === 'telaLogin' || destino === 'telaCadastro')) {
        elementoOrigem.setAttribute('class', 'esconder');
        elementoDestino.setAttribute('class', '');
    } else if (destino === 'home-trabalhador' || destino === 'home-recrutador' || destino === 'cadastro-de-vaga' || destino === 'detalhe-da-vaga' || destino === 'detalhe-da-vaga-recrutador') {
        elementoOrigem.setAttribute('class', 'esconder');
        elementoDestino.setAttribute('class', 'container');
    }
}

const cadastraUsuario = () => {

    let inputTipo = document.getElementById('tipoUsuario')
    let inputNome = document.getElementById('nomeCompleto')
    let inputDataNascimento = document.getElementById('dataNascimento')
    let inputEmail = document.getElementById('emailCadastro')
    let inputSenha = document.getElementById('senha')
    let inputPrimeiroEmprego = document.getElementById('primeiroEmprego')

    let novoUsuario = new Usuario(inputTipo.value, inputNome.value, inputDataNascimento.value, inputEmail.value, inputSenha.value, inputPrimeiroEmprego.value)

    try {
        axios.post('http://localhost:3000/usuarios', novoUsuario)
        alert('Cadastro concluído')
        irPara('telaCadastro', 'telaLogin')
    } catch (err) {
        console.log('Deu erro => ' + err)
    }
}

const cadastrarNovaVaga = async () => {

    let inputTitulo = document.getElementById('input-titulo')
    let inputDescricao = document.getElementById('input-descricao')
    let inputRemuneracao = document.getElementById('input-remuneracao')
    let novaVaga = new Vaga(inputTitulo.value, inputDescricao.value, inputRemuneracao.value)

    try {
        await axios.post('http://localhost:3000/vagas', novaVaga)
        alert('Vaga registrada com sucesso')
        irPara('cadastro-de-vaga', 'home-recrutador')

    } catch (err) {
        alert('Existem erros no cadastramento da vaga.')
    }
}

const listarVagas = async (id) => {
    const vagas = await get('vagas')

    vagas.forEach(vaga => {
        let div = document.createElement('div');
        let li = document.createElement('li');
        let titleSpan = document.createElement('span');
        let remunerationSpan = document.createElement('span');

        titleSpan.innerText = `Titulo: ${vaga.titulo}`
        remunerationSpan.innerText = `Remuneração: ${vaga.remuneracao}`;

        li.appendChild(titleSpan);
        li.appendChild(remunerationSpan);
        if (tipoDeUsuario === 'trabalhador') {
            li.addEventListener('click', (event) => {
                irPara('home-trabalhador', 'detalhe-da-vaga')
                idVaga = parseInt(event.target.id)
                listarCandidatosEmVagaTrabalhador()
            })
        } else if (tipoDeUsuario === 'recrutador') {
            li.addEventListener('click', (event) => {
                irPara('home-recrutador', 'detalhe-da-vaga-recrutador')
                idVaga = parseInt(event.target.id)
                listarCandidatosEmVagaRecrutador()
            })
        }

        li.setAttribute('id', vaga.id)
        div.appendChild(li);

        let userList = document.getElementById(`${id}`)
        userList.appendChild(div)
    })
}

const candidatarEmUmaNovaVaga = async () => {

    let listaDeUsuarios = await get('usuarios')
    let encontrarUsuarios = listaDeUsuarios.find(u => u.id === idUsuario)

    let listaDeVagas = await get('vagas')
    let encontrarVaga = listaDeVagas.find(v => v.id === parseInt(idVaga))

    let candidatura = new Candidatura(idVaga, idUsuario, false)
    await axios.post('http://localhost:3000/candidaturas', candidatura)



    console.log(encontrarUsuarios)

    novoCandidato = encontrarVaga.candidatos.push(encontrarUsuarios)
    try{
        axios.put(`http://localhost:3000/vagas/${idVaga}`, encontrarVaga)
        alert('Candidatura efetuada')
    }catch(err){
        console.log(err)
    }

    
    get('http://localhost:3000/vagas/')
    irPara('detalhe-da-vaga' , 'home-trabalhador')
    
    console.log(encontrarVaga)
}


const listarCandidatosEmVagaTrabalhador = async () => {

    let listaDeVagas = await get('vagas')
    let encontrarVaga = listaDeVagas.find(v => v.id === parseInt(idVaga))
    let vagaEncontrada = await get(`vagas/${encontrarVaga.id}`)
    let candidatosDaVagaEncontrada = vagaEncontrada.candidatos

    let tituloDaVaga = document.getElementById('span-titulo')
    tituloDaVaga.innerText = vagaEncontrada.titulo

    let descricaoDaVaga = document.getElementById('span-descricao')
    descricaoDaVaga.innerText = vagaEncontrada.descricao

    let remuneracaoDaVaga = document.getElementById('span-remuneracao')
    remuneracaoDaVaga.innerText = vagaEncontrada.remuneracao

    candidatosDaVagaEncontrada.forEach(candidato => {
        let div = document.createElement('div')
        let spanNome = document.createElement('span')
        spanNome.innerText = candidato.nome
        let spanDataNascimento = document.createElement('span')
        spanDataNascimento.innerText = candidato.dataNascimento
        let listaDeCandidatos = document.getElementById('candidatos-na-vaga-trabalhador')

        div.appendChild(spanNome)
        div.appendChild(spanDataNascimento)
        listaDeCandidatos.appendChild(div)
    })

    console.log(vagaEncontrada)
}

const listarCandidatosEmVagaRecrutador = async () => {

    let listaDeVagas = await get('vagas')
    let encontrarVaga = listaDeVagas.find(v => v.id === parseInt(idVaga))
    let vagaEncontrada = await get(`vagas/${encontrarVaga.id}`)
    let candidatosDaVagaEncontrada = vagaEncontrada.candidatos

    let tituloDaVaga = document.getElementById('span-titulo-recrutador')
    tituloDaVaga.innerText = vagaEncontrada.titulo

    let descricaoDaVaga = document.getElementById('span-descricao-recrutador')
    descricaoDaVaga.innerText = vagaEncontrada.descricao

    let remuneracaoDaVaga = document.getElementById('span-remuneracao-recrutador')
    remuneracaoDaVaga.innerText = vagaEncontrada.remuneracao

    candidatosDaVagaEncontrada.forEach(candidato => {
        let div = document.createElement('div')
        let spanNome = document.createElement('span')
        spanNome.innerText = candidato.nome
        let spanDataNascimento = document.createElement('span')
        spanDataNascimento.innerText = candidato.dataNascimento
        let button = document.createElement('button')
        button.setAttribute('id', candidato.id)
        idUsuario = candidato.id
        
        button.addEventListener('click', async (event) => {
            let id = event.target.id
            console.log(id)
            const response = await axios.get('http://localhost:3000/candidaturas')
            let candidato = response.data.find(c => Number.parseInt(c.idCandidato) === Number.parseInt(id))
            console.log(candidato)
            idVaga = candidato.id
            idVaga = Number.parseInt(idVaga)
            candidato.reprovado = true;
            await axios.put(`http://localhost:3000/candidaturas/${idVaga}`, candidato)
        })

        button.innerText = 'Reprovar'
        let listaDeCandidatos = document.getElementById('candidatos-na-vaga-recrutador')

        div.appendChild(spanNome)
        div.appendChild(spanDataNascimento)
        div.appendChild(button)
        listaDeCandidatos.appendChild(div)
    })
    console.log(vagaEncontrada)
}

const excluirVaga = async () => {
    try {
        await axios.delete(`http://localhost:3000/vagas/${idVaga}`)
        alert('Vaga excluída')
        irPara('detalhe-da-vaga-recrutador', 'home-recrutador')
        
    } catch (err) {
        console.log('Deu erro => ' + err)
    }
}

function limparCampos() {
    document.getElementById('email-login').value = '';
    document.getElementById('password').value = '';

}

