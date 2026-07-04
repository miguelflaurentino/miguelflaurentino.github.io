# Portfólio e Atividades — Introdução à Programação Web

## Autor

Miguel Ferreira Laurentino

## Sobre o Projeto

Este projeto consiste na página principal e portfólio acadêmico de Miguel Laurentino, estudante do curso de Bacharelado em Sistemas de Informação no Instituto Federal de Alagoas (IFAL).

A página inicial funciona como um currículo interativo e apresentação pessoal do estudante, além de servir como central de publicação para todas as atividades práticas desenvolvidas ao longo da disciplina de **Introdução à Programação Web (INTWeb)**. Como a matéria ocorre de forma online e assíncrona, este projeto foi criado como requisito solicitado pelo professor para acompanhar a evolução contínua das resoluções, laboratórios e exercícios práticos durante todo o semestre.

## Tecnologias Utilizadas

O projeto foi construído utilizando as principais tecnologias da plataforma Web, aplicando boas práticas de acessibilidade, semântica, modularização e design responsivo:

- **HTML5**: Estruturação semântica de páginas, acessibilidade com atributos WAI-ARIA (`aria-label`, `aria-describedby`, `aria-live`), tabelas avançadas, formulários e elementos multimídia.
- **CSS3**: Design System próprio e modular, utilizando variáveis CSS customizadas (`root`), CSS Grid Layout para estruturas de página, Flexbox para alinhamento e paginação, além de tipografia fluida.
- **Design Responsivo & Modo Escuro**: Abordagem _Mobile-First_ adaptando os layouts e componentes via Media Queries, além de suporte automático ao modo claro/escuro através da media query `prefers-color-scheme`.
- **JavaScript (ES6+)**: Manipulação do DOM, tratamento de eventos, Constraint Validation API para formulários, leitura de arquivos com FileReader API, modularização com ES Modules e persistência local de dados com `localStorage`.
- **Git & GitHub Pages**: Controle de versão e hospedagem contínua do portfólio estático.

## Estrutura do Projeto

O repositório está organizado de forma modular, separando a base visual do portfólio das atividades específicas de cada capítulo do curso:

```text
miguelflaurentino.github.io/
├── assets/          # Imagens, fotos de perfil e capturas de tela dos projetos
├── css/             # Design System global (reset, variáveis, base, layout, componentes e utilitários)
├── cap04/           # Capítulo 4 — Tabelas, Listas e Mídia (Atividades 1 a 4)
├── cap05/           # Capítulo 5 — Formulários HTML (Atividades 1 a 5)
├── cap07/           # Capítulo 7 — Fundamentos do CSS (Atividades 1 a 5)
├── cap08-09/        # Capítulos 8 e 9 — Flexbox, CSS Grid e Projeto CSS Zen Garden
├── cap10/           # Capítulo 10 — Design Responsivo (Recriação do Google Classroom)
├── cap14/           # Capítulo 14 — Painel Acadêmico Interativo
├── cap15/           # Capítulo 15 — Validação de Formulários com HTML e JavaScript
├── index.html       # Página principal (currículo, apresentação e sumário de atividades)
└── README.md        # Documentação geral do projeto
```

## Como Visualizar

### Online

Basta acessar: <https://miguelflaurentino.github.io>

### Local

1. Clone o repositório em sua máquina local:

   ```bash
   git clone https://github.com/miguelflaurentino/miguelflaurentino.github.io.git
   ```

2. Abra o arquivo `index.html` diretamente em seu navegador web ou utilize um servidor estático local (como Live Server no VS Code, `npx serve` ou `python -m http.server`).
3. Navegue pelo sumário lateral ou pelos cartões da página inicial para acessar as atividades resolvidas de cada capítulo.

## Licença

Projeto educacional — Instituto Federal de Alagoas (IFAL) / Introdução à Programação Web (INTWeb).
