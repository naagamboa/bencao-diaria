window.CI_MODULES = (window.CI_MODULES || []).concat([
  {
    id: "m7",
    title: "Cirurgia I — Exodontia e instrumental",
    short: "Cirurgia: exodontia",
    icon: "i-syringe",
    accent: "terra",
    blurb: "Avaliação pré-operatória, instrumental, técnica de exodontia, odontossecção e cuidados imediatos.",
    lessons: [
      {
        id: "m7l1",
        title: "Avaliação pré-operatória e instrumental",
        minutes: 9,
        intro: "A extração começa muito antes do fórceps. Anamnese, imagem e planejamento evitam a maioria das complicações.",
        content: `
<p class="lead">Exodontia é um procedimento cirúrgico. A avaliação pré-operatória identifica riscos, define a técnica e prepara o ambiente. Pular essa etapa é a receita para urgência.</p>

<h3>Avaliação</h3>
<ul>
  <li><strong>Anamnese:</strong> doenças cardiovasculares, diabetes, coagulopatias, alergias, gestação, uso de anticoagulantes e bisfosfonatos.</li>
  <li><strong>Medicações:</strong> antiagregantes, anticoagulantes, imunossupressores, quimioterapia.</li>
  <li><strong>Exame local:</strong> posição, mobilidade, cárie, periodontal, tecidos, trismo, abertura bucal.</li>
  <li><strong>Imagem:</strong> radiografia periapical/panorâmica; tomografia em casos complexos.</li>
  <li><strong>Plano:</strong> tipo de anestesia, via de acesso, necessidade de odontossecção e sutura.</li>
</ul>

<div class="callout exam">
  <strong>Bisfosfonatos</strong>
  <p>Pacientes em uso prolongado têm risco de osteonecrose dos maxilares. A prova cobra: avaliar tempo, via e dose; considerar risco-benefício e preferir abordagem conservadora. Não é contraindicação absoluta, mas exige cuidado.</p>
</div>

<h3>Instrumental essencial</h3>
<table>
  <thead><tr><th>Instrumento</th><th>Função</th></tr></thead>
  <tbody>
    <tr><td>Sindesmótomo</td><td>Romper fibras do ligamento periodontal e iniciar luxação.</td></tr>
    <tr><td>Alavancas (Seldin, Cryer)</td><td>Luxar e elevar o dente; usar com ponto de apoio.</td></tr>
    <tr><td>Fórceps</td><td>Apreender e extrair; escolhido pela anatomia radicular.</td></tr>
    <tr><td>Brocas e motor</td><td>Odontossecção em dentes complexos.</td></tr>
    <tr><td>Curetas</td><td>Remover tecido de granulação e restos.</td></tr>
    <tr><td>Afastadores</td><td>Proteger tecidos e melhorar visão.</td></tr>
    <tr><td>Porta-agulha e tesoura</td><td>Sutura e corte de fio.</td></tr>
  </tbody>
</table>

<h3>Assepsia e organização</h3>
<p>Campo, instrumentais estéreis, EPI, antissepsia e organização da mesa. A prova pode cobrar biossegurança: não é detalhe, é parte do procedimento.</p>

<h3>Fórceps: lógica</h3>
<ul>
  <li><strong>Maxila:</strong> fórceps com cabos paralelos e adaptação à anatomia; molares superiores exigem cuidado com seio maxilar.</li>
  <li><strong>Mandíbula:</strong> fórceps com cabos em série; molares inferiores têm raízes divergentes.</li>
  <li><strong>Anteriores:</strong> fórceps mais estreitos, movimentos de rotação controlada.</li>
</ul>

<div class="callout warn">
  <strong>Força não é técnica</strong>
  <p>Força excessiva fratura coroa, raiz e osso. O planejamento com odontossecção é mais seguro em dentes complexos. A prova valoriza a alternativa que reduz trauma.</p>
</div>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>Extrair um dente é como remover um poste do chão: primeiro se solta o entorno, depois se usa a alavanca certa. Puxar direto só quebra o poste.</p>
</div>
`
      },
      {
        id: "m7l2",
        title: "Técnica de exodontia passo a passo",
        minutes: 9,
        intro: "A sequência é sindesmotomia, luxação, apreensão e extração. Cada etapa tem um objetivo e um erro clássico.",
        content: `
<p class="lead">A exodontia fechada é indicada para dentes com acesso e anatomia favoráveis. Quando há impactação, raízes divergentes ou risco, a odontossecção e o retalho podem ser necessários.</p>

<h3>Sequência</h3>
<ol>
  <li><strong>Anestesia</strong> e teste de eficácia.</li>
  <li><strong>Sindesmotomia</strong>: romper fibras gengivais e do ligamento periodontal.</li>
  <li><strong>Luxação</strong> com alavanca ou fórceps, em movimentos controlados.</li>
  <li><strong>Apreensão</strong> com fórceps adequado, o mais apical possível.</li>
  <li><strong>Extração</strong> com movimentos de lateralidade/rotação conforme o dente.</li>
  <li><strong>Toalete</strong> do alvéolo, regularização de osso e remoção de tecido.</li>
  <li><strong>Sutura</strong> quando indicada e orientações.</li>
</ol>

<h3>Movimentos por grupo dental</h3>
<table>
  <thead><tr><th>Dente</th><th>Movimento predominante</th></tr></thead>
  <tbody>
    <tr><td>Incisivos</td><td>Lateralidade e rotação suave.</td></tr>
    <tr><td>Caninos</td><td>Rotação e lateralidade; raiz longa.</td></tr>
    <tr><td>Pré-molares</td><td>Lateralidade; raízes podem ser divergentes.</td></tr>
    <tr><td>Molares superiores</td><td>Lateralidade; atenção ao seio maxilar e raiz palatina.</td></tr>
    <tr><td>Molares inferiores</td><td>Lateralidade; raízes divergentes e osso denso.</td></tr>
  </tbody>
</table>

<h3>Odontossecção</h3>
<p>Consiste em dividir o dente para remover partes em separado, reduzindo a resistência óssea e o trauma. Indicada em raízes divergentes, dentes com coroa destruída, impactados e quando o fórceps não progride.</p>

<div class="callout exam">
  <strong>Quando suspeitar de comunicação buco-sinusal?</strong>
  <p>Molares superiores com raízes próximas ao seio, extração difícil e saída de ar/líquido pelo alvéolo. A conduta inclui sutura, orientações e acompanhamento; casos grandes podem exigir fechamento específico.</p>
</div>

<h3>Erros que a prova cobra</h3>
<ul>
  <li>Usar alavanca sem ponto de apoio, fraturando dente ou osso.</li>
  <li>Aplicar força excessiva em vez de odontossecção.</li>
  <li>Não remover tecido de granulação e corpo estranho.</li>
  <li>Suturar sob tensão ou deixar borda áspera.</li>
  <li>Não orientar o paciente sobre cuidados.</li>
</ul>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>A odontossecção é como desmontar um móvel: em vez de forçar a peça inteira, você separa as partes. Menos força, menos dano.</p>
</div>
`
      },
      {
        id: "m7l3",
        title: "Pós-operatório e complicações",
        minutes: 9,
        intro: "A prova gosta de complicações: hemorragia, alveolite, infecção, fratura e parestesia. Saiba reconhecer e conduzir.",
        content: `
<p class="lead">O pós-operatório começa com orientações claras. A maioria das complicações é prevenível com técnica adequada e seguimento.</p>

<h3>Orientações imediatas</h3>
<ul>
  <li>Morder gaze por 30–45 minutos, conforme protocolo.</li>
  <li>Não bochechar com força nas primeiras 24 horas.</li>
  <li>Não fumar, não usar canudo e evitar alimentos quentes/duros.</li>
  <li>Compressa fria nas primeiras 24 horas; depois, conforme orientação.</li>
  <li>Analgésico e antibiótico somente quando indicados.</li>
  <li>Manter higiene suave e retornar se dor intensa, febre ou sangramento persistente.</li>
</ul>

<h3>Complicações</h3>
<table>
  <thead><tr><th>Complicação</th><th>Reconhecimento</th><th>Conduta inicial</th></tr></thead>
  <tbody>
    <tr><td>Hemorragia</td><td>Sangramento persistente apesar da compressão.</td><td>Nova compressão, avaliar coagulopatia, sutura e suporte.</td></tr>
    <tr><td>Alveolite</td><td>Dor latejante, odor fétido, alvéolo vazio alguns dias após.</td><td>Limpeza delicada, curativo e analgesia.</td></tr>
    <tr><td>Infecção</td><td>Edema, dor, febre, pus.</td><td>Drenagem quando necessário e antibiótico adequado.</td></tr>
    <tr><td>Fratura radicular</td><td>Fragmento retido; radiografia confirma.</td><td>Remover com acesso controlado; não empurrar para o seio.</td></tr>
    <tr><td>Comunicação buco-sinusal</td><td>Ar/líquido pelo alvéolo, histórico de extração difícil.</td><td>Sutura, orientações, acompanhamento; casos grandes exigem fechamento.</td></tr>
    <tr><td>Parestesia</td><td>Alteração de sensibilidade em lábio/mento.</td><td>Observar, documentar, considerar conduta especializada.</td></tr>
  </tbody>
</table>

<div class="callout exam">
  <strong>Alveolite x infecção</strong>
  <p>Alveolite é dor intensa com alvéolo vazio e tecido necrótico, geralmente sem febre. Infecção tem sinais inflamatórios sistêmicos e pus. O tratamento não é o mesmo.</p>
</div>

<h3>Quando encaminhar?</h3>
<ul>
  <li>Sangramento incoercível ou suspeita de coagulopatia.</li>
  <li>Complicação em seio maxilar, parestesia persistente, fratura óssea importante.</li>
  <li>Infecção com risco de disseminação (angina de Ludwig, celulite).</li>
  <li>Paciente com doença sistêmica descompensada.</li>
</ul>

<div class="callout warn">
  <strong>Antibiótico não substitui técnica</strong>
  <p>Profilaxia antibiótica não é rotina para toda extração. Indique conforme risco e protocolo. A prova cobra uso racional, não “sempre antibiótico”.</p>
</div>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>O alvéolo após a extração é como uma ferida que precisa de coágulo estável. Bochechar, fumar ou mexer no local é como sacudir a crosta: atrasa a cicatrização e abre porta para complicação.</p>
</div>
`
      }
    ]
  },
  {
    id: "m8",
    title: "Cirurgia II — Anestesia, sutura e urgências",
    short: "Cirurgia: anestesia",
    icon: "i-shield-plus",
    accent: "green",
    blurb: "Anestésicos, doses máximas, técnicas, fios de sutura, urgências médicas e biossegurança.",
    lessons: [
      {
        id: "m8l1",
        title: "Anestesia local: drogas, técnicas e doses",
        minutes: 10,
        intro: "Dose máxima, vasoconstritor e técnica são os três pontos que mais aparecem. Calcular mg por peso evita intoxicação.",
        content: `
<p class="lead">A anestesia local bloqueia a condução nervosa de forma reversível. O cirurgião-dentista precisa escolher a droga, a concentração, o vasoconstritor e a técnica conforme o procedimento e o paciente.</p>

<h3>Anestésicos mais usados</h3>
<table>
  <thead><tr><th>Droga</th><th>Concentração</th><th>Dose máxima aproximada*</th></tr></thead>
  <tbody>
    <tr><td>Lidocaína</td><td>2%</td><td>4,4–7 mg/kg; máx. 300 mg</td></tr>
    <tr><td>Mepivacaína</td><td>2%</td><td>4,4–6,6 mg/kg; máx. 300 mg</td></tr>
    <tr><td>Articaína</td><td>4%</td><td>7 mg/kg; máx. 500 mg</td></tr>
    <tr><td>Prilocaína</td><td>3%</td><td>6–8 mg/kg; máx. 400 mg</td></tr>
  </tbody>
</table>
<p class="mini-note">*Valores de referência. A prova pode adotar a tabela da UC; confira sempre. Crianças, idosos e pacientes com comorbidades exigem cálculo individual.</p>

<h3>Como calcular</h3>
<p>Concentração 2% significa 20 mg/mL. Um tubete de 1,8 mL tem 36 mg. Para 4% (40 mg/mL), um tubete de 1,8 mL tem 72 mg.</p>
<div class="callout exam">
  <strong>Conta que cai</strong>
  <p><strong>mg = volume (mL) × concentração (%) × 10.</strong> Depois compare com a dose máxima pelo peso. A prova costuma dar o peso e pedir quantos tubetes ou qual o limite.</p>
</div>

<h3>Vasoconstritor</h3>
<ul>
  <li>Reduz absorção sistêmica, prolonga a anestesia e melhora hemostasia.</li>
  <li>Epinefrina 1:100.000 = 0,01 mg/mL; 1:200.000 = 0,005 mg/mL.</li>
  <li>Cardiopatas controlados geralmente toleram doses baixas; avaliar risco e interação.</li>
  <li>Evitar em feocromocitoma, hipertireoidismo não controlado e arritmias graves, conforme avaliação.</li>
</ul>

<h3>Técnicas</h3>
<ul>
  <li><strong>Infiltração local:</strong> maxila e regiões acessíveis; deposição próxima ao ápice.</li>
  <li><strong>Bloqueio regional:</strong> nervo alveolar inferior, lingual e bucal; mandíbula.</li>
  <li><strong>Intraligamentar:</strong> complemento, dose pequena.</li>
  <li><strong>Intrapulpar:</strong> complemento em situações específicas.</li>
</ul>

<div class="callout warn">
  <strong>Sempre aspirar</strong>
  <p>A aspiração negativa antes de injetar reduz risco de injeção intravascular. A prova cobra esse passo e a injeção lenta para evitar toxicidade e lesão tecidual.</p>
</div>

<h3>Complicações</h3>
<ul>
  <li><strong>Sistêmicas:</strong> toxicidade, síncope, reação alérgica, taquicardia, hipertensão.</li>
  <li><strong>Locais:</strong> hematoma, trismo, parestesia, infecção, necrose, fratura de agulha.</li>
  <li><strong>Falha anestésica:</strong> técnica inadequada, variação anatômica, inflamação, ansiedade.</li>
</ul>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>A dose máxima é como o limite de velocidade: passar um pouco pode não acontecer nada, mas passar muito é acidente. O cálculo por peso é o freio.</p>
</div>
`
      },
      {
        id: "m8l2",
        title: "Sutura: fios, técnicas e quando indicar",
        minutes: 8,
        intro: "Sutura não é enfeite: aproxima tecidos, protege o coágulo e favorece cicatrização. O fio e a técnica mudam o resultado.",
        content: `
<p class="lead">A sutura mantém os tecidos aproximados durante a cicatrização. Deve ser feita sem tensão excessiva, com nós seguros e fio adequado ao caso.</p>

<h3>Fios</h3>
<table>
  <thead><tr><th>Tipo</th><th>Exemplos</th><th>Característica</th></tr></thead>
  <tbody>
    <tr><td>Absorvível</td><td>Catgut, Vicryl (poliglactina)</td><td>Não precisa remover; degradação variável.</td></tr>
    <tr><td>Não absorvível</td><td>Seda, nylon</td><td>Maior resistência; remoção em 7–10 dias, conforme local.</td></tr>
    <tr><td>Monofilamento</td><td>Nylon</td><td>Menos retenção de placa; menor memória? depende do material.</td></tr>
    <tr><td>Multifilamento</td><td>Seda</td><td>Boa maleabilidade; maior retenção de placa.</td></tr>
  </tbody>
</table>

<h3>Técnicas</h3>
<ul>
  <li><strong>Simples interrompida:</strong> mais usada; cada ponto é independente.</li>
  <li><strong>Contínua:</strong> rápida e distribuída; exige cuidado com tensão.</li>
  <li><strong>Colchoeiro horizontal/vertical:</strong> everte bordas e controla sangramento.</li>
  <li><strong>Em X:</strong> aproxima bordas e oclui pequenas áreas.</li>
</ul>

<div class="callout exam">
  <strong>Quanto tempo deixar?</strong>
  <p>Extrações simples: cerca de 7 dias. Cirurgias maiores e enxertos podem exigir mais. A prova cobra a lógica: tempo suficiente para estabilidade, sem retenção prolongada de placa.</p>
</div>

<h3>Passos da sutura</h3>
<ol>
  <li>Limpar e aproximar os tecidos.</li>
  <li>Escolher fio e agulha adequados.</li>
  <li>Passar a agulha perpendicular, incluindo bordas.</li>
  <li>Dar nós seguros, sem estrangular o tecido.</li>
  <li>Cortar as pontas e orientar o paciente.</li>
</ol>

<h3>Erros comuns</h3>
<ul>
  <li>Suturar sob tensão e isquemiar a borda.</li>
  <li>Deixar espaço morto e favorecer hematoma/infecção.</li>
  <li>Nó frouxo que solta ou apertado que corta.</li>
  <li>Não remover no prazo ou não orientar higiene.</li>
</ul>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>Sutura é como fechar um zíper: se os dentes estão alinhados, fecha fácil; se você força, trava e rompe. Aproximação suave é melhor que tensão.</p>
</div>
`
      },
      {
        id: "m8l3",
        title: "Urgências médicas e biossegurança",
        minutes: 9,
        intro: "Síncope, hipoglicemia, crise hipertensiva, alergia e PCR. Reconhecer e agir vale mais que decorar lista.",
        content: `
<p class="lead">Urgências no consultório odontológico são raras, mas a prova cobra reconhecimento e conduta inicial. A prioridade é segurança do paciente e acionamento de ajuda.</p>

<h3>Urgências frequentes</h3>
<table>
  <thead><tr><th>Situação</th><th>Reconhecimento</th><th>Conduta inicial</th></tr></thead>
  <tbody>
    <tr><td>Síncope</td><td>Palidez, sudorese, tontura, queda de pressão.</td><td>Deitar, elevar pernas, garantir via aérea, observar.</td></tr>
    <tr><td>Hipoglicemia</td><td>Tremor, sudorese, confusão, fome.</td><td>Glicose oral se consciente; não dar via oral se inconsciente.</td></tr>
    <tr><td>Crise hipertensiva</td><td>Cefaleia, tontura, pressão muito elevada.</td><td>Interromper, monitorar, encaminhar.</td></tr>
    <tr><td>Alergia/anafilaxia</td><td>Urticária, edema, broncoespasmo, queda de pressão.</td><td>Interromper, acionar emergência, adrenalina conforme protocolo.</td></tr>
    <tr><td>Asma/crise brônquica</td><td>Sibilância, dispneia, tosse.</td><td>Posição, broncodilatador do paciente, emergência se grave.</td></tr>
    <tr><td>PCR</td><td>Inconsciência, ausência de respiração/pulso.</td><td>Acionar ajuda, RCP, DEA.</td></tr>
  </tbody>
</table>

<div class="callout exam">
  <strong>Posição na síncope</strong>
  <p>O paciente deve ser deitado com as pernas elevadas. Sentar ou levantar piora a hipoperfusão. A prova troca isso com frequência.</p>
</div>

<h3>Prevenção</h3>
<ul>
  <li>Anamnese completa e atualização de medicações.</li>
  <li>Controle de ansiedade e tempo de espera.</li>
  <li>Paciente alimentado e com medicação habitual.</li>
  <li>Monitorar sinais durante o atendimento.</li>
  <li>Ter kit de emergência e saber usá-lo.</li>
</ul>

<h3>Biossegurança</h3>
<ul>
  <li>EPI: luvas, máscara, óculos, avental.</li>
  <li>Higienização das mãos e antissepsia.</li>
  <li>Esterilização adequada e rastreabilidade.</li>
  <li>Descarte de perfurocortantes e resíduos.</li>
  <li>Cuidado com aerossóis e superfícies.</li>
</ul>

<div class="callout warn">
  <strong>Não subestime</strong>
  <p>Anestesia em paciente ansioso, em jejum ou com doença cardiovascular descompensada é cenário de urgência. A prova valoriza prevenção e reconhecimento precoce.</p>
</div>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>Urgência é como incêndio: o extintor precisa estar no lugar e você precisa saber usar antes do fogo. Ter o kit sem treino não resolve.</p>
</div>
`
      }
    ]
  },
  {
    id: "m9",
    title: "Clínica Integrada — Casos e plano",
    short: "Integração: casos",
    icon: "i-target",
    accent: "mustard",
    blurb: "A sequência do plano de tratamento, casos comentados e o checklist final para a prova.",
    lessons: [
      {
        id: "m9l1",
        title: "O plano de tratamento integrado em 7 etapas",
        minutes: 9,
        intro: "A prova integrada cobra ordem. Urgência, controle de doença, reavaliação, reabilitação e manutenção não são opcionais.",
        content: `
<p class="lead">Clínica Integrada é a disciplina em que você deixa de pensar por especialidade e passa a pensar por <strong>sequência de risco</strong>. O plano precisa respeitar o que ameaça a saúde, o que controla a doença e o que devolve função.</p>

<h3>Sequência que resolve a maioria dos casos</h3>
<ol>
  <li><strong>Urgência:</strong> dor, infecção, sangramento, trauma, abscesso.</li>
  <li><strong>Controle de doença:</strong> higiene, dieta, flúor, RAR, remoção de fatores.</li>
  <li><strong>Reavaliação:</strong> periodontia e cárie controladas? Risco entendido?</li>
  <li><strong>Endodontia e cirurgia:</strong> dentes com indicação, extrações e preparos de boca.</li>
  <li><strong>Dentística:</strong> restaurações, substituição de provisórios, ajuste oclusal.</li>
  <li><strong>Prótese e implantes:</strong> reabilitação definitiva, com margens acessíveis.</li>
  <li><strong>Manutenção:</strong> retornos programados e reavaliação contínua.</li>
</ol>

<h3>Por que periodontia antes de prótese?</h3>
<p>Inflamação ativa, bolsas e sangramento comprometem a adaptação, a higiene e o prognóstico. Margens subgengivais em paciente com periodontite não controlada acumulam placa e pioram o resultado. Primeiro se controla a doença; depois se reabilita.</p>

<div class="callout exam">
  <strong>Pergunta clássica</strong>
  <p>“Paciente com periodontite generalizada precisa de coroa no 36. Qual a sequência?” Resposta esperada: controle periodontal e reavaliação antes da coroa definitiva; provisório se necessário. Nunca coroa definitiva sobre inflamação ativa.</p>
</div>

<h3>O que é urgência e o que pode esperar</h3>
<table>
  <thead><tr><th>Urgência</th><th>Pode esperar</th></tr></thead>
  <tbody>
    <tr><td>Dor aguda, abscesso, infecção disseminada, trauma, hemorragia.</td><td>Estética eletiva, troca de restauração sem sintoma, ajuste fino de prótese.</td></tr>
    <tr><td>Dente fraturado com exposição pulpar.</td><td>Clareamento, laminados sem sintoma.</td></tr>
    <tr><td>Peri-implantite com supuração e dor.</td><td>Manutenção de rotina.</td></tr>
  </tbody>
</table>

<h3>Comunicação e expectativa</h3>
<p>O plano deve ser explicado em etapas, com alternativas, custos e prognóstico. A prova pode cobrar “conduta ética”: não prometer resultado impossível, não iniciar reabilitação sem controle e registrar o consentimento.</p>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>Reabilitar sem controlar periodontite é como pintar uma parede com infiltração: o acabamento bonito dura pouco e o problema volta por baixo.</p>
</div>
`
      },
      {
        id: "m9l2",
        title: "Casos clínicos comentados",
        minutes: 10,
        intro: "Treine o raciocínio que a prova pede: identificar o problema, priorizar e escolher a próxima conduta.",
        content: `
<p class="lead">Os casos abaixo misturam as quatro UCs. Leia, tente responder e só depois veja a conduta comentada.</p>

<h3>Caso 1 — Periodontia + prótese</h3>
<p><strong>Paciente de 52 anos, tabagista, diabetes tipo 2 com HbA1c 8,2%.</strong> Apresenta sangramento gengival, bolsas de 6–7 mm em molares, perda óssea generalizada e dente 36 com fratura de cúspide. Quer “colocar uma coroa logo”.</p>
<div class="callout exam">
  <strong>Conduta esperada</strong>
  <p>Controlar risco (tabaco, glicemia), realizar RAR e instrução de higiene, reavaliar em 4–8 semanas. A coroa definitiva só após controle periodontal; provisório se necessário. O caso sugere periodontite estágio III/IV, grau C (tabaco e diabetes).</p>
</div>

<h3>Caso 2 — Dentística + prevenção</h3>
<p><strong>Paciente de 22 anos</strong> com manchas brancas ativas em incisivos superiores, esmalte íntegro, alto consumo de refrigerante e higiene irregular. Quer “laminado para esconder”.</p>
<div class="callout exam">
  <strong>Conduta esperada</strong>
  <p>Diagnosticar atividade e risco; tratar de forma não invasiva (flúor, dieta, higiene) e reavaliar. Laminado não é primeira conduta para lesão ativa com esmalte íntegro. Se necessário, infiltrar ou restaurar apenas após controle.</p>
</div>

<h3>Caso 3 — Prótese + cirurgia</h3>
<p><strong>Paciente de 60 anos</strong> com ausência de 35, 36 e 37; dentes 34 e 38 presentes. Precisa de PPR. Como classificar?</p>
<div class="callout exam">
  <strong>Conduta esperada</strong>
  <p>Classe II de Kennedy (extremidade livre unilateral), com modificação se houver outro espaço. O planejamento inclui pilar 34/38, eixo de inserção, apoio e grampo; avaliar prognóstico do 38 e necessidade de extração.</p>
</div>

<h3>Caso 4 — Cirurgia + risco</h3>
<p><strong>Paciente de 28 anos</strong> com terceiro molar inferior incluso, próximo ao canal mandibular, sem sintomas. Quer extrair “por segurança”.</p>
<div class="callout exam">
  <strong>Conduta esperada</strong>
  <p>Avaliar indicação, risco de parestesia, imagem (tomografia se necessário) e alternativa de acompanhamento. Não é toda inclusão assintomática que exige extração imediata. Planejamento e consentimento são essenciais.</p>
</div>

<h3>Caso 5 — Integração total</h3>
<p><strong>Paciente de 45 anos</strong> chega com dor no 46, bolsa de 8 mm, supuração e dente com cárie extensa. Também quer clareamento e implante.</p>
<div class="callout exam">
  <strong>Conduta esperada</strong>
  <p>Urgência primeiro (dor/infecção). Avaliar viabilidade do 46 (endo-periodontal). Controlar periodontite e cárie. Só depois discutir clareamento e implante. A sequência é sempre risco → doença → reabilitação → estética.</p>
</div>

<div class="callout warn">
  <strong>Regra dos casos</strong>
  <p>Se a alternativa começa pela reabilitação estética antes de controlar doença, desconfie. A prova integrada penaliza quem trata o sintoma e esquece a causa.</p>
</div>
`
      },
      {
        id: "m9l3",
        title: "Checklist final e erros de prova",
        minutes: 8,
        intro: "Revisão de véspera: 20 pontos que resolvem a maioria das questões e as confusões que mais derrubam.",
        content: `
<p class="lead">Use esta aula como checklist. Se você explica cada ponto em voz alta, está pronto para a prova.</p>

<h3>Periodontia</h3>
<ul>
  <li>PS, MG e NIC: definições e relação.</li>
  <li>PSR: códigos e quando pedir exame completo.</li>
  <li>Saúde, gengivite e periodontite: critérios.</li>
  <li>Estágio (gravidade/complexidade) x grau (progressão/risco).</li>
  <li>Extensão localizada &lt;30% x generalizada ≥30%.</li>
  <li>RAR, reavaliação em 4–8 semanas e manutenção.</li>
</ul>

<h3>Dentística</h3>
<ul>
  <li>Cárie como doença multifatorial e dinâmica.</li>
  <li>Lesão ativa x inativa.</li>
  <li>ICDAS 0–6 e decisão não invasiva x restauradora.</li>
  <li>Condicionamento: esmalte e dentina têm tempos e umidade diferentes.</li>
  <li>Camada híbrida e erros de adesão.</li>
  <li>Resina: incrementos, contração, fotoativação, acabamento.</li>
</ul>

<h3>Prótese</h3>
<ul>
  <li>Kennedy I–IV e regras de Applegate.</li>
  <li>Componentes da PPR e função de cada um.</li>
  <li>Eixo de inserção e paralelismo.</li>
  <li>Etapas da PT e reabsorção óssea.</li>
  <li>RC x MIC, DVO e ajuste oclusal.</li>
</ul>

<h3>Cirurgia</h3>
<ul>
  <li>Avaliação pré-operatória e riscos.</li>
  <li>Sindesmotomia, luxação, fórceps e odontossecção.</li>
  <li>Orientações pós-operatórias.</li>
  <li>Hemorragia, alveolite, infecção, comunicação buco-sinusal.</li>
  <li>Dose máxima de anestésico e cálculo mg.</li>
  <li>Sutura: fios, técnica e prazo.</li>
</ul>

<h3>As 10 confusões que mais derrubam</h3>
<ol>
  <li>PS = perda de inserção.</li>
  <li>Estágio = grau.</li>
  <li>Gengivite com perda de inserção.</li>
  <li>PSR 4 = diagnóstico fechado.</li>
  <li>Cárie inicial sempre restaurada.</li>
  <li>Secar a dentina “até ficar branca”.</li>
  <li>Kennedy pelo espaço anterior.</li>
  <li>Retenção = estabilidade.</li>
  <li>Mais anestésico = mais efeito.</li>
  <li>Manutenção é opcional.</li>
</ol>

<div class="callout exam">
  <strong>Última dica</strong>
  <p>Em questão de conduta, procure a alternativa que começa pelo diagnóstico e pelo controle de risco. Em questão de sequência, procure urgência → doença → reavaliação → reabilitação → manutenção.</p>
</div>
`
      }
    ]
  }
]);
