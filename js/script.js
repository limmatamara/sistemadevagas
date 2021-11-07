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
    if((destino === 'telaLogin' || destino === 'telaCadastro')){
        elementoOrigem.setAttribute('class' , 'esconder');
        elementoDestino.setAttribute('class' , '');
    }else if(destino === 'home-trabalhador' || destino === 'home-recrutador' || destino === 'cadastro-de-vaga'){
        elementoOrigem.setAttribute('class' , 'esconder');
        elementoDestino.setAttribute('class' , 'container');
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

const listarVagas = async (id) => {
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

        let userList = document.getElementById(`${id}`)
        userList.appendChild(div)

    })
}


function limparCampos() {
    document.getElementById('email-login').value = '';
    document.getElementById('password').value = '';

}


