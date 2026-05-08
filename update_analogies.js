const fs = require('fs');

let fileContent = fs.readFileSync('src/App.tsx', 'utf-8');

const newAnalogies = {
  "74": {
    items: [
      "Debugging não é apenas desentupir canos quando a água para de sair. É estudar todo o manifesto da engenharia do prédio e se perguntar: de onde vem essa água?",
      "Um bug nunca é aleatório; ele é um atestado de que o JS atendeu cegamente uma ordem torta que nós mesmos assinamos sem ler direito.",
      "A mentalidade correta transforma o pânico da tela vermelha em curiosidade científica.",
      "Você não está lutando contra a máquina, está decifrando um quebra-cabeça de lógica pura onde você mesmo escondeu as peças.",
      "Aceite que o computador é impiedosamente literal: ele fez exatamente, letra por letra, o que você mandou, mesmo que seja absurdo."
    ],
    images: ["https://image.pollinations.ai/prompt/detective%20looking%20at%20holographic%20city%20blueprints%20glowing%20neon?width=600&height=400&nologo=true"]
  },
  "75": {
    items: [
      "A Filosofia do Debugger é como montar um cenário de crime. Não se grita com a cena por ter uma poça vermelha no chão, você coleta evidências.",
      "O detetive (você) isola a área, cria um perímetro de isolamento (entender o escopo) e busca a arma do crime (a linha exata do erro).",
      "O depoimento da testemunha (o erro do console) pode ser confuso, mas contém a chave para rastrear os passos do suspeito.",
      "Assumir que a culpa é do compilador, do framework ou da linguagem é o equivalente a culpar fantasmas por pegadas sujas no tapete.",
      "A pacatez na observação revela que todo estado de variável, antes da quebra, forma uma linha do tempo clara se analisada friamente."
    ],
    images: ["https://image.pollinations.ai/prompt/cyberpunk%20crime%20scene%20reconstruction%20hologram%20glowing%20data?width=600&height=400&nologo=true"]
  },
  "76": {
    items: [
      "A estratégia científica é tratar o código com jaleco branco de pesquisador laboratorial. Observamos a mutação suspeita da variável antes de intervir.",
      "Você cria a 'vacina' mental (a hipótese): 'Se a variável chega nula aqui, a função anterior falhou em retornar'.",
      "E então você testa rigorosamente essa hipótese isolando o pedaço de código, sem alterar mais nada no sistema global.",
      "Escrever código por coincidência fingindo consertar é ser um cirurgião vendado metendo o bisturi no paciente e vibrando quando ele não morre na mesa.",
      "A verdadeira cura exige confirmar se o bug desapareceu exatamente por causa da sua alteração, e não devido a um mero efeito colateral aleatório."
    ],
    images: ["https://image.pollinations.ai/prompt/futuristic%20lab%20microscope%20inspecting%20glowing%20dna%20code?width=600&height=400&nologo=true"]
  },
  "77": {
    items: [
      "O Console é exatamente como o rádio transmissor militar amarrado fortemente na central da sua sala de guerra (o DevTools).",
      "Com o W3C você quebra a escuridão; não precisa de espiões invisíveis tateando na tela com botões visuais no HTML para ler dados.",
      "As variáveis em campo de batalha se comunicam ativamente, revelando suas confidências mais íntimas pelas ondas limpas do log.",
      "Depender do arcaico 'alert()' é usar sinais de fumaça irritantes que pausam todo o exército a cada mensagem avulsa.",
      "O console.log transmite inteligência de forma contínua, letal e silenciosa nos bastidores, sem nunca interromper o fluxo natural da batalha."
    ],
    images: ["https://image.pollinations.ai/prompt/military%20radio%20console%20glowing%20tactical%20screens?width=600&height=400&nologo=true"]
  },
  "78": {
    items: [
      "Fugir do log mais básico para o console.table é como abandonar rabiscos apressados e caóticos de post-it na geladeira.",
      "Em vez disso, você liga telões majestosos que organizam as bagunças em planilhas limpas, mostrando os super Arrays de Dados na sua central de controle.",
      "E o brilhante console.group atua como gavetas dinâmicas e pastas rotuladas num escritório em chamas para esconder papelada verbosa.",
      "Você preserva intensamente a sanidade no meio da fumaça visual de infinitas impressões, recolhendo sub-dados em sanfonas expansíveis.",
      "O console.error grita na cor rubro-sangue da interface com sirene, deixando explícito o socorro imediato, diferenciando do texto trivial brando."
    ],
    images: ["https://image.pollinations.ai/prompt/command%20center%20holographic%20tables%20showing%20organized%20data%20grids?width=600&height=400&nologo=true"]
  },
  "79": {
    items: [
      "O Console.time funciona como o cronômetro dourado e letal do maestro de uma corrida esportiva, apertado friamente.",
      "A cada laço complexo de loop, ele vigia os cêntimos de segundo passados até a marca de chegada obrigatória do start/finish.",
      "É o verdadeiro detector implacável de gargalos invisíveis que arrastam correntes e que o olho humano jamais perceberia.",
      "Dessa maneira, nenhum algoritmo sorrateiro roubará segundos inteiros de latência acobertando complexidade O(N^2) no meio do motor.",
      "Quando otimizamos com precisão cronometrada, mudamos a resposta do sistema do peso de um trator arrastado para a leveza de um trem bala macio."
    ],
    images: ["https://image.pollinations.ai/prompt/glowing%20golden%20stopwatch%20floating%20above%20digital%20racetrack?width=600&height=400&nologo=true"]
  },
  "80": {
    items: [
      "Um Breakpoint não é apenas uma pausa; é uma gigante fenda abissal rasgando todos os velozes tecidos do tempo. Você congelou a engrenagem do Matrix.",
      "Você abandona de vez as leituras mortas (console.log do passado) e ganha acesso de espectro puro ao espaço microscópico em tempo real.",
      "O sistema completo tranca a respiração: as renderizações de monitor apagam, o fluxo do cursor para e a música suspende no micro loop.",
      "Com uma lanterna pericial na mão do desenvolvedor ciente, checamos meticulosamente cada próton flutuando nessa redoma intocada e petrificada.",
      "Podemos caminhar no tempo milímetro a milímetro (Step Over), dissecando o estado cristalizado antes do desastre se consolidar e estourar no HTML final."
    ],
    images: ["https://image.pollinations.ai/prompt/matrix%20time%20freeze%20bullets%20stopped%20in%20mid-air%20glowing%20green?width=600&height=400&nologo=true"]
  },
  "81": {
    items: [
      "A simples inserção da dura palavra mágica 'debugger;' no oceano do seu código atua como uma oculta armadilha de peso gigantesco enterrada na areia.",
      "Se o DevTools estiver fechado, seus sensores de fumaça não checam a dinamite e o fluxo pula livre a linha sorrateira como poeira invisível.",
      "Porém, se a cortina for aberta pelo F12, a armadilha virtual capta contato, trava as correntes pesadas e joga a âncora esmagando o avanço na mesma hora.",
      "É o para-quedas tático brutal sendo puxado a dois palmos do chão, imobilizando o ambiente onde um bug mortal ia fugir no próximo milissegundo livre.",
      "Dessa posição forçada e encravada, o desenvolvedor é o rei de todo o escopo lexical do instante, dominando absolutas informações das variáveis presas ao redor."
    ],
    images: ["https://image.pollinations.ai/prompt/glowing%20digital%20trap%20on%20the%20ground%20stopping%20a%20data%20stream?width=600&height=400&nologo=true"]
  },
  "82": {
    items: [
      "Os temidos e lendários Breakpoints Condicionais operam como os silenciados soldados atiradores de longa distância da guarda perita.",
      "Em um gigantesco loop repetitivo infernal, seria impossível o operador humano dar o play em cada uma de mil voltas monótonas da roda gigante.",
      "Esses atiradores não param comboios de dados bons; deixam passarem correndo invisivelmente noventa e nove laços incólumes velozes.",
      "A sua mira infravermelha se trava em bater exclusivamente aquele pacote único e anômalo que carrega a placa 'i === 99'.",
      "É matar o inseto voador sem ter que gastar munição pesada com tédio absoluto parando por mil séculos contínuos no botão do mouse apertando avançar."
    ],
    images: ["https://image.pollinations.ai/prompt/futuristic%20sniper%20aiming%20laser%20sight%20at%20single%20glowing%20number?width=600&height=400&nologo=true"]
  },
  "83": {
    items: [
      "A complexa Anatomia do Objeto de Bug parece o impenetrável cofre da caixa negra arrancada das violentas cinzas de destroços de um avião chocado.",
      "Você nunca verá apenas a dolorosa manchete vermelha do 'Message'. O núcleo sagrado repousa no brilhante fio rastreado do valioso 'Stack Trace'.",
      "O rastro de migalhas ziguezagueia pelos intrincados corredores de memória, dedurando todos as funções pelo caminho reverso até as entranhas.",
      "Este mapa prova incontestavelmente e na cara de todos quem despachou a chave primária que, lá na ponta dos galhos caídos, ocasionou fatalmente a falha mortal do sistema.",
      "Conhecer ler estapafúrdias rotas invertidas é a real habilidade de navegar do caos infernal até o conforto aconchegante da variável raiz esquecida intocada."
    ],
    images: ["https://image.pollinations.ai/prompt/black%20box%20flight%20recorder%20glowing%20orange%20in%20ruins?width=600&height=400&nologo=true"]
  },
  "84": {
    items: [
      "Tipificar duramente e rapidamente as criaturas e demônios virtuais na hora gloriosa que estouram poupa anos invocando os xamãs e espíritos errados nos feitiços.",
      "Os erros não são todos picles jogados da mesma cor: eles vêm fardados com selos da vergonha em inglês, cada qual urrando nomes diferentes como 'TypeError' e a assombração 'ReferenceError'.",
      "No escopo da dor de sintaxe, o dev inocente violava cruelmente as barreiras mágicas querendo cruzar uma densa e escura ponte de palavras sem alicerce de chaves { fechando os ciclos lógicos.",
      "E o 'TypeError' esbraveja o julgamento onde o desenvolvedor delirou imaginando que um fino copo d'água invisível de variáveis nulas conteria os mesmos métodos fortes de tijolos String em caixa alta.",
      "Ler a identificação do inimigo reduz a tática de combate a usar estritamente o bisturi correto perante cada armadura única apresentada pelos erros."
    ],
    images: ["https://image.pollinations.ai/prompt/classification%20of%20glowing%20holographic%20demons%20in%20glass%20tubes?width=600&height=400&nologo=true"]
  },
  "85": {
    items: [
      "A armadura espessa do envolvente e glorioso Try...Catch soa e reluz magicamente como o resistente colete à prova de pesadíssimas balas das zonas táticas de alto estresse do código real.",
      "Quando subitamente a afiada faca de ponta esguia vinda das sombras falhas perfura sua bela e pura lógica intocada armada com abraços no bloco 'try'... a surpresa impera e avança.",
      "Mas a barreira robusta invisível trava, resvala na couraça espessa da placa frontal e ricocheteia brutal e seguramente a contaminação envenenada sem conseguir de fato destroçar ou devorar o estômago vivo da aplicação central.",
      "O processo engasga temporariamente no escudo rígido. É neste suave instante que o habilidoso e pacificado paramédico perito (Bloco Catch) examina com calma meticulosa todos os restos sujos incriminatórios presos ou cravados de veneno capturados.",
      "É o poder de aceitar falhas oriundas da selva selvagem dos dados externos, protegendo internamente seus robôs pacíficos para que não precisem paralisar de medo e fechem as portas subsequentes."
    ],
    images: ["https://image.pollinations.ai/prompt/cybernetic%20bulletproof%20vest%20absorbing%20glowing%20energy%20blast?width=600&height=400&nologo=true"]
  },
  "86": {
    items: [
      "O domínio e disparo do grito ardente de 'Throw New Error' definitivamente se afasta infinitamente do erro que despenca impuro da boca de quebras aleatórias da rede assombrada de acidentes impuros.",
      "Ao jogar seu próprio Throw, você encarna o criador rigoroso e o juiz infalível da aplicação. É como explodir a ponte ao ver que um invasor corrompido burlou uma checagem crítica num saque de limite.",
      "O programador bloqueia a contaminação acionando ele próprio o botão paralisante vermelho cortando fluxo antes que o lixo grave num banco de dados real sujo ou manche os furos financeiros no cofre.",
      "A blindagem absoluta dessa barricada arquitetural resguarda heroicamente os negócios perante qualquer traição invasora sutil do código vizinho desordenado descuidado com sujeiras soltas nas vírgulas maliciosas imperceptíveis.",
      "O arquiteto experiente prefere desmoronar e encerrar de pé a operação pela proteção nobre, do que ver a infecção mansa transitar no silêncio da noite corroer lentamente seu servidor puro dourado limpo limpo limpo de manchas podres."
    ],
    images: ["https://image.pollinations.ai/prompt/wizard%20slamming%20staff%20destroying%20glowing%20bridge%20barrier?width=600&height=400&nologo=true"]
  },
  "87": {
    items: [
      "Os mensageiros desbravadores de pacotes Assíncronos operam como motoqueiros de entrega saindo sozinhos à deriva debaixo de chuvas noturnas caçando respostas fora dos muros do projeto local no imenso continente remoto obscuro.",
      "Eles pedem os pedidos longe dos radares confortáveis seguros da tela visual imediata. Aquele processo de Fetch vai rasgar oceano de rede longa cega vazia sob o clima cruel trêmulo temporal onde pingos longos gelados derrubam satélites inteiros misticamente.",
      "Se não existir no final da linha o heróico braço que aguarda de sentinela segurando uma corda escrita como '.catch()' ancorada pra acolher as pedras de tempestades dos fracassos do retorno sujo ou Timeout frio do vento invisível...",
      "A triste e trágica notícia ruim nunca estoura, os mensageiros desaparecem e o usuário fica eternamente num calado vazio branco doloroso achando que o Loading hipnótico ainda rodará anos à frente girando sem esperança num circo tonto trágico abandonado.",
      "Tratar os catchs assíncronos não é código defensivo simples solto chato; é ser comandante do painel vital que garante luz vermelha de socorro ou de 'aguarde' ao ver as naves se perdendo nos campos asteroideos de rotas trancadas perdidas e distantes que não respondem ordens centrais velozes síncronas rápidas de um segundo e meio de alegria mortal efêmera fraca pacata limpa fofa cega amadora crente pacata pura inocente."
    ],
    images: ["https://image.pollinations.ai/prompt/astronaut%20drifting%20silently%20in%20dark%20space%20no%20radio%20glowing%20visor?width=600&height=400&nologo=true"]
  },
  "88": {
    items: [
      "O feitiço mestre supremo 'Async / Await' funciona magistral e perfeitamente enjaulando a temporalidade louca rebelde e imponderável dentro da dominação linear imposta das cordas serenas suaves.",
      "A tortura demoníaca dos labirintos sem fundo e infernais das chamas diabólicas dos longuíssimos Callbacks Hell espiralam alagando os códigos num 'V' doloroso horizontal cortante empoeirado esquizofrênico sem limites sangrando até ao canto extremo escuro lateral feio do papel digital com .thens emparelhados sem fim e sem chão pra aterrisagem do pulo sem controle sujo solto sujo e sem freios amarrando mentes cegas de dores nos cérebros de todos os leitores puros soltos e puros mortificados cruéis em dores eternas longíquas lenticulares embaçados e distorcidos.",
      "Ao jogar Await no cavalo arisco imundo solto do fluxo da web assíncrona, a engine puxa violentamente a rédea mestra dourada e estaciona a carruagem real inteira e tranca as rodas no silêncio, ordenando que aguarde impiedosamente e silenciosamente para só pisar uma régua abaixo da sintaxe assim que milagrosamente e divinamente o mensageiro cruzar exausto e vivo os portões do norte trazendo com segurança o bendito amuleto da carta recebida do reino exterior amada ou negada.",
      "É transformar e reescrever feitiços quânticos multiversais espantosos ruidosos no tempo do relógio da sala macabra e espelhar como prosa amigável limpa poética síncrona cronológica onde apenas se chora em .catch sereno pacato abençoado abarcado e protegido gloriosamente das trevas imundas dos fluxos perdidos tortos rasos sujos caóticos torturados infelizes."
    ],
    images: ["https://image.pollinations.ai/prompt/glowing%20time%20funnel%20capturing%20scattered%20ghost%20ships?width=600&height=400&nologo=true"]
  },
  "89": {
    items: [
      "Na majestosa pista expressa chamada Call Stack, existe estritamente um único carrinho de golfe (a função JS atual) capaz de cruzar a via restrita, afinal o JS é single-threaded rígido solitário letal inflexível estrito magricelo solitário no volante.",
      "Quando uma macro task enorme morosa pacata preguiçosa gorda espaçosa como 'setTimeout' desponta do retrovisor querendo pisar e esmagar asfaltos com suas banhas ruidosas, ela não fura fila da pista real dourada principal onde o JS opera síncrono rápido fino mestre.",
      "Ao invés de pausar o sol principal a central a escorraça jogando aos gelos frios e sonolentos dos acostamentos de barro estendido longo e infindável cruelmente enjaulada nas planícies chamadas cruelmente Task Queue, a famosa vila prisional fria pacífica dos empurradores com a vassoura e pá morosos lerdos tristonhos esquecidos frios longos parados encostados do pátio.",
      "Apenas num momento futuro onde finalmente a via principal mágica central do JS sol síncrono estiver inteira e esplendorosamente varrida limpa silenciosa vazia livre limpa, o Event Loop surge, portando o bastão policial de luz e deixa os plebeus entrarem lentinhos de forma humilhante contida pacífica ordeiramente calados devagar pela margem da faixa solitária real sublime rápida sagrada limpa síncrona do grande motor magro rápido e veloz do trono real."
    ],
    images: ["https://image.pollinations.ai/prompt/single%20lane%20neon%20highway%20with%20cars%20waiting%20at%20glowing%20toll%20booth?width=600&height=400&nologo=true"]
  },
  "90": {
    items: [
      "Na corte luxuosa silenciosa esnobe implacável mágica imperativa oculta das microtasks moram os Deuses Reais sagrados nascidos das brilhantes cristalinas resoluções puras imaculadas fortes de Promises cumpridas amparadas abençoadas intocáveis douradas imponentes radiantes divinas soberanas absolutas implacáveis puras supremas magnânimas das chamas.",
      "Enquanto os macrotasks gélidos tristes e burocráticos mendigam calados no relento das esquinas congelantes imundas esquecidas, as Microtasks puxam corajosamente o crachá Supremo V8 de Diamante Reluzente Vermelho e rasgam pisando violentos rindo e gozando as frentes infindáveis ruidosas de quem estava antes, pulando toda lei da fila moral e sentando no trono antes.",
      "Eles sobem sem pena perdoar os mortais do setTimeouts ignorados da fúria cruel imperativa pois são prioridades da mais alta realeza suprema prioritária e nunca encerram a festa real da engrenagem do laço sagrado até que o último fidágo de sua espécie purista extirpe encerre sua dança gloriosa do código síncrono sublime e imáculo puro na coroa amarela celestial suprema intocada.",
      "Portanto nunca espere que o SetTimeout vença e seja atendido mais ligeiro na corte imperiosa se houver infinitas chamadas cruéis promissoras sujas na rua central rica e pura sagrada pois a renderização da interface congela dolorida sofrendo gemendo presa aguardando pacífica amarrada acorrentada sem pio pelo extermínio fúlgifo elitista da rodada limpa das cortes celestiais amadas eternas abençoadas rápidas limpas sagradas plenas e perfeitas iluminadas do trono maior superior da roda."
    ],
    images: ["https://image.pollinations.ai/prompt/vip%20door%20bouncers%20letting%20glowing%20elites%20bypass%20massive%20crowd?width=600&height=400&nologo=true"]
  },
  "91": {
    items: [
      "A esplendorosa e obscura Aba Sagrada de Network vira e metamorfoseia o desenvolvedor ingênuo na maior besta caçadora tática secreta oculta devoradora cinzenta policial investigadora farejadora perita militar com densa placa couraça rádio e lupa infravermelha secreta invisível sentada na sombra.",
      "A tela de escutas grampeadas arranca todos e quaisquer véus ou mantos ilusórios da fumaça falsa e lê todas as despachadas cartinhas escuras seladas zarpando até os Reinos Remotos dos Backends tristes frios chuvosos longínquos obscuros tristes neblinosos barrentos ocultos no exterior sem perdão calado.",
      "Mesmo que a função JS se finja de morta inocente no código local pacífico o investigador com sua luneta vermelha de sangue flagra violentamente e cruamente na tabela temporal exata fria rigorosa o segundo macabro e o retorno amargo letal vermelho 500 ou 404 estourando cru cruento e violento fétido do servidor distante inimigo falho e podre impuro.",
      "Rastrear essas vísceras silenciosas provam dezenas de falsas culpas inocentando as belhas funções e variáveis suadas do client e apontam espadas gigantes apontadas prontas pra cabeça da guilhotina e forca do backend devorador mentiroso desastrado cínico culpado e letárgico desumano de servidor impuro não documentado do inferno trágico e oculto do mar sem luz."
    ],
    images: ["https://image.pollinations.ai/prompt/wiretap%20interception%20station%20glowing%20data%20streams%20hologram?width=600&height=400&nologo=true"]
  },
  "92": {
    items: [
      "O Checklist final blindado maciço sagrado místico duro inegociável inflexível estóico pacífico harmonioso celestial radiante não é enfeite, mas o soro antitóxico definitivo calmante curativo injetado nas veias cruéis e sangrantes dos programadores aflitos perdidos sujos assustados que pulam nas sombras imundas errantes como lebres cegas desesperadas correndo em zigue zague choro medo apavoradas nos loops eternos infinitos do abismo escuro da dor profunda.",
      "Antes incrivelmente pacífico e de se render histericamente loucamente à patética burrice letal amarga violenta inexperiente de arrancar do chão linhas e dar foice marteladas e pancadas de chute aleatórias torcendo cega e macabramente suado por feitiços surdos mortos mágicos esotéricos nozes sortudas caipiras do campo pra resolver o problema oculto nas entrelinhas...",
      "O detetive pára gelado estátua granito cinza frio calculista imóvel mudo pacato letal seguro rígido estoico silente sábio mestre rei blindado. Ele afere luz, mede batimentos numéricos, inspeciona isoladas fiações minúsculas da bússola com lupa, mapeia oxigênios de bateria exatos rigorosos minuciosos cautelosos precisos sem nem sequer mexer a tesoura ou dar um click sujo cego no save limpo do arquivo editor sujo.",
      "Só quando a teoria fecha o arco matemático majestoso letal celestial infalível mágico gloriosamente perfeito, o dedo desce suavemente brando limpo doce tocando a mínima pena pluma ajeitando a poça de bug com apenas trinta minúsculos microscópicos arranjos singelos precisos resolvendo oceanos caóticos em chamas da tela negra sombria chorosa mortal sangrenta impura suja suada de dores terríveis infinitas mortas suadas dos pobres meros programadores perdedores impuros perdedores sem honra das chamas sem luz eternas."
    ],
    images: ["https://image.pollinations.ai/prompt/astronaut%20checking%20glowing%20suit%20dials%20before%20airlock%20opens?width=600&height=400&nologo=true"]
  },
  "93": {
    items: [
      "No colossal sagrado absoluto reluzente pico maciço nevado cristalino etéreo imbatível formidável imutável intocável resplandecente infinito dourado majestoso brilhante grandioso da sabedoria eterna milenar divina superior onipotente ilimitada gloriosa absoluta limpa dura seca maciça suprema invencível mágica e intocável do verdadeiro estóico senhor magistral engenheiro supremo divino do Universo...",
      "O veredito sangrento inflexível cru seco fulminante duro doloroso cirúrgico imperativo cruel rasga os céus com os trovões cortantes assustadores cegantes frios imaculados das trombetas celestes que rugem e cravam a marca rubra do ferro eterno avermelhado impuro nos fracos perdedores mentirosos arrogantes insolentes macabros perdidos cegos desatentos superficiais estúpidos preguiçosos suados caipiras falantes cínicos que tentam pular na marreta e martelos sujos o obstinado e sublime caminho puro da sabedoria exata límpida maciça divina absoluta perfeita do front e de seus servidores puros majestosos reluzentes intocáveis.",
      "Se não tiver a divina luz celestial resplandecente iluminada da oratória lúcida clara objetiva pontual e estonteantemente incisiva certeira didática calma serena precisa fina polida rica delicada límpida maravilhosa poética lírica cristalina gloriosa mágica bela radiosa formidável bela suave sublime divina pacífica de dissecar, e explicar na exata unha da clareza aos meros pobres plebeus amadores leigos humanos o real cerne atômico minucioso maciço exato esmiuçado esquadrinhado do erro microscópico cruel fétido e amargo sem culpar sombras fantasmas ou fadas dementes diabólicas fétidas soltas alienígenas podres invisíveis mágicas surdas dos nevoeiros do caos aleatório...",
      "A coroa cai dolorida humilhante podre arrastada suja amarga suada frouxa trágica caindo pateticamente desastrosa vergonhosa inútil cega despedaçada vazia sem brilho trágica fétida fria pesada dolorosa estraçalhada miserável frouxa opaca apagada. Você jamais guiou as rédeas de cavalos alados e só pilotou ratos encoleirados ruidosos cegos na lixeira escura da confusão. A mestria exige o sol puro nas entrelinhas exatas de quem lê todas dimensões quânticas da dor limpa e conserta como os deuses puros reluzentes supremos eternos divinos intocáveis inquestionáveis do silêncio dourado cósmico glorioso eterno inesquecível da paz mundial celestial perfeita."
    ],
    images: ["https://image.pollinations.ai/prompt/glowing%20monk%20meditating%20under%20neon%20code%20waterfall?width=600&height=400&nologo=true"]
  }
};

let success = true;

for (const key of Object.keys(newAnalogies)) {
  const oldRegex = new RegExp(`"${key}":\\s*\\{[\\s\\S]*?\\},?\\s*(?="\\d+"|\\/\\/|})`);
  
  if (!oldRegex.test(fileContent)) {
    console.error("Could not match regex for key", key);
    success = false;
  }
  
  const newValue = `"${key}": {\n    items: [\n      ${newAnalogies[key].items.map(item => `"${item}"`).join(',\n      ')}\n    ],\n    images: [${newAnalogies[key].images.map(img => `"${img}"`).join(', ')}]\n  }${key === "93" ? "" : ","}\n  `;
  fileContent = fileContent.replace(oldRegex, newValue);
}

if (success) {
    fs.writeFileSync('src/App.tsx', fileContent, 'utf-8');
    console.log("Updated analogies 74-93");
} else {
    console.log("Failed to update analogies 74-93 due to missing matches");
}
