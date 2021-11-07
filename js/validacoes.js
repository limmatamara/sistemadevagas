// const { default: axios } = require("axios")

//#region Cadastro Usuário
const validarTipoDeUsuario = () => {
    let select = document.getElementById('tipoUsuario')
    let tipoDeUsuario = select.options[select.selectedIndex].value

    let primeiroEmprego = document.getElementById('primeiroEmprego')
    let labelPrimeiroEmprego = document.getElementById('labelPrimeiroEmprego')

    if (tipoDeUsuario === 'recrutador') {
        primeiroEmprego.setAttribute('class', 'esconder')
        labelPrimeiroEmprego.setAttribute('class', 'esconder')
    } else {
        primeiroEmprego.setAttribute('class', '')
        labelPrimeiroEmprego.setAttribute('class', '')
    }
    console.log(tipoDeUsuario)
}

function validarNome() {
    ehValido = false
    let nome = document.getElementById('nomeCompleto').value
    let arrayName = [...nome]
    let erroNome = document.getElementById('nome-completo-error')
    let regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/

    let isNameValid = arrayName.every(nome => regex.test(nome) === true)

    if (!isNameValid) {
        erroNome.className = 'error'
        ehValido = true
    } else {
        erroNome.className = 'esconder'
    }

    return ehValido
}
const validarData = () => {

    let ehValido = false;

    let inputData = document.getElementById('dataNascimento');
    let dataDigitada = inputData.value;
    let dataSemBarras = dataDigitada.replaceAll('/', '');
    let validDate = moment(dataSemBarras, 'DDMMYYY').isValid();
    let maiorDeIdade = moment().diff(moment(dataSemBarras, 'DDMMYYYY'), 'years');

    adicionarMascaraData(inputData, dataDigitada)

    let regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/

    let formatoDeDataValida = regex.test(dataDigitada)

    console.log(formatoDeDataValida)

    if (validDate && maiorDeIdade >= 18 && formatoDeDataValida) ehValido = true;

    let erroData = document.getElementById('dataNascimento-registration-error');

    dataDigitada === '' ? erroData.setAttribute('class', 'esconder') :
        ehValido ? erroData.setAttribute('class', 'esconder') : erroData.setAttribute('class', 'error');

    return ehValido;
}

const adicionarMascaraData = (input, data) => {
    let listaCaracteres = [...data];

    if (listaCaracteres && listaCaracteres.length) {
        let dataDigitada = listaCaracteres.filter(c => !isNaN(parseInt(c))).reduce((a, b) => a + b);

        const { length } = dataDigitada;

        switch (length) {
            case 0: case 1: case 2:
                input.value = dataDigitada;
                break;
            case 3: case 4:
                input.value = `${dataDigitada.substr(0, 2)}/${dataDigitada.substr(2, 2)}`;
                break;
            default:
                input.value = `${dataDigitada.substr(0, 2)}/${dataDigitada.substr(2, 2)}/${dataDigitada.substr(4, 4)}`;
        }
    }
}

const validaEmail = () => {
    let regex = /\S+@\S+\.\S+/;
    let emailInput = document.getElementById('emailCadastro');
    let ehValido = false;

    let emailValido = regex.test(emailInput.value);

    if (emailValido) {
        ehValido = true;
    }

    console.log(emailValido)

    let emailError = document.getElementById('email-registration-error')
    emailInput.value === '' ? emailError.setAttribute('class', 'esconder') :
        ehValido ? emailError.setAttribute('class', 'esconder') : emailError.setAttribute('class', 'error')
}

const validaSenha = () => {
    let ehValido = false;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let senhaInput = document.getElementById('senha');
    let senhaValida = regex.test(senhaInput.value);

    if (senhaValida) {
        ehValido = true
    }

    let erroSenha = document.getElementById('senha-registration-erro')
    senhaInput.value === '' ? erroSenha.setAttribute('class', 'esconder') :
        ehValido ? erroSenha.setAttribute('class', 'esconder') : erroSenha.setAttribute('class', 'error')

}


//#endregion Cadastro usuário


//#region  Validação de login

async function validarLogin() {
    const response = await axios.get('http://localhost:3000/usuarios');
    let emailDigitado = document.getElementById('email-login').value;
    let senhaDigitada = document.getElementById('password').value;
    let podeLogar = response.data.find(c => c.email === emailDigitado && c.senha === senhaDigitada);
    idUsuario = podeLogar.id;
    tipoDeUsuario = podeLogar.tipoDeUsuario;
    console.log(podeLogar);
    if (podeLogar && podeLogar.tipoDeUsuario === 'recrutador') {
        irPara('telaLogin', 'home-recrutador');
        limparCampos();
        listarVagas('job-oportunity')
    }
    else if (podeLogar && podeLogar.tipoDeUsuario === 'trabalhador') {
        irPara('telaLogin', 'home-trabalhador');
        limparCampos();
        listarVagas('job-oportunity-employee')
    }
}

async function esqueceuASenha() {    
    let email = prompt('Digite o email para recuperação de senha:');
    const usuario = await buscarUsuario(email);     
    if (usuario) {
        alert(`A sua senha é => '${usuario.senha}'`);
    } else if (email !== null){
        alert('Digite um email válido');
        esqueceuASenha()
        console.log(email)
    }
}

async function buscarUsuario (email) {
    const response = await axios.get('http://localhost:3000/usuarios');
    let usuarios = response.data;
    let usuario= usuarios.find(usuario => usuario.email === email);
    return usuario;
}
//#endregion Validação de login

//#region  Validação nova vaga

const validaNovaVaga = () => {
    let ehValido = true;
    let regex = /^$/
    let inputTitulo = document.getElementById('input-titulo').value;
    let inputDescricao = document.getElementById('input-descricao').value; 
    let inputRemuneracao = document.getElementById('input-remuneracao').value > 0;

    console.log(inputRemuneracao);
    let inputTituloVazio = regex.test(inputTitulo);
    let inputDescricaoVazia = regex.test(inputDescricao);


    if (inputTituloVazio) {
        ehValido = false;
    }

    if (inputDescricaoVazia) {
        ehValido = false;
    }

    if (!inputRemuneracao) {
        ehValido = false;
    }

    ehValido ? cadastrarNovaVaga() : alert('Os campos não podem ser vazios e remuneração necessita ser maior que zero.') 
    return ehValido;
}

//#endregion Validação nova vaga

