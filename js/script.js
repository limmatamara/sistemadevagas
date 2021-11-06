function irParaTelaCadastro () {
    document.getElementById("telaLogin").setAttribute("class", "esconder");
    document.getElementById("telaCadastro").setAttribute("class", "exibir");
}

function voltarParaTelaPrincipal () {
    document.getElementById("telaLogin").setAttribute("class", "exibir");
    document.getElementById("telaCadadstro").setAttribute("class", "esconder");
}

var tipoDeUsuario = document.getElementById("tipoUsuario");

function esqueceuASenha() {
    let recuperarSenha = prompt("Digite um e-mail válido para a recuperação de senha:");
    if (recuperarSenha === true) {
        return alert('SENHA');
    } else {
        return alert('ERRO: este não é um email válido. Tente novamente.');
    }
}

function validarNome() {
    let nomeDigitado = document.getElementById("nomeCompleto").value;    
    let arrayChar = [...nomeDigitado];
    let somenteLetra = arrayChar.every(char => char.toLowerCase() !== char.toUpperCase());
    if (!somenteLetra) {
        document.getElementById("nome-completo-error").setAttribute("class", "exibir")
    }
}

function validarData () {

}


