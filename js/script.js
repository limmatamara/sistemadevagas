class Vaga {
    id;
    titulo = '';
    descricao = '';
    remuneracao = 0;
    candidatos = [];

    constructor(titulo, descricao, remuneracao) {

        this.titulo = titulo
        this.descricao = descricao
        this.remuneracao = remuneracao
    }
}

class Usuario{
    id;
    tipoDeUsuario = ''
    nome = '';
    dataNascimento = '';
    email = '';
    senha = '';
    primeiroEmprego = false

    constructor(tipoDeUsuario, nome, dataNascimento, email, senha, primeiroEmprego){
        this.tipoDeUsuario = tipoDeUsuario;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
        this.primeiroEmprego = primeiroEmprego;
    }
}

const irPara = (origem, destino) => {
    let elementoOrigem = document.getElementById(origem);
    let elementoDestino = document.getElementById(destino);
    elementoDestino.className = elementoDestino.className.replace('esconder', '');
    if((destino === 'telaLogin' || origem === 'telaLogin')){
        elementoOrigem.className = 'esconder';
    }else{
        elementoOrigem.className = 'container esconder';
    }
}

// const validaNovaVaga = () => {
//     let inputTitulo = document.getElementById('input-titulo')
//     let inputDescricao = document.getElementById('input-descricao')
//     let inputRemuneracao = document.getElementById('input-remuneracao')

//     if(inputTitulo.length){
//         console.log(inputTitulo.value)
//     }
// }

// let botaoNovaVaga = document.querySelector('.oi')
// botaoNovaVaga.addEventListener('click', validaNovaVaga)  



const cadastraUsuario = () => {

    let inputTipo = document.getElementById('tipoUsuario')
    let inputNome = document.getElementById('nomeCompleto')
    let inputDataNascimento = document.getElementById('dataNascimento')
    let inputEmail = document.getElementById('email')
    let inputSenha = document.getElementById('senha')
    let inputPrimeiroEmprego = document.getElementById('primeiroEmprego')

    let novoUsuario = new Usuario(inputTipo.value, inputNome.value, inputDataNascimento.value, inputEmail.value, inputSenha.value,inputPrimeiroEmprego.value)

    try{
        axios.post('http://localhost:3000/usuarios' , novoUsuario)
    }catch(err){
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

    } catch (err) {
        console.log('Deu erro => ' + err)
    }


    alert('Cadastro concluído com suscesso')
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

var tipoDeUsuario = document.getElementById("tipoUsuario");

function esqueceuASenha() {
    let recuperarSenha = prompt("Digite um e-mail válido para a recuperação de senha:");
    if (recuperarSenha === true) {
        return alert('SENHA');
    } else {
        return alert('ERRO: este não é um email válido. Tente novamente.');
    }
}



