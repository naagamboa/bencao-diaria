window.CI_MODULES = (window.CI_MODULES || []).concat([
  {
    id: "m4",
    title: "Dentística II — Adesão e restaurações",
    short: "Dentística: materiais",
    icon: "i-layers",
    accent: "mustard",
    blurb: "Condicionamento ácido, camada híbrida, resina composta, fotoativação, cimentos e as falhas que a prova cobra.",
    lessons: [
      {
        id: "m4l1",
        title: "Adesão: esmalte, dentina e camada híbrida",
        minutes: 9,
        intro: "Adesão não é “passar o bond”. É controlar substrato, umidade e polimerização. A prova cobra a sequência e os erros.",
        content: `
<p class="lead">A adesão dental une o material restaurador ao esmalte e à dentina por mecanismos micromecânicos e químicos. O esmalte é homogêneo e mineralizado; a dentina é úmida, tubular e orgânica — por isso exige cuidado diferente.</p>

<h3>Condicionamento ácido</h3>
<p>O ácido fosfórico 35–37% remove a smear layer, desmineraliza o esmalte e expõe a rede de colágeno dentinária.</p>
<ul>
  <li><strong>Esmalte:</strong> 15–30 segundos; superfície fica opaca e porosa.</li>
  <li><strong>Dentina:</strong> cerca de 15 segundos; não secar demais.</li>
  <li><strong>Lavagem:</strong> remover completamente o ácido.</li>
</ul>

<div class="callout exam">
  <strong>Umidade da dentina</strong>
  <p>Dentina seca com jato de ar forte colapsa o colágeno e impede a infiltração do adesivo. O ponto ideal é <strong>úmido brilhante</strong>, não encharcado. A prova adora “secar bem a dentina” como alternativa errada.</p>
</div>

<h3>Sistemas adesivos</h3>
<table>
  <thead><tr><th>Sistema</th><th>Passos</th><th>Característica</th></tr></thead>
  <tbody>
    <tr><td>Convencional de 3 passos</td><td>Ácido + primer + bond</td><td>Bom controle; mais passos.</td></tr>
    <tr><td>Convencional de 2 passos</td><td>Ácido + primer/bond</td><td>Simplificação; desempenho depende da técnica.</td></tr>
    <tr><td>Autocondicionante</td><td>Primer ácido + bond (ou all-in-one)</td><td>Menos sensibilidade técnica; menor ataque ao esmalte.</td></tr>
    <tr><td>Universal</td><td>Versátil, com ou sem ácido seletivo</td><td>Ler a bula: modo, tempo e fotoativação variam.</td></tr>
  </tbody>
</table>

<h3>Camada híbrida</h3>
<p>O adesivo infiltra a dentina desmineralizada e forma a camada híbrida. Se o colágeno colapsa, a resina não penetra e ficam zonas vulneráveis à nanoinfiltração e à sensibilidade.</p>

<h3>Erros que derrubam a adesão</h3>
<ul>
  <li>Contaminação com saliva, sangue ou óleo após o condicionamento.</li>
  <li>Secagem excessiva da dentina.</li>
  <li>Solvente não evaporado antes da fotoativação.</li>
  <li>Camada de adesivo muito espessa ou irregular.</li>
  <li>Fotoativação insuficiente ou ponta longe do dente.</li>
</ul>

<div class="callout warn">
  <strong>Esmalte x dentina</strong>
  <p>A adesão ao esmalte é mais estável e previsível. A dentina é úmida, tem túbulos e menor conteúdo mineral. Por isso, o condicionamento seletivo do esmalte é uma estratégia comum nos autocondicionantes.</p>
</div>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>A dentina condicionada é como uma esponja molhada: se você aperta demais, ela colapsa; se deixa encharcada, o adesivo se dilui. O equilíbrio é o segredo.</p>
</div>
`
      },
      {
        id: "m4l2",
        title: "Resina composta: composição, contração e fotoativação",
        minutes: 9,
        intro: "Entender a matriz e as partículas explica por que a resina contrai, mancha e falha — e como evitar.",
        content: `
<p class="lead">A resina composta é formada por <strong>matriz orgânica</strong> (monômeros como Bis-GMA, UDMA, TEGDMA), <strong>partículas inorgânicas</strong> (sílica, bário, zircônia) e <strong>agente de união</strong> (silano). A proporção e o tamanho das partículas definem propriedades.</p>

<h3>Classificação por partícula</h3>
<ul>
  <li><strong>Macroparticuladas:</strong> resistência, mas acabamento ruim.</li>
  <li><strong>Microparticuladas:</strong> polimento excelente, menor resistência.</li>
  <li><strong>Híbridas:</strong> equilíbrio entre resistência e estética.</li>
  <li><strong>Micro-híbridas e nanoparticuladas:</strong> bom polimento e desgaste.</li>
</ul>

<h3>Contração de polimerização</h3>
<p>Ao polimerizar, os monômeros se aproximam e o volume diminui. A contração gera tensão na interface; o <strong>fator C</strong> (razão entre superfícies aderidas e livres) agrava isso em cavidades com muitas paredes.</p>
<ul>
  <li>Incrementos pequenos reduzem a tensão.</li>
  <li>Técnica incremental e direcionamento da luz ajudam.</li>
  <li>Não existe resina “sem contração”; existem estratégias para minimizar o efeito.</li>
</ul>

<div class="callout exam">
  <strong>Fotoativação</strong>
  <p>Potência, tempo, distância e barreira interferem. Incrementos espessos, ponta longe ou aparelho fraco deixam monômero não convertido, aumentando sensibilidade, manchamento e falha. A prova cobra “2 mm” como referência de incremento.</p>
</div>

<h3>Propriedades e indicações</h3>
<table>
  <thead><tr><th>Propriedade</th><th>Implicação clínica</th></tr></thead>
  <tbody>
    <tr><td>Resistência à compressão</td><td>Adequada para posteriores, com espessura controlada.</td></tr>
    <tr><td>Módulo de elasticidade</td><td>Menor que o esmalte; pode flexibilizar sob carga.</td></tr>
    <tr><td>Desgaste</td><td>Depende da partícula, antagonista e oclusão.</td></tr>
    <tr><td>Estética</td><td>Translucidez, opacidade e cor por camadas.</td></tr>
    <tr><td>Sorção de água</td><td>Pode manchar e degradar ao longo do tempo.</td></tr>
  </tbody>
</table>

<h3>Passo a passo clínico</h3>
<ol>
  <li>Isolamento e limpeza do substrato.</li>
  <li>Seleção de cor antes do isolamento.</li>
  <li>Preparo conservador e remoção de tecido comprometido.</li>
  <li>Condicionamento, primer/bond e fotoativação.</li>
  <li>Incrementos com adaptação e fotoativação.</li>
  <li>Acabamento, ajuste oclusal e polimento.</li>
</ol>

<div class="callout warn">
  <strong>Acabamento não é luxo</strong>
  <p>Superfície rugosa retém placa e mancha. O polimento adequado melhora estética, saúde gengival e longevidade. A prova cobra acabamento como etapa, não como opcional.</p>
</div>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>A resina é como concreto com brita: a matriz é o cimento, as partículas são a brita. Se a brita é bem distribuída e o cimento cura direito, a estrutura resiste; se falta cura ou sobra vazio, falha.</p>
</div>
`
      },
      {
        id: "m4l3",
        title: "Cimentos, ionômero e falhas restauradoras",
        minutes: 8,
        intro: "A prova mistura materiais: quando usar ionômero, quando usar resina, quando o problema é a técnica e não o material.",
        content: `
<p class="lead">Cada material tem indicação. A escolha depende de substrato, umidade, estética, carga e cooperação do paciente. Não existe material universal.</p>

<h3>Cimento de ionômero de vidro (CIV)</h3>
<ul>
  <li>Libera flúor e tem boa compatibilidade com dentina.</li>
  <li>Adere quimicamente ao dente, mas é mais friável e menos estético.</li>
  <li>Indicado em áreas de baixa carga, selantes, forros e técnicas atraumáticas.</li>
  <li>Sensível à umidade durante a presa; proteger com verniz.</li>
</ul>

<h3>Cimentos resinosos</h3>
<p>Usados em prótese, coroas, laminados e pinos. Exigem controle de umidade, espessura adequada e fotoativação (ou ativação química/dual). O excesso deve ser removido antes da presa final.</p>

<h3>Hidróxido de cálcio</h3>
<p>Estimula reparo e tem ação antibacteriana, mas pode ser solúvel e de baixa resistência. Uso em capeamento, pulpotomia e proteção de exposições, conforme protocolo.</p>

<div class="callout exam">
  <strong>Escolha de material</strong>
  <p>Pergunte: há umidade? há carga oclusal? a estética é crítica? o paciente tem alto risco de cárie? A resposta define CIV, resina, amálgama (quando disponível) ou cimento resinoso.</p>
</div>

<h3>Falhas restauradoras e suas causas</h3>
<table>
  <thead><tr><th>Falha</th><th>Causas prováveis</th></tr></thead>
  <tbody>
    <tr><td>Sensibilidade pós-operatória</td><td>Adesão inadequada, dentina ressecada, excesso de ácido, oclusão alta, polpa comprometida.</td></tr>
    <tr><td>Manchamento marginal</td><td>Margem infiltrada, excesso, acabamento ruim, higiene deficiente.</td></tr>
    <tr><td>Fratura</td><td>Espessura insuficiente, carga oclusal, material inadequado, preparo sem resistência.</td></tr>
    <tr><td>Recidiva de cárie</td><td>Margem aberta, placa, dieta, xerostomia, controle insuficiente.</td></tr>
    <tr><td>Descolamento</td><td>Contaminação, umidade, fotoativação insuficiente, substrato inadequado.</td></tr>
  </tbody>
</table>

<h3>Como responder à “melhor conduta”</h3>
<ol>
  <li>Identifique a causa provável da falha.</li>
  <li>Corrija o fator antes de refazer: oclusão, umidade, margem, higiene.</li>
  <li>Escolha o material compatível com o novo cenário.</li>
  <li>Reavalie e oriente manutenção.</li>
</ol>

<div class="callout warn">
  <strong>Não troque material sem diagnosticar</strong>
  <p>Refazer a restauração com “resina melhor” não resolve oclusão alta, margem mal adaptada ou paciente com xerostomia e alto risco. A prova valoriza a causa, não a marca.</p>
</div>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>Uma restauração que falha é como um pneu que fura sempre no mesmo lugar: trocar o pneu sem olhar o prego no chão garante nova falha.</p>
</div>
`
      }
    ]
  },
  {
    id: "m5",
    title: "Prótese I — PPR e planejamento",
    short: "Prótese: PPR",
    icon: "i-crown",
    accent: "blue",
    blurb: "Kennedy, Applegate, componentes, eixo de inserção, moldagem e ajuste da prótese parcial removível.",
    lessons: [
      {
        id: "m5l1",
        title: "PPR: indicações e classificação de Kennedy",
        minutes: 9,
        intro: "Classificar corretamente é metade da questão. As regras de Applegate existem para resolver os casos que parecem ambíguos.",
        content: `
<p class="lead">A prótese parcial removível (PPR) reabilita espaços desdentados e é removível pelo paciente. É indicada quando implantes ou prótese fixa não são possíveis ou não são a melhor escolha.</p>

<h3>Indicações</h3>
<ul>
  <li>Espaços extensos ou extremidades livres.</li>
  <li>Necessidade de substituir dentes e distribuir cargas pela mucosa e pelos dentes pilares.</li>
  <li>Pacientes com condições sistêmicas que contraindicam cirurgia extensa.</li>
  <li>Fases provisórias ou transição para outra modalidade.</li>
  <li>Limitação econômica ou anatômica.</li>
</ul>

<h3>Contraindicações e limites</h3>
<ul>
  <li>Higiene muito deficiente e impossibilidade de controle.</li>
  <li>Dentes pilares com prognóstico ruim.</li>
  <li>Expectativa estética incompatível.</li>
  <li>Paciente que não aceita corpo estranho removível.</li>
</ul>

<h3>Classificação de Kennedy</h3>
<table>
  <thead><tr><th>Classe</th><th>Espaço desdentado</th><th>Exemplo</th></tr></thead>
  <tbody>
    <tr><td>I</td><td>Extremidade livre bilateral</td><td>Perda de todos os molares inferiores dos dois lados.</td></tr>
    <tr><td>II</td><td>Extremidade livre unilateral</td><td>Perda dos molares de um só lado.</td></tr>
    <tr><td>III</td><td>Intercalado unilateral</td><td>Dente ausente entre dois dentes naturais, de um lado.</td></tr>
    <tr><td>IV</td><td>Intercalado anterior cruzando a linha média</td><td>Perda de incisivos centrais.</td></tr>
  </tbody>
</table>

<h3>Regras de Applegate</h3>
<ol>
  <li>Classifique pelo espaço desdentado <strong>mais posterior</strong>.</li>
  <li>Se o último dente perdido for anterior, a classificação é <strong>IV</strong>.</li>
  <li>O último dente remanescente conta para a classificação.</li>
  <li>Dentes extrarradiculares não entram na classificação.</li>
  <li>A classe não muda pela perda de terceiros molares.</li>
  <li>Modificações são áreas adicionais, não mudam a classe principal.</li>
</ol>

<div class="callout exam">
  <strong>Pegadinha</strong>
  <p>Se houver espaço posterior e também anterior, a classe é definida pelo <strong>posterior</strong>. A área anterior é modificação. Só é classe IV quando o espaço anterior é o principal e cruza a linha média.</p>
</div>

<h3>PPR x prótese fixa x implante</h3>
<p>A escolha depende de prognóstico dos pilares, osso disponível, custo, higiene, tempo e expectativa. A PPR é mais conservadora em desgaste de dentes vizinhos, mas exige cooperação e controle de placa.</p>

<div class="callout analogy">
  <strong>Como lembrar Kennedy</strong>
  <p><strong>I</strong> = ilha livre dos dois lados; <strong>II</strong> = um lado livre; <strong>III</strong> = buraco entre dentes; <strong>IV</strong> = buraco na frente, cruzando o meio.</p>
</div>
`
      },
      {
        id: "m5l2",
        title: "Componentes, eixo de inserção e moldagem",
        minutes: 9,
        intro: "A PPR não é só grampo. Apoio, conector e selim distribuem forças; o eixo de inserção define o paralelismo.",
        content: `
<p class="lead">O planejamento da PPR começa pela análise dos dentes pilares, do rebordo e do eixo de inserção. Cada componente tem função mecânica e biológica.</p>

<h3>Componentes</h3>
<table>
  <thead><tr><th>Componente</th><th>Função</th><th>Erro comum</th></tr></thead>
  <tbody>
    <tr><td>Apoio</td><td>Transmite carga ao longo eixo do dente e impede intrusão.</td><td>Preparo insuficiente ou fora do eixo.</td></tr>
    <tr><td>Grampo</td><td>Retenção, estabilidade e abraçamento.</td><td>Braço ativo em área não retentiva.</td></tr>
    <tr><td>Conector maior</td><td>Unir as partes e distribuir forças.</td><td>Flexível demais ou sobre tecido.</td></tr>
    <tr><td>Conector menor</td><td>Ligar selim ao conector maior.</td><td>Interferir na higiene.</td></tr>
    <tr><td>Selim</td><td>Apoiar dentes artificiais e mucosa.</td><td>Compressão excessiva ou alívio inadequado.</td></tr>
  </tbody>
</table>

<h3>Eixo de inserção</h3>
<p>É a direção em que a prótese entra e sai. Deve ser comum aos pilares, considerando retenções, paralelismo e estética. O delineamento no modelo de estudo define as zonas retentivas e o plano guia.</p>
<ul>
  <li>Superfícies guia paralelas ao eixo facilitam a inserção.</li>
  <li>Retenção do grampo fica na zona retentiva.</li>
  <li>Mudar o eixo pode viabilizar um pilar, mas comprometer outro.</li>
</ul>

<div class="callout exam">
  <strong>Paralelismo</strong>
  <p>O eixo de inserção é único para a prótese, não para cada dente isoladamente. A prova cobra a ideia de <strong>eixo comum</strong> e de planejamento no modelo.</p>
</div>

<h3>Moldagem</h3>
<ul>
  <li><strong>Preliminar:</strong> alginate, para modelo de estudo e planejamento.</li>
  <li><strong>Funcional:</strong> registra a relação do rebordo com a prótese em função; pode usar moldeira individual e materiais específicos.</li>
  <li><strong>Modelo:</strong> deve reproduzir pilares, rebordo e freios.</li>
</ul>

<h3>Prova e ajuste</h3>
<ol>
  <li>Verificar assentamento e estabilidade.</li>
  <li>Ajustar apoios e conectores.</li>
  <li>Checar retenção dos grampos sem trauma.</li>
  <li>Ajustar oclusão em RC e movimentos.</li>
  <li>Aliviar áreas de pressão e orientar higiene.</li>
</ol>

<div class="callout warn">
  <strong>Não ajuste no escuro</strong>
  <p>Ajustes devem ser feitos com evidência de pressão (pastas indicadoras) e reavaliação. “Arrancar” material do selim sem diagnosticar pode piorar a estabilidade.</p>
</div>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>O eixo de inserção é como a direção de uma gaveta: se os trilhos não são paralelos, ela não corre. Na PPR, todos os componentes precisam “correr” no mesmo eixo.</p>
</div>
`
      },
      {
        id: "m5l3",
        title: "Instalação, higiene e manutenção da PPR",
        minutes: 8,
        intro: "A entrega não é o fim. Instruções, controle de placa e reavaliação evitam que a PPR machuque dentes e mucosa.",
        content: `
<p class="lead">A longevidade da PPR depende de adaptação, oclusão, higiene e acompanhamento. O paciente precisa saber colocar, remover, limpar e quando retornar.</p>

<h3>Checklist de instalação</h3>
<ul>
  <li>Assentamento completo e estabilidade.</li>
  <li>Retenção adequada, sem dor.</li>
  <li>Oclusão equilibrada em RC e movimentos.</li>
  <li>Bordas polidas e sem compressão.</li>
  <li>Estética e fonética aceitáveis.</li>
  <li>Instruções por escrito e demonstração.</li>
</ul>

<h3>Higiene</h3>
<ul>
  <li>Remover a prótese para limpar; escovar com escova própria e sabão/dentifrício.</li>
  <li>Limpar dentes pilares e regiões de grampo com escova interproximal e unitufo.</li>
  <li>Não usar água sanitária ou calor, que deformam a resina.</li>
  <li>Guardar em recipiente próprio, úmido, quando não usar.</li>
</ul>

<div class="callout exam">
  <strong>Ponto de prova</strong>
  <p>A PPR exige higiene dos <strong>pilares</strong> e da <strong>mucosa</strong>, não só da prótese. Grampos e selins acumulam placa e podem causar cárie, gengivite e reabsorção.</p>
</div>

<h3>Manutenção</h3>
<p>Reavaliar adaptação, oclusão, retenção, tecidos e higiene. Com o tempo, pode ser necessário reembasamento, ajuste de grampo ou substituição. A perda de dentes ou de suporte muda o planejamento.</p>

<h3>Complicações frequentes</h3>
<table>
  <thead><tr><th>Problema</th><th>Causa provável</th></tr></thead>
  <tbody>
    <tr><td>Dor em pilar</td><td>Carga excessiva, grampo ativo, oclusão alta.</td></tr>
    <tr><td>Úlcera em mucosa</td><td>Compressão, borda áspera, adaptação ruim.</td></tr>
    <tr><td>Instabilidade</td><td>Retenção insuficiente, eixo inadequado, desgaste.</td></tr>
    <tr><td>Cárie no pilar</td><td>Placa, higiene deficiente, margem de grampo.</td></tr>
    <tr><td>Fratura da prótese</td><td>Sobrecarga, material, queda, reparo inadequado.</td></tr>
  </tbody>
</table>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>A PPR é como um aparelho ortodôntico removível: se o paciente não limpa e não usa corretamente, o dano aos dentes supera o benefício.</p>
</div>
`
      }
    ]
  },
  {
    id: "m6",
    title: "Prótese II — Coroas, PT e oclusão",
    short: "Prótese: fixa e total",
    icon: "i-bone",
    accent: "berry",
    blurb: "Preparos para coroa, provisório, moldagem, cimentação, etapas da prótese total e conceitos de oclusão.",
    lessons: [
      {
        id: "m6l1",
        title: "Coroas e prótese fixa: do preparo à cimentação",
        minutes: 9,
        intro: "A prova cobra sequência, espessura e adaptação. Coroa não é “capa”; é reabilitação com retenção, resistência e selamento.",
        content: `
<p class="lead">A coroa total recobre o dente e devolve forma, função e estética. Pode ser metalocerâmica, cerâmica, zircônia ou metal. A indicação depende de estrutura remanescente, estética, oclusão e prognóstico.</p>

<h3>Indicações</h3>
<ul>
  <li>Perda extensa de estrutura não recuperável com restauração direta.</li>
  <li>Dente tratado endodonticamente com risco de fratura.</li>
  <li>Necessidade de retenção para prótese fixa.</li>
  <li>Alteração de forma, cor ou oclusão.</li>
  <li>Proteção de dente com trincas ou fraturas.</li>
</ul>

<h3>Preparo</h3>
<ul>
  <li><strong>Redução oclusal</strong> suficiente para a espessura do material.</li>
  <li><strong>Redução axial</strong> com término definido (chanfro, ombro, lâmina de faca).</li>
  <li><strong>Convergência</strong> das paredes para retenção e inserção.</li>
  <li><strong>Linha de término</strong> nítida e supragengival sempre que possível.</li>
  <li>Preservar vitalidade e estrutura; avaliar necessidade de endodontia.</li>
</ul>

<div class="callout exam">
  <strong>Espessura e término</strong>
  <p>Cerâmica exige espessura e término adequados; metalocerâmica tem exigências diferentes. Término mal definido compromete adaptação e causa infiltração. A prova cobra a relação material–preparo.</p>
</div>

<h3>Provisório</h3>
<p>Protege o preparo, mantém posição, testa estética e oclusão. Deve ser bem adaptado, polido e sem contatos prematuros. Um provisório ruim pode causar migração, sensibilidade e gengivite.</p>

<h3>Moldagem e cimentação</h3>
<ol>
  <li>Afastamento gengival e controle de umidade.</li>
  <li>Moldagem com material adequado e modelo fiel.</li>
  <li>Prova da peça: adaptação, contatos, estética.</li>
  <li>Cimentação com cimento compatível e remoção de excessos.</li>
  <li>Ajuste oclusal e orientações.</li>
</ol>

<h3>Falhas comuns</h3>
<ul>
  <li>Desadaptação marginal e infiltração.</li>
  <li>Retenção insuficiente e deslocamento.</li>
  <li>Oclusão alta, dor e fratura.</li>
  <li>Estética insatisfatória por cor ou espessura.</li>
  <li>Gengivite por margem subgengival mal adaptada.</li>
</ul>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>A coroa é como um capacete sob medida: se não encaixa na borda, entra poeira; se é frouxo, sai com o movimento; se é apertado demais, machuca. Adaptação é tudo.</p>
</div>
`
      },
      {
        id: "m6l2",
        title: "Prótese total: etapas e princípios",
        minutes: 9,
        intro: "A PT tem uma sequência clássica. A prova cobra a ordem, o objetivo de cada etapa e os cuidados com o rebordo.",
        content: `
<p class="lead">A prótese total (PT) substitui todos os dentes de uma arcada e se apoia na mucosa e no osso residual. O sucesso depende de retenção, estabilidade, suporte, oclusão e adaptação.</p>

<h3>Sequência clássica</h3>
<ol>
  <li><strong>Anamnese e exame</strong>: rebordo, mucosa, saliva, oclusão, saúde geral.</li>
  <li><strong>Moldagem preliminar</strong> com alginate e modelo de estudo.</li>
  <li><strong>Moldeira individual</strong> e moldagem funcional.</li>
  <li><strong>Placas de registro / planos de cera</strong>: DVO, RC, estética e suporte labial.</li>
  <li><strong>Montagem de dentes</strong> e prova estética/funcional.</li>
  <li><strong>Processamento</strong> e acabamento.</li>
  <li><strong>Instalação</strong>, ajuste oclusal e orientações.</li>
  <li><strong>Controles</strong> e reembasamentos.</li>
</ol>

<h3>Moldagem</h3>
<p>A moldagem funcional registra o rebordo em função, com extensão adequada e selado periférico. Compressão excessiva causa dor e reabsorção; falta de extensão causa instabilidade.</p>

<h3>Planos de cera</h3>
<ul>
  <li>Definir <strong>DVO</strong> (dimensão vertical de oclusão).</li>
  <li>Registrar <strong>RC</strong> (relação cêntrica).</li>
  <li>Avaliar suporte labial, estética e fonética.</li>
  <li>Servir de base para montagem dos dentes.</li>
</ul>

<div class="callout exam">
  <strong>DVO</strong>
  <p>DVO é a distância vertical entre maxila e mandíbula com os dentes em oclusão. DVO excessiva causa dor, estalido e desconforto; DVO reduzida causa sulcos nasolabiais acentuados e queilite angular.</p>
</div>

<h3>Reabsorção óssea</h3>
<p>O osso alveolar reabsorve progressivamente após a perda dentária, especialmente na mandíbula. A PT precisa de controles e reembasamentos; não é um tratamento “definitivo para sempre”.</p>

<h3>Retenção, estabilidade e suporte</h3>
<ul>
  <li><strong>Retenção:</strong> resistência ao deslocamento vertical.</li>
  <li><strong>Estabilidade:</strong> resistência a forças horizontais e rotacionais.</li>
  <li><strong>Suporte:</strong> resistência à compressão vertical.</li>
</ul>

<div class="callout warn">
  <strong>Não confunda</strong>
  <p>Retenção não é a mesma coisa que estabilidade. Uma prótese pode “segurar” bem e ainda girar ou deslocar em movimentos laterais. A prova usa esses termos com precisão.</p>
</div>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>A PT é como um barco na água: o casco precisa se adaptar ao fundo (suporte), ficar no lugar (retenção) e não balançar (estabilidade).</p>
</div>
`
      },
      {
        id: "m6l3",
        title: "Oclusão: RC, MIC, guias e ajuste",
        minutes: 9,
        intro: "Oclusão aparece em prótese, dentística e periodontia. Entender RC, MIC e guias resolve muitas questões integradas.",
        content: `
<p class="lead">Oclusão é a relação de contato entre os dentes. Em reabilitação, buscamos contatos estáveis, carga distribuída e ausência de interferências que possam gerar dor, fratura ou doença periodontal.</p>

<h3>Conceitos essenciais</h3>
<table>
  <thead><tr><th>Conceito</th><th>Definição</th></tr></thead>
  <tbody>
    <tr><td>RC (relação cêntrica)</td><td>Posição maxilomandibular de referência, independente dos contatos dentários; envolve côndilos em posição estável.</td></tr>
    <tr><td>MIC (máxima intercuspidação)</td><td>Posição de máximo contato dentário; pode coincidir ou não com RC.</td></tr>
    <tr><td>DVO</td><td>Dimensão vertical de oclusão; distância entre maxila e mandíbula em oclusão.</td></tr>
    <tr><td>Guia anterior</td><td>Desoclusão dos posteriores nos movimentos de protrusão e lateralidade.</td></tr>
    <tr><td>Função de grupo</td><td>Contatos distribuídos em vários dentes no movimento lateral.</td></tr>
  </tbody>
</table>

<h3>RC x MIC na prática</h3>
<p>Em pacientes com desgaste, perda de dentes ou reabilitação ampla, muitas vezes se registra RC para reconstruir uma oclusão estável. Em pacientes com oclusão harmônica, MIC pode coincidir com RC.</p>

<div class="callout exam">
  <strong>Pegadinha</strong>
  <p>RC não é “mordida habitual”. A mordida habitual pode ser MIC com adaptação muscular. A prova cobra a diferença entre posição de referência e posição de contato máximo.</p>
</div>

<h3>Interferências oclusais</h3>
<ul>
  <li>Contatos prematuros em RC.</li>
  <li>Interferências em movimentos laterais/protrusão.</li>
  <li>Contatos em dentes posteriores durante guia anterior.</li>
  <li>Carga excessiva em dente isolado ou em prótese.</li>
</ul>
<p>Podem causar dor, mobilidade, fratura de restauração, desgaste e desconforto. O ajuste deve ser feito com precisão, não por “raspagem às cegas”.</p>

<h3>Ajuste oclusal</h3>
<ol>
  <li>Estabilizar a prótese/restauração e confirmar adaptação.</li>
  <li>Registrar RC e movimentos com papel de articulação.</li>
  <li>Identificar contatos prematuros e interferências.</li>
  <li>Ajustar com brocas adequadas, preservando anatomia.</li>
  <li>Reavaliar e polir.</li>
</ol>

<div class="callout warn">
  <strong>Sequência</strong>
  <p>Não ajuste oclusão de prótese mal adaptada ou de restauração com margem aberta. Primeiro corrija a base; depois a oclusão. A prova cobra essa ordem.</p>
</div>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>Oclusão é como o alinhamento de pneus: um contato errado desgasta todo o conjunto. O ajuste não é estética; é função e longevidade.</p>
</div>
`
      }
    ]
  }
]);
