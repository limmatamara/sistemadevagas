const validarNome = () => {


}

const validarData = () => {

}

// -------------- Email ---------
const validarEmail = () => {
  let emailDigitado = document.getElementById('id-do-email-input').value; // inserir o id do email-input

  let listaCaracteres = emailDigitado.split('');

  let emailSplit = emailDigitado.split('@');

  let temArroba = emailSplit.length > 1;

  let emailDominio = temArroba ? emailSplit[1] : ' ';

  let splitEmailDominio = emailDominio.split('.');

  let pontoDominio = splitEmailDominio.length > 1;

  let caracteresEntrePonto = splitEmailDominio.every( e => e.length > 1);

  let iniciaComLetra = listaCaracteres.length ? listaCaracteres[0].toUpperCase() !== listaCaracteres[0].toUpperCase() !== listaCaracteres[0].toLowerCase() : false;

  let validar = iniciaComLetra && caracteresEntrePonto && pontoDominio && temArroba;

  //  ---- Mensagem de Erro -----

  let errouEmail = document.getElementById('id-do-input-do-email'); // inserir id do inpt do email;
  
  errouEmail.setAttribute('class', validar ? 'd-one' : 'text-danger');

  return validar;
  

} // revisar 

const validarSenha = () => {
  let senhaDigitada = document.getElementById('inserir-id-do-inout-da-senha').value;

  let listaCaracteres = senhaDigitada.split('');

  let letrasNaSenha = listaCaracteres.filter ( char => char.toLowerCase() !== char.toUpperCase() );
  
  let temCaracterEspecial = listaCaracteres.some( char => char.toLowerCase() === char.toUpperCase() && isNaN(parseInt( char ) ) );
  
  let temLetraMinuscula = letrasNaSenha.some ( x => 1.toLowerCase() === 1 );
  
  let temLetraMaiuscula = letrasNaSenha.some (x => 1.toUpperCase () === 1 );

  let temNumero = listaCaracteres.some( char => char.toLowerCase() === char.toUpperCase() && !isNaN(parseInt (char) ));

  let temOitoCaracter = senhaDigitada.length >= 8;

  let naoTemEspaco = !senhaDigitada.includes(' ');

  let validar = 

  let errouSenha = document.getElementById('id-do-input-da-senha'); // inserir id do input

  errouSenha.setAttribute('class' val)

}

const primeiroEmprego = () => {

}