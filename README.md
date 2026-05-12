# Plataforma Interativa de Aulas - Tech Edu

Este projeto é uma plataforma web interativa desenvolvida com o objetivo de **ajudar professores a ministrarem aulas** de forma dinâmica, envolvente e altamente visual. A plataforma substitui slides e apresentações tradicionais por uma experiência rica, permitindo que educadores de tecnologia guiem os alunos através de conceitos complexos de forma imersiva e estruturada.

## 🎯 Objetivo

O propósito central desta ferramenta é fornecer suporte total ao professor durante a condução de aulas, oferecendo recursos educacionais que prendem a atenção e facilitam os "insights". Com a plataforma, o educador tem o poder de:

- **Adaptar a didática:** Utilizar recursos de "Analogias" criativas e "Aprofundamentos" teóricos para ajustar o momento da aula, seja para responder dúvidas pontuais ou expandir os conceitos.
- **Manter o engajamento:** A apresentação transita com suavidade entre designs diferenciados (layout padrão, formato de colunas, grids e painéis de código), fugindo da monotonia de um PDF comum.
- **Agilizar as demonstrações:** Trechos de código embutidos nos próprios slides, descartando a necessidade constante de trocar de tela para o editor durante momentos chaves de explicação.
- **Acessibilidade de Visualização:** Sistema integrado de zoom (via barra flutuante ou slider), sendo o auxiliar "salva-vidas" perfeito na hora de apresentar os conteúdos remotamente via videochamadas de equipe ou em projetores na sala presencial.

## 🚀 Tecnologias Utilizadas

A aplicação adota um stack moderno e robusto para o Front-end, focado em alta performance, fácil manutenção e flexibilidade nas animações da UI:

- **ReactJS:** A base tecnológica para a composição e gerenciamento de estado nos componentes da interface.
- **TypeScript:** O superset do JavaScript, trazendo maior segurança no desenvolvimento através da tipagem estática e interfaces, garantindo um código resiliente.
- **Tailwind CSS:** Motor de estilos focado em classes utilitárias. Ele possibilita a rápida criação de dezenas de transições atraentes, efeitos glassmorphism ("vidro fosco"), sombras imersivas e garantia de layout responsivo (usando grades CSS e Flexbox).
- **Vite:** Empacotador e servidor local (bundler), otimizando bruscamente os tempos de hot-reload e build otimizado para a produção.
- **Lucide React:** Uma suíte minimalista de ícones SVG adaptáveis, que complementam puramente o design em cada tópico da aula.

## 🛠 Funcionalidades da Interface

* **Painel de Aulas/Trilhas:** Navegação dedicada para iniciar os módulos disponíveis (Angular, React, Vue, Análise de Dados e Inteligência Artificial).
* **Sidebar Navegacional Hierárquica:** Para que o professor consiga pular ou revisitar tópicos, seguindo uma lógica modular fluida sem precisar voltar mil slides.
* **Telas Dinâmicas e Condicionais:** Seção para ilustrações e exibição de componentes. Os slides da trilha de 'Análise de Dados' exibem formas diversificadas automáticas (Formato Grid, Layout Distribuído em Colunas, e Formato Padrão) gerando frescor a cada passada de tela.
* **Componente Analógico Universal:** Seção oculta ativada interativamente pelo ícone "lâmpada", que apresenta imagens ricas mescladas com pontes conceituais fáceis para a turma entender (ex: O que é o React? analogia comparando componentes ao Lego).

## 🗂 Como rodar o projeto localmente

1. Certifique-se de que possui o Node.js instalado no seu computador.
2. Instale todas as dependências rodando no terminal raiz do projeto:
   ```bash
   npm install
   ```
3. Suba o servidor de testes/ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```
4. O terminal fornecerá o IP local. Acessando a porta respectiva (normalmente `localhost:3000` nestes ambientes customizados ou `localhost:5173`), a interface inicial será exibida livremente para uso.
