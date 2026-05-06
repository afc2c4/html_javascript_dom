import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Network, Settings2, Search, FileEdit, Palette, ShieldCheck, PlaySquare, Globe, Fingerprint, CheckCircle2,
  ChevronLeft, ChevronRight, Zap, MousePointer2, Keyboard, Loader2, Clock, Ear, ArrowUpCircle, Sun, Moon,
  ZoomIn, ZoomOut, Lightbulb, X, Play, Layout, Power, Eye
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
  },
  "29": {
    items: [
      "Erros no código são como pregos soltos ou rachaduras numa ponte em construção.",
      "Sem controle e checagem, a ponte inteira pode desabar ao passar o primeiro carro (seu script para de rodar).",
      "A introdução ao tratamento de erros é aprender a parar, inspecionar e sinalizar com fita isolante esses defeitos."
    ],
    images: ["https://image.pollinations.ai/prompt/broken%20bridge%20crack%20glowing%20warning%20tape%20neon?width=600&height=400&nologo=true"]
  },
  "30": {
    items: [
      "Erros inevitáveis na engenharia funcionam perfeitamente assim como o atrito no asfalto.",
      "Não podemos criar um pneu que dure 1.000 anos, mas escolhemos projetar um pneu que seja forte e esvazie com segurança e alertando o painel caso estoure.",
      "Esperar as falhas preventivamente traz uma parada segura e previsível sem o susto final."
    ],
    images: ["https://image.pollinations.ai/prompt/car%20dashboard%20warning%20light%20safe%20driving%20neon%20glowing?width=600&height=400&nologo=true"]
  },
  "31": {
    items: [
      "As origens das falhas agem como uma inspeção rígida e catastrófica na rotina de uma massiva cozinha comercial.",
      "A falha do próprio cozinheiro é ignorar passos ou deixar o sal cair de propósito (Erro do Programador / Lógica).",
      "Erros de Entrada seriam o cliente pedindo alface para a fritadeira, e o Ambiente é a luz do estabelecimento cair do nada!"
    ],
    images: ["https://image.pollinations.ai/prompt/chaotic%20kitchen%20restaurant%20power%20outage%20glowing%20food?width=600&height=400&nologo=true"]
  },
  "32": {
    items: [
      "O comportamento de parar repentinamente o processo é como um trem-bala a mil por hora correndo no trilho.",
      "O trem-bala não tem volante para desviar: se houver uma mísera pedra dura no trilho (erro grave), o trem eletrônico trava e aborta todo o trajeto.",
      "A máquina inteira da página web simplesmente congela as portas e não consegue operar nem mais um aviso pro passageiro."
    ],
    images: ["https://image.pollinations.ai/prompt/high%20speed%20train%20derailing%20broken%20track%20glowing%20sparks?width=600&height=400&nologo=true"]
  },
  "33": {
    items: [
      "O Caminho Triste e o Feliz reagem de acordo com um perfeito planejamento prévio no seu carro flex de dois motores.",
      "Você sempre deve se preparar e responder à seguinte dúvida perigosa: 'O que vai acontecer ali na frente se acabar o combustível num nevoeiro escuro?'",
      "O programador forte sempre projeta um botão elétrico para trocar tudo pro sistema da bateria reserva silenciosa, rodando seguro pro offline."
    ],
    images: ["https://image.pollinations.ai/prompt/split%20road%20sunny%20happy%20path%20vs%20dark%20stormy%20path%20glowing%20signs?width=600&height=400&nologo=true"]
  },

  "v01": {
    items: [
      "O Vue é como um assistente de palco inteligente em um grande teatro.",
      "Em vez de você carregar cada cenário manualmente toda vez que a cena muda...",
      "Você apenas entrega o roteiro (Estado) e ele move todas as peças precisamente para que o público veja o que deve ver."
    ],
    images: ["https://image.pollinations.ai/prompt/theater%20stage%20assistant%20moving%20glowing%20props%20futuristic?width=600&height=400&nologo=true"]
  },
  "v02": {
    items: [
      "A Abstração Progressiva é como uma caixa de ferramentas modular de um astronauta.",
      "Para um reparo pequeno, ele tira apenas a chave de fenda (o script tag).",
      "Mas se a missão for complexa, ele conecta toda a oficina externa (Vite/Build Tools) para ter poder total."
    ],
    images: ["https://image.pollinations.ai/prompt/modular%20astronaut%20toolbox%20glowing%20tools%20space?width=600&height=400&nologo=true"]
  },
  "v03": {
    items: [
      "O Componente de Arquivo Único (SFC) é como um kit de refeição gourmet em uma caixa.",
      "Os ingredientes (Template), a receita (Script) e a decoração do prato (Style) vêm todos juntos.",
      "Isso evita que você tenha que correr pela cozinha inteira buscando peças em gavetas diferentes (HTML/JS/CSS separados)."
    ],
    images: ["https://image.pollinations.ai/prompt/glowing%20gourmet%20meal%20kit%20box%20futuristic%20design?width=600&height=400&nologo=true"]
  },
  "v04": {
    items: [
      "Os Estilos de API são como dois métodos de organização de uma biblioteca.",
      "A Options API é como estantes fixas marcadas: 'Ficção', 'História' (data, methods).",
      "A Composition API é como organizar por 'Temas': tudo sobre Dragões num canto, tudo sobre Viagens noutro, não importa o gênero."
    ],
    images: ["https://image.pollinations.ai/prompt/futuristic%20library%20organizing%20books%20with%20holograms?width=600&height=400&nologo=true"]
  },
  "v05": {
    items: [
      "Criar um projeto com 'create-vue' é como plantar uma semente de árvore tecnológica geneticamente modificada.",
      "Você não precisa construir cada galho e folha manualmente do zero.",
      "O comando prepara o solo (Vite), instala as raízes (Dependências) e deixa a estrutura pronta para você apenas decorar os frutos (Funcionalidades)."
    ],
    images: ["https://image.pollinations.ai/prompt/glowing%20tech%20seed%20growing%20into%20a%20digital%20tree%20fast%20motion?width=600&height=400&nologo=true"]
  },
  "v06": {
    items: [
      "A estrutura de pastas do Vite é como o mapa de compartimentos de uma estação espacial ultra-eficiente.",
      "Cada coisa tem seu setor: os mantimentos em 'public', o motor e oxigênio em 'src', e os protocolos de voo em 'vite.config.ts'.",
      "Essa organização garante que a nave decole rápido (HMR instantâneo) e nada fique solto flutuando no vácuo durante a missão."
    ],
    images: ["https://image.pollinations.ai/prompt/futuristic%20space%20station%20interior%20blueprints%20glowing%20neon?width=600&height=400&nologo=true"]
  },
  "v07": {
    items: [
      "Usar o Vue via CDN é como pedir uma refeição pronta por delivery em vez de montar uma cozinha industrial completa em casa.",
      "Se você só quer um lanche rápido (uma interação pequena numa página), basta chamar o entregador (o script tag da rede).",
      "Você economiza tempo de 'instalação' de fogões e pias (Vite/Build), mas para banquetes gigantes (SPAs), a cozinha própria ainda é melhor."
    ],
    images: ["https://image.pollinations.ai/prompt/futuristic%20food%20delivery%20drone%20glowing%20cyberpunk%20city?width=600&height=400&nologo=true"]
  },
  "v08": {
    items: [
      "O 'Import Map' é como um painel de indexação mestre em uma base secreta subterrânea gigante.",
      "Ele mapeia que quando alguém grita 'VUE!', os robôs devem correr para o corredor C e buscar o item exato.",
      "Sem ele, você teria que dar o endereço completo de latitude e longitude (a URL longa da CDN) toda vez que quisesse um parafuso novo."
    ],
    images: ["https://image.pollinations.ai/prompt/secret%20underground%20base%20glowing%20control%20panel%20map?width=600&height=400&nologo=true"]
  },
  "v09": {
    items: [
      "A Instância da Aplicação (createApp) é como o motor de ignição de um foguete.",
      "Sem ele, você tem apenas metal frio e circuitos (HTML/JS parado).",
      "Ao ligar a ignição, todos os sistemas de suporte à vida e propulsão (Plugins, State) acordam e se preparam para a missão."
    ],
    images: ["https://image.pollinations.ai/prompt/rocket%20engine%20ignition%20glowing%20blue%20fire%20futuristic?width=600&height=400&nologo=true"]
  },
  "v10": {
    items: [
      "O Componente Raiz é como a cabine de comando do capitão no topo desse foguete.",
      "É o ponto de partida de todas as decisões; se ele não estiver lá, não há ninguém para dar ordens aos subsistemas.",
      "Tudo o que acontece na nave (os componentes filhos) reporta direta ou indiretamente a essa central de controle."
    ],
    images: ["https://image.pollinations.ai/prompt/spaceship%20cockpit%20captain%20seat%20glowing%20holograms?width=600&height=400&nologo=true"]
  },
  "v11": {
    items: [
      "Montar a aplicação (.mount) é como encaixar o foguete na sua rampa de lançamento específica (o elemento HTML).",
      "Até você acoplar, o foguete é apenas uma ideia ou um protótipo solto.",
      "No momento que ele clica na rampa (DOM), as luzes se acendem e a ponte entre o código e o mundo real é estabelecida."
    ],
    images: ["https://image.pollinations.ai/prompt/rocket%20launch%20pad%20connecting%20glowing%20clamps?width=600&height=400&nologo=true"]
  },
  "v12": {
    items: [
      "A Interpolação de Texto (Mustaches) é como uma legenda holográfica que muda sozinha sobre um objeto.",
      "Você não precisa ir lá e reescrever a placa toda vez que o preço ou o nome muda.",
      "O sistema de projeção apenas lê o valor da memória e atualiza a luz flutuante instantaneamente."
    ],
    images: ["https://image.pollinations.ai/prompt/holographic%20label%20floating%20over%20item%20glowing%20text?width=600&height=400&nologo=true"]
  },
  "v13": {
    items: [
      "O v-bind (:) é como uma pulseira inteligente que muda a cor e a permissão de quem a veste.",
      "Em vez de trocar a pulseira toda, você apenas altera o sinal enviado para ela (os atributos).",
      "A pulseira responde mudando seu comportamento ou aparência conforme o nível de acesso do usuário."
    ],
    images: ["https://image.pollinations.ai/prompt/smart%20wristband%20changing%20colors%20glowing%20futuristic?width=600&height=400&nologo=true"]
  },
  "v14": {
    items: [
      "Expressões JavaScript no template são como ter uma mini-calculadora embutida na sua viseira de realidade aumentada.",
      "Você não precisa voltar para a base para fazer cálculos simples de 'Soma' ou 'Inversão'.",
      "A viseira resolve a matemática básica ali mesmo, diante dos seus olhos, enquanto você observa o ambiente."
    ],
    images: ["https://image.pollinations.ai/prompt/augmented%20reality%20visor%20showing%20math%20calculations%20glowing?width=600&height=400&nologo=true"]
  },
  "v15": {
    items: [
      "O 'ref()' é como fixar um sensor de rastreamento em uma caixa solitária.",
      "O Vue passa a 'vigiar' essa caixa com um drone constante.",
      "Assim que algo entra ou sai da caixa, o drone avisa o painel de controle para redesenhar o mapa da interface."
    ],
    images: ["https://image.pollinations.ai/prompt/high%20tech%20sensor%20on%20a%20glowing%20box%20drone%20scanning?width=600&height=400&nologo=true"]
  },
  "v16": {
    items: [
      "O 'reactive()' é como eletrificar toda a estrutura de uma estante de arquivos.",
      "Cada gaveta, cada pasta e cada papel lá dentro agora tem um chip de presença.",
      "Não importa onde você mexa na estante, o sistema central sente a vibração e atualiza o inventário geral."
    ],
    images: ["https://image.pollinations.ai/prompt/electrified%20filing%20cabinet%20glowing%20blue%20data%20streams?width=600&height=400&nologo=true"]
  },
  "v17": {
    items: [
      "A Mutação de Reatividade é como um espelho que reflete o futuro antes mesmo dele acontecer.",
      "Quando você muda o valor (o estado), a realidade física (o DOM) tenta se ajustar na mesma velocidade da luz.",
      "É um laço de feedback invisível que garante que o que você vê é sempre a verdade absoluta dos dados."
    ],
    images: ["https://image.pollinations.ai/prompt/futuristic%20mirror%20reflecting%20digital%20data%20transformation?width=600&height=400&nologo=true"]
  },
  "v18": {
    items: [
      "Uma Propriedade Computada é como um visor de 'Resumo' em um traje de combate.",
      "Ele não fica recalculando o oxigênio a cada nanosegundo se você está parado; ele apenas mostra o último valor guardado.",
      "Ele só gasta energia para atualizar quando sente que o tanque de oxigênio (a dependência) realmente variou."
    ],
    images: ["https://image.pollinations.ai/prompt/combat%20suit%20hud%20showing%20oxygen%20stats%20glowing?width=600&height=400&nologo=true"]
  },
  "v19": {
    items: [
      "O Cache de Computadas é como um assistente que já decorou a resposta de uma pergunta difícil.",
      "Se você perguntar de novo e nada mudou no mundo, ele responde instantaneamente sem ler os livros novamente.",
      "Isso poupa um tempo imenso de 'estudo' (processamento) que seria desperdiçado em resultados repetidos."
    ],
    images: ["https://image.pollinations.ai/prompt/smart%20android%20assistant%20recalling%20data%20fast?width=600&height=400&nologo=true"]
  },
  "v20": {
    items: [
      "A Computada Gravável (Writable) é como um termostato inteligente de última geração.",
      "Você pode ler a temperatura (Get), mas se você forçar o ponteiro para cima (Set), ele automaticamente ajusta a potência do ar condicionado lá fora.",
      "É um canal de mão dupla onde a visão e a causa estão sincronizadas por uma lógica secreta interna."
    ],
    images: ["https://image.pollinations.ai/prompt/smart%20thermostat%20changing%20colors%20glowing%20dial?width=600&height=400&nologo=true"]
  },
  "v21": {
    items: [
      "O Vínculo de Classe (Objeto) é como um uniforme que muda de detalhes dependendo do seu status.",
      "Se você está ferido, a luz no ombro fica vermelha (:class='{ danger: isHurt }').",
      "É uma forma automática de vestir o elemento com a aparência certa sem precisar trocar de roupa manualmente."
    ],
    images: ["https://image.pollinations.ai/prompt/futuristic%20soldier%20armor%20changing%20colors%20glowing%20red%20blue?width=600&height=400&nologo=true"]
  },
  "v22": {
    items: [
      "O Vínculo de Classe (Array) é como carregar várias medalhas ou acessórios ao mesmo tempo.",
      "Você pode ter a medalha de 'Velocidade', de 'Fogo' e de 'Voo' simultaneamente.",
      "O Vue apenas combina todos os estilos que você acumulou e os aplica de uma vez só no seu perfil."
    ],
    images: ["https://image.pollinations.ai/prompt/hero%20shoulder%20pads%20with%20multiple%20glowing%20badges?width=600&height=400&nologo=true"]
  },
  "v23": {
    items: [
      "Estilos Inline Dinâmicos são como um laser de pintura que ajusta milimetricamente a cor e o tamanho do objeto.",
      "Em vez de escolher uma roupa pronta (Classe), você está alterando a fibra exata do tecido em tempo real.",
      "Isso dá um controle total sobre valores que mudam constantemente, como a posição de um cursor ou a largura de uma barra de vida."
    ],
    images: ["https://image.pollinations.ai/prompt/laser%20projector%20coloring%20a%20cube%20dynamic%20neon?width=600&height=400&nologo=true"]
  },
  "v24": {
    items: [
      "O 'v-if' é como uma porta dimensional que só abre se você tiver a chave certa.",
      "Se você não tem a chave, o resto do cômodo simplesmente não existe no nosso universo (DOM).",
      "Isso economiza energia e espaço da realidade, criando a matéria apenas quando necessário."
    ],
    images: ["https://image.pollinations.ai/prompt/interdimensional%20portal%20opening%20glowing%20blue?width=600&height=400&nologo=true"]
  },
  "v25": {
    items: [
      "O 'v-show' é como um manto de invisibilidade de um espião.",
      "O espião continua ali parado no mesmo lugar, ocupando espaço e respirando (está no DOM).",
      "Você apenas ligou o campo de força que o torna invisível aos olhos (display: none)."
    ],
    images: ["https://image.pollinations.ai/prompt/invisibility%20cloak%20shimmering%20stealth%20tech?width=600&height=400&nologo=true"]
  },
  "v26": {
    items: [
      "O v-if com '<template>' é como um grupo de soldados que se movem em formação fantasmagórica.",
      "Eles não precisam de uma caixa física (div) em volta deles para serem controlados.",
      "Se o capitão dá a ordem, o grupo todo aparece ou some, mantendo a formação limpa."
    ],
    images: ["https://image.pollinations.ai/prompt/ghostly%20army%20units%20appearing%20in%20formation%20neon?width=600&height=400&nologo=true"]
  },
  "v27": {
    items: [
      "O 'v-for' básico é como uma linha de montagem ultrarrápida de clones robóticos.",
      "Você entrega um molde (o template) e uma lista de instruções (o Array).",
      "A máquina dispara e constrói um robô perfeito para cada instrução da lista em milissegundos."
    ],
    images: ["https://image.pollinations.ai/prompt/robot%20factory%20assembly%20line%20cloning%20process?width=600&height=400&nologo=true"]
  },
  "v28": {
    items: [
      "O v-for com Objetos é como ler as especificações de uma peça técnica detalhada.",
      "Você percorre cada detalhe: 'Peso', 'Material', 'Data de Fabricação'.",
      "Para cada característica, o sistema gera uma linha no visor, extraindo tanto o nome quanto o valor de forma automática."
    ],
    images: ["https://image.pollinations.ai/prompt/mechanical%20blueprints%20scanning%20data%20hologram?width=600&height=400&nologo=true"]
  },
  "v29": {
    items: [
      "A ':key' é como colocar um rastreador GPS único em cada drone de uma frota de milhares.",
      "Sem o rastreador, se dois drones trocam de lugar no ar, o controle central fica confuso.",
      "Com a chave única, o Vue sabe exatamente quem é quem, mesmo que a frota inteira se reorganize."
    ],
    images: ["https://image.pollinations.ai/prompt/swarm%20of%20drones%20each%20with%20unique%20glowing%20id?width=600&height=400&nologo=true"]
  },
  "v30": {
    items: [
      "Escutar Eventos (v-on / @) é como instalar sensores de pressão em cada botão de um painel nuclear.",
      "O Vue fica ali, com o ouvido encostado no metal, esperando o 'click' ou o 'toque'.",
      "Assim que sente a vibração, ele dispara instantaneamente o protocolo que você programou."
    ],
    images: ["https://image.pollinations.ai/prompt/finger%20touching%20glowing%20control%20panel%20sensor?width=600&height=400&nologo=true"]
  },
  "v31": {
    items: [
      "Argumentos de Evento são como entregar um pacote de dados junto com um sinal de socorro.",
      "Não basta dizer 'Aconteceu algo!'; você envia também o 'O que', 'Onde' e 'Quem'.",
      "O socorrista (o método) recebe o pacote e já sabe exatamente como agir."
    ],
    images: ["https://image.pollinations.ai/prompt/data%20capsule%20flying%20through%20digital%20tunnel?width=600&height=400&nologo=true"]
  },
  "v32": {
    items: [
      "Modificadores de Evento (.stop, .prevent) são como filtros de segurança em um comunicador de rádio.",
      "O '.stop' impede que a mensagem vaze para os canais vizinhos (Propagação).",
      "O '.prevent' desliga o comportamento automático e teimoso do rádio (Submit/Reload)."
    ],
    images: ["https://image.pollinations.ai/prompt/radio%20signal%20filtering%20glowing%20waveforms?width=600&height=400&nologo=true"]
  },
  "v33": {
    items: [
      "O 'v-model' é como um túnel de teletransporte instantâneo entre o que você digita e a alma da aplicação.",
      "Se você digita um 'A', o estado reativo sente na hora. Se o estado mudar no código, o texto na tela se altera sozinho.",
      "É uma conexão telepática que mantém a UI e os Dados em perfeita harmonia."
    ],
    images: ["https://image.pollinations.ai/prompt/teleportation%20tunnel%20glowing%20blue%20data%20transfer?width=600&height=400&nologo=true"]
  },
  "v34": {
    items: [
      "O Sincronizador de Texto é como uma caneta mágica que escreve em dois lugares ao mesmo tempo.",
      "Uma ponta escreve no papel (o Input), a outra ponta escreve na memória do computador (JS).",
      "Não há atraso, não há erro de cópia; as informações são gêmeas idênticas em dois mundos."
    ],
    images: ["https://image.pollinations.ai/prompt/magical%20pen%20writing%20glowing%20words%20on%20paper%20and%20screen?width=600&height=400&nologo=true"]
  },
  "v35": {
    items: [
      "Checkbox e Select dinâmicos são como um painel de triagem em uma central de logística.",
      "Ao clicar em uma opção, um sinal elétrico é enviado para a lista mestra, marcando aquele item como 'Selecionado'.",
      "O sistema de transporte inteligente já sabe quais caixas deve carregar no próximo lote baseado nessas marcações."
    ],
    images: ["https://image.pollinations.ai/prompt/logistics%20dashboard%20with%20glowing%20checkboxes%20and%20data?width=600&height=400&nologo=true"]
  },
  "v36": {
    items: [
      "O Gatilho 'onMounted' é como o grito de 'ESTAMOS VIVOS!' após a nave pousar em solo firme.",
      "O motor da nave (DOM) já está acoplado e os sensores já podem ler o terreno real.",
      "É o momento perfeito para ligar as câmeras e começar a buscar dados (Requisições API)."
    ],
    images: ["https://image.pollinations.ai/prompt/spaceship%20landing%20on%20neon%20planet%20glowing%20lights?width=600&height=400&nologo=true"]
  },
  "v37": {
    items: [
      "O Gatilho 'onUpdated' é como um sistema de radar que emite um bipe toda vez que a paisagem muda.",
      "Se uma montanha de dados cresceu ou diminuiu, o componente percebe e avisa: 'A realidade foi recalibrada'.",
      "Útil para ajustar câmeras ou efeitos visuais após os dados forçarem uma mudança de layout."
    ],
    images: ["https://image.pollinations.ai/prompt/radar%20screen%20beeping%20glowing%20green%20data%20fluctuation?width=600&height=400&nologo=true"]
  },
  "v38": {
    items: [
      "O Gatilho 'onUnmounted' é como o protocolo de limpeza de uma base secreta antes dela ser abandonada.",
      "Você desliga as luzes, corta a energia e limpa os rastros (Event Listeners e Timers).",
      "Isso garante que nada fique rodando inutilmente e gastando os recursos do computador (Vazamentos de Memória)."
    ],
    images: ["https://image.pollinations.ai/prompt/secret%20base%20shutting%20down%20lights%20fading%20out?width=600&height=400&nologo=true"]
  },
  "v39": {
    items: [
      "Observadores (watch) são como cães de guarda robóticos treinados para vigiar uma única caixa específica.",
      "Eles não fazem nada enquanto a caixa estiver parada.",
      "Mas se a caixa vibrar (o dado mudar), o cão late e executa uma ação de resposta imediata."
    ],
    images: ["https://image.pollinations.ai/prompt/cyber%20guard%20dog%20watching%20a%20glowing%20box%20intensely?width=600&height=400&nologo=true"]
  },
  "v40": {
    items: [
      "O Deep Watcher é como usar um raio-X para espiar dentro de várias caixas umas dentro das outras.",
      "O cão de guarda não olha só para a superfície da caixa grande; ele vê se uma formiga se mexeu lá no fundo da última caixa.",
      "É um monitoramento pesado que não deixa escapar nenhum detalhe, por mais enterrado que esteja no objeto."
    ],
    images: ["https://image.pollinations.ai/prompt/x-ray%20vision%20scanning%20nested%20boxes%20glowing%20data?width=600&height=400&nologo=true"]
  },
  "v41": {
    items: [
      "O 'watchEffect' é como um sistema de vigília onipresente que olha para tudo ao mesmo tempo.",
      "Ele não precisa ser avisado de quem observar; ele observa todos que estão participando da conversa no momento.",
      "Se qualquer um dos envolvidos mudar de ideia, o sistema de vigília reage instantaneamente sem precisar de nomes ou IDs."
    ],
    images: ["https://image.pollinations.ai/prompt/panopticon%20surveillance%20system%20glowing%20digital%20eyes?width=600&height=400&nologo=true"]
  },
  "v42": {
    items: [
      "Referências de Template (ref) são como colocar uma etiqueta mágica direta em um objeto físico.",
      "Elas permitem que o seu código estique o braço e toque no objeto real do DOM.",
      "É o último recurso para quando a 'telepatia' do Vue não é suficiente e você precisa interagir fisicamente com a máquina."
    ],
    images: ["https://image.pollinations.ai/prompt/mystical%20tag%20attached%20to%20a%20futuristic%20machine%20glowing?width=600&height=400&nologo=true"]
  },
  "v43": {
    items: [
      "Referências em Componentes são como ter o controle remoto direto da cabine de comando de outra nave.",
      "Você não está apenas enviando uma mensagem; você está acessando os painéis internos e botões daquela nave.",
      "Use com cuidado! Dar ordens diretas para outras naves pode criar um caos de comunicação se não houver disciplina."
    ],
    images: ["https://image.pollinations.ai/prompt/spaceship%20remote%20control%20accessing%20other%20ship%20internal?width=600&height=400&nologo=true"]
  },
  "v44": {
    items: [
      "Referências em v-for são como dar um walkie-talkie para cada membro de um pelotão de elite.",
      "Você agora tem uma lista de contatos para falar com cada soldado individualmente.",
      "Pode pedir para o soldado 5 baixar a cabeça e o soldado 12 atirar, tudo de forma coordenada e precisa."
    ],
    images: ["https://image.pollinations.ai/prompt/squad%20of%20soldiers%20each%20with%20glowing%20walkie-talkie?width=600&height=400&nologo=true"]
  },
  "v45": {
    items: [
      "Fundamentos dos Componentes são como módulos espaciais de uma estação orbital modular.",
      "Cada módulo tem seu próprio oxigênio, luz e lógica, mas todos se encaixam perfeitamente para criar algo maior.",
      "É a arte de dividir um castelo gigante em pequenas salas portáteis e reutilizáveis."
    ],
    images: ["https://image.pollinations.ai/prompt/space%20station%20modules%20assembling%20in%20orbit%20glowing?width=600&height=400&nologo=true"]
  },
  "v46": {
    items: [
      "Props são como cápsulas de suprimentos enviadas da nave mãe para os exploradores terrestres.",
      "Os exploradores usam o que está dentro da cápsula (Dados) para sobreviver e se orientar.",
      "Importante: É uma via de mão única; os exploradores nunca mandam a cápsula de volta com lixo (Props são imutáveis)."
    ],
    images: ["https://image.pollinations.ai/prompt/supply%20capsule%20dropping%20from%20sky%20glowing%20trail?width=600&height=400&nologo=true"]
  },
  "v47": {
    items: [
      "Emits são como sinalizadores de fumaça ou luz enviados pelos exploradores para avisar a nave mãe.",
      "'A missão acabou!', 'Encontramos água!', 'Algo deu errado!'.",
      "A nave mãe fica olhando para o horizonte, esperando esses sinais para decidir o próximo passo da grande estratégia."
    ],
    images: ["https://image.pollinations.ai/prompt/exploration%20flare%20light%20reaching%20the%20stars%20glowing?width=600&height=400&nologo=true"]
  },

  // --- REACT ANALOGIES ---
  "r01": {
    items: [
      "O React é como construir com blocos de LEGO inteligentes e independentes.",
      "Cada peça tem seu próprio manual de instruções e sabe como se comportar no castelo.",
      "Se você quiser mudar uma torre, você não precisa desmontar a base; apenas troca o 'módulo' da torre e o castelo se ajusta."
    ],
    images: ["https://image.pollinations.ai/prompt/futuristic%20lego%20bricks%20glowing%20assembling%20themselves?width=600&height=400&nologo=true"]
  },
  "r02": {
    items: [
      "O Virtual DOM é como um rascunho de papel para um arquiteto antes de construir o prédio real.",
      "É muito mais rápido e barato apagar e redesenhar no papel (Memória) do que derrubar paredes (DOM Real).",
      "O React desenha tudo no papel primeiro e só manda os pedreiros mexerem no prédio real na parte exata que mudou."
    ],
    images: ["https://image.pollinations.ai/prompt/architect%20drawing%20glowing%20blueprints%20hologram?width=600&height=400&nologo=true"]
  },
  "r03": {
    items: [
      "O JSX é como um sanduíche gourmet onde o pão (HTML) e o recheio (Lógica JS) são fundidos em um só.",
      "Não há separação entre a receita e o prato; a própria estrutura do prato descreve o que ele faz.",
      "Isso evita que você tenha que olhar em cadernos diferentes para entender por que o sanduíche tem aquele visual."
    ],
    images: ["https://image.pollinations.ai/prompt/futuristic%20fusion%20food%20glowing%20neon%20molecular?width=600&height=400&nologo=true"]
  },
  "r04": {
    items: [
      "O Estado (State) é como a memória de curto prazo de um robô.",
      "Ele se lembra se a luz está acesa ou se o usuário clicou no botão de alerta.",
      "Se o robô esquece o estado (ou ele muda), o comportamento visual do robô se altera na hora para refletir a nova realidade."
    ],
    images: ["https://image.pollinations.ai/prompt/cybernetic%20robot%20brain%20glowing%20synapses%20blue?width=600&height=400&nologo=true"]
  },
  "r05": {
    items: [
      "Props são como cartas de comando enviadas de um general (Componente Pai) para seus soldados (Componentes Filhos).",
      "O soldado lê a carta e executa a ordem exatamente como foi escrita.",
      "Mas o soldado nunca pode reescrever a carta do general; ele apenas a segue fielmente (Props são somente leitura)."
    ],
    images: ["https://image.pollinations.ai/prompt/holographic%20commander%20giving%20orders%20to%20squad?width=600&height=400&nologo=true"]
  },

  // --- ANGULAR ANALOGIES ---
  "a01": {
    items: [
      "O Angular é como uma fábrica de automóveis ultra-organizada com protocolos de segurança rígidos.",
      "Você não pode simplesmente colocar qualquer peça em qualquer lugar; tudo deve seguir o manual técnico obrigatório.",
      "Essa disciplina garante que naves complexas sejam construídas com uma qualidade e estabilidade de nível militar."
    ],
    images: ["https://image.pollinations.ai/prompt/futuristic%20car%20factory%20automated%20robots%20precision?width=600&height=400&nologo=true"]
  },
  "a02": {
    items: [
      "A Arquitetura Modular (NgModules) é como os contêineres de um navio cargueiro gigante.",
      "Tudo o que é relacionado a 'Navegação' fica em um contêiner; 'Pagamentos' fica em outro.",
      "Isso permite que você carregue ou descarregue partes inteiras da funcionalidade sem bagunçar o resto do navio."
    ],
    images: ["https://image.pollinations.ai/prompt/giant%20cargo%20ship%20with%20glowing%20neon%20containers?width=600&height=400&nologo=true"]
  },
  "a03": {
    items: [
      "O Two-Way Data Binding é como um par de walkie-talkies sempre abertos entre a tela e o código.",
      "Se você fala na tela (digita), o código ouve na hora. Se o código fala (muda o valor), a tela repete o som.",
      "É um dueto eterno onde nenhum dos dois fica fora de sintonia por um segundo sequer."
    ],
    images: ["https://image.pollinations.ai/prompt/two%20walkie-talkies%20connected%20by%20glowing%20laser%20beam?width=600&height=400&nologo=true"]
  },
  "a04": {
    items: [
      "A Injeção de Dependência é como um sistema de encanamento inteligente em uma mansão.",
      "A torneira (o Componente) não precisa saber onde o reservatório de água (o Serviço) está.",
      "Ela apenas pede: 'Me dê água!', e o sistema central entrega o recurso exatamente no ponto certo da parede."
    ],
    images: ["https://image.pollinations.ai/prompt/high%20tech%20plumbing%20system%20glowing%20blue%20pipes?width=600&height=400&nologo=true"]
  },
  "a05": {
    items: [
      "O TypeScript no Angular é como um traje de armadura com sensores de integridade estrutural.",
      "Se você tenta fazer um movimento impossível ou perigoso, a armadura trava e avisa o erro antes de você se machucar.",
      "Isso transforma o desenvolvedor em um piloto mais confiante, pois o sistema vigia cada linha de código contra falhas tolas."
    ],
    images: ["https://image.pollinations.ai/prompt/iron%20man%20style%20suit%20with%20error%20scanners%20glowing?width=600&height=400&nologo=true"]
  },

  "34": {
    items: [
      "Erros silenciosos são como um pequeno vazamento invisível de gás na cozinha.",
      "Você não vê nada quebrado e nenhuma sirene toca, mas o perigo e os resultados podres se acumulam até sufocar o sistema.",
      "Usar 'use strict' é como instalar um sensor muito sensível que começa a apitar alto e expõe o vazamento antes da explosão."
    ],
    images: ["https://image.pollinations.ai/prompt/invisible%20gas%20leak%20kitchen%20detected%20by%20glowing%20smoke%20alarm?width=600&height=400&nologo=true"]
  },
  "35": {
    items: [
      "O 'Dado Podre' num sistema e o Efeito Dominó é incrivelmente análogo a esconder um zumbi ferido por baixo do chão de uma vila.",
      "Você não vai saber no exato começo que ele estava ali escondido.",
      "Mais tarde aquele monstro atravessa os telhados num momento distraído e causa um pânico a 10 km dali, tornando impossível traçar as origens do caos."
    ],
    images: ["https://image.pollinations.ai/prompt/domino%20falling%20zombie%20virus%20spreading%20glowing%20toxic%20green?width=600&height=400&nologo=true"]
  },
  "36": {
    items: [
      "A Coerção de Tipos inventada pelo JS é exatamente como contratar um pedreiro muito louco na obra.",
      "Você pede para ele misturar 3 cimentos grossos (números) mais 1 pá de areia de praia colorida (texto).",
      "Em vez de avisar que as químicas não combinam, ele gruda tudo com fita crepe, constrói a parede e sua casa desaba sorrindo depois."
    ],
    images: ["https://image.pollinations.ai/prompt/crazy%20construction%20worker%20mixing%20glowing%20chemicals%20duct%20tape?width=600&height=400&nologo=true"]
  },
  "37": {
    items: [
      "O Vazamento Dinâmico de Escopo e o NaN (Not a Number) são como um gotejamento crônico nas latas radioativas na garagem fechada do bairro.",
      "Ele vaza o lixo tóxico suavemente no chão e o químico vai parar na pia das outras pessoas do bairro.",
      "O vizinho sofre as reações com aquilo, o bairro empesteia estranhamente, mas o problema veio de uma agulha solta guardada anos atrás."
    ],
    images: ["https://image.pollinations.ai/prompt/glowing%20radioactive%20green%20leak%20toxic%20waste%20barrel?width=600&height=400&nologo=true"]
  },
  "38": {
    items: [
      "O 'Undefined' atesta em buscar no hotel a identidade de um hóspede da suíte de luxo que na verdade é um perfeito fantasma invisível.",
      "Quando a recepcionista busca o fantasma, não tem polícia e nem erro emitindo barulho de fraude profunda...",
      "O sistema sorri gentilmente para você devolvendo e entregando silenciosamente a brilhante faixa: 'Indefinido'."
    ],
    images: ["https://image.pollinations.ai/prompt/invisible%20ghost%20guest%20in%20a%20luxury%20hotel%20glowing%20blue?width=600&height=400&nologo=true"]
  },
  "39": {
    items: [
      "O grandioso 'Use Strict' assume o impetuoso papel protetor da mais extrema vacina e guarda das barreiras imigratórias estritas.",
      "Não há nenhuma minúscula tolerância pra pequenos deslizes de bagagem fora de hora nos passaportes informacionais do servidor.",
      "Se o script testar ousadia sem estar formalizado e declarado com crachá crível (let/const), os guardas metralham o log com a tela vermelha antes de deixar explodir o lado de dentro."
    ],
    images: ["https://image.pollinations.ai/prompt/royal%20british%20guard%20with%20glowing%20red%20stop%20sign%20laser?width=600&height=400&nologo=true"]
  },
  "40": {
    items: [
      "Declarações de erro (Try/Catch) funcionam como uma rede de proteção de trapezista no circo.",
      "O 'Try' é o trapezista pulando no vazio acreditando que vai acertar.",
      "Se errar, o 'Catch' (a rede) o segura com segurança evitando a queda brusca, e o 'Finally' garante a limpeza do local independentemente do pulo."
    ],
    images: ["https://image.pollinations.ai/prompt/circus%20acrobat%20trapeze%20falling%20into%20a%20glowing%20safety%20net?width=600&height=400&nologo=true"]
  },
  "41": {
    items: [
      "O fluxo das 4 Declarações assemelha-se a você enviando uma criança para a escola perigosa e sendo o mestre monitor.",
      "O 'Try' é a jornada. O 'Throw' é o cinto de segurança apertando. O 'Catch' é o socorrista intervindo num corte de joelho.",
      "O 'Finally' é o banho no fim do dia e colocar o pijama, independentemente se o dia na escola foi calmo ou um total caos de choro."
    ],
    images: ["https://image.pollinations.ai/prompt/school%20kids%20safety%20crossing%20glowing%20shield%20neon?width=600&height=400&nologo=true"]
  },
  "42": {
    items: [
      "Try / Catch básico atua como a panela de pressão na cozinha super-quente de um restaurante muito focado e rigoroso.",
      "A gente coloca o alimento para fazer (Try), mas ele ferve instável dentro de uma câmara restrita pronta para explodir.",
      "Se der pressão demais, explode pra dentro da rede da válvula de alívio (Catch) que assovia soltando segurança, não a panela na parede."
    ],
    images: ["https://image.pollinations.ai/prompt/pressure%20cooker%20exploding%20safely%20glowing%20smoke%20valve?width=600&height=400&nologo=true"]
  },
  "43": {
    items: [
      "O Throw atua como um inspetor de qualidade de um banco, bloqueando o cheque assim que a conta mostra o primeiro sinal de sujeira.",
      "Se o computador não fizesse nada, o depósito engoliria o cheque sujo tranquilamente (como o Javascript faz).",
      "Mas o inspetor tira o apito e sopra um alto e doloroso THROW e manda parar imediatamente os caminhões do banco."
    ],
    images: ["https://image.pollinations.ai/prompt/bank%20vault%20security%20inspector%20blowing%20glowing%20red%20whistle?width=600&height=400&nologo=true"]
  },
  "44": {
    items: [
      "O Finally atua como o sistema de sprinklers e a equipe de zeladores na arena depois do espetáculo, show ou tragédia de rock and roll.",
      "Não importa minimamente quem tocou ou se o palco estourou de lixo, ou até se todo mundo brigou com todo mundo.",
      "As luzes apagam, o varredor molha o estádio, ele deve desligar as maçanetas e apagar todas as fumaças até a próxima atração."
    ],
    images: ["https://image.pollinations.ai/prompt/janitor%20cleaning%20concert%20stage%20arena%20glowing%20wet%20floor?width=600&height=400&nologo=true"]
  },
  "45": {
    items: [
      "O Mantra é você vivendo com a mais estrita filosofia estoica em uma cidade futurista perigosa dominada por robôs.",
      "Se não der, você grita (Throw). A ambulância vem, e eles colocam a faixa curativa no chão do machucado (Catch).",
      "No fim de todo dia suado e sofrido (Finally), você acorda, liga a máquina de limpeza, bebe uma água e fecha as pálpebras, esperando o amanhã na web."
    ],
    images: ["https://image.pollinations.ai/prompt/stoic%20cyberpunk%20warrior%20glowing%20medic%20healing%20bandages?width=600&height=400&nologo=true"]
  },

  "46": {
    items: [
      "O Objeto de Erro é a verdadeira caixa-preta de um avião acidentado.",
      "Assim que algo falha miseravelmente e a rede de segurança se arma, esse objeto registra todos os dados.",
      "Você o pega (no 'catch') e lê seus registros como 'name' e 'message' para prever exatamente em que local do avião a turbina engasgou."
    ],
    images: ["https://image.pollinations.ai/prompt/glowing%20orange%20black%20box%20flight%20recorder%20data%20streams?width=600&height=400&nologo=true"]
  },
  "47": {
    items: [
      "A Anatomia do 'B.O.' do JS atua como um inspetor detetive carimbando um processo num arquivo policial no milissegundo de fogo.",
      "A folha contém obrigatoriamente 3 coisas impressas na viatura veloz: O Artigo Penal violado, O Fato Descrito pelo civil e a Rota do Sangue.",
      "Assim que cai no Catch, o dev folheia tranquilamente esse Boletim de Ocorrências sem desespero pois as provas estão ricas ali contidas em .name, e .message."
    ],
    images: ["https://image.pollinations.ai/prompt/glowing%20detective%20police%20report%20file%20folder%20cyberpunk?width=600&height=400&nologo=true"]
  },
  "48": {
    items: [
      "Esses perfis criminosos agem em bando no seu sistema, igualzinho a assaltantes clássicos e recorrentes na rua.",
      "A Cadeira que mandaram latir é uma atitude absurda de cobrar inteligência canina de plásticos frios para sentar. Isso é a ofensa absoluta à própria tipologia material (TypeError).",
      "Já acusar uma pessoa de estar num posto sendo que há anos ela desapareceu dos mapas do universo constitui a busca referencial impossível (ReferenceError)."
    ],
    images: ["https://image.pollinations.ai/prompt/cyberpunk%20police%20lineup%20suspects%20glowing%20hologram?width=600&height=400&nologo=true"]
  },
  "49": {
    items: [
      "Range e Sintaxe violam as bases absolutas e quantificáveis de limites sensíveis da natureza universal num simulador espacial e galático.",
      "O Ranger forçado do RangeError é igual mandar o motor girar em Trinta Milhões de Mach sem proteção termodinâmica: rebenta de temperatura excessiva do limite.",
      "Já a Sintaxe alienígena obriga um rádio chinês a entender o zumbido abafado do ruído em código morse trocado: A placa trava inteira."
    ],
    images: ["https://image.pollinations.ai/prompt/rocket%20engine%20exploding%20speed%20glowing%20red%20warning%20alien%20text?width=600&height=400&nologo=true"]
  },
  "50": {
    items: [
      "O Roteamento no sistema age exatamente idêntico a uma grande equipe de enfermagem da meia-noite recebendo caos no Pronto Socorro Central.",
      "Você colhe vários casos ao mesmo tempo saindo da mesma ambulância do escuro (Vindo do Try).",
      "A enfermeira triadora lê a queixa do paciente (O .name), rotula pulseiras Verde, Amarela, Vermelha... roteando o que fazer na internação."
    ],
    images: ["https://image.pollinations.ai/prompt/futuristic%20hospital%20emergency%20triage%20glowing%20colored%20bracelets?width=600&height=400&nologo=true"]
  },

  "51": {
    items: [
      "A Lógica no Exemplo Prático é perfeitamente idêntica à de um segurança rigoroso de uma balada famosa.",
      "Você tenta (try) entrar passando sua carteira de identidade na máquina.",
      "Se não tiver a idade compatível (throw), o segurança barra de imediato.",
      "Sem choro, ele expulsa (catch) com o aviso 'Vai pra casa', limpando a fila (finally) para avaliar a próxima pessoa da noite."
    ],
    images: ["https://image.pollinations.ai/prompt/bouncer%20at%20a%20neon%20nightclub%20checking%20glowing%20id%20card?width=600&height=400&nologo=true"]
  },
  "52": {
    items: [
      "Os Operadores no JS são idênticos às marchas, pedais e volantes de um carro potente.",
      "Você pode ter a lataria do carro mais bonita do mundo e os tanques abastecidos (As Variáveis).",
      "Mas se você não usar o volante (Verbo Direcional) ou engatar a marcha, o carro será para sempre um pedaço de metal estático."
    ],
    images: ["https://image.pollinations.ai/prompt/neon%20glowing%20cyberpunk%20car%20dashboard%20steering%20wheel%20gears?width=600&height=400&nologo=true"]
  },
  "53": {
    items: [
      "Os Operadores Aritméticos agem de forma semelhante a uma máquina engrenada num relógio gigante suíço.",
      "A divisão e multiplicação batem com força matemática exata nas marchas temporais que governam.",
      "Mas o Módulo (%) é a catraca que expele todo grão de areia que sobra para não enganchar o relógio liso."
    ],
    images: ["https://image.pollinations.ai/prompt/glowing%20swiss%20clockwork%20intricate%20gears%20macro%20neon?width=600&height=400&nologo=true"]
  },
  "54": {
    items: [
      "A Atribuição de Memória é como um mágico teleportador colocando e mudando itens na sua mochila do lado esquerdo.",
      "Você olha para a mesa bagunçada na direita e faz cálculos longos: Junta pedras azuis e uma verde.",
      "Quando fecha a conta, o sinal mágico de (=) varre as pedras em milissegundos e crava direto para guardar e reatribuir do lado esquerdo."
    ],
    images: ["https://image.pollinations.ai/prompt/magical%20glowing%20holographic%20backpack%20absorbing%20gemstones%20neon?width=600&height=400&nologo=true"]
  },
  "55": {
    items: [
      "A Comparação de Interrogatório é digna de um detector de metais escaneando e bloqueando contrabando.",
      "O raio-x Frouxo (==) deixa o contrabando macio passar sem bipar a cor, pois o formato era 'parecido'.",
      "Mas se ativar o escaneador Estrito de raio-laser (===), o sistema acusa a textura e atira um bloqueio denso."
    ],
    images: ["https://image.pollinations.ai/prompt/futuristic%20airport%20metal%20detector%20x-ray%20glowing%20red%20alarm?width=600&height=400&nologo=true"]
  },
  "56": {
    items: [
      "As Decisões Complexas lógicas soam como as chaves nucleares em um submarino submerso estrito.",
      "O 'E' Lógico (&&) significa que os generais em pontas opostas DEVEM obrigatoriamente girar a chave simultaneamente de forma exigente.",
      "O 'OU' Lógico (||) age como portas duplas flexíveis na fuga, se uma trava presa, você escapa livremente pela outra lateral desobstruída."
    ],
    images: ["https://image.pollinations.ai/prompt/nuclear%20submarine%20control%20room%20glowing%20red%20launch%20keys%20two%20generals?width=600&height=400&nologo=true"]
  },
  "60": {
    items: [
      "O Ternário atua como um pedágio ultra veloz com apenas duas sinaleiras num cruzamento simples e direto de uma pista expressa.",
      "O motorista bate no pedágio (A Condição), o sinaleiro olha pra Tag dele.",
      "Se tiver crédito, abre a luz de passagem da direita. Se for falso, em milissegundos redireciona obrigatoriamente para a rampa da esquerda."
    ],
    images: ["https://image.pollinations.ai/prompt/cyberpunk%20highway%20toll%20gate%20glowing%20green%20and%20red%20lights?width=600&height=400&nologo=true"]
  },
  "61": {
    items: [
      "Transformar um if..else longo em um Ternário é como jogar fora as pesadas máquinas de escrever burocráticas e enviar uma mensagem por telepatia holográfica instantânea.",
      "Em vez de o inspetor preencher 6 linhas de papel carimbado (IF)...",
      "Ele apenas aponta o dedo, e o laudo é preenchido com a palavra exata usando o poder sintático em um único microssegundo elegante e limpo."
    ],
    images: ["https://image.pollinations.ai/prompt/holographic%20typing%20in%20air%20glowing%20neon%20code%20one%20line?width=600&height=400&nologo=true"]
  },
  "62": {
    items: [
      "A Renderização e os Valores de Fallback do ternário operam como o letreiro mágico e camaleônico de um cassino de alta tecnologia.",
      "A placa não desliga e liga para tomar decisões longas (if)... Ela brilha 'Se Logado, sirva Champanhe', 'Se Fora, Sirva Propaganda'.",
      "O Fallback atesta: 'Manda o Drink Especial, se não tiver, despeja pelo menos a água'. Tudo instantaneamente num piscar de chips."
    ],
    images: ["https://image.pollinations.ai/prompt/neon%20tech%20casino%20sign%20transforming%20glowing%20hologram?width=600&height=400&nologo=true"]
  },
  "63": {
    items: [
      "Um Ternário Aninhado é a personificação do Labirinto do Minotauro sem mapa e sem paredes de vidro, o lugar onde a Mente do Programador vai para morrer de confusão e aflição.",
      "Quando tem muitos pontos de interrogação pendurados de ponta cabeça numa corda de dois pontos soltos, o leitor asfixia.",
      "Você deve abandonar o emaranhado e retornar ao escopo nobre, sólido e compartimentado das grandes colunas do IF e do Switch de Roma."
    ],
    images: ["https://image.pollinations.ai/prompt/confusing%20glowing%20code%20maze%20cyberpunk%20minotaur%20trap?width=600&height=400&nologo=true"]
  },
  "64": {
    items: [
      "O Ponto Flutuante de 64 bits age como uma estante gigante e espaçosa em uma biblioteca cósmica vasta, que aceita pilhas assimétricas de folhas sem fim.",
      "Mas a CPU, e o operador Bitwise, agem como um mestre pedreiro extremamente rigoroso num castelo gótico quadrado.",
      "O mestre não usa areia ou poeira flutuante, ele exige pedras cúbicas estritas, polidas, 100% inteiras e sólidas sem meias medidas decimais."
    ],
    images: ["https://image.pollinations.ai/prompt/glowing%20cosmic%20library%20floating%20books%20versus%20strict%20solid%20gothic%20stone%20blocks?width=600&height=400&nologo=true"]
  },
  "65": {
    items: [
      "O Rebaixamento Mágico aos 32 bits atua brutalmente como um triturador cortante a laser numa esteira de reciclagem industrial do futuro.",
      "Se você mandar para ele uma placa gigante e irregular, cheia de rebarbas imprecisas (o formato 64-bit)...",
      "As pás arrancam ferozmente as bordas decimais e ejetam um bloco pequeno, purificado e perfeitamente quadrado: a Essência Pura em 32 linhas."
    ],
    images: ["https://image.pollinations.ai/prompt/futuristic%20laser%20crusher%20machinery%20cutting%20glowing%20metal%20into%20perfect%20neon%20cubes?width=600&height=400&nologo=true"]
  },
  "66": {
    items: [
      "O Repasse ao Processador e Restauração comportam-se como usar uma bigorna atômica com um alquimista misterioso veloz.",
      "O alquimista pega o seu bloco purificado de 32 bits, espanca a fiação em chamas azuis com seu martelo aplicando a operação (Execução)...",
      "E antes que você pisque e sinta, ele restaura os adornos dourados laterais do luxo perdido de volta ao pacote Flutuante e enfia nos seus bolsos."
    ],
    images: ["https://image.pollinations.ai/prompt/cyberpunk%20alchemist%20hammering%20glowing%20neon%20cube%20on%20an%20atomic%20anvil?width=600&height=400&nologo=true"]
  },
  "67": {
    items: [
      "O 32º bit mais à esquerda trabalha com a vitalidade de vida ou morte de uma enorme Bandeira Mestre erguida por um general montado na linha de frente.",
      "Mesmo que milhões de soldados estejam marchando com escudos prateados dourados na retaguarda do exército (os outros 31 bits)...",
      "Se esse único general cavaleiro segurar a flâmula Rubro Sangue (1), todo o exército cairá instantaneamente no fosso sombrio dos números Negativos."
    ],
    images: ["https://image.pollinations.ai/prompt/ancient%20army%20knight%20general%20holding%20a%20glowing%20blood%20red%20flag%20storm%20sky?width=600&height=400&nologo=true"]
  },
  "68": {
    items: [
      "O Operador Inversor (NOT / ~) é o reflexo sombrio e cruel de um espelho amaldiçoado encontrado por guerreiros celestiais limpos.",
      "Quando as espadas cintilantes (zeros) passam o vidro, um portal sombrio reverte todas as feições no vazio obscuro (uns mágicos).",
      "As bandeiras brancas se mancham e o 32º sentinela muda seu mastro para Vermelho total... A luz positiva afunda instantaneamente nas trevas dos dentes de chumbo Negativos."
    ],
    images: ["https://image.pollinations.ai/prompt/fantasy%20warrior%20looking%20into%20a%20cursed%20glowing%20dark%20mirror%20portal%20inverting%20light?width=600&height=400&nologo=true"]
  },
  "69": {
    items: [
      "As Máscaras de Bits atuam como imensos e longos painéis disjuntores de usinas hidrelétricas, com 32 chaves pesadas.",
      "A operação anterior Lógica apenas dizia: 'A hidrelétrica está ligada'.",
      "Mas a Máscara Bitwise veste capacete, abre a caixa e sobrepõe uma tábua gabarito em cima das 32 chavinhas para ler exatamente quais das comportas do painel estão abertas (1) ou fechadas (0) ao mesmo tempo."
    ],
    images: ["https://image.pollinations.ai/prompt/cyberpunk%20hydroelectric%20power%20plant%20control%20panel%20glowing%20switches%2032%20breakers?width=600&height=400&nologo=true"]
  },
  "70": {
    items: [
      "O AND (&) atua como as grossas e pesadas colunas de uma peneira e filtro de esgoto super rígido.",
      "Se um detrito minúsculo bater em uma malha de buraco fechado em qualquer camada, ele trava ali mesmo.",
      "A Gota d'água (1) só atravessa o túnel livre se o pedreiro botou cano livre no primeiro furo (1) E também o cano de baixo era aberto no mesmo ângulo exato (1). Tudo o resto fica retido (0)."
    ],
    images: ["https://image.pollinations.ai/prompt/glowing%20neon%20water%20filtering%20through%20strict%20metal%20grates%20and%20pipes%20macro?width=600&height=400&nologo=true"]
  },
  "71": {
    items: [
      "O OR (|) opera como as poças flexíveis de tintas brilhantes num fosso de União artística.",
      "Se cair uma gota amarela gigante na coluna (1)... a coluna ganha luz amarela.",
      "Se cair verde na de baixo (1), ganha cor verde. Se os dois canos dispararem, a máquina assume luz intensa de União. Ele só deixa a coluna preta (0) se nenhum dos dois tubos lançar luz nenhuma."
    ],
    images: ["https://image.pollinations.ai/prompt/glowing%20neon%20paint%20mixing%20vats%20tubes%20pouring%20light%20and%20color?width=600&height=400&nologo=true"]
  },
  "72": {
    items: [
      "O XOR (^) é a chave mestra de um cofre antigo de Alternância Mecânica, a própria essência enigmática de espiões de guerra.",
      "Imagine engrenagens que só avançam o dente dentado se os entalhes das duas chaves forem Dissonantes entre si.",
      "Se esbarrar em dois zeros nulos, nada gira. Se empurrar ferro(1) com ferro(1), eles travam e travam o giro (0). Apenas se houver um Vazio encaixando num Espigão de ferro o cilindro secreto girará libertando a Criptografia mestre (1)."
    ],
    images: ["https://image.pollinations.ai/prompt/ancient%20cryptographic%20safe%20lock%20gears%20glowing%20neon%20dissonant%20keys%20espionage?width=600&height=400&nologo=true"]
  },
  "73": {
    items: [
      "O Duplo NOT (~~) é aquele famoso atalho ninja de rua onde o mestre faz a arma inteira girar de volta para as mãos, esquivando elegantemente de pesos extras.",
      "Ao jogar o bumerangue cortante pela 1ª vez (~), o número é alvejado revertendo sombriamente e as casas decimais pesadas despencam da lâmina de 32-bits pelo caminho...",
      "Ao lançar o golpe reverso para resgatar (~ de volta), ele reassume o número no estado positivo Original, só que agora extremamente lustroso, rápido, limpo perfeitamente dos malditos resíduos decimais caídos atrás."
    ],
    images: ["https://image.pollinations.ai/prompt/cyberpunk%20ninja%20throwing%20glowing%20neon%20boomerang%20slashing%20heavy%20decimal%20rocks?width=600&height=400&nologo=true"]
  }
};

const vueContentGroups = [
  { id: "vue-g1", title: "Introdução ao Vue (Guia Inicial)", start: 0, end: 4, color: "bg-emerald-500" },
  { id: "vue-g2", title: "Introdução Rápida (Quick Start)", start: 4, end: 8, color: "bg-blue-500" },
  { id: "vue-g3", title: "Fundamentos I (Aplicação e Sintaxe)", start: 8, end: 14, color: "bg-indigo-500" },
  { id: "vue-g4", title: "Fundamentos II (Reatividade e Lógica)", start: 14, end: 20, color: "bg-purple-500" },
  { id: "vue-g5", title: "Fundamentos III (Estilos e Condicionais)", start: 20, end: 26, color: "bg-pink-500" },
  { id: "vue-g6", title: "Fundamentos IV (Listas e Eventos)", start: 26, end: 32, color: "bg-orange-500" },
  { id: "vue-g7", title: "Fundamentos V (Forms e Formulários)", start: 32, end: 35, color: "bg-teal-500" },
  { id: "vue-g8", title: "Fundamentos VI (Ciclo de Vida e Watchers)", start: 35, end: 41, color: "bg-rose-500" },
  { id: "vue-g9", title: "Fundamentos VII (Refs e Componentização)", start: 41, end: 47, color: "bg-violet-500" }
];

const reactContentGroups = [
  { id: "react-g1", title: "Introdução ao React", start: 0, end: 5, color: "bg-cyan-500" }
];

const angularContentGroups = [
  { id: "angular-g1", title: "Introdução ao Angular", start: 0, end: 5, color: "bg-red-500" }
];

const vueDetailedTopics = [
  {
    id: "v01", label: "O QUE É VUE?", title: "O Framework Vue.js", colorText: "text-emerald-500", colorDot: "bg-emerald-500", icon: Globe,
    description: "Vue é um framework JavaScript para construir interfaces de usuário. Ele se baseia em padrões HTML, CSS e JavaScript e oferece um modelo de programação declarativo e baseado em componentes.",
    points: [
      "Renderização Declarativa: Estende o HTML padrão para descrever saídas baseadas no estado JS.",
      "Reatividade: Rastreia automaticamente as alterações do estado JS e atualiza o DOM.",
      "Progressivo: Pode ser uma simples biblioteca ou um framework completo."
    ],
    details: ["Renderização Declarativa", "Sistema de Reatividade", "Focado na Camada View", "Facilidade de Integração"],
    code: "// Exemplo de Reatividade básica no Vue\nimport { createApp, ref } from 'vue'\n\ncreateApp({\n  setup() {\n    const count = ref(0)\n    return { count }\n  }\n}).mount('#app')"
  },
  {
    id: "v02", label: "PROGRESSIVO", title: "A Abstração Progressiva", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: Zap,
    description: "Vue foi projetado para ser adaptável. Ele pode ser usado de várias maneiras, dependendo da complexidade do projeto, desde o aprimoramento de HTML estático até Single Page Applications (SPAs).",
    points: [
      "Sem Build: Pode ser usado diretamente via CDN como um roteiro de melhoria progressiva.",
      "Com Build: Automação completa com Vite e componentes SFC.",
      "Ecossistema: Router, Pinia e ferramentas oficiais integradas."
    ],
    details: ["Melhoria Progressiva", "Single-Page Application", "Server-Side Rendering", "Mobile & Desktop"],
    code: "<!-- Uso via CDN (Sem Build) -->\n<script src=\"https://unpkg.com/vue@3\"></script>\n\n<div id=\"app\">{{ message }}</div>\n\n<script>\n  Vue.createApp({ data() { return { message: 'Olá Vue!' } } }).mount('#app')\n</script>"
  },
  {
    id: "v03", label: "SFC", title: "Single-File Components", colorText: "text-indigo-500", colorDot: "bg-indigo-500", icon: FileEdit,
    description: "Componentes de Ficheiro Único (SFCs, ou arquivos *.vue) são a forma recomendada de escrever componentes Vue. Eles encapsulam a lógica, o modelo e os estilos em um só lugar.",
    points: [
      "Template: O HTML que define a estrutura visual.",
      "Script: A lógica do componente (JS/TS).",
      "Style: O CSS (com suporte a escopo local)."
    ],
    details: ["Arquivos .vue", "Encapsulamento", "Pré-processamento", "Escopo de Estilo"],
    code: "<script setup>\nimport { ref } from 'vue'\nconst greeting = ref('Hello World!')\n</script>\n\n<template>\n  <p class=\"greeting\">{{ greeting }}</p>\n</template>\n\n<style scoped>\n.greeting { color: red; }\n</style>"
  },
  {
    id: "v04", label: "API STYLES", title: "Options vs Composition API", colorText: "text-purple-500", colorDot: "bg-purple-500", icon: Layout,
    description: "O Vue oferece dois estilos de API. Ambos resolvem os mesmos problemas, mas de maneiras organizacionais diferentes.",
    points: [
      "Options API: Organiza por propriedades de objeto (data, methods, mounted). Ideal para iniciantes.",
      "Composition API: Organiza por lógica usando funções (setup, ref, computed). Ideal para reutilização e Typescript.",
      "Intercambiável: Você pode usar ambos no mesmo projeto ou até no mesmo componente."
    ],
    details: ["Options API (Clássico)", "Composition API (Moderno)", "<script setup>", "Reutilização de Lógica"],
    code: "// Composition API (Moderno)\n<script setup>\nimport { ref, onMounted } from 'vue'\n\nconst count = ref(0)\nfunction increment() { count.value++ }\n\nonMounted(() => console.log('Pronto!'))\n</script>"
  },
  {
    id: "v05", label: "CRIANDO PROJETO", title: "O Comando create-vue", colorText: "text-emerald-400", colorDot: "bg-emerald-400", icon: Zap,
    description: "A forma oficial de começar um projeto Vue com ferramentas de construção (build tools) é através do scaffold create-vue.",
    points: [
      "Comando: Execute 'npm create vue@latest' para iniciar o assistente interativo.",
      "Ferramentas: Suporte nativo para TypeScript, JSX, Router, Pinia, Vitest, e ESLint.",
      "Vite: Alimentado pelo motor Vite para um desenvolvimento extremamente rápido."
    ],
    details: ["Padrão da Indústria", "Assistente Interativo", "Configuração Modular", "Focado em DX"],
    code: "# Criar aplicação Vue oficial\nnpm create vue@latest\n\n# Entrar na pasta e instalar\ncd <project-name>\nnpm install\nnpm run dev"
  },
  {
    id: "v06", label: "ESTRUTURA", title: "Arquivos e Pastas do Projeto", colorText: "text-blue-400", colorDot: "bg-blue-400", icon: Layout,
    description: "Um projeto Vue moderno tem uma estrutura organizada para facilitar a escalabilidade e manutenção.",
    points: [
      "src/main.ts: O ponto de entrada que cria e monta a instância da aplicação.",
      "src/App.vue: O componente raiz da aplicação.",
      "src/components/: Onde residem os componentes secundários e reutilizáveis."
    ],
    details: ["main.js / main.ts", "Pastas assets/ e static/", "vite.config.ts", "package.json"],
    code: "// src/main.ts\nimport { createApp } from 'vue'\nimport App from './App.vue'\n\ncreateApp(App).mount('#app')"
  },
  {
    id: "v07", label: "USO VIA CDN", title: "Vue sem Ferramentas de Build", colorText: "text-amber-400", colorDot: "bg-amber-400", icon: Globe,
    description: "Vue pode ser usado sem um processo de build, ideal para aprimorar páginas web existentes de forma progressiva.",
    points: [
      "Global Build: Um único arquivo JS que expõe o objeto 'Vue' no escopo global.",
      "ES Module Build: Aproveita o suporte nativo a módulos nos navegadores modernos.",
      "Sem Compilação: Os templates são compilados direto no navegador (runtime)."
    ],
    details: ["unpkg.com", "Melhoria Progressiva", "Rápido de configurar", "Sem Node_modules"],
    code: "<!-- ES Module Build -->\n<div id=\"app\">{{ message }}</div>\n\n<script type=\"module\">\n  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'\n  createApp({ data() { return { message: 'Hello!' } } }).mount('#app')\n</script>"
  },
  {
    id: "v08", label: "IMPORT MAPS", title: "Mapas de Importação", colorText: "text-pink-400", colorDot: "bg-pink-400", icon: Network,
    description: "Import Maps permitem que você use aliases para URLs de módulos longos, facilitando o uso de módulos ES via CDN.",
    points: [
      "Aliases: Define 'vue' para apontar para uma URL específica da versão mais estável.",
      "Organização: Mantém o código limpo ao usar imports simples como 'import { ref } from \"vue\"'.",
      "Suporte: Funcionam nativamente em navegadores modernos sem ferramentas externas."
    ],
    details: ["script type='importmap'", "URLs amigáveis", "Gerenciamento de versões", "Native ESM"],
    code: "<script type=\"importmap\">\n  {\n    \"imports\": {\n      \"vue\": \"https://unpkg.com/vue@3/dist/vue.esm-browser.js\"\n    }\n  }\n</script>\n\n<script type=\"module\">\n  import { createApp } from 'vue'\n  // 'vue' resolve para a URL acima!\n</script>"
  },
  {
    id: "v09", label: "A INSTÂNCIA", title: "Criando uma Aplicação", colorText: "text-emerald-500", colorDot: "bg-emerald-500", icon: Settings2,
    description: "Toda aplicação Vue começa com a criação de uma instância de aplicação usando a função createApp.",
    points: [
      "Ponto de Entrada: A instância é onde você registra recursos globais (plugins, diretivas).",
      "Encapsulamento: Múltiplas instâncias podem coexistir na mesma página sem conflitos.",
      "Cadeia: Métodos de instância como .use() e .component() podem ser encadeados."
    ],
    details: ["createApp", "Instância de App", "Root Component", "Plugins Globais"],
    code: "import { createApp } from 'vue'\nconst app = createApp({ /* opções */ })\n\napp.use(myPlugin)\napp.mount('#app')"
  },
  {
    id: "v10", label: "RAIZ", title: "O Componente Raiz", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: Layout,
    description: "A instância createApp requer um objeto de componente que servirá como o 'componente raiz' da árvore de componentes.",
    points: [
      "Pai de Todos: É o componente de nível superior que contém todos os outros.",
      "Single File Component: Geralmente é um arquivo App.vue importado no main.js.",
      "Opções: Pode conter dados, métodos e gatilhos de ciclo de vida globais."
    ],
    details: ["App.vue", "Component Tree", "Entry Point", "Root Instance"],
    code: "// Importando o componente raiz\nimport App from './App.vue'\nconst app = createApp(App)\napp.mount('#app')"
  },
  {
    id: "v11", label: "MONTAGEM", title: "Montando no DOM", colorText: "text-indigo-500", colorDot: "bg-indigo-500", icon: Zap,
    description: "Uma instância de aplicação não renderizará nada até que seu método .mount() seja chamado no elemento do DOM desejado.",
    points: [
      "Seletor CSS: Recebe uma string (ex: '#app') ou um elemento real do DOM.",
      "Conteúdo Inicial: O Vue limpará o conteúdo do elemento e renderizará a app dentro dele.",
      "Último Passo: A montagem deve ocorrer após todas as configurações da aplicação (plugins, etc)."
    ],
    details: ["app.mount()", "Container ID", "DOM Connection", "Initial Render"],
    code: "<div id=\"app\"></div>\n\n<script>\n  app.mount('#app')\n</script>"
  },
  {
    id: "v12", label: "INTERPOLAÇÃO", title: "Sintaxe de Mustaches", colorText: "text-emerald-400", colorDot: "bg-emerald-400", icon: FileEdit,
    description: "A forma mais básica de vinculação de dados é a interpolação de texto usando as 'chaves duplas' (Double Mustaches).",
    points: [
      "Sincronização: O texto dentro das chaves será substituído pelo valor da propriedade correspondente.",
      "Reatividade: Sempre que a propriedade muda, o texto no navegador é atualizado automaticamente.",
      "Raw HTML: Mustache interpreta dados como texto puro, não HTML (use v-html para isso)."
    ],
    details: ["{{ expressao }}", "Text Content", "Auto-update", "Reactive Bind"],
    code: "<span>Mensagem: {{ msg }}</span>\n\n<!-- Atencão: v-html é perigoso (XSS) -->\n<p>HTML: <span v-html=\"rawHtml\"></span></p>"
  },
  {
    id: "v13", label: "ATRIBUTOS", title: "Vinculando com v-bind", colorText: "text-blue-400", colorDot: "bg-blue-400", icon: Palette,
    description: "Mustaches não funcionam em atributos HTML. Para vincular um atributo a uma expressão dinâmica, usamos a diretiva v-bind.",
    points: [
      "Abreviação: Em vez de 'v-bind:id', podemos simplesmente usar ':id'.",
      "Booleanos: Atributos como 'disabled' desaparecerão se o valor for 'falsy' (null, false, undefined).",
      "Múltiplos Atributos: v-bind sem argumento pode vincular um objeto inteiro de atributos."
    ],
    details: ["v-bind:href", ":src", ":id", ":class"],
    code: "<!-- Forma longa -->\n<div v-bind:id=\"dynamicId\"></div>\n\n<!-- Abreviação (Padrão) -->\n<button :disabled=\"isButtonDisabled\">Enviar</button>"
  },
  {
    id: "v14", label: "EXPRESSÕES", title: "Lógica no Template", colorText: "text-purple-400", colorDot: "bg-purple-400", icon: Network,
    description: "O Vue suporta todo o poder das expressões JavaScript dentro de mustaches e diretivas, desde que seja apenas UMA expressão.",
    points: [
      "Unitário: Deve ser uma expressão que possa retornar um valor (não declarações como 'var a = 1').",
      "Acesso Global: Templates têm acesso limitado a globais permitidos (Math, Date).",
      "Simplicidade: Evite lógica complexa no template; prefixe-a em propriedades computadas."
    ],
    details: ["JS Expressions", "Ternários", "Math & Date", "String Interpolation"],
    code: "{{ number + 1 }}\n{{ ok ? 'SIM' : 'NÃO' }}\n{{ message.split('').reverse().join('') }}\n\n<div :id=\"`list-${id}`\"></div>"
  },
  {
    id: "v15", label: "REF", title: "Estado Reativo com ref()", colorText: "text-emerald-500", colorDot: "bg-emerald-500", icon: Zap,
    description: "Na Composition API, a forma recomendada de declarar um estado reativo é usando a função ref().",
    points: [
      "Qualquer Tipo: Funciona com strings, números, booleanos ou objetos complexos.",
      ".value: No Script, você acessa o valor via 'count.value'. No Template, ele é desembrulhado automaticamente.",
      "Identidade: O objeto retornado por ref() mantém a reatividade mesmo quando passado para funções."
    ],
    details: ["ref(initialValue)", ".value syntax", "Auto-unwrapping", "Reatividade forte"],
    code: "import { ref } from 'vue'\n\nconst count = ref(0)\nconsole.log(count.value) // 0\n\ncount.value++"
  },
  {
    id: "v16", label: "REACTIVE", title: "Objetos com reactive()", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: Layout,
    description: "A função reactive() cria uma versão reativa de um objeto (ou array) usando Proxies de JavaScript.",
    points: [
      "Apenas Objetos: Ao contrário do ref(), reactive() funciona apenas com tipos de objeto (Object, Array, Map).",
      "Sem .value: O acesso é direto nas propriedades do objeto como um objeto normal.",
      "Limitação: Perde a reatividade se for desestruturado ou reatribuído inteiramente."
    ],
    details: ["reactive({})", "Proxy based", "Deep reactivity", "State management"],
    code: "import { reactive } from 'vue'\n\nconst state = reactive({ count: 0 })\nstate.count++ // Acesso direto!"
  },
  {
    id: "v17", label: "MUTAÇÃO", title: "Sistema de Reatividade", colorText: "text-indigo-500", colorDot: "bg-indigo-500", icon: Network,
    description: "O sistema de reatividade do Vue rastreia dependências e dispara atualizações do DOM instantaneamente após a mutação.",
    points: [
      "DOM Assíncrono: O Vue não atualiza o DOM imediatamente após a mudança; ele espera o próximo 'tick'.",
      "Deep: Por padrão, a reatividade é profunda; mudar um item em um sub-objeto dispara a atualização.",
      "Proxies: No Vue 3, o sistema usa ES6 Proxies para interceptar get/set de forma transparente."
    ],
    details: ["nextTick()", "Dependency Tracking", "Proxy Interception", "Async Updates"],
    code: "import { nextTick } from 'vue'\n\nasync function increment() {\n  count.value++\n  // DOM ainda nã mudou...\n  await nextTick()\n  // DOM agora está atualizado!\n}"
  },
  {
    id: "v18", label: "CONCEITO", title: "Propriedades Computadas", colorText: "text-purple-400", colorDot: "bg-purple-400", icon: FileEdit,
    description: "Para lógica complexa que depende de outros estados, usamos computed() para criar valores derivados reativos.",
    points: [
      "Declarativo: Descreve o valor final baseado em outros refs ou objetos reactive.",
      "Auto-Update: Se os dados base mudarem, a computada recalcula o valor automaticamente.",
      "Limpo: Mantém o template focado em apresentação, movendo a lógica para o Script."
    ],
    details: ["computed(() => ...)", "Derived State", "Reatividade Automática", "Clean Templates"],
    code: "const count = ref(1)\nconst double = computed(() => count.value * 2)\n\n// double.value será 2"
  },
  {
    id: "v19", label: "CACHE", title: "Computada vs Métodos", colorText: "text-amber-400", colorDot: "bg-amber-400", icon: Clock,
    description: "A principal diferença entre uma computada e um método é o sistema de cache inteligente baseado em dependências.",
    points: [
      "Cache: Computadas são armazenadas em cache. Elas SÓ recalculam se uma dependência reativa mudar.",
      "Performance: Métodos executam toda vez que ocorre uma nova renderização, mesmo se nada mudou neles.",
      "Imutável: Por padrão, computadas são apenas leitura (readonly)."
    ],
    details: ["Caching", "Dependency tracking", "Efficiency", "Getter only"],
    code: "// Computada (usa Cache)\nconst listSize = computed(() => items.length)\n\n// Método (executa sempre)\nfunction getListSize() { return items.length }"
  },
  {
    id: "v20", label: "WRITABLE", title: "Computed Gravável", colorText: "text-pink-400", colorDot: "bg-pink-400", icon: MousePointer2,
    description: "Embora a maioria das computadas sejam 'getters', você pode criar uma computada que aceita valores (setter).",
    points: [
      "Getter: Define como ler o valor.",
      "Setter: Define o que acontece ao tentar atribuir um novo valor à propriedade computada.",
      "Sincronização: Útil para vincular componentes de UI (como Inputs) a estados complexos."
    ],
    details: ["get()", "set()", "Two-way binding", "Custom Logic"],
    code: "const fullName = computed({\n  get() { return firstName.value + ' ' + lastName.value },\n  set(newValue) {\n    [firstName.value, lastName.value] = newValue.split(' ')\n  }\n})"
  },
  {
    id: "v21", label: "CLASSES (OBJ)", title: "Classes Dinâmicas", colorText: "text-emerald-500", colorDot: "bg-emerald-500", icon: Palette,
    description: "Podemos passar um objeto para :class para alternar classes dinamicamente.",
    points: [
      "Chave/Valor: A chave é o nome da classe, o valor é uma condição booleana.",
      "Combinação: Classes dinâmicas coexistem com a classe estática normal.",
      "Limpeza: Mantém a manipulação do DOM fora do JavaScript manual."
    ],
    details: [":class='{ active: isActive }'", "Inline Objects", "State driven visual", "Toggles"],
    code: "<div \n  class=\"base-bullet\"\n  :class=\"{ active: isActive, 'text-danger': hasError }\"\n></div>"
  },
  {
    id: "v22", label: "CLASSES (ARRAY)", title: "Sintaxe de Array", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: Layout,
    description: "Podemos vincular :class a um array para aplicar uma lista de classes.",
    points: [
      "Multi-seleção: Ótimo para aplicar múltiplas classes baseadas em diferentes estados.",
      "Ternários: Podemos usar expressões ternárias dentro do array.",
      "Objetos em Arrays: Você pode misturar as duas sintaxes para flexibilidade total."
    ],
    details: [":class='[ac1, ac2]'", "Conditional Arrays", "Class composition", "Dynamic list"],
    code: "<div :class=\"[activeClass, errorClass]\"></div>\n\n<!-- Com ternário -->\n<div :class=\"[isActive ? activeClass : '', errorClass]\"></div>"
  },
  {
    id: "v23", label: "ESTILOS INLINE", title: "Vínculo de Estilo", colorText: "text-pink-500", colorDot: "bg-pink-500", icon: Palette,
    description: "A diretiva :style suporta valores de objeto que correspondem às propriedades CSS do elemento.",
    points: [
      "CamelCase: Propriedades CSS podem usar nomes camelCase (fontSize) ou kebab-case ('font-size').",
      "Objetos: Vincular a um objeto de estilo limpa o template e melhora a legibilidade.",
      "Auto-prefixing: O Vue adiciona prefixos de navegador automaticamente quando necessário."
    ],
    details: [":style='{ color: c }'", "Dynamic CSS", "Inline Overrides", "Vendor Prefixing"],
    code: "<div :style=\"{ color: activeColor, fontSize: fontSize + 'px' }\"></div>\n\n<!-- Vincular a objeto -->\n<div :style=\"styleObject\"></div>"
  },
  {
    id: "v24", label: "V-IF", title: "Renderização Condicional", colorText: "text-emerald-400", colorDot: "bg-emerald-400", icon: Zap,
    description: "A diretiva v-if é usada para renderizar condicionalmente um bloco. O bloco só será renderizado se a expressão retornar um valor verdadeiro.",
    points: [
      "Verdadeiro: Se falso, o elemento é removido completamente do DOM.",
      "Blocos: Pode ser usado com v-else e v-else-if para condições complexas.",
      "Custo: Maior custo ao alternar (lazy), menor custo inicial se for falso."
    ],
    details: ["v-if", "v-else-if", "v-else", "Lazy rendering"],
    code: "<h1 v-if=\"awesome\">Vue is awesome!</h1>\n<h1 v-else>Oh no 😢</h1>"
  },
  {
    id: "v25", label: "V-SHOW", title: "Visibilidade do Elemento", colorText: "text-blue-400", colorDot: "bg-blue-400", icon: Globe,
    description: "Outra opção para exibir condicionalmente um elemento é a diretiva v-show.",
    points: [
      "Sempre no DOM: O elemento permanece no DOM, apenas alterna 'display: none'.",
      "Frequência: Melhor para elementos que alternam a visibilidade com muita frequência.",
      "Simplicidade: Não suporta a tag <template> nem v-else."
    ],
    details: ["display: none", "Toggle efficiency", "Always mounted", "CSS based"],
    code: "<h1 v-show=\"ok\">Hello!</h1>"
  },
  {
    id: "v26", label: "TEMPLATE", title: "v-if no <template>", colorText: "text-indigo-400", colorDot: "bg-indigo-400", icon: Layout,
    description: "Como v-if é uma diretiva, ela deve ser anexada a um único elemento. Mas e se quisermos alternar mais de um elemento?",
    points: [
      "Invisível: <template> age como um wrapper invisível que não aparece no DOM final.",
      "Agrupamento: Permite aplicar v-if a um conjunto de elementos sem adicionar tags extras.",
      "Sintaxe: Funciona apenas com v-if, não com v-show."
    ],
    details: ["<template v-if>", "Invisible wrapper", "Logic grouping", "Clean DOM"],
    code: "<template v-if=\"ok\">\n  <h1>Title</h1>\n  <p>Paragraph 1</p>\n  <p>Paragraph 2</p>\n</template>"
  },
  {
    id: "v27", label: "V-FOR", title: "Renderização de Listas", colorText: "text-orange-500", colorDot: "bg-orange-500", icon: FileEdit,
    description: "Usamos a diretiva v-for para renderizar uma lista de elementos com base em um array.",
    points: [
      "Sintaxe: 'item in items', onde items é o array fonte e item é o apelido do elemento atual.",
      "Índice: Suporta um segundo argumento opcional para o índice: '(item, index) in items'.",
      "Escopo: O template dentro do v-for tem acesso total às propriedades do pai."
    ],
    details: ["item in items", "(item, index)", "Array rendering", "Sync UI"],
    code: "<ul>\n  <li v-for=\"item in items\" :key=\"item.id\">\n    {{ item.message }}\n  </li>\n</ul>"
  },
  {
    id: "v28", label: "OBJETOS", title: "v-for com Objetos", colorText: "text-amber-500", colorDot: "bg-amber-500", icon: Layout,
    description: "Você também pode usar v-for para percorrer as propriedades de um objeto.",
    points: [
      "Valor: '(value) in myObject' para pegar os valores.",
      "Chave: '(value, key) in myObject' para pegar chave e valor.",
      "Índice: '(value, key, index) in myObject' para ter também a posição."
    ],
    details: ["Object iteration", "Key/Value access", "Metadata lists", "Property loop"],
    code: "<ul>\n  <li v-for=\"(value, key) in myObject\">\n    {{ key }}: {{ value }}\n  </li>\n</ul>"
  },
  {
    id: "v29", label: "IMPORTÂNCIA DA KEY", title: "Atributo :key", colorText: "text-red-500", colorDot: "bg-red-500", icon: Fingerprint,
    description: "Quando o Vue atualiza uma lista renderizada com v-for, ele usa uma estratégia de 'remendos no local' (patch in-place).",
    points: [
      "Identidade: A key ajuda o Vue a rastrear a identidade de cada nó para reutilizar e reordenar elementos.",
      "Performance: Sem keys, o Vue pode ter comportamentos inesperados em estados de componentes filhos.",
      "Padrão: É altamente recomendado sempre fornecer uma key para v-for."
    ],
    details: [":key='unique_id'", "DOM tracking", "Performance boost", "State preservation"],
    code: "<div v-for=\"item in items\" :key=\"item.id\">\n  <!-- conteúdo -->\n</div>"
  },
  {
    id: "v30", label: "V-ON", title: "Manipulação de Eventos", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: MousePointer2,
    description: "Usamos a diretiva v-on, comumente abreviada como @, para ouvir eventos do DOM e executar JavaScript quando eles ocorrem.",
    points: [
      "Abreviação: '@click' é o mesmo que 'v-on:click'.",
      "Métodos: Pode chamar um nome de método ou executar código JavaScript diretamente (inline).",
      "Nativos: Suporta todos os eventos nativos do navegador."
    ],
    details: ["@click", "v-on:submit", "Inline handlers", "Method handlers"],
    code: "<button @click=\"count++\">Adicionar 1</button>\n<p>O contador é: {{ count }}</p>"
  },
  {
    id: "v31", label: "ARGUMENTOS", title: "Chamando Métodos", colorText: "text-indigo-500", colorDot: "bg-indigo-500", icon: Network,
    description: "Podemos passar argumentos personalizados para um método em um manipulador de eventos.",
    points: [
      "Customizado: 'say(\"oi\")' passa a string para a função.",
      "Evento Nativo: Se precisar do objeto de evento nativo, use a variável especial '$event'.",
      "Arrow Functions: Também suporta passagem de múltiplos argumentos complexos."
    ],
    details: ["$event", "Method arguments", "Action payloads", "Event handling"],
    code: "<button @click=\"warn('Form not submitted.', $event)\">\n  Submit\n</button>"
  },
  {
    id: "v32", label: "MODIFICADORES", title: "Modificadores de Eventos", colorText: "text-teal-500", colorDot: "bg-teal-500", icon: Settings2,
    description: "É muito comum chamar event.preventDefault() ou event.stopPropagation() dentro de manipuladores. O Vue oferece modificadores para isso.",
    points: [
      ".stop: Interrompe a propagação do evento (bubbling).",
      ".prevent: Impede o comportamento padrão do navegador (como recarregar no submit).",
      "Encaixe: Os modificadores foram encadeados: '@click.stop.prevent'."
    ],
    details: [".prevent", ".stop", ".once", ".capture"],
    code: "<!-- impede o recarregamento da página -->\n<form @submit.prevent=\"onSubmit\"></form>\n\n<!-- o clique não vai propagar para o pai -->\n<a @click.stop=\"doThis\"></a>"
  },
  {
    id: "v33", label: "V-MODEL", title: "Entrada de Forms", colorText: "text-emerald-500", colorDot: "bg-emerald-500", icon: FileEdit,
    description: "Ao lidar com formulários no frontend, precisamos sincronizar o estado dos elementos de entrada com o estado no JavaScript. O v-model simplifica isso.",
    points: [
      "Bidirecional: O valor do input atualiza a variável e a variável atualiza o input.",
      "Tipo de Input: Funciona com <input>, <textarea> e <select> automaticamente.",
      "Abreviação: v-model é na verdade um 'açúcar sintático' para v-bind:value e v-on:input."
    ],
    details: ["v-model", "Two-way bind", "Form state", "Input sync"],
    code: "<input v-model=\"text\">\n<p>Editando: {{ text }}</p>"
  },
  {
    id: "v34", label: "TIPOS INPUT", title: "Texto e Área", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: Layout,
    description: "O v-model se adapta ao tipo do elemento. Para textos simples e áreas de texto, ele usa a propriedade value e ouvintes de entrada.",
    points: [
      "Text: <input type='text'> padrão.",
      "Textarea: Diferente da interpolação {{ }}, <textarea> usa v-model.",
      "IME: v-model não atualiza durante a composição IME (ex: chinês) até que o caractere seja confirmado."
    ],
    details: ["<input>", "<textarea>", "IME support", "Value binding"],
    code: "<span>Mensagem multilinha é:</span>\n<p style=\"white-space: pre-line;\">{{ message }}</p>\n<textarea v-model=\"message\" placeholder=\"add lines\"></textarea>"
  },
  {
    id: "v35", label: "CONTROLES", title: "Checkbox e Select", colorText: "text-indigo-500", colorDot: "bg-indigo-500", icon: Zap,
    description: "Para elementos de múltipla escolha como checkboxes e seletores, o v-model trabalha com valores booleanos ou arrays.",
    points: [
      "Checkbox: Se único, é booleano. Se múltiplos, v-model aponta para um Array.",
      "Radio: Atribui o valor do rádio selecionado à variável.",
      "Select: Sincroniza a opção selecionada. Suporta valores únicos ou múltiplos (se multiple estiver presente)."
    ],
    details: ["Checkbox array", "Radio buttons", "Multi-select", "Dynamic options"],
    code: "<input type=\"checkbox\" id=\"jack\" value=\"Jack\" v-model=\"checkedNames\">\n<input type=\"checkbox\" id=\"john\" value=\"John\" v-model=\"checkedNames\">\n\n<span>Nomes: {{ checkedNames }}</span>"
  },
  {
    id: "v36", label: "ONMOUNTED", title: "Gancho de Montagem", colorText: "text-rose-500", colorDot: "bg-rose-500", icon: PlaySquare,
    description: "Cada instância de componente Vue passa por uma série de etapas de inicialização e o onMounted é uma das mais importantes.",
    points: [
      "Pronto: Executado após o componente ter sido montado no DOM.",
      "DOM Access: É o lugar seguro para acessar elementos reais via 'refs'.",
      "Side Effects: Ideal para iniciar chamadas de API ou configurar timers."
    ],
    details: ["onMounted()", "DOM Ready", "Initial Fetch", "Component Start"],
    code: "import { onMounted } from 'vue'\n\nonMounted(() => {\n  console.log('O componente foi montado!')\n})"
  },
  {
    id: "v37", label: "ONUPDATED", title: "Gancho de Atualização", colorText: "text-orange-500", colorDot: "bg-orange-500", icon: Clock,
    description: "Chamado após o componente atualizar sua árvore DOM devido a uma mudança de estado reativo.",
    points: [
      "Re-render: Disparado sempre que qualquer dado usado no template muda.",
      "Precaução: Evite mudar o estado do componente dentro deste gancho (risco de loop infinito).",
      "DOM Sync: Use se você precisar ler o novo estado do DOM pós-renderização."
    ],
    details: ["onUpdated()", "DOM Re-render", "Post-render logic", "Sync state"],
    code: "import { onUpdated } from 'vue'\n\nonUpdated(() => {\n  // DOM agora está sincronizado com o novo estado\n})"
  },
  {
    id: "v38", label: "ONUNMOUNTED", title: "Gancho de Desmontagem", colorText: "text-amber-500", colorDot: "bg-amber-500", icon: Power,
    description: "Chamado após o componente ter sido removido do DOM (destruído).",
    points: [
      "Limpeza: O lugar essencial para remover event listeners manuais.",
      "Recursos: Pare intervalos (setInterval) ou cancele assinaturas de dados.",
      "Memória: Previne vazamentos de memória (Memory Leaks) na aplicação."
    ],
    details: ["onUnmounted()", "Cleanup", "Destroy", "Memory safe"],
    code: "import { onUnmounted } from 'vue'\n\nonUnmounted(() => {\n  clearInterval(timer)\n  console.log('Componente removido!')\n})"
  },
  {
    id: "v39", label: "WATCH", title: "Observadores Reativos", colorText: "text-emerald-400", colorDot: "bg-emerald-400", icon: Eye,
    description: "Nem tudo pode ser resolvido com computadas. Às vezes precisamos reagir a uma mudança com 'efeitos colaterais' (API calls, etc).",
    points: [
      "Vigilância: Observa uma fonte de dados específica e executa um callback quando ela muda.",
      "Old/New: O callback recebe o novo valor e o valor antigo como argumentos.",
      "Preciso: Ideal para salvar estados em LocalStorage ou disparar animações manuais."
    ],
    details: ["watch(source, cb)", "Side effects", "Async reacting", "Old/New values"],
    code: "watch(question, async (newQ, oldQ) => {\n  if (newQ.includes('?')) {\n    const res = await fetch(...)\n  }\n})"
  },
  {
    id: "v40", label: "DEEP WATCH", title: "Observação Profunda", colorText: "text-blue-400", colorDot: "bg-blue-400", icon: Search,
    description: "Por padrão, o watch em um objeto não dispara se uma propriedade interna mudar, apenas se o objeto for substituído.",
    points: [
      "Sub-níveis: Ative 'deep: true' para monitorar todas as propriedades aninhadas.",
      "Custo: Observações profundas em grandes estruturas podem ser lentas.",
      "Reactive: Objetos criados com 'reactive()' são monitorados profundamente por padrão no watch."
    ],
    details: ["{ deep: true }", "Nested data", "Full sync", "Object tracking"],
    code: "watch(settings, (newVal) => {\n  // Dispara se settings.theme mudar!\n}, { deep: true })"
  },
  {
    id: "v41", label: "WATCHEFFECT", title: "Observação de Efeito", colorText: "text-indigo-400", colorDot: "bg-indigo-400", icon: Zap,
    description: "Simplifica a observação ao rastrear automaticamente todas as dependências reativas usadas dentro do callback.",
    points: [
      "Automático: Você não precisa listar o que observar; o Vue detecta o que você usou.",
      "Imediato: Diferente do watch, o watchEffect roda uma vez imediatamente ao ser criado.",
      "Injeção: Útil quando você tem múltiplos estados influenciando uma única ação."
    ],
    details: ["watchEffect()", "Auto-tracking", "Immediate start", "Effect sync"],
    code: "watchEffect(() => {\n  // Roda sempre que 'userId' OU 'token' mudar\n  fetchData(userId.value, token.value)\n})"
  },
  {
    id: "v42", label: "TEMPL_REFS", title: "Referências de Template", colorText: "text-pink-400", colorDot: "bg-pink-400", icon: MousePointer2,
    description: "Embora o Vue prefira o modelo declarativo, às vezes você precisa de acesso direto ao elemento DOM subjacente.",
    points: [
      "Atributo ref: Adicione 'ref=\"myInput\"' no elemento no template.",
      "Ref JS: Crie uma constante com o mesmo nome usando 'ref(null)'.",
      "Timing: A referência só é preenchida APÓS o componente ser montado."
    ],
    details: ["ref='nome'", "DOM access", "Focus control", "Direct touch"],
    code: "<input ref=\"inputRef\">\n\n<script setup>\nconst inputRef = ref(null)\nonMounted(() => inputRef.value.focus())\n</script>"
  },
  {
    id: "v43", label: "COMP_REFS", title: "Refs em Componentes", colorText: "text-orange-400", colorDot: "bg-orange-400", icon: Layout,
    description: "As refs também podem ser usadas em componentes filhos para acessar suas instâncias públicas.",
    points: [
      "Instância: Permite chamar métodos expostos pelo componente filho.",
      "Encapsulamento: Por padrão, componentes SFC são fechados (private) para refs.",
      "defineExpose: O filho deve usar defineExpose para escolher o que o pai pode ver."
    ],
    details: ["defineExpose", "Child access", "Public API", "Component control"],
    code: "<!-- Pai -->\n<BaseModal ref=\"modal\" />\n\nconst modal = ref(null)\nmodal.value.open() // Chama método do filho"
  },
  {
    id: "v44", label: "V-FOR REFS", title: "Refs em Listas", colorText: "text-red-400", colorDot: "bg-red-400", icon: Network,
    description: "Quando uma ref é usada dentro de um v-for, ela se torna um array contendo todos os elementos da lista.",
    points: [
      "Coleção: O valor da ref será um Array de elementos do DOM ou instâncias de componentes.",
      "Ordem: A ordem do array de refs não é garantida para corresponder à ordem da lista.",
      "Uso: Comumente usado para gerenciar focos dinâmicos ou medir dimensões de listas."
    ],
    details: ["Array refs", "Dynamic collection", "Loop access", "Bulk refs"],
    code: "<li v-for=\"i in list\" ref=\"itemRefs\">{{ i }}</li>\n\nconst itemRefs = ref([])"
  },
  {
    id: "v45", label: "MODULARIDADE", title: "Fundamentos de Componentes", colorText: "text-emerald-500", colorDot: "bg-emerald-500", icon: Layout,
    description: "Componentes permitem dividir a interface em peças independentes, reutilizáveis e isoladas.",
    points: [
      "Abstração: Um componente encapsula seu próprio template, lógica e estilo.",
      "Reutilização: O mesmo componente pode ser instanciado várias vezes com comportamentos diferentes.",
      "Hierarquia: Aplicações são construídas como uma árvore de componentes aninhados."
    ],
    details: ["Reusability", "Composition", "Isolamento", "Component Tree"],
    code: "<!-- Reutilizando o mesmo componente -->\n<ButtonCounter />\n<ButtonCounter />\n<ButtonCounter />"
  },
  {
    id: "v46", label: "PROPS", title: "Passando Dados (Props)", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: ArrowUpCircle,
    description: "Props são atributos customizados que você pode registrar em um componente para permitir que o pai passe dados para ele.",
    points: [
      "Fluxo Unidirecional: Dados fluem de cima para baixo. Filhos nunca devem alterar props.",
      "Validação: Você pode definir tipos, se é obrigatório e valores padrão.",
      "Declarativo: O pai passa o dado como um atributo HTML comum ou via v-bind."
    ],
    details: ["defineProps()", "One-way data flow", "Validation", "Read-only"],
    code: "// Filho\ndefineProps(['title'])\n\n// Pai\n<BlogPost :title=\"post.title\" />"
  },
  {
    id: "v47", label: "EMITS", title: "Escutando Eventos (Emits)", colorText: "text-indigo-500", colorDot: "bg-indigo-500", icon: Zap,
    description: "Componentes filhos podem emitir seus próprios eventos para notificar o pai sobre alguma ação interna.",
    points: [
      "Sinalização: O filho 'grita' um evento; o pai 'ouve' usando @nome-do-evento.",
      "Payloads: Eventos podem carregar dados adicionais para o pai processar.",
      "Contrato: Use defineEmits para documentar os eventos que o componente pode disparar."
    ],
    details: ["defineEmits()", "Event bubbling", "Child-to-parent", "Custom events"],
    code: "// Filho\nconst emit = defineEmits(['enlarge-text'])\n<button @click=\"emit('enlarge-text')\">Aumentar</button>\n\n// Pai\n<BlogPost @enlarge-text=\"fontSize += 0.1\" />"
  }
];

const reactDetailedTopics = [
  {
    id: "r01", label: "O QUE É REACT?", title: "Biblioteca de Interfaces", colorText: "text-cyan-400", colorDot: "bg-cyan-400", icon: Globe,
    description: "React é uma biblioteca JavaScript para construir interfaces de usuário baseadas em componentes.",
    points: [
      "Declarativo: Você descreve como a UI deve ser para cada estado, e o React cuida de atualizar o DOM.",
      "Baseado em Componentes: Construa componentes encapsulados que gerenciam seu próprio estado.",
      "Aprenda uma vez, escreva em qualquer lugar: Pode ser usado no navegador (DOM), em mobile (Native) e até VR."
    ],
    details: ["Component-Based", "Declarative UI", "Ecossistema Rico", "Meta/Facebook"],
    code: "import React from 'react';\n\nfunction Welcome() {\n  return <h1>Olá, Mundo!</h1>;\n}"
  },
  {
    id: "r02", label: "VIRTUAL DOM", title: "O Motor de Performance", colorText: "text-blue-400", colorDot: "bg-blue-400", icon: Zap,
    description: "O Virtual DOM é uma representação em memória do DOM real, permitindo atualizações extremamente rápidas.",
    points: [
      "Diffing Algorithm: O React compara a nova árvore virtual com a anterior para encontrar mudanças.",
      "Reconciliação: Apenas os elementos que realmente mudaram são atualizados no navegador.",
      "Eficiência: Evita manipulações custosas de todo o documento HTML."
    ],
    details: ["Memory DOM", "Diffing", "Batch Updates", "Reconciliation"],
    code: "// O React faz isso por baixo dos panos\n// comparando árvores de objetos JS\nconst virtualNode = {\n  type: 'h1',\n  props: { children: 'Olá!' }\n};"
  },
  {
    id: "r03", label: "JSX", title: "JavaScript XML", colorText: "text-indigo-400", colorDot: "bg-indigo-400", icon: FileEdit,
    description: "JSX é uma extensão de sintaxe para JavaScript que se assemelha ao HTML.",
    points: [
      "Expressividade: Permite escrever a estrutura da UI dentro da lógica JavaScript.",
      "Segurança: O React escapa automaticamente qualquer valor antes de renderizar para prevenir XSS.",
      "Compilação: O JSX é transformado em chamadas normais de função JavaScript (React.createElement)."
    ],
    details: ["Syntax Sugar", "HTML-in-JS", "Babel Compilation", "Type Safe"],
    code: "const element = (\n  <div className=\"greetings\">\n    <h1>Hello, {name}!</h1>\n  </div>\n);"
  },
  {
    id: "r04", label: "STATE", title: "Estado do Componente", colorText: "text-cyan-500", colorDot: "bg-cyan-500", icon: Settings2,
    description: "O State é um objeto que contém dados que podem mudar ao longo da vida do componente.",
    points: [
      "useState Hook: A forma moderna de adicionar estado a componentes funcionais.",
      "Imutabilidade: Nunca altere o estado diretamente; sempre use a função de setter (ex: setState).",
      "Re-render: Quando o estado muda, o componente e seus filhos são renderizados novamente.",
    ],
    details: ["Hooks", "useState", "Reactive Logic", "Data Flow"],
    code: "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}"
  },
  {
    id: "r05", label: "PROPS", title: "Propriedades", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: ArrowUpCircle,
    description: "Props são entradas de um componente. Elas são como argumentos de função.",
    points: [
      "Read-Only: Um componente nunca deve modificar suas próprias props.",
      "Unidirecional: Os dados fluem do componente pai para o filho.",
      "Flexível: Props podem ser strings, números, booleanos, objetos ou até funções."
    ],
    details: ["Configuração", "Arguments", "Immutability", "Parent-Child Bridge"],
    code: "function Welcome(props) {\n  return <h1>Olá, {props.name}</h1>;\n}\n\n// Uso: <Welcome name=\"Alice\" />"
  }
];

const angularDetailedTopics = [
  {
    id: "a01", label: "O QUE É ANGULAR?", title: "Framework de Plataforma", colorText: "text-red-500", colorDot: "bg-red-500", icon: Globe,
    description: "Angular é uma plataforma e framework para construir aplicações cliente em HTML e TypeScript.",
    points: [
      "Completo: Inclui tudo o que você precisa (Router, HTTP Client, Forms) sem bibliotecas externas.",
      "Opinionated: Fornece uma estrutura clara e padrões para escalabilidade empresarial.",
      "Escrito em TypeScript: Oferece tipagem forte e detecção de erros em tempo de compilação."
    ],
    details: ["Full-featured", "Google Framework", "Enterprise Grade", "TypeScript Native"],
    code: "@Component({\n  selector: 'app-root',\n  template: '<h1>{{ title }}</h1>'\n})\nexport class AppComponent { title = 'Olá Angular!'; }"
  },
  {
    id: "a02", label: "MÓDULOS", title: "Arquitetura NgModules", colorText: "text-rose-500", colorDot: "bg-rose-500", icon: Layout,
    description: "NgModules configuram o injetor e o compilador e ajudam a organizar partes relacionadas da aplicação.",
    points: [
      "Declarações: Lista de componentes, diretivas e pipes que pertencem a este módulo.",
      "Importações: Outros módulos cujas classes exportadas são necessárias.",
      "Bootstrapping: Define o componente raiz que o Angular insere no DOM."
    ],
    details: ["NgModule", "Organization", "Encapsulamento", "Dependency Mesh"],
    code: "@NgModule({\n  declarations: [AppComponent],\n  imports: [BrowserModule],\n  bootstrap: [AppComponent]\n})\nexport class AppModule { }"
  },
  {
    id: "a03", label: "BINDING", title: "Data Binding Bidirecional", colorText: "text-red-400", colorDot: "bg-red-400", icon: Zap,
    description: "Angular permite sincronizar a lógica e a visão de forma automática e extremamente potente.",
    points: [
      "Interpolação: {{ valor }} para exibir dados no HTML.",
      "Property Binding: [property]='valor' para passar dados para elementos.",
      "Two-way Binding: [(ngModel)]='valor' para sincronia total (Banana in a box)."
    ],
    details: ["Two-way sync", "[(ngModel)]", "Banana in a Box", "Reactive Sync"],
    code: "<input [(ngModel)]=\"name\">\n<p>Olá {{ name }}!</p>"
  },
  {
    id: "a04", label: "DEPENDENCY INJECTION", title: "Injeção de Dependência", colorText: "text-orange-500", colorDot: "bg-orange-500", icon: Settings2,
    description: "Angular possui um sistema de DI poderoso que fornece instâncias de classes e serviços conforme necessário.",
    points: [
      "Injetor: O mecanismo que cria as instâncias e as fornece aos componentes.",
      "Provedores: Definem como os serviços devem ser instanciados (ex: Singleton).",
      "Desacoplamento: Componentes não criam seus próprios serviços; eles os recebem."
    ],
    details: ["DI Pattern", "Singleton Services", "Clean Code", "Testability"],
    code: "constructor(private dataService: DataService) {\n  // Angular injeta o serviço automaticamente!\n}"
  },
  {
    id: "a05", label: "TYPESCRIPT", title: "Fundamentos em TS", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: ShieldCheck,
    description: "Angular abraça o TypeScript para fornecer ferramentas de desenvolvimento superiores e código mais seguro.",
    points: [
      "Interfaces e Tipos: Defina formas rigorosas para os dados da sua aplicação.",
      "Decoradores: Metadados que dizem ao Angular como processar classes (ex: @Component).",
      "Classes: Uso extensivo de orientação a objetos moderna para organizar lógica complexa."
    ],
    details: ["Strict Typing", "Decorators", "ESNext Classes", "Code Intelligence"],
    code: "export class User {\n  id: number;\n  name: string;\n}"
  }
];

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
  },
  {
    id: "29", label: "INTRO", title: "Introdução a tratamento de erros", colorText: "text-red-500", colorDot: "bg-red-500", icon: ShieldCheck,
    description: "Nesta parte, o objetivo é explicar o conceito de que erros são inevitáveis na vida de qualquer programa.",
    points: [
      "Diferença entre erros de sintaxe (digitação) e erros de execução (lógica ou dados).",
      "Erros lógicos podem quebrar regras de negócios silenciosamente.",
      "O JS normalmente para a execução de um script quando ocorre um erro grave."
    ],
    details: ["Inevitabilidade", "Sintaxe vs Lógica", "Interrupção do Script"],
    code: "// Exemplo:\nconsole.log(variavelInexistente);\n// O script quebra e para de rodar na linha acima!"
  },
  {
    id: "30", label: "NATUREZA", title: "A Natureza Inevitável dos Erros", colorText: "text-amber-400", colorDot: "bg-amber-400", icon: ShieldCheck,
    description: "O primeiro passo é desmistificar o erro. Entender que, no desenvolvimento de software, erros não são derrotas, mas sim eventos esperados.",
    points: [
      "Qualquer código, por mais bem escrito que seja, está sujeito a falhas.",
      "Não devemos criar sistemas que nunca falham, pois isso é impossível na web.",
      "A engenharia foca em criar sistemas que falhem de forma controlada e previsível."
    ],
    details: ["Desmistificação", "Falhas Controladas", "Previsibilidade"],
    code: "// Erros sempre vão ocorrer.\n// A diferença está em como nosso código reage a eles e informa o usuário."
  },
  {
    id: "31", label: "ORIGEM", title: "A Origem das Falhas", colorText: "text-orange-400", colorDot: "bg-orange-400", icon: Search,
    description: "Identificando o 'Por que' um programa quebra, dividindo-os em três categorias precisas de origem.",
    points: [
      "Erros do Programador: Faltou uma chave }, um 'consloe' em vez de console, ou loop infinito.",
      "Erros do Usuário (Entrada): O sistema espera um número, ele manda um texto.",
      "Erros de Ambiente: A API ou servidor caiu, faltou internet no celular."
    ],
    details: ["Programador (Sintaxe)", "Usuário (Payload)", "Ambiente (Rede)"],
    code: "// Exemplo de Erro de Entrada:\n// O usuário digita 'vinte' onde deveria ser apenas os dígitos (20).\nlet idade = Number('vinte'); // Retorna NaN"
  },
  {
    id: "32", label: "COMPORTAMENTO", title: "Comportamento do JS", colorText: "text-rose-500", colorDot: "bg-rose-500", icon: PlaySquare,
    description: "É fundamental explicar a reação em cascata da linguagem quando ela lê e se depara com um problema fatal não tratado.",
    points: [
      "A engine do JS lê e processa as instruções linearmente, de cima para baixo.",
      "Encontrou um erro grave? O JS 'joga' (throw) uma exceção e interrompe o script puro ali.",
      "Se tiver 100 linhas e um erro explode na linha 10, de 11 em diante nada funcionará."
    ],
    details: ["Script Freeze", "Engine Crash", "Linhas Abortadas"],
    code: "// Se esse código de API não puder continuar, ele mata o processo.\nx = y + 1; // Uncaught ReferenceError: y is not defined\nconsole.log('Isso nunca rodará');"
  },
  {
    id: "33", label: "RACIOCÍNIO", title: "Caminho Feliz vs Triste", colorText: "text-indigo-400", colorDot: "bg-indigo-400", icon: Network,
    description: "Para criar aplicações fortes de mercado, crie sempre o hábito de mapear dois fluxos completos mentalmente.",
    points: [
      "Caminho Feliz: O que deve acontecer na tela se tudo der magicamente certo?",
      "Caminho Triste: E se a conexão oscilar? Como alerto e salvo a interação do cliente?",
      "Código preventivo garante que o programa continue rodando com um 'Plano B'."
    ],
    details: ["Plano B", "Sad Path", "Tolerância"],
    code: "let preco = 0;\ntry {\n  preco = buscarPrecoOnline(); // Tenta o Feliz\n} catch (e) {\n  preco = 50.00; // Cai para o Caminho Triste e mantém o site ativo!\n}\nmostrarNaTela(preco);"
  },
  {
    id: "34", label: "SILENT", title: "Erros Silenciosos", colorText: "text-amber-500", colorDot: "bg-amber-500", icon: Ear,
    description: "Falhas que não 'quebram' o código imediatamente com uma mensagem, mas produzem resultados incorretos.",
    points: [
      "Falhas de coerção de tipos (ex: 10 + '5' = '105').",
      "Uso de variáveis globais acidentais (sem let ou const).",
      "O 'use strict' transforma erros silenciosos em exceções explícitas."
    ],
    details: ["Coerção de Tipos", "Globais Acidentais", "Use Strict"],
    code: "\"use strict\";\nx = 3.14; // Lança um erro pois a variável não foi declarada"
  },
  {
    id: "35", label: "DOMINÓ", title: "O Efeito Dominó", colorText: "text-red-400", colorDot: "bg-red-400", icon: Zap,
    description: "O pior erro não é aquele que quebra a tela com uma mensagem vermelha, mas aquele que faz o sistema errar calado.",
    points: [
      "JS foi feito em 10 dias para 'não quebrar a web', então ele é super permissivo e 'ajuda' demais.",
      "A falha não estala na hora. Ela cria um 'dado podre' (como NaN ou undefined).",
      "Esse dado viaja pelo sistema e vai quebrar tudo muito mais tarde, em outra tela ou cálculo invisível."
    ],
    details: ["Efeito Dominó", "Permissividade", "Dados Podres"],
    code: "// Exemplo:\n// Você aceitou um dado vazio oculto.\n// O JS não avisou e a conta total foi destruída."
  },
  {
    id: "36", label: "CASO 1", title: "Coerção de Tipos", colorText: "text-orange-500", colorDot: "bg-orange-500", icon: FileEdit,
    description: "O JS tenta converter tipos de dados automaticamente tentando consertar o código durante a execução.",
    points: [
      "Se você soma número + texto, ele pensa: 'Vou juntar tudo como texto'.",
      "Se subtrai, ele tenta transformar forçadamente o texto num número matemático.",
      "O resultado? '50' + 10 vira '5010' e o cliente do seu site vai ver valores absurdos na tela."
    ],
    details: ["Type Coercion", "Soma vs Subtração", "Valores Ocultos"],
    code: "let preco = 50;\nlet frete = '10'; // Texto\nconsole.log(preco + frete); // '5010' (Silencioso!)\nconsole.log(preco - frete); // 40 (Confusão total)"
  },
  {
    id: "37", label: "CASO 2/3", title: "NaN e Vazamento", colorText: "text-yellow-400", colorDot: "bg-yellow-400", icon: Network,
    description: "Divisões com textos viram NaN e esquecer o 'let' cria dados persistentes globalmente.",
    points: [
      "Ao dividir um texto por um número (ex: 20/'dez'), o JS devolve NaN (Not a number) e segue a vida tranquilamente.",
      "Se esquecer as palavras 'let' ou 'const', variáveis perigosas grudam no contexto window da página.",
      "Você vai sobrescrever variáveis invisíveis em outras funções e só Deus sabe o estrago depois."
    ],
    details: ["NaN", "Vazamento Global", "Variável Implícita"],
    code: "let qty = 2;\nlet desc = 'dez';\nconsole.log(qty / desc); // Retorna NaN e a execução não é abortada!\n\nfunction x() { taxa = 0.15; } // Vazamento de escopo global gigante!"
  },
  {
    id: "38", label: "CASO 4", title: "Prop. Inexistentes", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: Search,
    description: "Buscar chaves e dados que não existem em um objeto simplesmente retorna 'undefined' no ato.",
    points: [
      "Em linguagens rigorosas, tentar ler 'usuario.idade' caso não exista geraria um Crash massivo na hora.",
      "O Javascript assume que você ou ele mesmo vai inserir essa chave no futuro, e só retorna 'undefined'.",
      "É comum usar isso em blocos \`if\` sem saber, inativando e escondendo grandes lógicas vitais do código."
    ],
    details: ["Undefined", "Acesso Cego", "If Falso"],
    code: "let usr = { nome: 'Alex' };\n// Ninguém te alertará que idade não existe aqui\nif (usr.idade > 18) {\n  // Bloco trancado silenciosamente\n}"
  },
  {
    id: "39", label: "A VACINA", title: "A Solução: Use Strict", colorText: "text-emerald-500", colorDot: "bg-emerald-500", icon: ShieldCheck,
    description: "Depois de se assustar e perceber a crueldade de um sistema que erra calado, a resposta imutável de proteção.",
    points: [
      "Use 'use strict' no topo do arquivo. Ele atua como um inspetor muito severo no seu arquivo.",
      "Avisa o motor: 'Pare de tentar adivinhar a besteira que eu fiz. Jogue o erro explicitamente!'",
      "O 'use strict' força os erros nocivos e silenciosos a se tornarem explícitos e visíveis de imediato na tela ou log."
    ],
    details: ["Use Strict", "Erros Explícitos", "Debugging Seguro"],
    code: "\"use strict\";\nx = 3.14; // Uncaught ReferenceError: x is not defined.\n// Você é forçado a corrigir usando o 'let' agora mesmo."
  },
  {
    id: "40", label: "STATEMENTS", title: "Declarações de Erro", colorText: "text-blue-400", colorDot: "bg-blue-400", icon: Settings2,
    description: "A lógica de controle de fluxo para lidar com exceções: 'Tente executar isso; se falhar, faça aquilo'.",
    points: [
      "try: Bloqueia o código que tem chances de gerar um erro.",
      "catch: Captura o erro e permite tratá-lo sem quebrar a tela.",
      "finally: Roda sempre no fim, útil para limpeza.",
      "throw: Permite disparar seus próprios erros personalizados."
    ],
    details: ["Try", "Catch", "Finally", "Throw"],
    code: "try {\n  if(x == '') throw 'Vazio!';\n} catch(err) {\n  console.log(err);\n} finally {\n  loading = false;\n}"
  },
  {
    id: "41", label: "ATORES", title: "O Raciocínio (A Analogia)", colorText: "text-amber-500", colorDot: "bg-amber-500", icon: Network,
    description: "Para dominar as Declarações de Erro (JS Error Statements), o raciocínio é assumir o controle absoluto de tudo o que acontece, quer dê certo ou errado.",
    points: [
      "try (O Palco de Risco): 'Tente executar isso. Se falhar, não congele a tela, apenas pule direto para o catch'.",
      "throw (O Apito do Árbitro): Você cria um erro artificial e relata que algo da regra de negócio não foi cumprido.",
      "catch (A Rede de Segurança): 'Pega' o erro, acalma o usuário e registra o problema para você debugar.",
      "finally (O Faxineiro): Roda SEMPRE. Serve para limpar a bagunça, dar certo ou errado."
    ],
    details: ["Controle Absoluto", "A Rede de Segurança", "Papéis"],
    code: "// Estes são os blocos que compõem a muralha defensiva\ntry {\n  // Risco\n} catch(e) {\n  // Defesa\n} finally {\n  // Limpeza\n}"
  },
  {
    id: "42", label: "O BÁSICO", title: "Passo A: try e catch", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: ShieldCheck,
    description: "Mostre como proteger uma execução simples no dia a dia. Se algo dar defeito, apenas absorvemos o impacto.",
    points: [
      "O 'try' tenta executar um procedimento naturalmente instável ou não confiável.",
      "Neste caso, chamando propositalmente uma função que digitamos errado: alertaa() em vez de alert().",
      "Sem o try-catch, a página morreria instantaneamente. Com eles, a falha só cai silenciosamente no catch e tudo continua normal."
    ],
    details: ["Comportamento Seguro", "Proteção de Tela", "Erros de Digitação"],
    code: "try {\n  // Código perigoso: erro de digitação\n  alertaa('Bem-vindo!'); \n} catch (erro) {\n  // A tela não quebra! O fluxo cai aqui silenciosamente.\n  console.log('Opa, a saudação falhou, mas o site segue firme.');\n}"
  },
  {
    id: "43", label: "CONTROLE", title: "Passo B: Usando throw", colorText: "text-purple-500", colorDot: "bg-purple-500", icon: FileEdit,
    description: "O desenvolvedor cria regras estritas. Se a regra for quebrada, o throw força o cancelamento da execução em andamento e joga pro catch.",
    points: [
      "As vezes a matemática do JS dá certo (10 - 20 = -10), mas sua regra comercial não (sacar mais que o saldo).",
      "O 'throw' interrompe o bloco Try imediatamente como um árbitro parando o jogo.",
      "Tudo após o throw é ignorado e o código pula instintivamente para salvar o resultado dentro do catch."
    ],
    details: ["Regra de Negócio", "O Apito Final", "Salvos pelo Catch"],
    code: "try {\n  if (saque > saldo) {\n    throw 'Saldo insuficiente'; // Joga o erro customizado\n  }\n  saldo -= saque; // Isso NUNCA roda se o throw disparar\n} catch (erro) {\n  console.error('Negado: ' + erro);\n}"
  },
  {
    id: "44", label: "A LIMPEZA", title: "Passo C: O finally", colorText: "text-emerald-500", colorDot: "bg-emerald-500", icon: PlaySquare,
    description: "A interface do usuário precisa ser limpa sempre (ex: um loader infinito), e é aqui que o finally age independentemente do sucesso.",
    points: [
      "Se tiver um ícone 'carregando...' girando, você precisa pará-lo tanto se a página carregar com sucesso, ou se a internet der ruim.",
      "Sem o finally, você escreveria código repetido mandando parar dentro do Try e do Catch.",
      "O Finally te economiza linha e garante com 100% de certeza absoluta que a rodada vai acabar limpa."
    ],
    details: ["Clean UI", "Execução Obrigatória", "DRY (Don't Repeat Yourself)"],
    code: "let carregando = true;\ntry {\n  throw 'Servidor fora do ar';\n  console.log('Sucesso!'); // Ignorado\n} catch (erro) {\n  console.error('Falha: ' + erro); // Executado\n} finally {\n  carregando = false; // Roda INDEPENDENTE do resultado!\n}"
  },
  {
    id: "45", label: "O MANTRA", title: "O Resumo Narrativo", colorText: "text-indigo-400", colorDot: "bg-indigo-400", icon: CheckCircle2,
    description: "Para fixar o raciocínio na cabeça, podemos resumir tudo numa única frase mecânica para programadores recém formados.",
    points: [
      "Eu TENTO (try) fazer uma tarefa arriscada.",
      "Se eu perceber que a regra do sistema foi violada pelo usuário, eu GRITO (throw) alto e cancelo tudo.",
      "Ocorrendo erros aleatórios ou escutando meu grito, a rede de segurança me CAPTURA (catch).",
      "No final de tudo, a faxina final e limpeza da área é realizada no fim do palco (finally)."
    ],
    details: ["Narração de Fluxo", "Raciocínio Base", "Resumo Completo"],
    code: "// try { TENTO }\n// throw 'GRITO'\n// catch() { CAPTURA }\n// finally { FINALIZO }"
  },
  {
    id: "46", label: "OBJECT", title: "O Objeto de Erro", colorText: "text-purple-400", colorDot: "bg-purple-400", icon: Search,
    description: "Quando um erro ocorre, o JavaScript gera um objeto interno contendo detalhes vitais sobre o que aconteceu.",
    points: [
      "Propriedades principais incluem 'name' (tipo) e 'message' (descrição).",
      "ReferenceError: Uso de uma variável não declarada.",
      "TypeError: Valor fora do tipo esperado (ex: null.metodo()).",
      "SyntaxError: Erro de escrita grave no arquivo de código."
    ],
    details: ["Name", "Message", "ReferenceError", "TypeError"],
    code: "try {\n  fnInexistente();\n} catch(e) {\n  console.log(e.name); // ReferenceError\n  console.log(e.message);\n}"
  },
  {
    id: "47", label: "ANATOMIA", title: "O Boletim de Ocor.", colorText: "text-amber-500", colorDot: "bg-amber-500", icon: Settings2,
    description: "Quando um erro cai na rede do catch, o JS te entrega um 'B.O.' detalhado preenchido no exato milissegundo do acidente.",
    points: [
      "A forma padrão sempre tem duas ferramentas absolutas de investigação e uma extra.",
      "name: O nome da infração principal (Qual a tipologia do erro).",
      "message: O relato textual do que aconteceu em si (A descrição humana).",
      "stack (Extra): O 'rastro do sangue' dizendo todas as trilhas exatas de execução."
    ],
    details: ["Name e Message", "Stack Trace", "Laudo Médico"],
    code: "try {\n  chamarAlgo();\n} catch (erro) {\n  console.log(erro.name);    // O que foi?\n  console.log(erro.message); // Detalhes do acidente\n}"
  },
  {
    id: "48", label: "TIPOS I", title: "Reference e Type", colorText: "text-orange-500", colorDot: "bg-orange-500", icon: Search,
    description: "Os alunos devem aprender a identificar os criminosos recorrentes pelas digitais no .name no JS.",
    points: [
      "ReferenceError (A Fantasma): Tentar usar algo que o navegador não faz ideia da existência na parte de memória (Não foi declarada).",
      "TypeError (A Cadeira Latindo): Você tem acesso a entidade, mas manda ela fazer algo contra a própria natureza.",
      "Exemplo Type: Tentar invocar '.toUpperCase()' em um objeto de Inteiro (Número)."
    ],
    details: ["ReferenceError", "TypeError", "Perfil Criminal"],
    code: "let num = 10;\nnum.toUpperCase(); // TypeError: num.toUpperCase is not a function\nconsole.log(fantasma); // ReferenceError: fantasma is not defined"
  },
  {
    id: "49", label: "TIPOS II", title: "Range, Syntax, URI", colorText: "text-rose-500", colorDot: "bg-rose-500", icon: Zap,
    description: "Mais perfis essenciais que você identificará ao cruzar dados absurdos no código de produção.",
    points: [
      "RangeError (Limites): Enviar um valor operável, porém extrapolando infinitamente a barreira funcional.",
      "SyntaxError (Gramática): Escrita alienígena. Este e único que o try/catch detesta, pois trava antes na leitura.",
      "URIError (Rotas): Quando a codificação nativa de URLs se depara com malformações absolutas nos links web."
    ],
    details: ["RangeError", "SyntaxError", "URIError"],
    code: "let precisao = 1;\n// RangeError: toPrecision() argument must be between 1 and 100\nprecisao.toPrecision(500);"
  },
  {
    id: "50", label: "ROTEAMENTO", title: "Lógica Detetive Catch", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: Network,
    description: "Por que ler o erro num if/else? Você usa blocos para realizar tratamentos paralelos dependendo da doença do código.",
    points: [
      "No escopo complexo, vários tiros podem cair no mesmo bloco de rede Try/Catch de segurança final.",
      "Você pega o erro pela orelha (.name) e despacha o procedimento correto mediante uma avaliação de fluxo condicional (IF).",
      "A triagem pode decidir reiniciar apenas um pedaço invisível, ou avisar o usuário explicitamente."
    ],
    details: ["Roteamento", "Decisões no Catch", "Triagem Hospitalar"],
    code: "try {\n  processar(); \n} catch (e) {\n  if (e.name === 'ReferenceError') {\n    console.error('Culpa do Dev');\n  } else {\n    console.warn('Alerta: ' + e.message);\n  }\n}"
  },
  {
    id: "51", label: "PRÁTICO", title: "Exemplos Práticos", colorText: "text-emerald-500", colorDot: "bg-emerald-500", icon: CheckCircle2,
    description: "Juntando todas as peças para construir validações seguras no mundo real (ex: formulários).",
    points: [
      "Entrada: Usuário digita um valor em um formulário.",
      "Validação (throw): Se o valor for < 5, joga 'Valor muito baixo'.",
      "Tratamento (catch): Exibir a message diretamente num alerta.",
      "Finalização (finally): Limpa o input do usuário para a próxima tentativa."
    ],
    details: ["Validação Real", "Fluxo Completo", "User Experience"],
    code: "try {\n  let idade = Number(input.value);\n  if(idade < 18) throw 'Menor de idade';\n  liberarAcesso();\n} catch(err) {\n  alert(err);\n} finally {\n  input.value = '';\n}"
  },
  {
    id: "52", label: "OPERADORES", title: "JS Operators", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: Network,
    description: "Se as variáveis são os 'substantivos' do sistema, os Operadores são os 'verbos'. Eles dizem o que fazer com os dados.",
    points: [
      "Um operador é um símbolo especial que o motor do JavaScript reconhece instantaneamente para realizar uma ação sobre valores.",
      "Sem eles, o programa seria apenas um depósito estático de dados inativos.",
      "Com eles, manipulamos esses dados para gerar resultados novos em categorias lógicas."
    ],
    details: ["Ação Instantânea", "Verbos do Sistema", "Manipulação"],
    code: "// Variáveis (Substantivos) isoladas não fazem nada.\nlet a = 10; let b = 20;\n// Operador (Verbo) gera uma ação e um resultado novo.\nlet total = a + b;"
  },
  {
    id: "53", label: "ARITMÉTICA", title: "Matemática", colorText: "text-purple-500", colorDot: "bg-purple-500", icon: FileEdit,
    description: "Eles pegam valores numéricos e retornam um novo valor. Atenção especial para o operador 'Módulo' (%).",
    points: [
      "Operadores padrões: Soma (+), Subtração (-), Mult (*), Divisão (/) e Exponenciação.",
      "Módulo (%): Não divide, ele diz o que 'sobrou'. Ideal para descobrir pares/ímpares.",
      "Incremento (++) e Decremento (--): Atalhos para alterar em 1, cruciais em Loops."
    ],
    details: ["Módulo (%)", "Sobras", "Ciclos Perfeitos"],
    code: "// É par? A sobra é zero.\n10 % 2; // Retorna 0\n\n// Incrementando progressivamente\nlet passo = 1; passo++;"
  },
  {
    id: "54", label: "ATRIBUIÇÃO", title: "Gerenciar Memória", colorText: "text-emerald-500", colorDot: "bg-emerald-500", icon: Network,
    description: "O sinal de = na programação não significa 'igualdade matemática'. Ele significa 'Recebe' ou 'Atribui'.",
    points: [
      "O sistema resolve o que está do lado direito do =, e guarda o resultado na variável do lado esquerdo.",
      "Atribuição simples: let x = 10; // 'x' RECEBE o valor 10.",
      "Atribuição Combinada (+=, -=): Atalho elegante para não repetir a mesma variável."
    ],
    details: ["Atribuição vs Igualdade", "Resolução Direita", "Atalhos (+=)"],
    code: "let pt = 50;\n\n// Forma repetitiva\npt = pt + 10; \n\n// Refatorado com Atribuição Combinada\npt += 10;"
  },
  {
    id: "55", label: "COMPARAÇÃO", title: "O Interrogatório", colorText: "text-orange-500", colorDot: "bg-orange-500", icon: Search,
    description: "Servem para testar a realidade do momento. O resultado NUNCA é um número/texto, mas sim Booleano (true/false).",
    points: [
      "Maior/Menor/Limites (> >= < <=): 'A idade é maior ou igual a 18?'",
      "Igualdade Frouxa (==): Ignora o tipo de dado ('5' == 5 dá true). Perigoso!",
      "Igualdade Estrita (===): Compara Valor E Tipo. Se um for Texto, rejeita na hora."
    ],
    details: ["Frouxa (==)", "Estrita (===)", "Booleanos"],
    code: "// Coerção silenciosa\nif ('5' == 5) { /* true */ }\n\n// Engenharia estrita profissional\nif ('5' === 5) { /* false */ }"
  },
  {
    id: "56", label: "LÓGICOS", title: "Decisões Complexas", colorText: "text-rose-500", colorDot: "bg-rose-500", icon: Zap,
    description: "Combinam múltiplas perguntas para formar uma condição inteligente antes de tomar uma decisão de negócio.",
    points: [
      "AND lógico (&&): 'Exigente'. Todas as metades precisam ser verdadeiras simultaneamente para passar.",
      "OR lógico (||): 'Flexível'. Basta apenas uma das condições dar verdadeira para liberar o acesso.",
      "NOT (!): Inverte e nega a realidade booleana. O que é false vira true."
    ],
    details: ["AND (&&)", "OR (||)", "Negação (!)"],
    code: "// OR (||) - Uso flexível\nif (preco > 100 || isVip) { }\n\n// AND (&&) - Exigência dupla\nif (loginOk && senhaOk) { }"
  },
  {
    id: "57", label: "LÓGICA AND", title: "Operador E (&&)", colorText: "text-rose-500", colorDot: "bg-rose-500", icon: Zap,
    description: "O operador && (AND) é o fiscal rigoroso. Só retorna verdadeiro se todas as condições exigidas forem verdadeiras no mesmo momento.",
    points: [
      "Ele força o sistema a verificar a primeira condição; se for falsa, ele nem olha a segunda (chamado de Short-Circuit).",
      "É usado em validações rígidas: O usuário tem saldo E também a loja está aberta?",
      "Observe a tabela abaixo: O único cenário que resulta em 'Passar' é quando ambos são verdadeiros."
    ],
    details: ["AND (&&)", "Rigoroso", "Curto-Circuito"],
    code: "// Tabela Verdade (AND)\n// Verdadeiro && Verdadeiro = VERDADEIRO (Acesso Liberado)\n// Verdadeiro && Falso      = FALSO (Acesso Negado)\n// Falso      && Verdadeiro = FALSO (Acesso Negado)\n// Falso      && Falso      = FALSO (Acesso Negado)"
  },
  {
    id: "58", label: "LÓGICA OR", title: "Operador OU (||)", colorText: "text-amber-500", colorDot: "bg-amber-500", icon: Zap,
    description: "O operador || (OR) é o facilitador flexível. Ele retorna verdadeiro desde que pelo menos UMA das condições da frase seja verdadeira.",
    points: [
      "Se a primeira condição for avaliada como verdadeira, ele aprova na hora, ignorando a segunda condição (também faz Short-Circuit).",
      "Perfeito para exceções: Acesso grátis se for fim de semana OU for um cliente VIP.",
      "Ele só resulta em Falso se absolutamente todas as opções falharem."
    ],
    details: ["OR (||)", "Flexível", "Fallback"],
    code: "// Tabela Verdade (OR)\n// Verdadeiro || Verdadeiro = VERDADEIRO (Acesso Liberado)\n// Verdadeiro || Falso      = VERDADEIRO (Acesso Liberado)\n// Falso      || Verdadeiro = VERDADEIRO (Acesso Liberado)\n// Falso      || Falso      = FALSO (Acesso Negado)"
  },
  {
    id: "59", label: "LÓGICA NOT", title: "Negação (!)", colorText: "text-purple-500", colorDot: "bg-purple-500", icon: Zap,
    description: "O operador ! (NOT) é o espelho inverso do Booleano. Ele pega o status atual da sua variável ou condição e o vira de cabeça para baixo.",
    points: [
      "Aplica-se em uma única coisa (Operador Unário). O que for verdadeiro tornará falso, e vice-versa.",
      "Muito comum para criar botões de 'Toggle' (Alternar) onde você quer dizer 'aplique o oposto do que está agora'.",
      "E também elegante para leitura: if (!conectado) { reconectar() } ao invés de if (conectado === false)."
    ],
    details: ["NOT (!)", "Inversor", "Toggle"],
    code: "// Tabela Verdade (NOT - Espelho Inverso)\n// !Verdadeiro = FALSO\n// !Falso      = VERDADEIRO\n\n// Exemplo de Toggle Prático:\nlet lampadaLigada = false;\nlampadaLigada = !lampadaLigada; // Agora é true."
  },
  {
    id: "60", label: "CONCEITO", title: "O Operador Ternário", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: Network,
    description: "Um atalho elegante para a estrutura if...else e o único operador do JavaScript que exige três partes para funcionar.",
    points: [
      "No português claro, ele é uma pergunta direta seguida de duas opções absolutas de resposta.",
      "A estrutura lógica do pensamento é: 'Isso é verdade ? Se for sim, faça isso : Se não for, faça aquilo'.",
      "Perfeito para decisões rápidas (A ou B)."
    ],
    details: ["Atalho Elegante", "3 Partes", "Pergunta Rápida"],
    code: "// A Sintaxe Base \\ncondição ? expressão_se_verdadeiro : expressão_se_falso;"
  },
  {
    id: "61", label: "REFATORAÇÃO", title: "Código Limpo", colorText: "text-purple-500", colorDot: "bg-purple-500", icon: FileEdit,
    description: "Enquanto o if/else executa blocos complexos de ações, o ternário brilha para decidir qual valor atribuir a uma variável na mesma linha.",
    points: [
      "Um if...else tradicional que verifica maioridade em 6 linhas de código.",
      "Com o ternário, você toma a decisão, resolve a condição e salva na variável gastando exatamente apenas uma única linha.",
      "Isso mantém a lógica de valores extremamente visível e sem poluição de tela."
    ],
    details: ["If vs Ternário", "Código de 1 linha", "Atribuição Direta"],
    code: "// Forma Reduzida com Ternário:\nlet idade = 20;\nlet status = (idade >= 18) ? 'Maior' : 'Menor';\nconsole.log(status);"
  },
  {
    id: "62", label: "NA PRÁTICA", title: "Uso Profissional", colorText: "text-emerald-500", colorDot: "bg-emerald-500", icon: PlaySquare,
    description: "Onde desenvolvedores profissionais mais aplicam ternários no front-end real e moderno (como em projetos com React).",
    points: [
      "1. Renderização Condicional: Exibir botão 'Sair' se logado, ou 'Entrar' se não logado.",
      "2. Valores Padrão (Fallback): Se o cliente não informar um valor, o ternário joga um valor de segurança ou taxa fixa no lugar.",
      "Eles injetam as regras de UI com extrema velocidade."
    ],
    details: ["Renderização Condicional", "Fallback", "UI Dinâmica"],
    code: "// Exemplo 1: UI dinâmico\nlet btn = usuarioLogado ? 'Sair' : 'Login';\n\n// Exemplo 2: Fallback (Segurança)\nlet custo = frete ? frete : 15.00;"
  },
  {
    id: "63", label: "REGRA DE OURO", title: "Más Práticas", colorText: "text-red-500", colorDot: "bg-red-500", icon: ShieldCheck,
    description: "O Caminho Triste do Ternário: É fundamental ensinar aos júniores quando NÃO usar a ferramenta, sob pena de destruir a legibilidade (Clean Code).",
    points: [
      "Nunca crie 'Ternários Aninhados' (Um ternário dentro do outro ou dentro de um terceiro).",
      "Como não tem a palavra chave IF para ler, vira uma bagunça indecifrável de dezenas de ? e :",
      "Para lógicas de mais de duas opções de saída, volte humilde para o bom e velho if...else ou switch."
    ],
    details: ["Evite Aninhamento", "Sopa de Símbolos", "Clean Code"],
    code: "// MÁ PRÁTICA! Muito difícil ler isso:\nlet rank = nota >= 9 ? 'Excelente' : nota >= 7 ? 'Bom' : 'Ruim';"
  },
  {
    id: "64", label: "NATUREZA 64B", title: "Paradigma da Memória", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: Network,
    description: "No JavaScript, não existem tipos separados na memória para 'inteiros' e 'quebrados'. Todo número é um Ponto Flutuante de 64 bits.",
    points: [
      "Isso é ótimo para precisão decimal, mas é péssimo para a manipulação direta de bits na CPU.",
      "O problema de engenharia: Operadores Bitwise exigem uma sequência exata, finita e inteira de zeros e uns.",
      "Para a linguagem dar suporte a essas operações sem travar, ela usa um truque de ilusão mágica nos bastidores."
    ],
    details: ["Flutuante de 64 bits", "Tipagem Única", "Paradoxo Bitwise"],
    code: "// JS possui um único tipo para números\nlet n = 10; // Number (Float 64-bit)\nlet p = 10.5; // Number (Float 64-bit)"
  },
  {
    id: "65", label: "VÍNCULO 32B", title: "O Cast Mágico (Parte 1)", colorText: "text-purple-500", colorDot: "bg-purple-500", icon: FileEdit,
    description: "Para resolver a incompatibilidade, o motor executa três passos invisíveis em milissegundos. O primeiro é o Rebaixamento.",
    points: [
      "O Rebaixamento (Cast de 32-bits): O motor 'arranca' qualquer casa decimal do número original de 64 bits.",
      "Ele força essa sobra a caber dentro de uma caixa extremamente rígida: um número Inteiro puro de 32 bits.",
      "Qualquer informação extra que não cabia (casas decimais) é meramente ignorada e truncada sem avisos."
    ],
    details: ["Rebaixamento", "Caixa de 32 bits", "Truncagem"],
    code: "// O JS converte mentalmente para 32 bits: \n// ~3.14 vira apenas a lógica sobre o bloco 3\nlet op = 3.14 | 0; // Método rápido para truncar"
  },
  {
    id: "66", label: "OPERAÇÃO", title: "A Ilusão (Partes 2 e 3)", colorText: "text-emerald-500", colorDot: "bg-emerald-500", icon: PlaySquare,
    description: "Após o número estar cru e perfeitamente embalado no formato Inteiro, a lógica viaja direto para a CPU.",
    points: [
      "A Execução Nativa: Agora sólido em 32 bits, o motor passa o bloco ao processador que resolve o AND/OR/XOR brutalmente.",
      "A Restauração: Com a lógica aplicada, o motor não devolve esse cubo duro para o usuário.",
      "O novo bloco é 'regravado' como um gigante Ponto Flutuante de 64 bits e só então é entregue ao seu código."
    ],
    details: ["Processo CPU", "Restauração", "Retorno 64b"],
    code: "// O que o JS faz nas sombras:\n// 1. Array 64 -> int 32\n// 2. Resolve !^& nativamente\n// 3. Devolve 64-bit puro"
  },
  {
    id: "67", label: "SINALIZADOR", title: "O Bit de Sinal", colorText: "text-rose-500", colorDot: "bg-rose-500", icon: Zap,
    description: "A regra de arquitetura: A caixa de 32 bits que o JS cria possui sinal de matemática formal (Signed Integers).",
    points: [
      "Você não vai possuir 32 posições puras para valor. O sistema rouba a posição mestre (a primeira, à esquerda).",
      "O 32º bit atua apenas como uma bandeira de exército: 0 significa Positivo e 1 significa Negativo.",
      "Inverter todos os valores de um número grande esbarra neste 1º bit, despencando para a profundeza dos negativos."
    ],
    details: ["Signed Integers", "A Bandeira Esquerda", "Positivo vs Negativo"],
    code: "// Formato Positivo (Começa com 0)\n// 0000000000...00000101 (5)\n\n// Formato Negativo (Começa com 1)\n// 1111111111...11111010 (-6)"
  },
  {
    id: "68", label: "NA PRÁTICA", title: "Provando a Inversão", colorText: "text-amber-500", colorDot: "bg-amber-500", icon: Search,
    description: "Aplicando o Bitwise NOT (~) num número comum para ver o colapso e o salto ao status negativo.",
    points: [
      "O número 5 na CPU tem 29 zeros e termina em 101. Ele é assumidamente Positivo (Sua primeira bandeira é 0).",
      "Quando acionamos o NOT (~), o processador inverte todos os zeros para uns e uns para zeros impiedosamente.",
      "A bandeira vira 1, reportando o número como negativo sob as lógicas de Complemento de Dois, dando '-6'."
    ],
    details: ["Operador NOT (~)", "Dezena Negativa", "A Prova D'água"],
    code: "// Inversão Bitwise (~)\nlet num = 5;\n// 00000...00101\n\nlet inv = ~num; \n// 11111...11010 (-6)\nconsole.log(inv); // -6"
  },
  {
    id: "69", label: "MÁSCARAS", title: "Bits Booleanos", colorText: "text-blue-500", colorDot: "bg-blue-500", icon: Network,
    description: "Diferente do Lógico ('Isso é verdadeiro?'), o Bitwise enxerga a variável como um array de 32 interruptores independentes.",
    points: [
      "Eles colocam os dois números um em cima do outro e resolvem a matemática coluna por coluna, de cima para baixo.",
      "Na engenharia, chamamos essa técnica escovação de bits de Máscara de Bits (Bitmasking).",
      "É usada para compactar múltiplos status (como permissões) em um único número, poupando muita memória."
    ],
    details: ["Escovação de Bits", "Bitmasking", "Coluna por Coluna"],
    code: "// Lógico: Olha o bloco inteiro\nif (A && B) { /* ... */ }\n\n// Bitwise: Olha os 32 interruptores\nlet c = A & B;"
  },
  {
    id: "70", label: "AND (&)", title: "O Filtro Severo", colorText: "text-rose-500", colorDot: "bg-rose-500", icon: Zap,
    description: "Ele só retorna 1 se o bit de cima E o bit de baixo forem ambos 1. Qualquer outra coisa zera a coluna.",
    points: [
      "Pense nele como um filtro restritivo de peneira. Limpa bits que você não quer ver, deixando o que interessa.",
      "Se tivermos o decimal 5 (0101) e o decimal 1 (0001)...",
      "Somente a última coluna tem 1 em cima e embaixo. O resto sofre corte severo."
    ],
    details: ["Restritivo", "Limpeza", "5 & 1"],
    code: " // Teste de Mesa do AND\n //   0101 (5)\n // & 0001 (1)\n // -------\n //   0001 (Resultado: 1)\n console.log(5 & 1); // 1"
  },
  {
    id: "71", label: "OR (|)", title: "O Inclusivo", colorText: "text-amber-500", colorDot: "bg-amber-500", icon: Zap,
    description: "Ele retorna 1 se o bit de cima OU o de baixo (ou ambos) for 1. Só apaga a coluna se os dois forem 0.",
    points: [
      "É o operador de União. Na arquitetura de sistemas ele aglomera e liga permissões separadas.",
      "Se tiver uma flag Ler e outra Escrever, você junta as duas sem que uma apague a outra.",
      "Se cruzarmos 5 (0101) com 1 (0001), o resultado incorpora as luzes ligadas de ambos."
    ],
    details: ["União de Flags", "Soma de Estados", "5 | 1"],
    code: " // Teste de Mesa do OR\n //   0101 (5)\n // | 0001 (1)\n // -------\n //   0101 (Resultado: 5)\n console.log(5 | 1); // 5"
  },
  {
    id: "72", label: "XOR (^)", title: "O Exclusivo", colorText: "text-purple-500", colorDot: "bg-purple-500", icon: Network,
    description: "Ele retorna 1 APENAS se os bits forem diferentes na coluna. Se forem iguais (dois 0 ou dois 1), zera.",
    points: [
      "É o operador de Alternância (Toggle). Aplicar a mesma máscara XOR duas vezes devolve ao original.",
      "Por isso, o XOR é o tijolo mestre e base fundamental dos primeiros algoritmos de criptografia da história.",
      "Cruzando 5 (0101) e 1 (0001), apenas a penúltima coluna é diferente."
    ],
    details: ["Alternância Mágica", "Base da Cripto", "5 ^ 1"],
    code: " // Teste de Mesa do XOR\n //   0101 (5)\n // ^ 0001 (1)\n // -------\n //   0100 (Resultado: 4)\n console.log(5 ^ 1); // 4"
  },
  {
    id: "73", label: "O TRUQUE", title: "NOT (~) e Duplo (~~)", colorText: "text-emerald-500", colorDot: "bg-emerald-500", icon: FileEdit,
    description: "NOT inverte todos os bits. E se acidentalmente o usarmos duas vezes? Descobrimos ouro arquitetural.",
    points: [
      "O Pulo do Gato (Duplo NOT): Como vimos, fazer uma operação bitwise obriga o JS a espremer o dado em 32-bits (cortando decimais).",
      "Se você usar ~~num, ele inverteu e desinverteu, voltando ao original...",
      "MAS o truncamento de 32-bits não volta. Um atalho formidável, mais veloz e curto que Math.trunc() para remover os decimais."
    ],
    details: ["Inversor Solitário", "Atalho ~~", "Eficiência Math"],
    code: "// Removendo decimais brutalmente rápido\nlet numero = 10.99;\n\n// A inversão dupla limpa por causa do Cast de 32b\nconsole.log(~~numero); // Resultado: 10"
  }
];

const contentGroups = [
  { id: "g1", title: "DOM & Elementos (1-9)", start: 0, end: 9, color: "bg-blue-500" },
  { id: "g2", title: "Eventos JavaScript (10-16)", start: 9, end: 16, color: "bg-purple-500" },
  { id: "g3", title: "AJAX & JSON (17-28)", start: 16, end: 28, color: "bg-emerald-500" },
  { id: "g4", title: "Tratamento de Exceções (29-51)", start: 28, end: 51, color: "bg-red-500" },
  { id: "g5", title: "Operadores Cond/Log (52-59)", start: 51, end: 59, color: "bg-cyan-500" },
  { id: "g6", title: "Ternário (60-63)", start: 59, end: 63, color: "bg-amber-500" },
  { id: "g7", title: "Bitwise (64-73)", start: 63, end: 73, color: "bg-indigo-500" }
];

export default function App() {
  const [selectedDisciplina, setSelectedDisciplina] = useState<string | null>(null);
  const [selectedTecnologia, setSelectedTecnologia] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(null);
  const [isLightMode, setIsLightMode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isAnalogyOpen, setIsAnalogyOpen] = useState(false);

  const getDetailedTopics = () => {
    switch(selectedTecnologia) {
      case 'Vue JS': return vueDetailedTopics;
      case 'React JS': return reactDetailedTopics;
      case 'Angular': return angularDetailedTopics;
      default: return detailedTopics;
    }
  };

  const getContentGroups = () => {
    switch(selectedTecnologia) {
      case 'Vue JS': return vueContentGroups;
      case 'React JS': return reactContentGroups;
      case 'Angular': return angularContentGroups;
      default: return contentGroups;
    }
  };

  const currentTopics = getDetailedTopics();
  const currentGroups = getContentGroups();

  const filteredTopics = activeGroupIndex !== null 
    ? currentTopics.slice(currentGroups[activeGroupIndex].start, currentGroups[activeGroupIndex].end)
    : currentTopics;

  const totalSlides = filteredTopics.length + 1; // 1 home + topics

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

      {/* Background Elements */}
      {!selectedDisciplina ? (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
        </div>
      ) : (
        <>
          <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none z-0"></div>
          <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none z-0"></div>
        </>
      )}

      {/* Navigation Overlay */}
      {selectedDisciplina && currentSlide !== 0 && (
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
      )}

      {/* Slides Track */}
      <div 
        className="flex w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-10"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {/* SLIDE 0: Overview Map Grid */}
        <div className="w-screen h-screen flex-shrink-0 flex flex-col relative items-center justify-center py-4 px-2 sm:p-6 lg:p-8 box-border overflow-hidden">
          <div className="w-full h-full max-w-[1400px] flex flex-col pb-10 sm:pb-12 pt-2 sm:pt-4">
            
            <AnimatePresence mode="wait">
              {!selectedDisciplina ? (
                /* LEVEL 0: DISCIPLINE SELECTION */
                <motion.div 
                  key="level0"
                  initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-grow flex flex-col justify-center w-full"
                >
                  <header className="mb-8 lg:mb-12 text-center">
                    <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-mono text-[9px] sm:text-xs tracking-[0.3em] uppercase mb-4 lg:mb-6">
                      Plataforma de Ensino v2.0
                    </div>
                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white mb-4 tracking-tighter uppercase italic">
                      Mapa de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Disciplinas</span>
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto px-4">
                      Selecione uma área de conhecimento para explorar os módulos interativos e aprofundar seus estudos.
                    </p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto w-full px-4 overflow-y-auto custom-scrollbar max-h-[60vh] sm:max-h-none pb-8">
                    <button 
                      onClick={() => setSelectedDisciplina("Programação Front-End Web")}
                      className="group relative bg-[#090e1a] border-2 border-blue-500/30 rounded-3xl p-6 sm:p-8 text-left hover:border-blue-500 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl cursor-pointer overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20 relative z-10">
                        <Globe className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-3xl font-black text-white mb-2 italic tracking-tight group-hover:text-blue-400 transition-colors relative z-10">Programação Front-End Web</h2>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-8 line-clamp-3 relative z-10">
                        Domine a manipulação do DOM, eventos avançados, AJAX, arquitetura assíncrona e lógica de operadores com analogias visuais potentes.
                      </p>
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">DISCIPLINA ATIVA</span>
                          <span className="text-xs font-bold text-white">73 MÓDULOS</span>
                        </div>
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold group-hover:px-6 transition-all shadow-lg shadow-blue-600/30">
                          EXPLORAR &rarr;
                        </div>
                      </div>
                    </button>

                    {/* Placeholders */}
                    {["Estrutura de Dados", "Banco de Dados", "UX/UI Design", "Redes & Cloud", "IA Aplicada"].map((disc) => (
                      <div key={disc} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8 grayscale opacity-20 cursor-not-allowed flex flex-col justify-between">
                        <div>
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-6">
                            <Settings2 className="w-6 h-6 sm:w-10 sm:h-10 text-gray-700" />
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2 truncate">{disc}</h2>
                          <p className="text-gray-800 text-xs sm:text-sm line-clamp-2">Conteúdo em curadoria pela equipe técnica universitária.</p>
                        </div>
                        <div className="mt-8 flex items-center justify-between text-[10px] font-mono text-gray-700 border-t border-white/5 pt-4">
                          <span>EM BREVE</span>
                          <span className="bg-white/5 px-2 py-0.5 rounded">0% LOADED</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : !selectedTecnologia ? (
                /* LEVEL 1: TECHNOLOGY/SUB-THEME SELECTION */
                <motion.div 
                  key="level1"
                  initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-grow flex flex-col justify-center w-full"
                >
                  <header className="mb-8 lg:mb-12">
                    <button 
                      onClick={() => setSelectedDisciplina(null)}
                      className="flex items-center gap-2 text-gray-500 hover:text-white text-[10px] font-mono mb-4 transition-colors cursor-pointer group uppercase tracking-widest"
                    >
                      <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> VOLTAR AO MAPA DE DISCIPLINAS
                    </button>
                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white mb-2 tracking-tighter uppercase italic">
                      {selectedDisciplina}
                    </h1>
                    <p className="text-blue-400 font-mono text-xs sm:text-base tracking-[0.2em] uppercase">Selecione o Eixo Tecnológico</p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl">
                    <button 
                      onClick={() => setSelectedTecnologia("Javascript")}
                      className="group relative bg-gradient-to-br from-[#f7df1e]/20 to-black border border-[#f7df1e]/40 rounded-3xl p-8 text-left hover:border-[#f7df1e] transition-all hover:scale-[1.05] active:scale-95 shadow-2xl cursor-pointer overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-[#f7df1e]/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>
                      <div className="w-16 h-16 rounded-2xl bg-[#f7df1e] flex items-center justify-center mb-6 shadow-lg shadow-[#f7df1e]/20 relative z-10">
                        <Zap className="w-10 h-10 text-black fill-black" />
                      </div>
                      <h2 className="text-3xl font-black text-white mb-2 italic group-hover:text-[#f7df1e] transition-colors relative z-10 uppercase">Javascript</h2>
                      <p className="text-gray-400 text-sm leading-relaxed mb-8 relative z-10">
                        O motor fundamental do web moderno. Explore desde manipulação básica até operações complexas de baixo nível.
                      </p>
                      <div className="flex items-center justify-between relative z-10">
                        <span className="text-xs font-bold text-white bg-black/50 px-3 py-1 rounded-full border border-white/10">73 SLIDES</span>
                        <div className="bg-white text-black px-5 py-2 rounded-xl text-xs font-bold hover:px-7 transition-all">INICIAR</div>
                      </div>
                    </button>

                    <button 
                      onClick={() => setSelectedTecnologia("Vue JS")}
                      className="group relative bg-gradient-to-br from-[#42b883]/20 to-black border border-[#42b883]/40 rounded-3xl p-8 text-left hover:border-[#42b883] transition-all hover:scale-[1.05] active:scale-95 shadow-2xl cursor-pointer overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-[#42b883]/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>
                      <div className="w-16 h-16 rounded-2xl bg-[#42b883] flex items-center justify-center mb-6 shadow-lg shadow-[#42b883]/20 relative z-10">
                        <Globe className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-black text-white mb-2 italic group-hover:text-[#42b883] transition-colors relative z-10 uppercase">Vue JS</h2>
                      <p className="text-gray-400 text-sm leading-relaxed mb-8 relative z-10">
                        A Abstração Progressiva do JavaScript. Construa aplicações escaláveis com templates intuitivos e um ecossistema robusto.
                      </p>
                      <div className="flex items-center justify-between relative z-10">
                        <span className="text-xs font-bold text-white bg-black/50 px-3 py-1 rounded-full border border-white/10">4 SLIDES</span>
                        <div className="bg-white text-black px-5 py-2 rounded-xl text-xs font-bold hover:px-7 transition-all">INICIAR</div>
                      </div>
                    </button>

                    <button 
                      onClick={() => setSelectedTecnologia("React JS")}
                      className="group relative bg-[#61dafb]/10 border border-[#61dafb]/30 rounded-3xl p-8 text-left hover:border-[#61dafb]/60 transition-all hover:scale-[1.05] shadow-xl cursor-pointer overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#61dafb]/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
                      <div className="w-14 h-14 rounded-2xl bg-[#61dafb]/20 border border-[#61dafb]/40 flex items-center justify-center mb-6">
                        <Zap className="w-8 h-8 text-[#61dafb] fill-[#61dafb]/20" />
                      </div>
                      <h2 className="text-2xl font-black text-white mb-2 italic group-hover:text-[#61dafb] transition-colors uppercase">React JS</h2>
                      <p className="text-gray-400 text-xs leading-relaxed mb-8">Biblioteca líder da Meta. Focada em componentes reativos, JSX e Virtual DOM. A queridinha do mercado.</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#61dafb] bg-[#61dafb]/10 px-3 py-1 rounded-full border border-[#61dafb]/20">5 SLIDES</span>
                        <div className="bg-white text-black px-4 py-1.5 rounded-xl text-[10px] font-bold">INICIAR</div>
                      </div>
                    </button>

                    <button 
                      onClick={() => setSelectedTecnologia("Angular")}
                      className="group relative bg-[#dd0031]/10 border border-[#dd0031]/30 rounded-3xl p-8 text-left hover:border-[#dd0031]/60 transition-all hover:scale-[1.05] shadow-xl cursor-pointer overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#dd0031]/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
                      <div className="w-14 h-14 rounded-2xl bg-[#dd0031]/20 border border-[#dd0031]/40 flex items-center justify-center mb-6">
                        <ShieldCheck className="w-8 h-8 text-[#dd0031]" />
                      </div>
                      <h2 className="text-2xl font-black text-white mb-2 italic group-hover:text-[#dd0031] transition-colors uppercase">Angular</h2>
                      <p className="text-gray-400 text-xs leading-relaxed mb-8">Framework completo e altamente estruturado do Google. TypeScript nativo e ideal para grandes sistemas.</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#dd0031] bg-[#dd0031]/10 px-3 py-1 rounded-full border border-[#dd0031]/20">5 SLIDES</span>
                        <div className="bg-white text-black px-4 py-1.5 rounded-xl text-[10px] font-bold">INICIAR</div>
                      </div>
                    </button>

                    {/* Future Placeholders */}
                    {["HTML5 & CSS3", "Node.js", "Docker"].map((tech) => (
                      <div key={tech} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 grayscale opacity-20 cursor-not-allowed flex flex-col justify-between">
                        <div>
                          <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-6">
                            <Settings2 className="w-8 h-8 text-gray-700" />
                          </div>
                          <h2 className="text-2xl font-bold text-gray-800 mb-2 truncate uppercase italic">{tech}</h2>
                          <p className="text-gray-800 text-sm">Em breve disponível na trilha {selectedDisciplina}.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* LEVEL 2: TOPIC MAP */
                <motion.div 
                  key="level2"
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-grow flex flex-col min-h-0 w-full"
                >
                  <header className="flex flex-row items-end justify-between mb-3 sm:mb-6 flex-shrink-0 px-2 sm:px-0">
                    <div>
                      <button 
                        onClick={() => {
                          setSelectedTecnologia(null);
                          setActiveGroupIndex(null);
                        }}
                        className="flex items-center gap-2 text-gray-500 hover:text-white text-[9px] sm:text-[10px] font-mono mb-2 transition-colors cursor-pointer group uppercase tracking-widest"
                      >
                        <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> VOLTAR PARA {selectedDisciplina}
                      </button>
                      <h1 className="text-[22px] sm:text-3xl lg:text-5xl font-black tracking-tighter text-blue-400 mb-0.5 sm:mb-1 uppercase italic leading-none">{selectedTecnologia}</h1>
                      <p className="text-[10px] sm:text-xs lg:text-sm text-gray-400 uppercase tracking-[0.2em] font-mono opacity-60">Conteúdo Avançado de Programação</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-900/30 border border-blue-500/50 rounded-full text-[8px] sm:text-[10px] font-mono text-blue-300 tracking-widest hidden sm:inline-block uppercase font-bold">
                        {
                          selectedTecnologia === 'Vue JS' ? 'VUE.CORE.REFERENCE' : 
                          selectedTecnologia === 'React JS' ? 'REACT.CORE.REFERENCE' : 
                          selectedTecnologia === 'Angular' ? 'ANGULAR.CORE.REFERENCE' : 
                          'JS.CORE.REFERENCE'
                        }
                      </span>
                      {activeGroupIndex !== null && (
                        <div className="flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/40 px-3 py-1 rounded-full animate-in slide-in-from-right-4">
                          <span className="text-[8px] sm:text-[10px] font-mono text-indigo-300 uppercase">FILTRADO: {currentGroups[activeGroupIndex].title.split('(')[0]}</span>
                          <button 
                            onClick={() => setActiveGroupIndex(null)}
                            className="text-white hover:text-red-400 pb-0.5 cursor-pointer"
                            title="Limpar Filtro"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </header>

                  <div className="flex-grow min-h-0 mt-4 overflow-y-auto custom-scrollbar pr-2 pb-8">
                    {activeGroupIndex === null ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {currentGroups.map((group, groupIndex) => (
                          <button
                            key={group.id}
                            onClick={() => setActiveGroupIndex(groupIndex)}
                            className="group relative bg-[#0d121f] border border-white/10 rounded-2xl p-6 text-left hover:border-blue-500/50 transition-all hover:scale-[1.02] active:scale-98 shadow-xl overflow-hidden cursor-pointer h-full flex flex-col justify-between min-h-[160px]"
                          >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500"></div>
                            
                            <div>
                              <div className={`w-10 h-10 rounded-xl ${group.color} bg-opacity-20 flex items-center justify-center mb-4 border border-white/10 group-hover:border-white/30 transition-colors`}>
                                <Layout className="w-5 h-5 text-white" />
                              </div>
                              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {group.title.split('(')[0]}
                              </h2>
                              <p className="text-xs text-gray-400 font-mono tracking-widest uppercase mb-4">
                                {group.end - group.start} Módulos Disponíveis
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                              <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                                SLIDES {group.start + 1} - {group.end}
                              </span>
                              <div className="flex items-center gap-1 text-blue-400 font-bold text-[10px] sm:text-xs">
                                EXPLORAR <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </button>
                        ))}
                        
                        {/* Stats card */}
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-center text-center opacity-60">
                          <h3 className="text-2xl font-bold text-white/40">{currentTopics.length}</h3>
                          <p className="text-[10px] font-mono uppercase tracking-tighter text-gray-500">Módulos Totais</p>
                        </div>
                      </div>
                    ) : (
                      <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                        <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10 sticky top-0 backdrop-blur-md z-20">
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => setActiveGroupIndex(null)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white cursor-pointer"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div>
                              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${currentGroups[activeGroupIndex].color}`}></span>
                                {currentGroups[activeGroupIndex].title}
                              </h2>
                              <p className="text-xs text-gray-400">Escolha um módulo para iniciar a apresentação</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => {
                              setCurrentSlide(1);
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg transition-all flex items-center gap-2 text-xs shadow-lg shadow-blue-500/20 cursor-pointer"
                          >
                            APRENSENTAÇÃO COMPLETA <Play className="w-4 h-4 fill-white" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 pt-2">
                          {currentTopics.slice(currentGroups[activeGroupIndex].start, currentGroups[activeGroupIndex].end).map((topic, offset) => {
                            const IconComponent = topic.icon;
                            return (
                              <div 
                                key={topic.id} 
                                onClick={() => {
                                  setCurrentSlide(offset + 1);
                                }} 
                                className="cursor-pointer group bg-[#111625] border border-white/10 rounded-xl p-4 transition-all hover:bg-blue-500/10 hover:border-blue-500/40 hover:scale-[1.03] active:scale-95 shadow-sm"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className={`${topic.colorText} bg-white/5 p-1.5 rounded-lg group-hover:bg-white/10`}>
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <span className="text-[10px] font-mono text-gray-600">MOD {topic.id}</span>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                  <div className={`w-1.5 h-1.5 rounded-full ${topic.colorDot}`}></div>
                                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{topic.label}</span>
                                </div>
                                <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-blue-300">
                                  {topic.title}
                                </h3>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <footer className="mt-4 pt-3 border-t border-white/10 flex flex-row justify-between items-center text-[8px] sm:text-[10px] text-gray-500 tracking-widest font-mono uppercase flex-shrink-0 relative px-2 sm:px-0">
              <div>SISTEMA DE ENSINO (Baseado W3C Schools)</div>
              <div className="flex space-x-3">
                <span className="text-blue-500/80">INTERATIVO {currentTopics.length} MÓDULOS</span>
              </div>
            </footer>
          </div>
        </div>

        {/* SLIDES */}
        {filteredTopics.map((topic, index) => {
          const IconComponent = topic.icon;
          return (
            <div key={topic.id} className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-3 sm:p-8 pb-14 sm:pb-20 box-border overflow-hidden">
              <div className="w-full h-full max-w-[1200px] z-10 flex flex-col justify-center max-h-full">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-4 px-1 gap-2">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setCurrentSlide(0);
                      }} 
                      className="text-gray-400 hover:text-white flex items-center gap-1 sm:gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider transition-colors cursor-pointer bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10"
                    >
                      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" /> {activeGroupIndex !== null ? "VOLTAR PARA ASSUNTO" : "MAPA DE CONTEÚDO"}
                    </button>

                    <button 
                      onClick={() => {
                        setActiveGroupIndex(null);
                        setCurrentSlide(0);
                      }} 
                      className="text-gray-400 hover:text-white flex items-center gap-1 sm:gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider transition-colors cursor-pointer bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10"
                    >
                      <Layout className="w-3 h-3 sm:w-4 sm:h-4" /> {activeGroupIndex === null ? "MAPA DE CATEGORIAS" : "MENU DE CATEGORIAS"}
                    </button>

                    <button 
                      onClick={() => {
                        setSelectedTecnologia(null);
                        setActiveGroupIndex(null);
                        setCurrentSlide(0);
                      }} 
                      className="text-gray-400 hover:text-white flex items-center gap-1 sm:gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider transition-colors cursor-pointer bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10"
                    >
                      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" /> VOLTAR AO MAPA DE TECNOLOGIAS
                    </button>

                    <button 
                      onClick={() => {
                        setSelectedDisciplina(null);
                        setSelectedTecnologia(null);
                        setActiveGroupIndex(null);
                        setCurrentSlide(0);
                      }} 
                      className="text-gray-400 hover:text-white flex items-center gap-1 sm:gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider transition-colors cursor-pointer bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10"
                    >
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4" /> MAPA DISCIPLINAS
                    </button>
                  </div>

                  {activeGroupIndex !== null && (
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-widest hidden lg:inline">
                        ASSUNTO: <span className="text-blue-400">{currentGroups[activeGroupIndex].title.split('(')[0]}</span>
                      </span>
                      <button 
                        onClick={() => {
                          const absoluteIndex = currentGroups[activeGroupIndex].start + index;
                          setActiveGroupIndex(null);
                          setCurrentSlide(absoluteIndex + 1);
                        }}
                        className="text-[9px] sm:text-[11px] font-mono bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-full transition-all cursor-pointer"
                      >
                        EXIBIR TODOS OS MÓDULOS
                      </button>
                    </div>
                  )}
                </div>
                
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

      {isAnalogyOpen && currentSlide > 0 && currentTopics[currentSlide - 1] && (
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
                  Analogia: {currentTopics[currentSlide - 1].title}
                </h2>
              </div>
              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                
                <div className="flex flex-col gap-6">
                  <ul className="list-disc pl-5 sm:pl-8 space-y-3 sm:space-y-4">
                    {analogies[currentTopics[currentSlide - 1].id]?.items.map((item, idx) => (
                      <li key={idx} className="text-lg sm:text-2xl text-gray-300 leading-relaxed font-light">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {analogies[currentTopics[currentSlide - 1].id]?.images?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full place-items-start">
                      {analogies[currentTopics[currentSlide - 1].id].images.map((imgSrc, idx) => (
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
