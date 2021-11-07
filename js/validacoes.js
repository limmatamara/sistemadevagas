
//#region Cadastro Usuário
function validarNome() {
    ehValido = false
    let nome = document.getElementById('nomeCompleto').value
    let arrayName = [...nome]
    let erroNome = document.getElementById('nome-completo-error')
    let regex = /[a-zA-Z\s]+/

    let isNameValid = arrayName.every(nome => regex.test(nome) === true)

    if(!isNameValid){
        erroNome.className = 'error'
        ehValido = true
    }else{
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

    if (validDate && maiorDeIdade >= 18) ehValido = true;

    let erroData = document.getElementById('dataNascimento-registration-error');

    dataDigitada === '' ? erroData.setAttribute('class', 'esconder') :
        ehValido ? erroData.setAttribute('class', 'esconder') : erroData.setAttribute('class', 'error');

    return ehValido;


}

const adicionarMascaraData = (input, data) => {
    let listaCaracteres = [...data];
    
    if(listaCaracteres && listaCaracteres.length) {
        let dataDigitada = listaCaracteres.filter(c => !isNaN(parseInt(c))).reduce((a, b) => a + b);

        const { length } = dataDigitada;

        switch(length) { 
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
const validaCadastroUsuario = () => {

}
//#endregion Cadastro usuário

const resetarCampos = (...campos) => {
    campos.array.forEach( c => c.value = '');
}

const limparDados = () => {
    //tela login
    let inputEmail = document.getElementById('email');
    let inputSenha = document.getElementById('password');
    // tela cadastro
    let inputNome = document.getElementById('nomeCompleto');
    let inputDataNascimento = document.getElementById('dataNascimento');
    let inputSenhalogin = document.getElementById('senha');
    //tela cadastro de vaga
    let selectUsuario = document.getElementById('tipoUsuario');
    let inputTitulo = document.getElementById('input-titulo');
    let inputDescricao = document.getElementById('input-descricao');
    let inputRemuneracao = document.getElementById('input-descricao');



    resetarCampos(inputEmail, inputSenha, inputNome, inputDataNascimento, inputSenhalogin, selectUsuario, inputTitulo, inputDescricao, inputRemuneracao);
}