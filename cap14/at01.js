/**
 * Programação Web I - AT14
 * Painel Acadêmico Interativo
 *
 * Lógica da aplicação para manipulação do DOM e eventos.
 */

// 1. Seleção dos elementos
const tituloPagina = document.getElementById("tituloPagina");
const subtituloPagina = document.getElementById("subtituloPagina");

const perfilCard = document.getElementById("perfil");
const fotoPerfil = document.getElementById("fotoPerfil");
const nomePerfil = document.getElementById("nomePerfil");
const cursoPerfil = document.getElementById("cursoPerfil");
const biografiaPerfil = document.getElementById("biografiaPerfil");

const temaSelect = document.getElementById("temaSelect");
const fonteRange = document.getElementById("fonteRange");
const valorFonte = document.getElementById("valorFonte");
const mostrarBio = document.getElementById("mostrarBio");

const emailInput = document.getElementById("emailInput");
const telefoneInput = document.getElementById("telefoneInput");
const btnAtualizarContato = document.getElementById("btnAtualizarContato");
const emailExibido = document.getElementById("emailExibido");
const telefoneExibido = document.getElementById("telefoneExibido");

const contadorAcoes = document.getElementById("contadorAcoes");
const ultimaAcao = document.getElementById("ultimaAcao");

const btnAlterarNome = document.getElementById("btnAlterarNome");
const btnAlterarCurso = document.getElementById("btnAlterarCurso");
const btnAlterarFoto = document.getElementById("btnAlterarFoto");
const btnDestacarPerfil = document.getElementById("btnDestacarPerfil");
const btnRestaurar = document.getElementById("btnRestaurar");

// 2. Estado original para restauração
const estadoOriginal = {
  nome: "João Silva",
  curso: "Técnico em Informática",
  foto: "imagens/perfil1.jpg",
  destacado: false,
};

// 3. Contador de ações
let totalAcoes = 0;

/**
 * Incrementa o contador de ações e atualiza a última ação executada na tela.
 * @param {string} descricaoAcao - Descrição legível da ação realizada.
 */
function registrarAcao(descricaoAcao) {
  totalAcoes++;
  contadorAcoes.textContent = totalAcoes;
  ultimaAcao.textContent = descricaoAcao;
}

// 4. Funcionalidades da aplicação

// Funcionalidade 1 — Alterar Nome
btnAlterarNome.addEventListener("click", () => {
  const nomeAtual = nomePerfil.textContent;
  const novoNome =
    nomeAtual === "Maria Oliveira" ? "João Silva" : "Maria Oliveira";
  nomePerfil.textContent = novoNome;
  registrarAcao(`Alteração de nome para: ${novoNome}`);
});

// Funcionalidade 2 — Alterar Curso
btnAlterarCurso.addEventListener("click", () => {
  const cursoTexto = cursoPerfil.textContent;
  const cursoAtual = cursoTexto.replace("Curso: ", "").trim();
  const novoCurso =
    cursoAtual === "Análise e Desenvolvimento de Sistemas"
      ? "Técnico em Informática"
      : "Análise e Desenvolvimento de Sistemas";
  cursoPerfil.textContent = `Curso: ${novoCurso}`;
  registrarAcao(`Alteração de curso para: ${novoCurso}`);
});

// Funcionalidade 3 — Alterar Foto
btnAlterarFoto.addEventListener("click", () => {
  const fotoAtual = fotoPerfil.getAttribute("src");
  const novaFoto =
    fotoAtual === "imagens/perfil1.jpg"
      ? "imagens/perfil2.jpg"
      : "imagens/perfil1.jpg";
  fotoPerfil.setAttribute("src", novaFoto);
  registrarAcao("Alteração de foto de perfil");
});

// Funcionalidade 4 — Destacar Perfil
btnDestacarPerfil.addEventListener("click", () => {
  perfilCard.classList.add("destacado");
  registrarAcao("Destaque aplicado ao perfil");
});

// Funcionalidade 5 — Restaurar Perfil
btnRestaurar.addEventListener("click", () => {
  nomePerfil.textContent = estadoOriginal.nome;
  cursoPerfil.textContent = `Curso: ${estadoOriginal.curso}`;
  fotoPerfil.setAttribute("src", estadoOriginal.foto);
  perfilCard.classList.remove("destacado");
  registrarAcao("Perfil restaurado ao original");
});

// Funcionalidade 6 — Alterar Tema da Página
temaSelect.addEventListener("change", (e) => {
  const temaSelecionado = e.target.value;
  // Remove temas antigos e aplica o novo no body
  document.body.classList.remove("claro", "escuro", "azul");
  document.body.classList.add(temaSelecionado);
  registrarAcao(`Alteração do tema da página para: ${temaSelecionado}`);
});

// Funcionalidade 7 — Controle de Tamanho da Fonte
fonteRange.addEventListener("input", (e) => {
  const tamanho = e.target.value;
  biografiaPerfil.style.fontSize = `${tamanho}px`;
  valorFonte.textContent = `${tamanho}px`;
});
fonteRange.addEventListener("change", (e) => {
  registrarAcao(`Alteração de fonte para ${e.target.value}px`);
});

// Funcionalidade 8 — Exibir ou Ocultar Biografia
mostrarBio.addEventListener("change", (e) => {
  const mostrar = e.target.checked;
  if (mostrar) {
    biografiaPerfil.style.display = "";
    registrarAcao("Biografia exibida");
  } else {
    biografiaPerfil.style.display = "none";
    registrarAcao("Biografia oculta");
  }
});

// Funcionalidade 9 — Atualizar Informações de Contato
btnAtualizarContato.addEventListener("click", () => {
  const emailVal = emailInput.value.trim();
  const telefoneVal = telefoneInput.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let emailValido = true;
  let telefoneValido = true;

  if (emailVal && !emailRegex.test(emailVal)) {
    emailValido = false;
    emailInput.style.border = "2px solid var(--color-accent)";
  } else {
    emailInput.style.border = "";
  }

  if (telefoneVal && telefoneVal.replace(/\D/g, "").length < 8) {
    telefoneValido = false;
    telefoneInput.style.border = "2px solid var(--color-accent)";
  } else {
    telefoneInput.style.border = "";
  }

  if (!emailValido || !telefoneValido) {
    alert(
      "Por favor, informe um formato de e-mail válido e/ou número de telefone válido (mínimo 8 dígitos).",
    );
    return;
  }

  emailExibido.textContent = `E-mail: ${emailVal || "não informado"}`;
  telefoneExibido.textContent = `Telefone: ${telefoneVal || "não informado"}`;

  emailInput.value = "";
  telefoneInput.value = "";

  registrarAcao("Informações de contato atualizadas");
});

// Mensagem de boas vindas dinâmica
window.addEventListener("DOMContentLoaded", () => {
  const hora = new Date().getHours();
  let saudacao = "Bem-vindo";

  if (hora >= 5 && hora < 12) {
    saudacao = "bom dia";
  } else if (hora >= 12 && hora < 18) {
    saudacao = "boa tarde";
  } else {
    saudacao = "boa noite";
  }

  subtituloPagina.innerHTML = `Olá, <strong>${saudacao}</strong>! Use JavaScript e DOM para tornar esta página interativa.`;
});
