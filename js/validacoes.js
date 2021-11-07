// const { default: axios } = require("axios")

//#region Cadastro Usuário
function validarNome() {
    ehValido = false
    let nome = document.getElementById('nomeCompleto').value
    let arrayName = [...nome]
    let erroNome = document.getElementById('nome-completo-error')
    let regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/

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

async function validarLogin () {   
    const response =  await axios.get('http://localhost:3000/usuarios');
    let emailDigitado = document.getElementById('email-login').value;
            let senhaDigitada = document.getElementById('password').value;
            let podeLogar = response.data.find(c => c.email === emailDigitado && c.senha === senhaDigitada);
            console.log(podeLogar);
            if (podeLogar && podeLogar.tipoDeUsuario === 'recrutador') {
                irPara('telaLogin', 'home-recrutador');
            } 
            else if (podeLogar && podeLogar.tipoDeUsuario === 'trabalhador') {
                irPara('telaLogin', 'home-trabalhador');
            }                   
}

async function esqueceuASenha() {    
    let email = prompt('Digite o email para recuperação de senha:');
    const usuario = await buscarUsuario(email);     
    if (usuario) {
        alert(usuario.senha);
    } else {
        alert('Digite um email válido');
    }
}

async function buscarUsuario (email) {
    const response = await axios.get('http://localhost:3000/usuarios');
    let usuarios = response.data;
    let usuario= usuarios.find(usuario => usuario.email === email);
    return usuario;
}

