function irParaTelaCadastro () {
    document.getElementById("telaLogin").setAttribute("class", "esconder");
    document.getElementById("telaCadadstro").setAttribute("class", "exibir");
}

var tipoDeUsuario = document.getElementById("tipoUsuario");

function voltarParaTelaPrincipal () {
    document.getElementById("telaLogin").setAttribute("class", "exibir");
    document.getElementById("telaCadadstro").setAttribute("class", "esconder");
}