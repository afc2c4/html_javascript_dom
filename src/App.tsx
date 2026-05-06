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

            {/* Grouped Grid layout */}
            <div className="flex-grow min-h-0 mt-2 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-6 sm:gap-8 pb-4">
              {[
                { title: "DOM & Elementos (1-9)", start: 0, end: 9, color: "bg-blue-500" },
                { title: "Eventos JavaScript (10-16)", start: 9, end: 16, color: "bg-purple-500" },
                { title: "AJAX & JSON (17-28)", start: 16, end: 28, color: "bg-emerald-500" },
                { title: "Tratamento de Exceções (29-51)", start: 28, end: 51, color: "bg-red-500" },
                { title: "Operadores Cond/Log (52-59)", start: 51, end: 59, color: "bg-cyan-500" },
                { title: "Ternário (60-63)", start: 59, end: 63, color: "bg-amber-500" },
                { title: "Bitwise (64-73)", start: 63, end: 73, color: "bg-indigo-500" }
              ].map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h2 className="text-sm sm:text-base lg:text-lg font-bold text-white/90 mb-3 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${group.color}`}></span>
                    {group.title}
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-1.5 sm:gap-2 lg:gap-2.5">
                    {detailedTopics.slice(group.start, group.end).map((topic, offset) => {
                      const index = group.start + offset;
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
                </div>
              ))}
            </div>

            <footer className="mt-4 pt-3 border-t border-white/10 flex flex-row justify-between items-center text-[8px] sm:text-[10px] text-gray-500 tracking-widest font-mono uppercase flex-shrink-0 relative px-2 sm:px-0">
              <div>SISTEMA DE ENSINO (Baseado W3C Schools)</div>
              <div className="flex space-x-3">
                <span className="text-blue-500/80">INTERATIVO 73 MÓDULOS</span>
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
