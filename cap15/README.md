# Projeto — Formulário de Inscrição de Alunos (Capítulo 15)

## Autor

Miguel Ferreira Laurentino

## Descrição

Formulário completo de inscrição para escola técnica com validação robusta (HTML5 nativa + JavaScript), experiência de usuário premium (máscaras, medidores, previews), persistência de rascunho em LocalStorage e fluxo de confirmação com modal e animação de sucesso. Desenvolvido como atividade prática do Capítulo 15 de Introdução à Programação Web.

## Tecnologias Utilizadas

- HTML5 (Estrutura semântica, acessibilidade WAI-ARIA, validação nativa)
- CSS3 (Design System com variáveis CSS, CSS Grid responsivo, Flexbox, animações CSS)
- JavaScript ES6 Modules (Arquitetura modular, funções puras, Constraint Validation API, FileReader API, localStorage)

## Estratégia de Desenvolvimento

O projeto foi desenvolvido seguindo uma arquitetura modular em camadas:

1. **HTML Semântico**: Formulário estruturado em 3 `<fieldset>` (Dados Pessoais, Preferências Acadêmicas, Segurança e Outros) com acessibilidade completa via `aria-describedby`, `aria-live` e `aria-required`.

2. **CSS Mobile-First**: Layout em CSS Grid (1 coluna mobile → 2 colunas desktop ≥ 768px), herdando o Design System global do portfólio (cores, tipografia, modo escuro automático). Estados visuais de validação implementados via classes `.valido` e `.invalido`.

3. **JavaScript Modular (ES Modules)**:
   - `util.js`: Helpers puros (`calcularIdade`, `limparNaoNumericos`, `formatarTelefone`)
   - `validacoes.js`: 12 funções puras de validação retornando `{valido, mensagem}`
   - `app.js`: Controlador principal orquestrando DOM, eventos, UX e persistência

## Recursos Implementados

### Validação
- Validação nativa HTML5 (`required`, `pattern`, `minlength`, `maxlength`, `accept`) como primeira barreira
- Validação JavaScript em tempo real (`input`/`change`) com feedback visual imediato
- Validação em lote no envio com foco automático no primeiro erro
- 12 regras de negócio: nome, e-mail, telefone `(82) 99999-9999`, idade ≥ 16, curso, turno, interesses (mín. 2), senha (8 chars, maiúscula, número), confirmação, mensagem (50-500 chars), foto (JPG/PNG ≤ 2MB), termos

### UX/UI Premium
- **Máscara de telefone dinâmica** com preservação de cursor
- **Medidor de força da senha** (barra visual + texto, 5 critérios)
- **Preview de foto** via FileReader com validação prévia e botão remover
- **Contador de caracteres** com estados visuais (insuficiente/alerta/excedido)

### Features Avançadas
- **Persistência LocalStorage**: Auto-save do rascunho (exceto senhas/arquivo) com restauração no carregamento
- **Toggle de visibilidade da senha** (ícones Material Symbols `visibility`/`visibility_off`)
- **Modal de confirmação** com resumo estruturado dos dados antes do envio
- **Animação de sucesso** com checkmark SVG animado (`stroke-dashoffset`, `scale`)

## Acessibilidade

- `aria-describedby` + `aria-live="polite"` nas mensagens de erro
- `aria-required="true"` em campos obrigatórios
- `aria-label` em botões de ação (toggle, fechar modal)
- Navegação por teclado (`Tab`, `Enter`, `Esc`)
- Focus visível com outline personalizado
- Contraste WCAG

## Design System

Herança dos estilos globais do portfólio:
- `reset.css`, `variables.css`, `base.css`, `layout.css`, `components.css`, `utilities.css`
- Variáveis locais para estados de validação e componentes específicos

## Breakpoints

- **Mobile First** (≤ 767px): 1 coluna, botões full-width
- **Desktop** (≥ 768px): Grid 2 colunas nos fieldsets

## Como Executar

1. Clone o repositório
2. Sirva a pasta raiz com servidor estático (`npx serve`, `python -miguelflaurentino.github.io`, VS Code Live Server)
3. Acesse `cap15/index.html`

## Licença

Projeto educacional — IFAL / INTWeb / Capítulo 15