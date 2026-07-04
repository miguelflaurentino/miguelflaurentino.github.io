export function calcularIdade(dataNascimentoString) {
  if (!dataNascimentoString) return 0;
  
  const hoje = new Date();
  const nascimento = new Date(dataNascimentoString);
  
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mesDiferenca = hoje.getMonth() - nascimento.getMonth();
  
  if (mesDiferenca < 0 || (mesDiferenca === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  
  return idade;
}

export function limparNaoNumericos(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/\D/g, '');
}

export function formatarTelefone(valorBruto) {
  if (!valorBruto) return "";
  
  const apenasNumeros = valorBruto.replace(/\D/g, "");
  
  const numerosValidos = apenasNumeros.slice(0, 11);
  
  const tamanho = numerosValidos.length;
  
  if (tamanho === 0) {
    return "";
  }
  if (tamanho <= 2) {
    return `(${numerosValidos}`;
  }
  if (tamanho <= 6) {
    return `(${numerosValidos.slice(0, 2)}) ${numerosValidos.slice(2)}`;
  }
  return `(${numerosValidos.slice(0, 2)}) ${numerosValidos.slice(2, 7)}-${numerosValidos.slice(7)}`;
}