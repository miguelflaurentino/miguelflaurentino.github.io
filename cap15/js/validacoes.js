import { calcularIdade } from "./util.js";

export function validarNome(nome) {
  const textoLimpo = nome ? nome.trim() : "";
  if (textoLimpo.length === 0) {
    return { valido: false, mensagem: "O nome completo é obrigatório." };
  }
  if (textoLimpo.length < 3) {
    return { valido: false, mensagem: "O nome deve conter pelo menos 3 caracteres." };
  }
  return { valido: true, mensagem: "" };
}

export function validarEmail(email) {
  const textoLimpo = email ? email.trim() : "";
  if (textoLimpo.length === 0) {
    return { valido: false, mensagem: "O e-mail é obrigatório." };
  }
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(textoLimpo)) {
    return { valido: false, mensagem: "Insira um endereço de e-mail válido." };
  }
  return { valido: true, mensagem: "" };
}

export function validarTelefone(telefone) {
  const texto = telefone ? telefone.trim() : "";
  if (texto.length === 0) {
    return { valido: false, mensagem: "O telefone é obrigatório." };
  }
  const regexTel = /^\(\d{2}\)\s9\d{4}-\d{4}$/;
  if (!regexTel.test(texto)) {
    return { valido: false, mensagem: "O telefone deve seguir o formato (82) 99999-9999." };
  }
  return { valido: true, mensagem: "" };
}

export function validarDataNascimento(dataString) {
  if (!dataString) {
    return { valido: false, mensagem: "A data de nascimento é obrigatória." };
  }
  const idade = calcularIdade(dataString);
  if (idade < 16) {
    return { valido: false, mensagem: "Inscrição permitida apenas para candidatos com 16 anos ou mais." };
  }
  return { valido: true, mensagem: "" };
}

export function validarCurso(curso) {
  if (!curso || curso === "") {
    return { valido: false, mensagem: "Você deve selecionar um curso." };
  }
  return { valido: true, mensagem: "" };
}

export function validarTurno(turno) {
  if (!turno) {
    return { valido: false, mensagem: "Selecione um turno de preferência." };
  }
  return { valido: true, mensagem: "" };
}

export function validarInteresses(interessesArray) {
  if (!Array.isArray(interessesArray) || interessesArray.length < 2) {
    return { valido: false, mensagem: "Selecione pelo menos 2 áreas de interesse." };
  }
  return { valido: true, mensagem: "" };
}

export function validarSenha(senha) {
  if (!senha || senha.length < 8) {
    return { valido: false, mensagem: "A senha deve conter no mínimo 8 caracteres." };
  }
  const possuiMaiuscula = /[A-Z]/.test(senha);
  const possuiNumero = /[0-9]/.test(senha);
  
  if (!possuiMaiuscula) {
    return { valido: false, mensagem: "A senha deve conter pelo menos uma letra maiúscula." };
  }
  if (!possuiNumero) {
    return { valido: false, mensagem: "A senha deve conter pelo menos um número." };
  }
  return { valido: true, mensagem: "" };
}

export function validarConfirmarSenha(senha, confirmarSenha) {
  if (!confirmarSenha) {
    return { valido: false, mensagem: "Confirme a sua senha." };
  }
  if (senha !== confirmarSenha) {
    return { valido: false, mensagem: "As senhas não coincidem." };
  }
  return { valido: true, mensagem: "" };
}

export function validarMensagem(mensagem) {
  const texto = mensagem ? mensagem.trim() : "";
  if (texto.length === 0) {
    return { valido: false, mensagem: "A mensagem/motivação é obrigatória." };
  }
  if (texto.length < 50) {
    return { valido: false, mensagem: `A mensagem é curta demais (mínimo de 50 caracteres. Atual: ${texto.length}).` };
  }
  if (texto.length > 500) {
    return { valido: false, mensagem: `A mensagem excede o limite permitido (máximo de 500 caracteres. Atual: ${texto.length}).` };
  }
  return { valido: true, mensagem: "" };
}

export function validarFoto(arquivoFoto) {
  if (!arquivoFoto) return { valido: true, mensagem: "" };
  
  const tiposPermitidos = ["image/jpeg", "image/png"];
  if (!tiposPermitidos.includes(arquivoFoto.type)) {
    return { valido: false, mensagem: "Formato de arquivo inválido. Apenas JPG e PNG são permitidos." };
  }
  
  const limiteTamanho = 2 * 1024 * 1024;
  if (arquivoFoto.size > limiteTamanho) {
    return { valido: false, mensagem: "O arquivo excede o limite máximo de 2MB." };
  }
  
  return { valido: true, mensagem: "" };
}

export function validarTermos(aceito) {
  if (!aceito) {
    return { valido: false, mensagem: "Você deve aceitar os termos de uso para prosseguir." };
  }
  return { valido: true, mensagem: "" };
}