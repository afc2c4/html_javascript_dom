import React, { useState, useEffect } from 'react';
import {
  Network, Settings2, Search, FileEdit, Palette, ShieldCheck, PlaySquare, Globe, Fingerprint, CheckCircle2,
  ChevronLeft, ChevronRight, Zap, MousePointer2, Keyboard, Loader2, Clock, Ear, ArrowUpCircle, Sun, Moon,
  ZoomIn, ZoomOut, Lightbulb, X
} from 'lucide-react';

type AnalogyData = { items: string[]; images: string[] };
const analogies: Record<string, AnalogyData> = {
  "01": {
    items: [
      "O DOM é como a planta baixa arquitetônica de uma casa.",
      "A casa física é a página que você vê e interage.",
      "Mas o DOM é o documento estruturado (a planta) que diz exatamente onde fica cada parede (elemento HTML)."
    ],
    images: ["https://image.pollinations.ai/prompt/architectural%20blueprint%20of%20a%20modern%20house%20web%20design?width=600&height=400&nologo=true"]
  },
  "02": {
    items: [
      "A API do DOM é como se fosse o controle remoto universal dessa casa.",
      "Uma vez que você tem a planta (DOM), a API permite que você use este controle (métodos JS).",
      "É com ele que você apaga luzes, move móveis ou quebra paredes dinamicamente."
    ],
    images: ["https://image.pollinations.ai/prompt/universal%20remote%20control%20glowing%20buttons%20smart%20home?width=600&height=400&nologo=true"]
  },
  "03": {
    items: [
      "Selecionar elementos é como usar um 'GPS' ou 'Lista Telefônica' visual.",
      "Você pode procurar exatamente a 'padaria' da rua principal (querySelector).",
      "Ou então selecionar magicamente todas as 'farmácias' da cidade (querySelectorAll) de uma só vez."
    ],
    images: ["https://image.pollinations.ai/prompt/gps%20navigation%20glowing%20pins%20on%20digital%20city%20map?width=600&height=400&nologo=true"]
  },
  "04": {
    items: [
      "Mudar o HTML é como trocar os quadros da parede em um piscar de olhos.",
      "A moldura (a div principal) continua ali presa no mesmo lugar da casa.",
      "Mas você retira a imagem velha do 'barco' e coloca a foto nova de uma 'paisagem' instantaneamente (innerHTML)."
    ],
    images: ["https://image.pollinations.ai/prompt/changing%20picture%20frames%20on%20a%20modern%20wall%20art%20gallery?width=600&height=400&nologo=true"]
  },
  "05": {
    items: [
      "Mudar o CSS é como chamar um pintor e um decorador mágicos para a casa após ela estar pronta.",
      "A velha estrutura das paredes continua fixamente no lugar original.",
      "Mas num estalar de dedos você pinta a parede de vermelho e empurra o sofá 10 pixels para cima pela tela."
    ],
    images: ["https://image.pollinations.ai/prompt/magic%20paintbrush%20coloring%20modern%20living%20room?width=600&height=400&nologo=true"]
  },
  "06": {
    items: [
      "Validação de formulários é igual ao segurança rigoroso na porta de embarque de um aeroporto.",
      "Ele olha e checa a nossa identidade e a sua passagem com muito cuidado.",
      "Apenas se os dados estiverem preenchidos certinhos, ele deixa a gente caminhar em direção ao voo (servidor)."
    ],
    images: ["https://image.pollinations.ai/prompt/airport%20security%20gate%20neon%20digital%20check?width=600&height=400&nologo=true"]
  },
  "07": {
    items: [
      "Animações DOM são como desenhar pequenos bonecos passo a passo no canto de um caderno.",
      "Ao passar as páginas rápido com o dedão, a mágica visual acontece.",
      "Você muda a posição de uma caixa milímetro por milímetro, repete isso rápido até parecer um movimento super fluido."
    ],
    images: ["https://image.pollinations.ai/prompt/flipbook%20animation%20stick%20figure%20moving%20dynamic?width=600&height=400&nologo=true"]
  },
  "08": {
    items: [
      "O Document Reference é o 'Prefeito' central de toda a sua cidade.",
      "É a primeira pessoa suprema que você procura através do documento raiz.",
      "Isso vale se você quiser emitir uma ordem geral ou criar algo totalmente novinho dentro do município (a sua página)."
    ],
    images: ["https://image.pollinations.ai/prompt/mayor%20of%20a%20digital%20city%20blueprint%20hologram?width=600&height=400&nologo=true"]
  },
  "09": {
    items: [
      "O Element Reference foca num cidadão único, solitário e específico.",
      "Quando pegamos o ID (como se fosse o CPF dele), nós o isolamos.",
      "Assim, eu consigo focar os olhos nele e alterar sua roupa ou nome com absoluta precisão solitária no DOM."
    ],
    images: ["https://image.pollinations.ai/prompt/magnifying%20glass%20focusing%20on%20one%20specific%20glowing%20person%20in%20a%20crowd?width=600&height=400&nologo=true"]
  },
  "10": {
    items: [
      "Eventos no JavaScript são idênticos aos 'sensores de movimento' num alarme noturno.",
      "Eles ficam lá em silêncio absoluto apenas aguardando algo acontecer.",
      "Assim que você entra e passa pela porta (clica no botão), a sirene toca alto (a ação da sua função ocorre imediatamente)."
    ],
    images: ["https://image.pollinations.ai/prompt/motion%20sensor%20laser%20beams%20security%20system?width=600&height=400&nologo=true", "https://image.pollinations.ai/prompt/alarm%20siren%20flashing%20red%20light?width=600&height=400&nologo=true"]
  },
  "11": {
    items: [
      "Eventos de Mouse são os dedos virtuais e os lasers invisíveis da sua interface.",
      "Se o seu cursor apenas sobrevoar o espaço aéreo do elemento (hover)...",
      "Ou der pequenos tapas precisos (click), o elemento sente a sua mão deslizando na dimensão física da tela."
    ],
    images: ["https://image.pollinations.ai/prompt/glowing%20digital%20cursor%20clicking%20a%20futuristic%20button?width=600&height=400&nologo=true"]
  },
  "12": {
    items: [
      "Eventos de Teclado transformam seu site numa verdadeira máquina de datilografar viva.",
      "Cada clique profundo que o usuário dá em um botão do teclado emite um pulso elétrico.",
      "O site usa esses pulsos magnéticos para deduzir em tempo real o que o seu cérebro está tentando digitar."
    ],
    images: ["https://image.pollinations.ai/prompt/mechanical%20keyboard%20glowing%20keys%20typing%20matrix%20code?width=600&height=400&nologo=true"]
  },
  "13": {
    items: [
      "Eventos de tempo (Timers) equipam sua web app com cronômetros infalíveis.",
      "Pense neles como pequenas bombas-relógio para o bem.",
      "Pode disparar de uma só vez (setTimeout) ou ficar bipando para sempre em um loop infinito regular (setInterval)."
    ],
    images: ["https://image.pollinations.ai/prompt/digital%20stopwatch%20countdown%20timer%20neon?width=600&height=400&nologo=true"]
  },
  "14": {
    items: [
      "O Evento de Load é semelhante à hora mágica da abertura de cortinas no teatro clássico.",
      "É o momento em que se tem a garantia máxima de que tudo carregou.",
      "A mensagem é: 'Acabou a preparação. Agora as cadeiras, os atores e os cenários estão finalmente montados e na posição!'."
    ],
    images: ["https://image.pollinations.ai/prompt/theater%20classic%20red%20curtains%20opening%20stage%20lights?width=600&height=400&nologo=true"]
  },
  "15": {
    items: [
      "O addEventListener é como instalar dezenas de pequenos 'espiões de rádio' ao longo da sua grande vila.",
      "Você amarra espiões diferentes no mesmo mastro.",
      "Ao invés de um susbstituir a voz do outro, todos gritam e avisam a equipe na hora certa de forma pacífica."
    ],
    images: ["https://image.pollinations.ai/prompt/tiny%20radio%20spies%20listening%20satellites%20city?width=600&height=400&nologo=true"]
  },
  "16": {
    items: [
      "Propagation (Bubbling) age exatamente como jogar uma pedra no meio de um lago sereno.",
      "A pequena onda atinge o meio, depois espirra, afeta os peixes, balança os barcos maiores e só vai parar lá na orla.",
      "Use stopPropagation se você quiser invocar domadores para segurar essa onda no começo antes dela crescer."
    ],
    images: ["https://image.pollinations.ai/prompt/water%20ripple%20effect%20lake%20stone%20dropped?width=600&height=400&nologo=true"]
  },
  "17": {
    items: [
      "O AJAX chega e entra em campo como a revolução da comunicação telegráfica invisível.",
      "Ao invés do pobre do navegador congelar com a famosa e irritante 'tela branca' do reload total...",
      "Todo o chato carregamento passa a acontecer debaixo dos panos, sem você nem mesmo perceber o esforço."
    ],
    images: ["https://image.pollinations.ai/prompt/invisible%20digital%20telegraph%20sending%20data%20streams?width=600&height=400&nologo=true"]
  },
  "18": {
    items: [
      "Antes de nascer o AJAX, para trocar de TV nova você precisava implodir a casa toda (o reload).",
      "E ter que contruir a mesma casa de novo em volta da TV.",
      "Com AJAX, robôs cirúrgicos construtores de casa chegam pelas portas dos fundos com a nova TV nos braços e a deixam lá pra você, sem fazer bagunça."
    ],
    images: ["https://image.pollinations.ai/prompt/surgical%20robots%20installing%20a%20tv%20in%20a%20living%20room%20gently?width=600&height=400&nologo=true"]
  },
  "19": {
    items: [
      "Apesar da revolução, AJAX não caiu do céu nem é puramente mágico.",
      "Ele se resume a pegar as ótimas e consolidadas tecnologias que a web já tinha rodando nas entranhas (HTML, XML e o JavaScript)...",
      "Colocá-las numa mochila, e agora elas trabalham como uma equipe letal e Assíncrona."
    ],
    images: ["https://image.pollinations.ai/prompt/backpack%20full%20of%20glowing%20tech%20gadgets%20teamwork?width=600&height=400&nologo=true"]
  },
  "20": {
    items: [
      "A melhoria imensa da Experiência de Usuário com o uso intenso do AJAX...",
      "Remete diretamente ao salto brutal que demos dos Correios tradicionais e muito lentos (onde um papel físico viajava por 7 dias úteis).",
      "E fomos catapultados para o surreal imediatismo da velocidade da luz nos SMS e mensagens de chat digital."
    ],
    images: ["https://image.pollinations.ai/prompt/old%20mail%20letter%20transforming%20into%20a%20glowing%20digital%20sms%20message?width=600&height=400&nologo=true"]
  },
  "21": {
    items: [
      "No âmago de tudo, temos os PILARES onde o seu código JavaScript é o ator protagonista.",
      "O seu JavaScript encarna o implacável General do grande exército.",
      "Ele usa o rádio XHR, pede o auxílio de dados e o pobre HTML só tem que ficar estático na base aguardando receber essa novidade em mãos."
    ],
    images: ["https://image.pollinations.ai/prompt/military%20general%20using%20a%20radio%20with%20digital%20soldiers?width=600&height=400&nologo=true"]
  },
  "22": {
    items: [
      "Falando no fluxo vivo e na FUNCIONALIDADE diária desse processo.",
      "É equivalente a você ir confortavelmente se sentar num banco de restaurante de Fast Food com o seu carro...",
      "Gritar sua comida pelo alto-falante da janela e logo receber ali mesmo tudo quente e intacto sem ter saído nunca do conforto do seu assento."
    ],
    images: ["https://image.pollinations.ai/prompt/futuristic%20drive-through%20fast%20food%20glowing%20holograms?width=600&height=400&nologo=true"]
  },
  "23": {
    items: [
      "Ao acompanhar de perto esse funil silencioso (o FLUXO), só se pode comemorar o sucesso perante as grandes flags HTTP.",
      "Temos a flag do garçom gritando 'readyState=4', que é sua confirmação visual de que a cozinha finalmente preparou a bandeja completa.",
      "E temos a grandiosa flag 'status=200', atestando ao cliente exigente de que o sanduíche não foi queimado durante a entrega final."
    ],
    images: ["https://image.pollinations.ai/prompt/chef%20in%20a%20kitchen%20holding%20a%20glowing%20green%20number%20200%20sign?width=600&height=400&nologo=true"]
  },
  "24": {
    items: [
      "Com a enorme e flexível Versatilidade de Formatos, nasceu JSON, o mais novo e leve queridinho da rede web.",
      "JSON é simplesmente puro inglês fluido em um mundo arcaico muito burocrático (o antigo modelo gordo e pesadão do XML feito de aberturas de dezenas e dezenas de marcações pesadas).",
      "Objetos limpos reinam como leves e compactas caixinhas de madeira pura viajando pelo mar rumo ao cliente a mil por hora."
    ],
    images: ["https://image.pollinations.ai/prompt/lightweight%20glowing%20cubes%20traveling%20fast%20on%20a%20digital%20highway?width=600&height=400&nologo=true"]
  },
  "25": {
    items: [
      "Em relação à cruel Comparação da velocidade assustadora dessa técnica...",
      "Com o síncrono mundo das requisições tradicionais perdíamos todo um latente balde de elementos gráficos só por ter apertado um simples Enviar.",
      "O super AJAX é feito de intensa inteligência artificial de recursos: ele economiza 99% da sua paciência para atualizar cirurgicamente aquele último milímetro do formulário."
    ],
    images: ["https://image.pollinations.ai/prompt/speedometer%20breaking%20the%20limit%20glowing%20neon%20blue%20vs%20red?width=600&height=400&nologo=true"]
  },
  "26": {
    items: [
      "O forte real e principal Impacto na Escalabilidade massiva de um projeto de backend gigante.",
      "Nós poupamos gigabytes e mais gigabytes de peso absurdamente pesados ao final do mês nos servidores AWS ou Google Cloud.",
      "Ao invés de despachar a super pesada tela HTML completa com banners todo minuto, os poderosos servidores trocam inofensivos e discretos pequenos grãos de poeira numéricos com o navegador via rede."
    ],
    images: ["https://image.pollinations.ai/prompt/huge%20server%20room%20glowing%20blue%20efficient%20data%20streams?width=600&height=400&nologo=true"]
  },
  "27": {
    items: [
      "Onde é que de fato o mundo real e corporativo testou a robustez assíncrona nesses Casos Globais?",
      "Um dos pioneiros foi logicamente e genialmente o puro Google Auto-complete no topo do site central, onde a cada micro dedilhada na tecla algo deduzia centenas de resultados velozes...",
      "E claro, no colosso do e-mail em nuvem Google GMAIL, que sorriu ocultando sob sua interface mágica de e-mails centenas e centenas de transações e fetchs diários enquanto a tela da mensagem permanecia quietinha no centro de tudo."
    ],
    images: ["https://image.pollinations.ai/prompt/search%20bar%20hologram%20glowing%20autocomplete%20words?width=600&height=400&nologo=true"]
  },
  "28": {
    items: [
      "Sem exagero algum neste dramático Fechamento e forte Transição para Arquitetura Front-end corporativa atual...",
      "A revolução do AJAX pavimenta com tijolos sólidos o real motivo das consagradas Single Page Apps (Aplicações SPA) dominarem ininterruptamente no mercado nos dias modernos de programação diária.",
      "O hábil desenvolvedor sênior sentou-se na poltrona master sabendo que poderia criar completas e incrivelmente poderosas experiências fluidas de alta intensidade rodando inteiramente baseadas nessa tecnologia madura."
    ],
    images: ["https://image.pollinations.ai/prompt/developer%20sitting%20in%20a%20master%20chair%20orchestrating%20floating%20screens?width=600&height=400&nologo=true"]
  }
};

const detailedTopics = [
  {
    id: "01", label: "CONCEITO", title: "HTML DOM (Document Object Model)", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: Network,
    description: "O DOM do HTML é um padrão oficial do W3C. Ele define o modelo estrutural do HTML como uma árvore de objetos. Através do DOM, o JavaScript adquire todo o poder necessário para criar documentos HTML fluidos e dinâmicos.",
    points: [
      "Atua como uma ponte entre a página e a linguagem de programação.",
      "Cada tag HTML é convertida em um 'Nó' (Node) na árvore hierárquica.",
      "A espinha dorsal dita: o HTML como objetos, propriedades e eventos globais."
    ],
    details: ["Document (Raiz)", "Element Node (Tags)", "Attribute Node", "Text Node"],
    code: "/* Com o DOM, o JavaScript realiza magias: */\n\n- Alterar todos os elemento da página\n- Mudar todos os atributos das tags\n- Modificar estilos CSS instantaneamente\n- Reagir a Eventos de forma veloz"
  },
  {
    id: "02", label: "INTERFACE", title: "HTML DOM API", colorText: "text-purple-500", colorDot: "bg-purple-500", icon: Settings2,
    description: "A API do DOM é a Interface nativa de Programação para o HTML. Ela provê Métodos (ações) e Propriedades (valores), funcionando como uma ponte de comunicação direta.",
    points: [
      "Método ex: 'getElementById()' (uma ação no Browser).",
      "Propriedade ex: 'innerHTML' (um dado que você pode extrair).",
      "Interface de Eventos como clássicos 'onclick'."
    ],
    details: ["Métodos (Ações)", "Propriedades (Valores)", "Lidar com Eventos", "Navegação Estrutural"],
    code: "// .getElementById é um MÉTODO\n// .innerHTML é uma PROPRIEDADE\n\ndocument.getElementById(\"demo\").innerHTML = \"Hello\";\n\nlet nodeName = meuElemento.nodeName;"
  },
  {
    id: "03", label: "QUERIES VIVAS", title: "Selecting Elements", colorText: "text-cyan-500", colorDot: "bg-cyan-500", icon: Search,
    description: "Para manipular o DOM, você deve antes encontrar as raízes visuais da aba. O navegador nos fornece seletores avançados para localizar instâncias exatas de tags na memória.",
    points: [
      "Buscando únicos: document.getElementById('id_alvo')",
      "Capturando múltiplos nós: document.querySelectorAll()",
      "Iterando por Coleções: document.forms e links"
    ],
    details: ["getElementById()", "getElementsByClassName()", "querySelectorAll()"],
    code: "// Seleciona único por ID (Rápido)\nconst mainSection = document.getElementById(\"intro\");\n\n// Seleciona um grupo de Tags 'p' via CSS Class\nconst pl = document.querySelectorAll(\"p.descricao\");"
  },
  {
    id: "04", label: "CONTEÚDO", title: "Changing HTML", colorText: "text-green-500", colorDot: "bg-green-500", icon: FileEdit,
    description: "Com o Nó em mãos, o HTML é seu alvo de mudanças. O JS troca conteúdos brutos e injeta nós na engrenagem viva atualizando a interface sem recarregar a tela.",
    points: [
      "innerHTML clona e substitui as árvores de Nodes filhas.",
      "Alterações de atributos vitais com '.setAttribute()'.",
      "Entenda 'document.createElement' para montagens robustas."
    ],
    details: [".innerHTML", "element.attribute", "document.write()", "setAttribute()"],
    code: "// Injetando e clonando texto via DOM API\nconst b = document.getElementById(\"msg\");\nb.innerHTML = \"Olá <b>Usuário</b>!\";\n\n// Mudando os atributos (Src de imagem)\ndocument.getElementById(\"avatar\").src = \"a.jpg\";"
  },
  {
    id: "05", label: "ESTILO & CSSOM", title: "Changing CSS", colorText: "text-pink-500", colorDot: "bg-pink-500", icon: Palette,
    description: "Cada elemento lido pelo DOM contém o objeto '.style', onde as regras do motor CSS entram em ação. A sintaxe dash do CSS troca para CamelCase em JS.",
    points: [
      "Injeção Inline: 'elemento.style.propriedade = valor;'.",
      "CamelCase JS: 'background-color' vira 'backgroundColor'.",
      "Uso de 'classList' para gerenciar toggles profissionais."
    ],
    details: [".style.property", "backgroundColor", ".classList.toggle()", "fontFamily"],
    code: "const painel = document.getElementById(\"aviso\");\npainel.style.backgroundColor = \"tomato\";\n\n// Padrão Ouro: Desligar/Ligar via classe do CSS\nbotao.onclick = function() {\n  container.classList.toggle(\"dark-mode\");\n}"
  },
  {
    id: "06", label: "SEGURANÇA", title: "Form Validation", colorText: "text-yellow-500", colorDot: "bg-yellow-500", icon: ShieldCheck,
    description: "A grande magia de poupar rede recai nos Forms. O JavaScript e a API Constraints inspecionam as regras (Required, URL) antes de liberar envios HTTP.",
    points: [
      "APIs essenciais de validade: checkValidity().",
      "Interceptar o Evento extraindo seu '.value'.",
      "Use 'e.preventDefault()' se a validação falhar."
    ],
    details: ["checkValidity()", ".value", "validationMessage", "Range Constraints"],
    code: "function validarCadastro() {\n  let x = document.forms[\"frm\"][\"nome\"].value;\n  if (x == \"\") {\n    alert(\"Atenção!\");\n    return false;\n  }\n}"
  },
  {
    id: "07", label: "FPS E MOTION", title: "DOM Animations", colorText: "text-indigo-400", colorDot: "bg-indigo-400", icon: PlaySquare,
    description: "Anime a interface manipulando Top/Left para dar vida. A API Web possui atalhos matemáticos ligados à taxa de atualização do monitor.",
    points: [
      "Requer Base CSS position 'absolute' ou 'relative'.",
      "Animações limpidas com 'requestAnimationFrame()'.",
      "Aceleração eficiente por GPU usando TransformX."
    ],
    details: ["requestAnimationFrame()", "setInterval()", "position absoluto"],
    code: "function animar() {\n  let c = document.getElementById(\"caixa\");\n  let e = 0;\n  setInterval(() => {\n    if(e == 200) return;\n    e++;\n    c.style.left = e + \"px\";\n  }, 10);\n}"
  },
  {
    id: "08", label: "NAVEGADOR", title: "Document Reference", colorText: "text-red-400", colorDot: "bg-red-400", icon: Globe,
    description: "O super objeto global 'document' carrega metadados fundamentais (Cookies, URLs e Títulos) daquela instância de aba isolada no desktop.",
    points: [
      "Document.title troca a assinatura na guia da página.",
      "Manipula strings seguras lendo 'document.cookie'.",
      "Atalhos práticos do W3C como document.body."
    ],
    details: ["document.anchors", "document.cookie", "document.domain", "document.documentURI"],
    code: "// Modificar Aba Instantaneamente\ndocument.title = \"(3) Mensagens!\";\n\n// Leitura dos cookies\nlet cookiesString = document.cookie;"
  },
  {
    id: "09", label: "PERFIL DO NÓ", title: "Element Reference", colorText: "text-emerald-400", colorDot: "bg-emerald-400", icon: Fingerprint,
    description: "Invocando referências profundas sobre 'Este Elemento'. Ele desvenda as dimensões reais renderizadas e como flui a herança paterna da DOM Tree.",
    points: [
      "Navegando entre familiares: 'parentNode', 'children'.",
      "Medições exclusivas da placa visual 'clientWidth'.",
      "Extração ágil de NodeTypes da biblioteca visual."
    ],
    details: ["getBoundingClientRect()", "parentNode", "children", "nodeName"],
    code: "const divMaior = itemLista.parentNode;\n\n// Lendo espaço físico no Browser (bounding-box)\nconst w_px = itemLista.getBoundingClientRect().width;\n\n// Que Node É Este?\nlet r = mainTag.nodeName;"
  },
  {
    id: "10", label: "INTRO EVENTS", title: "JS Events", colorText: "text-orange-500", colorDot: "bg-orange-500", icon: Zap,
    description: "Trata-se da maneira como o JavaScript 'ouve' o que acontece. Ações como clique, digitação e movimento disparam sinais em frações de segundo.",
    points: [
      "Eventos reagem à vida do documento web.",
      "O navegador os dispara de acordo com ações físicas.",
      "O JS registra 'Escutadores' para reagir via Funções."
    ],
    details: ["HTML Events", "DOM Event Object", "Event Handlers"],
    code: "// Invocação na raiz HTML (Legado)\n<button onclick=\"func()\">Click</button>\n\n// Moderno / DOM Nível 0\nuserBtn.onclick = function() {\n  exibirMenu();\n};"
  },
  {
    id: "11", label: "MOUSE", title: "Mouse Events", colorText: "text-rose-500", colorDot: "bg-rose-500", icon: MousePointer2,
    description: "Vão desde os clássicos cliques (click) a monitoramento sub-pixel (mousemove) do ponteiro atravessando o canvas HTML e gerando tooltips fluidas.",
    points: [
      "Click e dblclick para confirmações eficientes.",
      "MouseEnter/Leave para transições hover lógicas.",
      "Mousemove captura ClientX e ClientY no grid visual."
    ],
    details: ["click", "mouseenter", "mouseleave", "mousemove"],
    code: "caixa.onmouseenter = function() {\\n  caixa.style.opacity = '1';\\n}\\n\\ndocument.onmousemove = function(e){\\n  console.log('X:', e.clientX, 'Y:', e.clientY);\\n};"
  },
  {
    id: "12", label: "TECLADO", title: "Keyboard Events", colorText: "text-amber-500", colorDot: "bg-amber-500", icon: Keyboard,
    description: "Responsável pelo rastreamento das digitações, leitura de atalhos em tempo real e jogos. Através dele nós identificamos códigos seriais das teclas.",
    points: [
      "keydown: Dispara quando a tecla aperta.",
      "Extrai chaves vitais da matriz via 'e.key' / 'e.code'.",
      "Impede envios duplos forçando preventDefault."
    ],
    details: ["keydown", "keyup", "Event Property", "e.key"],
    code: "searchBox.addEventListener('keydown', (ev) => {\n  if (ev.key === 'Enter') {\n    fetchQuery(this.value);\n  }\n  if (/\\d/.test(ev.key)) {\n    ev.preventDefault(); // Nega nros\n  }\n});"
  },
  {
    id: "13", label: "CRONOMETRIA", title: "Timing Events", colorText: "text-violet-500", colorDot: "bg-violet-500", icon: Clock,
    description: "A linguagem provê manipuladores de relógio engatilhados pela Global API e repetições perpétuas usando a matemática de milissegundos local.",
    points: [
      "setTimeout: O atraso unitário seguro de futuro.",
      "setInterval: O loop autoinvocado de contagem.",
      "Fundamental expurgar com clearTimeout na UI virtual."
    ],
    details: ["setTimeout", "setInterval", "clearTimeout"],
    code: "let t = setTimeout(() => {\n  modalAlert('Você inativo 5min!');\n}, 30000);\n\n// Caso o usuário confirme presença antes:\nclearTimeout(t);"
  },
  {
    id: "14", label: "LOAD EVENT", title: "Load Events", colorText: "text-sky-500", colorDot: "bg-sky-500", icon: Loader2,
    description: "Você não deve acionar interações no DOM antes que suas árvores e imagens de base desçam pelo cano da Rede e entrem de fato na memória alocada do Render.",
    points: [
      "window.onload = Confirma mídia visual bruta.",
      "DOMContentLoaded = Árvore primária de tags liberada.",
      "Eventos cruciais na desmontagem unload e beforeunload."
    ],
    details: ["onload", "DOMContentLoaded", "onbeforeunload"],
    code: "// Disparando rápido sem imagens\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log('DOM Montado!');\n});\n\n// Disparando lento com imagens\nwindow.onload = () => console.log('Pronto');"
  },
  {
    id: "15", label: "LISTENERS", title: "addEventListener", colorText: "text-fuchsia-500", colorDot: "bg-fuchsia-500", icon: Ear,
    description: "Adicionar 'Ouvintes' via JavaScript puro permite empilhar dezenas de gatilhos na mesma ação. É a filosofia canônica moderna da Separation of Concerns.",
    points: [
      "O listener oficial 'element.addEventListener'.",
      "Separação drástica de HTML em relação à lógica.",
      "Aceita remoção elegante com 'removeEventListener'."
    ],
    details: ["addEventListener", "removeEventListener", "Event Handler"],
    code: "const btn = document.getElementById('save');\n\nfunction startAnim() { ... }\nfunction sendData() { ... }\n\n// Acoplando camadas juntas\nbtn.addEventListener('click', startAnim);\nbtn.addEventListener('click', sendData);"
  },
  {
    id: "16", label: "PROPAGAÇÃO", title: "Manage Bubbling", colorText: "text-teal-500", colorDot: "bg-teal-500", icon: ArrowUpCircle,
    description: "Se uma janela tem um botão, como controlar um clique quando cai em ambos? Bubbling espalha a onda desse clique hierarquia HTML acima na Tree de modo assíncrono.",
    points: [
      "Bubbling Default: Criança recebe, espalha pros Pais.",
      "Capturing Inv: De fora desce perfurando pro centro.",
      "e.stopPropagation(): Método salva as sub-camadas de loops."
    ],
    details: ["Bubbling", "Capturing", "stopPropagation()"],
    code: "// 3º arg: false(Bubble), true(Capture)\nboxPai.addEventListener('click', () => {}, false);\n\nbtnFilho.addEventListener('click', (ev) => {\n  ev.stopPropagation(); // Trava!\n  console.log('So no filho!');\n}, false);"
  },
  {
    id: "17", label: "AJAX", title: "Capa e Visão Geral", colorText: "text-blue-400", colorDot: "bg-blue-400", icon: Globe,
    description: "Visão Geral do AJAX (Asynchronous JavaScript and XML). Revolução na forma como construímos aplicações web rápidas e dinâmicas.",
    points: [
      "Atualiza uma página web sem precisar recarregá-la.",
      "Solicita e recebe dados de um servidor em background.",
      "A base das aplicações Single Page (SPA) modernas."
    ],
    details: ["Apresentação", "Introdução", "Visão Geral"],
    code: "// AJAX não é uma linguagem de programação.\n// É uma técnica para acessar servidores.\nconsole.log('AJAX Iniciado!');"
  },
  {
    id: "18", label: "CONCEITO", title: "Compreendendo o Conceito", colorText: "text-indigo-400", colorDot: "bg-indigo-400", icon: Network,
    description: "A transição de páginas estáticas para interfaces fluidas. AJAX quebra o paradigma de 'clicar e esperar'.",
    points: [
      "Antes do AJAX: Toda ação exigia uma página inteira nova.",
      "Com AJAX: Apenas pequenos pedaços trafegam pela rede.",
      "Permite interatividade em tempo real e interfaces ricas."
    ],
    details: ["Evolução Web", "Paradigma", "Asincronicidade"],
    code: "// Exemplo de Transição Visual\nUI.showLoading();\nfetchData().then(() => UI.hideLoading());"
  },
  {
    id: "19", label: "DEFINIÇÃO", title: "O que é AJAX?", colorText: "text-purple-400", colorDot: "bg-purple-400", icon: FileEdit,
    description: "AJAX é um acrônimo e a combinação de tecnologias existentes trabalhando em conjunto (JS + API).",
    points: [
      "A = Asynchronous (Assíncrono): A página não trava.",
      "J = JavaScript: O motor que faz a requisição.",
      "X = XML: O formato original (JSON é o atual)."
    ],
    details: ["Técnica", "Acrônimo", "Combinação"],
    code: "// Asynchronous JavaScript And XML\n// Usa o objeto XMLHttpRequest do navegador."
  },
  {
    id: "20", label: "BENEFÍCIOS", title: "Principais Benefícios", colorText: "text-emerald-400", colorDot: "bg-emerald-400", icon: Zap,
    description: "Atualizações parciais sem recarregamento (reload) trazem um salto gigantesco na UX (User Experience).",
    points: [
      "Atualização em Background sem piscar a tela.",
      "Economia de Banda e velocidade na troca de dados.",
      "Separação clara entre Dados e Interface (Cliente)."
    ],
    details: ["Sem Reload", "UX Superior", "Separação"],
    code: "button.onclick = function() {\n  // Apenas a div de preço é atualizada!\n  atualizarPrecoAsync();\n};"
  },
  {
    id: "21", label: "PILARES", title: "Os Pilares do AJAX", colorText: "text-yellow-400", colorDot: "bg-yellow-400", icon: ShieldCheck,
    description: "As tecnologias built-in no navegador que tornam o AJAX possível. Baseia-se em Web Standards puros.",
    points: [
      "1. O objeto XMLHttpRequest (XHR) ou a API Fetch.",
      "2. JavaScript, a cola lógica que engatilha tudo.",
      "3. O HTML DOM, modificado visualmente no fim."
    ],
    details: ["XHR / Fetch", "JavaScript", "HTML DOM"],
    code: "const xhttp = new XMLHttpRequest();\nxhttp.onload = function() {\n  div.innerHTML = this.responseText;\n}"
  },
  {
    id: "22", label: "FUNCIONALIDADE", title: "Como Funciona", colorText: "text-orange-400", colorDot: "bg-orange-400", icon: Settings2,
    description: "Comunicação via protocolo HTTP. Navegador cria a requisição, servidor processa e devolve os dados.",
    points: [
      "O evento ocorre (ex: um botão de 'Ler Mais' clicado).",
      "XMLHttpRequest é criado pelo JavaScript na memória.",
      "XHR envia uma requisição silenciosa ao servidor."
    ],
    details: ["Client / Server", "Network", "HTTP"],
    code: "xhttp.open('GET', 'ajax_info.txt', true);\nxhttp.send();\n// O 'true' garante que é Assíncrono!"
  },
  {
    id: "23", label: "FLUXO", title: "Fluxo de Execução", colorText: "text-red-400", colorDot: "bg-red-400", icon: PlaySquare,
    description: "Uma linha do tempo de como os dados são despachados, recebidos e renderizados na DOM API visual.",
    points: [
      "1. Navegador envia HTTP Request -> Servidor.",
      "2. Servidor processa o arquivo e retorna Response.",
      "3. JS processa o Response texto e atualiza o DOM."
    ],
    details: ["Timeline", "Request", "Response", "DOM"],
    code: "xhttp.onreadystatechange = function() {\n  if (this.readyState == 4 && this.status == 200) {\n     // Fim do Fluxo: Atualizar Tela!\n  }\n};"
  },
  {
    id: "24", label: "FORMATOS", title: "Versatilidade (JSON)", colorText: "text-cyan-400", colorDot: "bg-cyan-400", icon: FileEdit,
    description: "Apesar do 'X' significar XML, o AJAX é inteligente o suficiente para trafegar múltiplos conteúdos hoje em dia.",
    points: [
      "Substituição de XML por JSON (Object Notation).",
      "Recebe e lê Texto Puro (Plain Text) das requisições.",
      "Transporta Streams e Blobs para uploads pesados."
    ],
    details: ["JSON", "XML", "Text", "Blob"],
    code: "// Lendo JSON com Fetch API (Modern)\nfetch('dados.json')\n  .then(r => r.json())\n  .then(d => render(d));"
  },
  {
    id: "25", label: "COMPARAÇÃO", title: "AJAX vs Tradicional", colorText: "text-rose-400", colorDot: "bg-rose-400", icon: Search,
    description: "O fluxo inteligente assíncrono vs modelo antiquado síncrono da Web 1.0 onde cada clique custava uma aba inteira nova.",
    points: [
      "Tradicional: Form Submit -> Tela Branca -> Página.",
      "AJAX: Interação -> Loader -> Modifica 1 Quadrado.",
      "AJAX evita reflow bruto de CSS re-processado do zero."
    ],
    details: ["Síncrono", "Assíncrono", "Eficiência"],
    code: "// Tradicional: \n<form action='/send'>...</form>\n\n// AJAX:\nform.onsubmit = (e) => { e.preventDefault(); postAjax(); }"
  },
  {
    id: "26", label: "PERFORMANCE", title: "Impacto e Escalabilidade", colorText: "text-green-500", colorDot: "bg-green-500", icon: ArrowUpCircle,
    description: "Redução drástica do tamanho dos bytes gastos pelas requests (payload). Imprescindível para alta escala em servidores.",
    points: [
      "Menos bytes, pois apenas dados puros trafegam em HTTP.",
      "Economia do CSS/JS global ser recarregado na rede.",
      "Excelente para autocomplete (onde a div muda sozinha)."
    ],
    details: ["Baixa Latência", "Min. Bytes", "UX Boost"],
    code: "/* Custo Performance: \n   Request HTML + Imgs = 2.5 MB\n   Request AJAX JSON   = 5 KB\n*/"
  },
  {
    id: "27", label: "CASOS", title: "Exemplos Reais (W3)", colorText: "text-amber-400", colorDot: "bg-amber-400", icon: Globe,
    description: "A popularização técnica se deve pelo sucesso maciço no ecossistema gigante, que ensinou que UX dinâmica salva tempo.",
    points: [
      "Google Autocomplete: Carrega sem dar refresh da guia.",
      "Google Maps: Pan/Zoom sem interromper navegação.",
      "Gmail: Atualiza o lado esquerdo de forma invisível."
    ],
    details: ["Maps", "Gmail", "Auto-Complete"],
    code: "// Simulando Gmail Background Check:\nsetInterval(() => {\n  checkNewEmailsAjax();\n}, 15000);"
  },
  {
    id: "28", label: "QA & FIM", title: "Conclusão e Q&A", colorText: "text-white", colorDot: "bg-white", icon: CheckCircle2,
    description: "Resumo nuclear assíncrono. O AJAX fundacional pavimentou a chegada do Fetch, Node, SPAs como React e WebSockets no mercado.",
    points: [
      "Familiaridade com XMLHttpRequest e Fetch são a chave.",
      "Consultar w3schools/xml/ajax_intro nas horas vagas.",
      "Aba Network (F12) é a melhor lousa para debugar isso."
    ],
    details: ["Conclusão", "Axios", "Fetch API", "DOM"],
    code: "// Aulas concluídas!\nconsole.log('Utilize a aba Network do Console!');"
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLightMode, setIsLightMode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isAnalogyOpen, setIsAnalogyOpen] = useState(false);
  const totalSlides = detailedTopics.length + 1; // 1 home + topics

  // Zoom logic applies to root HTML node
  useEffect(() => {
    document.documentElement.style.fontSize = `${16 * zoom}px`;
  }, [zoom]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'Escape') {
        setIsAnalogyOpen(false);
      } else if (e.key.toLowerCase() === 'a') {
        e.preventDefault();
        // Apenas abre a analogia se houver uma (ou seja, slide > 0)
        setIsAnalogyOpen((prev) => currentSlide > 0 ? !prev : false);
      } else if (isAnalogyOpen) {
        // prevent slide navigation when modal is open
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === ' ') e.preventDefault();
        return;
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => {
          const next = Math.min(prev + 1, totalSlides - 1);
          setIsAnalogyOpen(false); // Fecha ao trocar de slide
          return next;
        });
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentSlide((prev) => {
          const next = Math.max(prev - 1, 0);
          setIsAnalogyOpen(false); // Fecha ao trocar de slide
          return next;
        });
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsLightMode((prev) => !prev);
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoom((prev) => Math.min(prev + 0.1, 2));
      } else if (e.key === '-') {
        e.preventDefault();
        setZoom((prev) => Math.max(prev - 0.1, 0.5));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides, isAnalogyOpen, currentSlide]);

  return (
    <div 
      className="h-screen w-screen bg-[#05060a] text-white font-sans overflow-hidden flex flex-col relative selection:bg-blue-500/30"
      style={{ filter: isLightMode ? 'invert(1) hue-rotate(180deg)' : 'none', transition: 'filter 0.5s ease' }}
    >
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button 
          onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
          className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
          title="Diminuir Fonte (-)"
        >
          <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>
        <button 
          onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
          className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
          title="Aumentar Fonte (+)"
        >
          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>
        <button 
          onClick={() => setIsLightMode(!isLightMode)}
          className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
          title="Alternar Tema (P)"
        >
          {isLightMode ? <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
        </button>
      </div>

      {/* Background Orbs */}
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none z-0"></div>
      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none z-0"></div>

      {/* Navigation Overlay */}
      <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-1 sm:gap-2 bg-black/60 backdrop-blur-md px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-white/10 shadow-lg">
        <button 
          onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className="text-white/50 hover:text-white transition-colors disabled:opacity-20 flex items-center justify-center cursor-pointer p-1"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5"/>
        </button>
        <div className="flex gap-1 sm:gap-1.5 relative items-center px-1">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentSlide(idx)} 
              className={`rounded-full transition-all duration-300 ease-out cursor-pointer ${currentSlide === idx ? 'h-1.5 w-3 sm:h-1.5 sm:w-5 bg-blue-500' : 'h-1 w-1 sm:h-1.5 sm:w-1.5 bg-white/20 hover:bg-white/40'}`} 
            />
          ))}
        </div>
        <button 
          onClick={() => setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1))}
          disabled={currentSlide === totalSlides - 1}
          className="text-white/50 hover:text-white transition-colors disabled:opacity-20 flex items-center justify-center cursor-pointer p-1"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5"/>
        </button>
      </div>

      {/* Slides Track */}
      <div 
        className="flex w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-10"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {/* SLIDE 0: Overview Map Grid */}
        <div className="w-screen h-screen flex-shrink-0 flex flex-col relative items-center justify-center py-4 px-2 sm:p-6 lg:p-8 box-border overflow-hidden">
          <div className="w-full h-full max-w-[1400px] flex flex-col pb-10 sm:pb-12 pt-2 sm:pt-4">
            
            <header className="flex flex-row items-end justify-between mb-3 sm:mb-6 flex-shrink-0 px-2 sm:px-0">
              <div>
                <h1 className="text-[22px] sm:text-3xl lg:text-4xl font-bold tracking-tight text-blue-400 mb-0.5 sm:mb-1">O Core do JavaScript & AJAX</h1>
                <p className="text-[10px] sm:text-xs lg:text-sm text-gray-400">Guia Visual: DOM API & Eventos (W3C DOM Reference)</p>
              </div>
              <div className="flex space-x-2">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-900/30 border border-blue-500/50 rounded-full text-[8px] sm:text-[10px] font-mono text-blue-300 tracking-widest hidden sm:inline-block">V.DOM.EVENTS</span>
              </div>
            </header>

            {/* Tight Grid to fit 16 items without scrolling */}
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-1.5 sm:gap-2 lg:gap-2.5 flex-grow min-h-0 mt-2">
              {detailedTopics.map((topic, index) => {
                const IconComponent = topic.icon;
                return (
                  <div 
                    key={topic.id} 
                    onClick={() => setCurrentSlide(index + 1)} 
                    className="cursor-pointer group bg-white/5 border border-white/5 sm:border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-2.5 lg:p-3 backdrop-blur-sm flex flex-col justify-between hover:bg-white/[0.08] transition-all hover:scale-[1.03] active:scale-95 shadow-sm overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
                        <IconComponent className={`w-3 h-3 sm:w-4 sm:h-4 ${topic.colorText}`} />
                        <span className={`font-mono text-[8px] sm:text-[10px] tracking-wider ${topic.colorText}`}>{topic.id} {topic.label}</span>
                      </div>
                      <h3 className="text-[11px] sm:text-sm lg:text-base font-semibold leading-tight line-clamp-1 mb-0.5">{topic.title}</h3>
                      <p className="text-[9px] sm:text-[11px] text-gray-400 leading-snug line-clamp-2 md:line-clamp-3 block">{topic.description}</p>
                    </div>
                    <div className="mt-2 text-right">
                      <span className="text-[8px] sm:text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400 font-mono inline-block group-hover:bg-white/10 transition-colors">ACESSAR &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <footer className="mt-4 pt-3 border-t border-white/10 flex flex-row justify-between items-center text-[8px] sm:text-[10px] text-gray-500 tracking-widest font-mono uppercase flex-shrink-0 relative px-2 sm:px-0">
              <div>SISTEMA DE ENSINO (Baseado W3C Schools)</div>
              <div className="flex space-x-3">
                <span className="text-blue-500/80">INTERATIVO 28 MÓDULOS</span>
              </div>
            </footer>
          </div>
        </div>

        {/* SLIDES 1 to 16 */}
        {detailedTopics.map((topic, index) => {
          const IconComponent = topic.icon;
          return (
            <div key={topic.id} className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-3 sm:p-8 pb-14 sm:pb-20 box-border overflow-hidden">
              <div className="w-full h-full max-w-[1200px] z-10 flex flex-col justify-center max-h-full">
                
                <button 
                  onClick={() => setCurrentSlide(0)} 
                  className="mb-2 sm:mb-4 text-gray-400 hover:text-white flex items-center gap-1 sm:gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider transition-colors cursor-pointer w-max flex-shrink-0 bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" /> MAPA DE CONTEÚDO
                </button>
                
                <div className="relative group bg-[#080b12]/90 border border-white/5 sm:border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-8 backdrop-blur-2xl flex flex-col lg:flex-row gap-4 lg:gap-8 items-stretch shadow-2xl h-[calc(100%-3rem)] max-h-[800px] overflow-hidden">
                  
                  {/* Huge Background Number */}
                  <div className={`absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 text-[150px] sm:text-[250px] lg:text-[400px] font-bold opacity-[0.02] ${topic.colorText} pointer-events-none font-mono selection:bg-transparent z-0`}>
                    {topic.id}
                  </div>

                  {/* Text Content */}
                  <div className="flex-[1.2] w-full relative z-10 flex flex-col overflow-hidden justify-center min-h-0">
                    <div className={`font-mono text-[9px] sm:text-xs mb-2 sm:mb-4 font-semibold tracking-widest flex items-center gap-2 sm:gap-3 ${topic.colorText} flex-shrink-0`}>
                      <div className={`p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/5 shadow-inner`}>
                         <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
                      </div>
                      <span>{topic.id}. {topic.label}</span>
                    </div>
                    
                    <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 tracking-tight text-white flex-shrink-0">{topic.title}</h3>
                    
                    <p className="text-gray-300 text-[11px] sm:text-sm lg:text-base leading-relaxed mb-3 sm:mb-6 flex-shrink-0 font-medium">
                      {topic.description}
                    </p>
                    
                    {/* Points Container with Auto Scroll if needed */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 min-h-[80px]">
                      <ul className="space-y-2.5 sm:space-y-4">
                        {topic.points.map((point, idx) => (
                          <li key={idx} className="flex flex-row items-start gap-2.5 sm:gap-3 bg-white/[0.02] p-2.5 sm:p-3 rounded-lg border border-white/[0.03] hover:bg-white/[0.04] transition-colors">
                            <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 ${topic.colorText}`} />
                            <span className="text-gray-300 md:text-gray-400 text-[10px] sm:text-[13px] lg:text-[14px] leading-snug sm:leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 pt-3 border-t border-white/5 flex-shrink-0">
                      {topic.details.map((detail, idx) => (
                        <span key={idx} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-black/40 border border-white/5 rounded-full text-[9px] sm:text-xs text-gray-300 font-mono flex items-center gap-1.5 shadow-sm">
                          <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${topic.colorDot}`}></div>
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Code Panel */}
                  <div className="flex-[0.8] lg:w-[45%] relative z-10 shrink-0 flex flex-col h-[35%] lg:h-auto min-h-[160px] lg:min-h-0 bg-[#030408] rounded-xl overflow-hidden border border-white/10 shadow-xl lg:my-auto">
                    <div className="flex px-3 sm:px-4 py-2 sm:py-2.5 bg-white/[0.03] border-b border-white/5 items-center justify-between flex-shrink-0">
                      <div className="flex space-x-1.5 sm:space-x-2">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/80"></div>
                      </div>
                      <div className="text-[8px] sm:text-[10px] text-gray-500 font-mono tracking-wider ml-auto flex items-center gap-2">
                        <span>{topic.title.split(' ')[0].toLowerCase()}.js</span>
                      </div>
                    </div>
                    <div className="p-3 sm:p-5 overflow-auto flex-grow custom-scrollbar relative">
                      <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
                        <IconComponent className="w-16 h-16 sm:w-24 sm:h-24" />
                      </div>
                      <pre className={`text-[10px] sm:text-xs lg:text-[13px] font-mono leading-[1.6] ${topic.colorText} brightness-125`}>
                        <code>{topic.code}</code>
                      </pre>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {currentSlide > 0 && (
        <button
          onClick={() => setIsAnalogyOpen(true)}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 bg-indigo-600 hover:bg-indigo-500 text-white p-3 sm:p-4 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)] outline outline-2 outline-offset-2 outline-transparent hover:outline-indigo-400 transition-all flex items-center justify-center cursor-pointer"
          title="Explicação com Analogia (A)"
        >
          <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {isAnalogyOpen && currentSlide > 0 && detailedTopics[currentSlide - 1] && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsAnalogyOpen(false)}
        >
          <div 
            className="bg-[#0d1117] border border-indigo-500/30 rounded-2xl p-6 sm:p-10 w-[80vw] h-[80vh] flex flex-col shadow-2xl relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsAnalogyOpen(false)}
              className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6 sm:mb-8 flex-shrink-0">
                <Lightbulb className="w-8 h-8 text-indigo-400" />
                <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                  Analogia: {detailedTopics[currentSlide - 1].title}
                </h2>
              </div>
              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                
                <div className="flex flex-col gap-6">
                  <ul className="list-disc pl-5 sm:pl-8 space-y-3 sm:space-y-4">
                    {analogies[detailedTopics[currentSlide - 1].id]?.items.map((item, idx) => (
                      <li key={idx} className="text-lg sm:text-2xl text-gray-300 leading-relaxed font-light">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {analogies[detailedTopics[currentSlide - 1].id]?.images?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full place-items-start">
                      {analogies[detailedTopics[currentSlide - 1].id].images.map((imgSrc, idx) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden border border-indigo-500/30 shadow-lg w-full max-w-sm">
                          <img 
                            src={imgSrc} 
                            alt={`Analogia illustração ${idx + 1}`} 
                            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}
