import fs from "fs";

let content = fs.readFileSync("src/App.tsx", "utf-8");

const oldAnalogiesRegex = /const analogies: Record<string, string> = {[\s\S]*?};\n/g;

const newAnalogiesStr = `type AnalogyData = { items: string[]; images: string[] };
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
`;

content = content.replace(oldAnalogiesRegex, newAnalogiesStr);

// Now update the render block for analogies
const oldRenderBlock = `<p className="text-lg sm:text-2xl text-gray-300 leading-relaxed font-light">
                  {analogies[detailedTopics[currentSlide - 1].id]}
                </p>`;
                
const newRenderBlock = `
                <div className="flex flex-col gap-6">
                  <ul className="list-disc pl-5 sm:pl-8 space-y-3 sm:space-y-4">
                    {analogies[detailedTopics[currentSlide - 1].id]?.items.map((item, idx) => (
                      <li key={idx} className="text-lg sm:text-2xl text-gray-300 leading-relaxed font-light">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {analogies[detailedTopics[currentSlide - 1].id]?.images?.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-auto-fit gap-4 mt-4 w-full place-items-start">
                      {analogies[detailedTopics[currentSlide - 1].id].images.map((imgSrc, idx) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden border border-indigo-500/30 shadow-lg w-full max-w-sm">
                          <img 
                            src={imgSrc} 
                            alt={\`Analogia illustração \${idx + 1}\`} 
                            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>`;

content = content.replace(oldRenderBlock, newRenderBlock);

fs.writeFileSync("src/App.tsx", content);
console.log("Updated analogies object and rendering smoothly!");
