import * as validacoes from "./validacoes.js";
import { limparNaoNumericos, formatarTelefone } from "./util.js";

document.addEventListener("DOMContentLoaded", () => {
  const DOM = {
    form: document.getElementById("form-inscricao"),
    nome: document.getElementById("nome"),
    email: document.getElementById("email"),
    telefone: document.getElementById("telefone"),
    dataNascimento: document.getElementById("data-nascimento"),
    curso: document.getElementById("curso"),
    turnos: document.getElementsByName("turno"),
    interesses: document.getElementsByName("interesses"),
    senha: document.getElementById("senha"),
    confirmarSenha: document.getElementById("confirmar-senha"),
    foto: document.getElementById("foto"),
    mensagem: document.getElementById("mensagem"),
    termos: document.getElementById("termos"),
    charCounter: document.getElementById("char-counter"),
    imagePreview: document.getElementById("image-preview"),
    previewContainer: document.getElementById("preview-container"),
    removePreviewBtn: document.getElementById("remove-preview-btn"),
    passwordStrengthBar: document.getElementById("password-strength-bar"),
    passwordStrengthText: document.getElementById("password-strength-text"),
    togglePasswordBtns: document.querySelectorAll(".toggle-password-btn"),
    modal: document.getElementById("modal-confirmacao"),
    modalResumo: document.getElementById("modal-resumo-dados"),
    btnsFecharModal: document.querySelectorAll("[data-fechar-modal]"),
    btnConfirmarEnvio: document.getElementById("btn-confirmar-envio"),
    successContainer: document.getElementById("sucesso-container"),
    btnNovoCadastro: document.getElementById("btn-novo-cadastro"),
    formHeader: document.querySelector(".form-header"),
  };

  function mostrarErro(input, mensagem) {
    const formGroup = input.closest(".form-group");
    if (!formGroup) return;

    formGroup.classList.remove("valido");
    formGroup.classList.add("invalido");

    const spanErro = document.getElementById(`erro-${input.id}`);
    if (spanErro) {
      spanErro.textContent = mensagem || "Campo inválido.";
    }
  }

  function mostrarSucesso(input) {
    const formGroup = input.closest(".form-group");
    if (!formGroup) return;

    formGroup.classList.remove("invalido");
    formGroup.classList.add("valido");

    const spanErro = document.getElementById(`erro-${input.id}`);
    if (spanErro) {
      spanErro.textContent = "";
    }
  }

  function validarCampoIndividual(input) {
    let resultado = { valido: true, mensagem: "" };

    switch (input.id) {
      case "nome":
        resultado = validacoes.validarNome(input.value);
        break;
      case "email":
        resultado = validacoes.validarEmail(input.value);
        break;
      case "telefone":
        resultado = validacoes.validarTelefone(input.value);
        break;
      case "data-nascimento":
        resultado = validacoes.validarDataNascimento(input.value);
        break;
      case "curso":
        resultado = validacoes.validarCurso(input.value);
        break;
      case "senha":
        resultado = validacoes.validarSenha(input.value);
        const confirmarInput = document.getElementById("confirmar-senha");
        if (confirmarInput && confirmarInput.value) {
          validarCampoIndividual(confirmarInput);
        }
        break;
      case "confirmar-senha":
        const senhaInput = document.getElementById("senha");
        resultado = validacoes.validarConfirmarSenha(
          senhaInput.value,
          input.value,
        );
        break;
      case "foto":
        resultado = validacoes.validarFoto(input.files[0]);
        break;
      case "mensagem":
        resultado = validacoes.validarMensagem(input.value);
        break;
      case "termos":
        resultado = validacoes.validarTermos(input.checked);
        break;
    }

    if (resultado.valido) {
      mostrarSucesso(input);
    } else {
      mostrarErro(input, resultado.mensagem);
    }

    return resultado.valido;
  }

  function validarGrupoTurno() {
    const radios = document.getElementsByName("turno");
    let valorSelecionado = "";
    radios.forEach((radio) => {
      if (radio.checked) valorSelecionado = radio.value;
    });

    const resultado = validacoes.validarTurno(valorSelecionado);
    const container = radios[0].closest(".form-group");
    const spanErro = document.getElementById("erro-turno");

    if (resultado.valido) {
      container.classList.remove("invalido");
      container.classList.add("valido");
      spanErro.textContent = "";
    } else {
      container.classList.remove("valido");
      container.classList.add("invalido");
      spanErro.textContent = resultado.mensagem;
    }

    return resultado.valido;
  }

  function validarGrupoInteresses() {
    const checkboxes = document.getElementsByName("interesses");
    const valoresSelecionados = [];
    checkboxes.forEach((chk) => {
      if (chk.checked) valoresSelecionados.push(chk.value);
    });

    const resultado = validacoes.validarInteresses(valoresSelecionados);
    const container = checkboxes[0].closest(".form-group");
    const spanErro = document.getElementById("erro-interesses");

    if (resultado.valido) {
      container.classList.remove("invalido");
      container.classList.add("valido");
      spanErro.textContent = "";
    } else {
      container.classList.remove("valido");
      container.classList.add("invalido");
      spanErro.textContent = resultado.mensagem;
    }

    return resultado.valido;
  }

  function validarFormulario() {
    let formValido = true;

    const inputs = [
      document.getElementById("nome"),
      document.getElementById("email"),
      document.getElementById("telefone"),
      document.getElementById("data-nascimento"),
      document.getElementById("curso"),
      document.getElementById("senha"),
      document.getElementById("confirmar-senha"),
      document.getElementById("foto"),
      document.getElementById("mensagem"),
      document.getElementById("termos"),
    ];

    inputs.forEach((input) => {
      const campoValido = validarCampoIndividual(input);
      if (!campoValido) {
        formValido = false;
      }
    });

    const turnoValido = validarGrupoTurno();
    const interessesValidos = validarGrupoInteresses();

    if (!turnoValido || !interessesValidos) {
      formValido = false;
    }

    return formValido;
  }

  function atualizarMedidorSenha(senha) {
    const bar = DOM.passwordStrengthBar;
    const labelText = DOM.passwordStrengthText;

    if (!bar || !labelText) return;

    if (!senha) {
      bar.style.width = "";
      bar.className = "strength-bar";
      labelText.textContent = "";
      labelText.className = "strength-text";
      return;
    }

    let pontuacao = 0;

    if (senha.length >= 8) pontuacao++;
    if (/[A-Z]/.test(senha)) pontuacao++;
    if (/[a-z]/.test(senha)) pontuacao++;
    if (/[0-9]/.test(senha)) pontuacao++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(senha)) pontuacao++;

    bar.style.width = "";
    bar.className = "strength-bar";
    labelText.className = "strength-text";

    if (pontuacao <= 2) {
      bar.classList.add("fraca");
      labelText.classList.add("fraca");
      labelText.textContent = "Força da Senha: Fraca 🔴";
    } else if (pontuacao === 3) {
      bar.classList.add("media");
      labelText.classList.add("media");
      labelText.textContent = "Força da Senha: Média 🟡";
    } else {
      bar.classList.add("forte");
      labelText.classList.add("forte");
      labelText.textContent = "Força da Senha: Forte e Segura 🟢";
    }
  }

  function atualizarContadorCaracteres(mensagem) {
    const counterElement = DOM.charCounter;
    if (!counterElement) return;

    const tamanho = mensagem ? mensagem.length : 0;

    counterElement.textContent = `${tamanho} / 500`;

    counterElement.className = "char-counter";

    if (tamanho === 0) {
      return;
    }

    if (tamanho < 50) {
      counterElement.classList.add("insuficiente");
    } else if (tamanho >= 450 && tamanho <= 500) {
      counterElement.classList.add("alerta");
    } else if (tamanho > 500) {
      counterElement.classList.add("excedido");
    }
  }

  function ocultarPreview() {
    if (DOM.previewContainer) {
      DOM.previewContainer.classList.add("hidden");
    }
    if (DOM.imagePreview) {
      DOM.imagePreview.src = "#";
    }
  }

  function salvarRascunho() {
    const interessesCheckbox = document.getElementsByName("interesses");
    const interessesSelecionados = [];
    interessesCheckbox.forEach((chk) => {
      if (chk.checked) interessesSelecionados.push(chk.value);
    });

    const turnosRadio = document.getElementsByName("turno");
    let turnoSelecionado = "";
    turnosRadio.forEach((radio) => {
      if (radio.checked) turnoSelecionado = radio.value;
    });

    const rascunho = {
      nome: DOM.nome.value,
      email: DOM.email.value,
      telefone: DOM.telefone.value,
      dataNascimento: DOM.dataNascimento.value,
      curso: DOM.curso.value,
      mensagem: DOM.mensagem.value,
      turno: turnoSelecionado,
      interesses: interessesSelecionados,
      termos: DOM.termos.checked,
    };

    localStorage.setItem("formulario_rascunho", JSON.stringify(rascunho));
  }

  function restaurarRascunho() {
    const rascunhoJSON = localStorage.getItem("formulario_rascunho");
    if (!rascunhoJSON) return;

    try {
      const dados = JSON.parse(rascunhoJSON);

      if (dados.nome) DOM.nome.value = dados.nome;
      if (dados.email) DOM.email.value = dados.email;
      if (dados.telefone) DOM.telefone.value = dados.telefone;
      if (dados.dataNascimento) DOM.dataNascimento.value = dados.dataNascimento;
      if (dados.curso) DOM.curso.value = dados.curso;
      if (dados.mensagem) {
        DOM.mensagem.value = dados.mensagem;
        atualizarContadorCaracteres(dados.mensagem);
      }
      if (dados.termos) DOM.termos.checked = dados.termos;

      if (dados.turno) {
        const turnosRadio = document.getElementsByName("turno");
        turnosRadio.forEach((radio) => {
          if (radio.value === dados.turno) {
            radio.checked = true;
          }
        });
      }

      if (Array.isArray(dados.interesses)) {
        const interessesCheckbox = document.getElementsByName("interesses");
        interessesCheckbox.forEach((chk) => {
          if (dados.interesses.includes(chk.value)) {
            chk.checked = true;
          }
        });
      }

      validarFormularioRecuperado();
    } catch (error) {
      console.error("Falha ao restaurar rascunho do formulário:", error);
    }
  }

  function validarFormularioRecuperado() {
    const inputs = [
      DOM.nome,
      DOM.email,
      DOM.telefone,
      DOM.dataNascimento,
      DOM.curso,
      DOM.senha,
      DOM.confirmarSenha,
      DOM.foto,
      DOM.mensagem,
      DOM.termos,
    ];

    inputs.forEach((input) => {
      if (input && input.value) {
        validarCampoIndividual(input);
      }
    });

    validarGrupoTurno();
    validarGrupoInteresses();
  }

  DOM.togglePasswordBtns.forEach((botao) => {
    botao.addEventListener("click", () => {
      const targetId = botao.getAttribute("data-target");
      const inputSenha = document.getElementById(targetId);
      const icone = botao.querySelector(".material-symbols-outlined");

      if (!inputSenha || !icone) return;

      if (inputSenha.type === "password") {
        inputSenha.type = "text";
        icone.textContent = "visibility_off";
        botao.setAttribute("aria-label", "Ocultar senha");
      } else {
        inputSenha.type = "password";
        icone.textContent = "visibility";
        botao.setAttribute("aria-label", "Mostrar senha");
      }
    });
  });

  function abrirModalConfirmacao() {
    DOM.modalResumo.innerHTML = "";

    const interessesCheckbox = document.getElementsByName("interesses");
    const interessesSelecionados = [];
    interessesCheckbox.forEach((chk) => {
      if (chk.checked)
        interessesSelecionados.push(chk.parentElement.textContent.trim());
    });

    const turnosRadio = document.getElementsByName("turno");
    let turnoSelecionado = "";
    turnosRadio.forEach((radio) => {
      if (radio.checked)
        turnoSelecionado = radio.parentElement.textContent.trim();
    });

    const inputFoto = document.getElementById("foto");
    const nomeFoto = inputFoto.files[0]
      ? inputFoto.files[0].name
      : "Nenhuma foto anexada";

    const dataVal = DOM.dataNascimento.value;
    const dataFormatada =
      dataVal && dataVal.includes("-")
        ? dataVal.split("-").reverse().join("/")
        : dataVal;

    const dadosResumo = [
      { label: "Nome Completo", valor: DOM.nome.value },
      { label: "E-mail", valor: DOM.email.value },
      { label: "Telefone", valor: DOM.telefone.value },
      { label: "Data de Nascimento", valor: dataFormatada },
      {
        label: "Curso Selecionado",
        valor: DOM.curso.options[DOM.curso.selectedIndex].text,
      },
      { label: "Turno", valor: turnoSelecionado },
      { label: "Áreas de Interesse", valor: interessesSelecionados.join(", ") },
      { label: "Foto Anexada", valor: nomeFoto },
      { label: "Justificativa/Mensagem", valor: DOM.mensagem.value },
    ];

    dadosResumo.forEach((item) => {
      const div = document.createElement("div");
      div.className = "modal-resumo-item";
      div.innerHTML = `<strong>${item.label}</strong> <span>${item.valor || "Não preenchido"}</span>`;
      DOM.modalResumo.appendChild(div);
    });

    DOM.modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function fecharModal() {
    DOM.modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function mostrarSucessoFinal() {
    if (DOM.formHeader) DOM.formHeader.classList.add("hidden");
    DOM.form.classList.add("hidden");
    DOM.successContainer.classList.remove("hidden");
  }

  function fecharSucessoEResetar() {
    DOM.successContainer.classList.add("hidden");
    if (DOM.formHeader) DOM.formHeader.classList.remove("hidden");
    DOM.form.classList.remove("hidden");
    document.body.style.overflow = "";
    DOM.form.reset();

    // Reset UX components
    ocultarPreview();
    if (DOM.charCounter) {
      DOM.charCounter.textContent = "0 / 500";
      DOM.charCounter.className = "char-counter";
    }
    if (DOM.passwordStrengthBar) {
      DOM.passwordStrengthBar.style.width = "";
      DOM.passwordStrengthBar.className = "strength-bar";
    }
    if (DOM.passwordStrengthText) {
      DOM.passwordStrengthText.textContent = "";
      DOM.passwordStrengthText.className = "strength-text";
    }
    localStorage.removeItem("formulario_rascunho");
  }

  // Phone mask listener
  DOM.telefone.addEventListener("input", (event) => {
    const valorOriginal = DOM.telefone.value;
    const valorFormatado = formatarTelefone(valorOriginal);

    if (valorOriginal !== valorFormatado) {
      const posicaoCursor = DOM.telefone.selectionStart;

      DOM.telefone.value = valorFormatado;

      if (posicaoCursor !== valorOriginal.length) {
        DOM.telefone.setSelectionRange(posicaoCursor, posicaoCursor);
      }
    }

    validarCampoIndividual(DOM.telefone);
    salvarRascunho();
  });

  DOM.senha.addEventListener("input", () => {
    atualizarMedidorSenha(DOM.senha.value);
    validarCampoIndividual(DOM.senha);
    salvarRascunho();
  });

  DOM.mensagem.addEventListener("input", () => {
    atualizarContadorCaracteres(DOM.mensagem.value);
    validarCampoIndividual(DOM.mensagem);
    salvarRascunho();
  });

  const camposTempoReal = [DOM.nome, DOM.email, DOM.confirmarSenha];
  camposTempoReal.forEach((input) => {
    input.addEventListener("input", () => {
      validarCampoIndividual(input);
      salvarRascunho();
    });
  });

  DOM.dataNascimento.addEventListener("change", () => {
    validarCampoIndividual(DOM.dataNascimento);
    salvarRascunho();
  });
  DOM.curso.addEventListener("change", () => {
    validarCampoIndividual(DOM.curso);
    salvarRascunho();
  });
  DOM.termos.addEventListener("change", () => {
    validarCampoIndividual(DOM.termos);
    salvarRascunho();
  });

  DOM.foto.addEventListener("change", () => {
    const arquivo = DOM.foto.files[0];

    if (!arquivo) {
      ocultarPreview();
      validarCampoIndividual(DOM.foto);
      return;
    }

    const resultado = validacoes.validarFoto(arquivo);

    if (resultado.valido) {
      mostrarSucesso(DOM.foto);

      const leitor = new FileReader();
      leitor.onload = function (event) {
        DOM.imagePreview.src = event.target.result;
        DOM.previewContainer.classList.remove("hidden");
      };
      leitor.readAsDataURL(arquivo);
    } else {
      mostrarErro(DOM.foto, resultado.mensagem);
      ocultarPreview();
    }
  });

  DOM.removePreviewBtn.addEventListener("click", () => {
    DOM.foto.value = "";
    ocultarPreview();
    mostrarSucesso(DOM.foto);
  });

  DOM.turnos.forEach((radio) => {
    radio.addEventListener("change", () => {
      validarGrupoTurno();
      salvarRascunho();
    });
  });

  DOM.interesses.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      validarGrupoInteresses();
      salvarRascunho();
    });
  });

  DOM.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formularioValido = validarFormulario();

    if (!formularioValido) {
      const primeiroGrupoInvalido = document.querySelector(
        ".form-group.invalido",
      );

      if (primeiroGrupoInvalido) {
        primeiroGrupoInvalido.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        const inputComErro = primeiroGrupoInvalido.querySelector(
          "input, select, textarea",
        );
        if (inputComErro) {
          inputComErro.focus();
        }
      }
    } else {
      abrirModalConfirmacao();
    }
  });

  DOM.form.addEventListener("reset", () => {
    setTimeout(() => {
      const formGroups = document.querySelectorAll(".form-group");
      formGroups.forEach((group) => {
        group.classList.remove("valido", "invalido");
      });

      const mensagensErro = document.querySelectorAll(".error-message");
      mensagensErro.forEach((span) => {
        span.textContent = "";
      });

      ocultarPreview();
      if (DOM.charCounter) {
        DOM.charCounter.textContent = "0 / 500";
        DOM.charCounter.className = "char-counter";
      }

      if (DOM.passwordStrengthBar) {
        DOM.passwordStrengthBar.style.width = "";
        DOM.passwordStrengthBar.className = "strength-bar";
      }
      if (DOM.passwordStrengthText) {
        DOM.passwordStrengthText.textContent = "";
        DOM.passwordStrengthText.className = "strength-text";
      }

      localStorage.removeItem("formulario_rascunho");
    }, 50);
  });

  if (DOM.btnsFecharModal) {
    DOM.btnsFecharModal.forEach((btn) => {
      btn.addEventListener("click", fecharModal);
    });
  }

  if (DOM.btnConfirmarEnvio) {
    DOM.btnConfirmarEnvio.addEventListener("click", () => {
      fecharModal();
      localStorage.removeItem("formulario_rascunho");
      mostrarSucessoFinal();
    });
  }

  if (DOM.btnNovoCadastro) {
    DOM.btnNovoCadastro.addEventListener("click", fecharSucessoEResetar);
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!DOM.modal.classList.contains("hidden")) {
        fecharModal();
      }
      if (!DOM.successContainer.classList.contains("hidden")) {
        fecharSucessoEResetar();
      }
    }
  });

  restaurarRascunho();
});

