
//#region Cadastro Usuário
const validarTipoDeUsuario= () => {
    let select = document.getElementById('tipoUsuario')
    let tipoDeUsuario = select.options[select.selectedIndex].value

    let primeiroEmprego = document.getElementById('primeiroEmprego')
    let labelPrimeiroEmprego = document.getElementById('labelPrimeiroEmprego')

    if(tipoDeUsuario === 'recrutador'){
        primeiroEmprego.setAttribute('class' , 'esconder')
        labelPrimeiroEmprego.setAttribute('class' , 'esconder')
    }else{
        primeiroEmprego.setAttribute('class' , '')
        labelPrimeiroEmprego.setAttribute('class' , '')
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

const validaEmail = () => {
    let regex = /\S+@\S+\.\S+/;
    let emailInput = document.getElementById('emailCadastro');
    let ehValido = false;

    let emailValido = regex.test(emailInput.value);

    if(emailValido){
        ehValido = true;
    }

    console.log(emailValido)
    
    let emailError = document.getElementById('email-registration-error')
    emailInput.value === '' ? emailError.setAttribute('class', 'esconder') :
    ehValido ? emailError.setAttribute('class' , 'esconder') : emailError.setAttribute('class', 'error')
}

const validaSenha = () => {
    let ehValido = false;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let senhaInput = document.getElementById('senha');
    let senhaValida = regex.test(senhaInput.value);

    if(senhaValida){
        ehValido = true
    }

    let erroSenha = document.getElementById('senha-registration-erro')
    senhaInput.value === '' ? erroSenha.setAttribute('class' , 'esconder') :
    ehValido ? erroSenha.setAttribute('class' , 'esconder') : erroSenha.setAttribute('class' , 'error')

}



const validaCadastroUsuario = () => {

}
//#endregion Cadastro usuário
