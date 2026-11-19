window.CI_MODULES = (window.CI_MODULES || []).concat([
  {
    id: "m1",
    title: "Periodontia I — Exame e diagnóstico",
    short: "Periodontia: diagnóstico",
    icon: "i-scaler",
    accent: "green",
    blurb: "Anamnese, sondagem, PSR e a classificação de 2017 (estágio, grau e extensão) que abre qualquer plano de tratamento.",
    lessons: [
      {
        id: "m1l1",
        title: "O exame periodontal completo, sítio por sítio",
        minutes: 9,
        intro: "A prova quase sempre começa com um caso e pergunta qual é o próximo passo. Antes de decidir, você precisa saber exatamente o que examinar e o que registrar.",
        content: `
<p class="lead">O exame periodontal não é uma sondagem solta. É um roteiro que transforma sinais clínicos em diagnóstico e o diagnóstico em plano de tratamento. Na Clínica Integrada, esse roteiro vale para todos os pacientes — inclusive os que chegam pedindo apenas uma restauração.</p>

<h3>1. Antes de tocar na gengiva</h3>
<p>Comece pela <strong>anamnese e pelo risco</strong>: tabaco, diabetes, medicamentos, gravidez, histórico familiar, higiene, dieta, xerostomia e doenças sistêmicas. Esses dados mudam a interpretação do exame e o prognóstico.</p>
<ul>
  <li><strong>Queixa principal</strong> e expectativa do paciente.</li>
  <li><strong>História médica</strong>: diabetes, hipertensão, coagulopatias, imunossupressão, osteoporose, câncer.</li>
  <li><strong>Medicamentos</strong>: fenitoína, nifedipino, ciclosporina (aumento gengival); anticoagulantes; bisfosfonatos.</li>
  <li><strong>Hábitos</strong>: tabaco, álcool, bruxismo, higiene, uso de palito.</li>
</ul>

<h3>2. Inspeção e sondagem</h3>
<p>Registre, para cada dente e cada sítio (mésio-vestibular, vestibular, disto-vestibular, mésio-lingual, lingual, disto-lingual):</p>
<ul>
  <li><strong>Profundidade de sondagem (PS):</strong> da margem gengival ao fundo do sulco/bolsa. Normal até 3 mm.</li>
  <li><strong>Margem gengival (MG):</strong> posição em relação à junção cemento-esmalte (JCE).</li>
  <li><strong>Nível de inserção clínica (NIC):</strong> MG + PS (com sinal). É o que mede perda de inserção real.</li>
  <li><strong>Sangramento à sondagem (SS):</strong> marcador de inflamação ativa.</li>
  <li><strong>Supuração</strong>, <strong>mobilidade</strong>, <strong>envolvimento de furca</strong> e <strong>recessão</strong>.</li>
</ul>

<div class="callout exam">
  <strong>Cai na prova</strong>
  <p><strong>PS ≠ perda de inserção.</strong> Uma bolsa de 5 mm com margem gengival 2 mm acima da JCE tem NIC de 3 mm. Uma recessão de 2 mm com PS de 3 mm tem NIC de 5 mm. A prova troca esses números de propósito.</p>
</div>

<h3>3. PSR: triagem, não diagnóstico</h3>
<p>O <strong>PSR</strong> (Periodontal Screening and Recording) divide a boca em seis sextantes e usa códigos de 0 a 4, com o sinal * para furca, mobilidade, recessão ou envolvimento mucogengival.</p>
<table>
  <thead><tr><th>Código</th><th>Significado</th><th>Conduta</th></tr></thead>
  <tbody>
    <tr><td>0</td><td>Sulco saudável, sem sangramento, cálculo ou restauração com margem inadequada.</td><td>Manter higiene.</td></tr>
    <tr><td>1</td><td>Sangramento à sondagem; PS ≤3 mm.</td><td>Instrução de higiene e controle.</td></tr>
    <tr><td>2</td><td>Cálculo ou margem restauradora em excesso; PS ≤3 mm.</td><td>Remover fator local e reavaliar.</td></tr>
    <tr><td>3</td><td>PS de 3,5 a 5,5 mm.</td><td>Exame periodontal completo do sextante/boca.</td></tr>
    <tr><td>4</td><td>PS ≥5,5 mm.</td><td>Exame completo e plano de tratamento.</td></tr>
    <tr><td>*</td><td>Furca, mobilidade, recessão ou problema mucogengival.</td><td>Exame completo.</td></tr>
  </tbody>
</table>
<p>O PSR serve para <strong>triar</strong> e encaminhar. Ele não define estágio, grau nem extensão.</p>

<h3>4. Exames complementares</h3>
<ul>
  <li><strong>Radiografias</strong> interproximais e panorâmica: altura óssea, padrão horizontal/vertical, cálculos, restaurações e lesões.</li>
  <li><strong>Teste de vitalidade</strong> quando houver dúvida entre lesão endodôntica e periodontal.</li>
  <li><strong>Índice de placa</strong> e registro de higiene para medir adesão.</li>
</ul>

<div class="callout warn">
  <strong>Erro clássico</strong>
  <p>Sondar com força excessiva “cria” bolsas e machuca o tecido. A sondagem deve ser leve (cerca de 0,25 N) e padronizada. Na prova, força excessiva é fator de erro de medida, não sinal de doença.</p>
</div>

<h3>5. O que registrar no prontuário</h3>
<p>Um exame bem registrado permite comparar a reavaliação. Anote dentes ausentes, próteses, implantes, lesões de mucosa, oclusão, PS, NIC, SS, furca, mobilidade e plano inicial. Sem linha de base, não há como provar melhora após a terapia.</p>

<div class="callout analogy">
  <strong>Analogia para guardar</strong>
  <p>O exame periodontal é como um mapa topográfico: a PS mostra a profundidade do vale, a MG mostra onde está o nível do mar e o NIC mostra quanto terreno foi perdido. Você precisa dos três para saber o tamanho do problema.</p>
</div>
`
      },
      {
        id: "m1l2",
        title: "Classificação 2017: saúde, gengivite e periodontite",
        minutes: 9,
        intro: "Estágio e grau são eixos diferentes. Separar gravidade de velocidade de progressão é o que mais derruba aluno na prova.",
        content: `
<p class="lead">A classificação de 2017 organiza as doenças periodontais em saúde, gengivite e periodontite. Para a periodontite, usa dois eixos: <strong>estágio</strong> (gravidade e complexidade) e <strong>grau</strong> (velocidade e risco de progressão).</p>

<h3>Saúde periodontal</h3>
<p>Critérios práticos: profundidade de sondagem ≤3 mm, sangramento à sondagem &lt;10%, ausência de perda de inserção e de perda óssea. Pode haver saúde com periodonto reduzido (após tratamento), desde que a doença esteja controlada.</p>

<h3>Gengivite induzida por placa</h3>
<p>Inflamação gengival com sangramento, sem perda de inserção. É <strong>reversível</strong> com controle de placa. Fatores locais (cálculo, margem de restauração, aparelho) e sistêmicos (hormônios, medicamentos) podem modificar a resposta.</p>

<div class="callout exam">
  <strong>Ponto de prova</strong>
  <p>Gengivite <strong>não</strong> tem perda de inserção. Se há NIC e perda óssea, o diagnóstico é periodontite — mesmo que o sangramento seja o sinal mais visível.</p>
</div>

<h3>Periodontite: estágio I a IV</h3>
<table>
  <thead><tr><th>Estágio</th><th>Gravidade</th><th>Complexidade</th></tr></thead>
  <tbody>
    <tr><td>I</td><td>NIC interproximal 1–2 mm; perda óssea radiográfica &lt;15%.</td><td>Sem perda dentária por periodontite; tratamento conservador.</td></tr>
    <tr><td>II</td><td>NIC interproximal 3–4 mm; perda óssea 15–33%.</td><td>Sem perda dentária; pode exigir ajustes.</td></tr>
    <tr><td>III</td><td>NIC interproximal ≥5 mm; perda óssea ≥33%; até 4 dentes perdidos por periodontite.</td><td>Defeitos verticais, furca classe II, mobilidade, necessidade de cirurgia/regeneração.</td></tr>
    <tr><td>IV</td><td>NIC ≥5 mm; perda óssea ≥33%; ≥5 dentes perdidos por periodontite.</td><td>Perda dentária extensa, disfunção, colapso oclusal, reabilitação complexa.</td></tr>
  </tbody>
</table>

<h3>Grau A, B e C</h3>
<ul>
  <li><strong>Grau A:</strong> progressão lenta. Sem perda óssea além do esperado para idade; sem fatores de risco relevantes.</li>
  <li><strong>Grau B:</strong> progressão moderada. Perda óssea compatível com idade; fatores controlados.</li>
  <li><strong>Grau C:</strong> progressão rápida. Perda óssea desproporcional à idade, tabaco ≥10 cigarros/dia, diabetes mal controlado (HbA1c ≥7%), resposta ruim ao tratamento.</li>
</ul>
<p>O grau pode ser estimado pela perda óssea dividida pela idade (em %), além de fatores de risco e resposta à terapia.</p>

<div class="callout warn">
  <strong>Não confunda</strong>
  <p><strong>Estágio</strong> responde “quanto dano e quão difícil de tratar?”. <strong>Grau</strong> responde “quão rápido avança e qual o risco?”. Um paciente pode ter estágio IV e grau B; outro, estágio II e grau C.</p>
</div>

<h3>Extensão</h3>
<p>Defina a extensão pelo percentual de dentes envolvidos: <strong>localizada</strong> (&lt;30%) ou <strong>generalizada</strong> (≥30%). A extensão é escrita junto do estágio e do grau — por exemplo: periodontite estágio III, grau B, generalizada.</p>

<h3>Peri-implantite e mucosite</h3>
<ul>
  <li><strong>Mucosite peri-implantar:</strong> inflamação da mucosa sem perda óssea progressiva; reversível.</li>
  <li><strong>Peri-implantite:</strong> inflamação com perda óssea progressiva; exige tratamento e reavaliação.</li>
</ul>

<div class="callout analogy">
  <strong>Como lembrar</strong>
  <p>Estágio é a “foto” do dano; grau é o “vídeo” da progressão. A foto mostra o estrago; o vídeo mostra a velocidade com que ele aconteceu.</p>
</div>
`
      },
      {
        id: "m1l3",
        title: "Fatores de risco e diagnósticos diferenciais",
        minutes: 8,
        intro: "Nem toda gengiva inflamada é placa; nem toda bolsa é periodontite. A prova adora casos que parecem uma coisa e são outra.",
        content: `
<p class="lead">O diagnóstico periodontal é clínico e contextual. A mesma quantidade de placa pode produzir respostas muito diferentes conforme tabaco, diabetes, hormônios, medicamentos e imunidade.</p>

<h3>Fatores locais</h3>
<ul>
  <li><strong>Biofilme dental</strong> — causa necessária da gengivite e da periodontite.</li>
  <li><strong>Cálculo</strong> — placa mineralizada, retentora de biofilme.</li>
  <li><strong>Margens restauradoras</strong> e próteses mal adaptadas.</li>
  <li><strong>Apinhamento, trauma oclusal, anatomia radicular</strong> e furca.</li>
  <li><strong>Xerostomia</strong> e respiração bucal.</li>
</ul>

<h3>Fatores sistêmicos e comportamentais</h3>
<table>
  <thead><tr><th>Fator</th><th>Efeito clínico</th><th>Conduta</th></tr></thead>
  <tbody>
    <tr><td>Tabaco</td><td>Vasoconstrição, menor sangramento visível, pior resposta e maior risco de recidiva.</td><td>Orientar cessação; considerar grau C se ≥10 cigarros/dia.</td></tr>
    <tr><td>Diabetes</td><td>Maior inflamação e pior cicatrização; bidirecional.</td><td>Controle glicêmico e periodontal integrados; HbA1c ≥7% sugere grau C.</td></tr>
    <tr><td>Hormônios</td><td>Gengivite na gravidez, puberdade e menopausa.</td><td>Controle de placa e acompanhamento; tratamento eletivo conforme período.</td></tr>
    <tr><td>Medicamentos</td><td>Aumento gengival (fenitoína, nifedipino, ciclosporina); xerostomia.</td><td>Revisar com o médico; higiene rigorosa; cirurgia se necessário.</td></tr>
    <tr><td>Imunossupressão</td><td>Infecções mais graves e cicatrização ruim.</td><td>Plano conservador e controle de risco.</td></tr>
  </tbody>
</table>

<div class="callout exam">
  <strong>Pegadinha de tabaco</strong>
  <p>O fumante pode ter <strong>menos sangramento</strong> à sondagem, apesar de mais doença. Ausência de sangramento não é sinal de saúde em fumante; é efeito vasoconstritor. A prova usa isso para testar raciocínio.</p>
</div>

<h3>Diagnósticos diferenciais importantes</h3>
<ul>
  <li><strong>Abscesso periodontal</strong> x <strong>abscesso endodôntico</strong>: vitalidade pulpar e localização da lesão ajudam; podem ser combinados (lesão endo-periodontal).</li>
  <li><strong>Gengivite descamativa</strong>: dor, descamação e sangramento difuso; investigar líquen plano, penfigoide e outras doenças mucocutâneas.</li>
  <li><strong>Lesões não induzidas por placa</strong>: manifestações de doenças sistêmicas, virais, fúngicas, neoplásicas ou genéticas.</li>
  <li><strong>Hiperplasia gengival</strong> medicamentosa: aumento difuso, firme, associado ao fármaco.</li>
  <li><strong>Recessão gengival</strong>: exposição radicular, sensibilidade, risco de cárie radicular.</li>
</ul>

<h3>O que isso muda no plano integrado</h3>
<p>O risco periodontal precisa ser controlado <strong>antes</strong> de coroas, próteses e implantes. Margens subgengivais em paciente com inflamação ativa dificultam a higiene e pioram o prognóstico. A sequência é: controlar risco → tratar doença → reavaliar → reabilitar → manter.</p>

<div class="callout analogy">
  <strong>Regra de ouro</strong>
  <p>Não se constrói sobre terreno inflamado. Prótese e dentística definitivas são o “acabamento”; a periodontia é a “fundação”.</p>
</div>
`
      }
    ]
  },
  {
    id: "m2",
    title: "Periodontia II — Tratamento e manutenção",
    short: "Periodontia: tratamento",
    icon: "i-floss",
    accent: "olive",
    blurb: "RAR, reavaliação, cirurgia periodontal, regeneração e manutenção: a sequência que a prova cobra em casos clínicos.",
    lessons: [
      {
        id: "m2l1",
        title: "Terapia periodontal não cirúrgica e reavaliação",
        minutes: 9,
        intro: "A RAR é a base do tratamento. Sem controle de placa e reavaliação padronizada, a cirurgia vira remendo.",
        content: `
<p class="lead">A terapia periodontal não cirúrgica (TPNC) inclui instrução de higiene, remoção de fatores retentivos, raspagem supragengival e <strong>raspagem e alisamento radicular (RAR)</strong> subgengival. É o primeiro tratamento de toda periodontite.</p>

<h3>Objetivos da RAR</h3>
<ul>
  <li>Remover biofilme e cálculo da superfície radicular.</li>
  <li>Eliminar ou reduzir a inflamação e o sangramento.</li>
  <li>Reduzir bolsas e ganhar inserção quando possível.</li>
  <li>Criar condições para a manutenção e para decisões cirúrgicas.</li>
</ul>

<h3>Instrumentação</h3>
<p>Instrumentos manuais (curetas Gracey, universais) e ultrassom com pontas adequadas. A escolha depende da profundidade, do acesso, da sensibilidade e do tipo de cálculo. O objetivo não é “polir até brilhar”, e sim remover o biofilme e o cálculo sem destruir cemento e tecido.</p>

<div class="callout exam">
  <strong>Diferença que cai</strong>
  <p><strong>Profilaxia</strong> é supragengival e preventiva. <strong>RAR</strong> é subgengival, terapêutica, feita em bolsas, com reavaliação. Trocar os termos é erro clássico.</p>
</div>

<h3>Controle de placa: parte do tratamento</h3>
<p>Sem adesão do paciente, a RAR falha. Ensine técnica (Bass modificada, escova interproximal, fio, escova unitufo), frequência e uso de agentes químicos quando indicado. Avalie o índice de placa na reavaliação.</p>

<h3>Reavaliação</h3>
<ul>
  <li>Prazo típico: <strong>4 a 8 semanas</strong> após a RAR.</li>
  <li>Reavaliar PS, NIC, sangramento, supuração, placa e fatores de risco.</li>
  <li>Comparar com a linha de base — sem registro inicial, não há como medir sucesso.</li>
  <li>Decidir: manutenção, nova instrumentação ou cirurgia.</li>
</ul>

<div class="callout warn">
  <strong>Não prometa cura</strong>
  <p>Periodontite é doença crônica controlável, não “curada” com uma sessão. O paciente precisa entender que o tratamento continua na manutenção.</p>
</div>

<h3>Quando a TPNC basta?</h3>
<p>Em muitos casos de gengivite, periodontite inicial e bolsas moderadas com boa resposta, a TPNC + manutenção é suficiente. Bolsas profundas residuais, defeitos verticais, furca e necessidade de acesso podem indicar cirurgia — mas só após a reavaliação.</p>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>A RAR é como limpar profundamente um encanamento entupido. Se o morador continua jogando gordura na pia (placa), o encanamento volta a entupir. A manutenção é a rotina de prevenção.</p>
</div>
`
      },
      {
        id: "m2l2",
        title: "Cirurgia periodontal: acesso, remoção e regeneração",
        minutes: 9,
        intro: "Cirurgia não substitui controle de placa. Ela serve para acesso, correção de defeitos e regeneração em casos selecionados.",
        content: `
<p class="lead">A cirurgia periodontal é indicada quando a terapia não cirúrgica não resolve bolsas residuais, defeitos ósseos, furca ou alterações mucogengivais. O objetivo pode ser <strong>acesso</strong>, <strong>ressecção</strong> ou <strong>regeneração</strong>.</p>

<h3>Indicações frequentes</h3>
<ul>
  <li>Bolsas profundas residuais após RAR e boa higiene.</li>
  <li>Defeitos ósseos verticais e envolvimento de furca selecionados.</li>
  <li>Necessidade de acesso para instrumentação e correção de anatomia.</li>
  <li>Gengivectomia/gengivoplastia para hiperplasia ou contorno.</li>
  <li>Recobrimento radicular e enxertos em recessões.</li>
</ul>

<h3>Procedimentos que a prova cobra</h3>
<table>
  <thead><tr><th>Procedimento</th><th>Objetivo</th><th>Observação</th></tr></thead>
  <tbody>
    <tr><td>Retalho de Widman modificado</td><td>Acesso e remoção de tecido inflamado, com reposicionamento.</td><td>Não é “raspar mais fundo”; é acesso cirúrgico.</td></tr>
    <tr><td>Gengivectomia</td><td>Remover tecido gengival excessivo.</td><td>Requer faixa de gengiva inserida adequada.</td></tr>
    <tr><td>Regeneração tecidual guiada (GTR)</td><td>Excluir células indesejadas e favorecer células periodontais.</td><td>Defeitos contidos, boa higiene, dentes com prognóstico.</td></tr>
    <tr><td>Enxerto ósseo</td><td>Preencher defeito e dar suporte.</td><td>Pode ser autógeno, alógeno, xenógeno ou sintético.</td></tr>
    <tr><td>Enxerto de tecido conjuntivo</td><td>Recobrir raiz e aumentar tecido queratinizado.</td><td>Recessões e defeitos mucogengivais.</td></tr>
  </tbody>
</table>

<div class="callout exam">
  <strong>Critérios de sucesso</strong>
  <p>Cirurgia periodontal não é medida por “quanto osso cresceu” apenas. Avalie redução de bolsa, ganho de inserção, ausência de sangramento, controle de placa e estabilidade ao longo do tempo.</p>
</div>

<h3>Regeneração: por que nem todo defeito responde</h3>
<p>A regeneração depende de células viáveis, espaço, estabilidade, vascularização e ausência de infecção. Defeitos muito largos, furca avançada, dentes com mobilidade importante e higiene ruim têm prognóstico pior. A prova gosta de casos em que a resposta é “não indicar regeneração”.</p>

<h3>Pós-operatório</h3>
<ul>
  <li>Orientações de higiene sem trauma, bochecho conforme protocolo e analgesia.</li>
  <li>Evitar fumo e controlar fatores sistêmicos.</li>
  <li>Reavaliar tecidos, placa e cicatrização; depois retomar manutenção.</li>
</ul>

<div class="callout warn">
  <strong>Sequência integrada</strong>
  <p>Não faça coroa ou prótese definitiva em dente com bolsa profunda e inflamação ativa. Trate a periodontite, reavalie e só depois reabilite. A prótese pode esperar; a infecção não.</p>
</div>
`
      },
      {
        id: "m2l3",
        title: "Manutenção periodontal e prognóstico",
        minutes: 8,
        intro: "A prova adora a etapa que todo mundo esquece: depois de tratar, é preciso manter. Sem manutenção, a periodontite recidiva.",
        content: `
<p class="lead">A manutenção periodontal (ou terapia de suporte) é o conjunto de consultas periódicas para controlar placa, reavaliar tecidos e interceptar recidivas. É parte do tratamento, não um extra.</p>

<h3>O que fazer em cada consulta</h3>
<ul>
  <li>Atualizar história médica e fatores de risco.</li>
  <li>Avaliar placa, sangramento, PS, NIC e mobilidade.</li>
  <li>Instrumentar bolsas residuais e áreas de difícil acesso.</li>
  <li>Reforçar técnica de higiene e motivação.</li>
  <li>Comparar com registros anteriores e decidir conduta.</li>
</ul>

<h3>Intervalos</h3>
<p>Não existe intervalo único. O risco define a frequência:</p>
<table>
  <thead><tr><th>Perfil</th><th>Intervalo típico</th></tr></thead>
  <tbody>
    <tr><td>Baixo risco, boa higiene, sem bolsas residuais</td><td>6 a 12 meses</td></tr>
    <tr><td>Risco moderado, algumas bolsas ou tabaco controlado</td><td>3 a 6 meses</td></tr>
    <tr><td>Alto risco, tabaco, diabetes, bolsas residuais, pouca adesão</td><td>2 a 4 meses</td></tr>
  </tbody>
</table>

<div class="callout exam">
  <strong>Conceito-chave</strong>
  <p>Manutenção não é “profilaxia de rotina”. É reavaliação periodontal com instrumentação direcionada. A diferença está no diagnóstico e no registro, não só no procedimento.</p>
</div>

<h3>Prognóstico</h3>
<p>O prognóstico de um dente depende de:</p>
<ul>
  <li>Controle de placa e inflamação.</li>
  <li>Profundidade residual e morfologia do defeito.</li>
  <li>Suporte ósseo e envolvimento de furca.</li>
  <li>Mobilidade e oclusão.</li>
  <li>Fatores sistêmicos e tabaco.</li>
  <li>Adesão à manutenção.</li>
</ul>
<p>Prognóstico é dinâmico: pode melhorar com tratamento e piorar com recidiva. Na prova, desconfie de alternativas que tratam prognóstico como sentença fixa.</p>

<h3>Sinais de recidiva</h3>
<ul>
  <li>Aumento de PS e sangramento em sítios previamente tratados.</li>
  <li>Perda adicional de inserção ou de osso radiográfico.</li>
  <li>Retorno de placa e cálculo em áreas críticas.</li>
  <li>Novos fatores: prótese mal adaptada, doença sistêmica descompensada, retorno ao tabaco.</li>
</ul>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>Periodontite tratada é como pressão alta controlada: o paciente fica bem, mas não pode abandonar o acompanhamento. A ausência de sintomas não significa ausência de doença.</p>
</div>
`
      }
    ]
  },
  {
    id: "m3",
    title: "Dentística I — Cárie e diagnóstico",
    short: "Dentística: cárie",
    icon: "i-tooth",
    accent: "terra",
    blurb: "Cárie como doença multifatorial, ICDAS, risco e decisão entre tratar a doença e restaurar a cavidade.",
    lessons: [
      {
        id: "m3l1",
        title: "Cárie não é buraco: é doença",
        minutes: 8,
        intro: "A prova troca “cárie = cavidade” por “cárie = processo dinâmico”. Entender o equilíbrio des-remineralização muda a conduta.",
        content: `
<p class="lead">Cárie dental é uma doença <strong>multifatorial</strong> mediada por biofilme, na qual o metabolismo bacteriano produz ácidos que desmineralizam o dente. O resultado depende do equilíbrio entre <strong>desmineralização</strong> e <strong>remineralização</strong>.</p>

<h3>Os fatores da doença</h3>
<ul>
  <li><strong>Hospedeiro:</strong> saliva, composição do esmalte, anatomia, higiene, imunidade.</li>
  <li><strong>Biofilme:</strong> microbiota cariogênica e maturação do biofilme.</li>
  <li><strong>Dieta:</strong> frequência e forma do açúcar; não só a quantidade.</li>
  <li><strong>Tempo:</strong> exposições repetidas ao longo do dia.</li>
  <li><strong>Flúor:</strong> reduz desmineralização e favorece remineralização.</li>
</ul>

<div class="callout exam">
  <strong>Frequência &gt; quantidade</strong>
  <p>Vários pequenos ataques de açúcar ao longo do dia são piores que uma exposição maior isolada. A prova cobra isso em questões de dieta e risco de cárie.</p>
</div>

<h3>Lesão ativa x lesão inativa</h3>
<table>
  <thead><tr><th>Característica</th><th>Ativa</th><th>Inativa</th></tr></thead>
  <tbody>
    <tr><td>Brilho</td><td>Opaca, fosca</td><td>Brilhante</td></tr>
    <tr><td>Cor</td><td>Branca/amarelada</td><td>Marrom/escura</td></tr>
    <tr><td>Textura</td><td>Rugosa, amolecida</td><td>Lisa, endurecida</td></tr>
    <tr><td>Localização</td><td>Área de acúmulo de placa</td><td>Fora da zona de risco</td></tr>
  </tbody>
</table>
<p>Lesão ativa pode ser tratada de forma não invasiva; lesão inativa geralmente é monitorada. Cavitação com dentina exposta muda a decisão.</p>

<h3>Saliva e prevenção</h3>
<p>Xerostomia aumenta muito o risco. Avalie fluxo salivar, medicações, respiração bucal e doenças sistêmicas. Flúor tópico, dentifrício, controle de dieta, selantes e higiene são a base.</p>

<div class="callout warn">
  <strong>Não confunda</strong>
  <p>Mancha branca ativa <strong>não</strong> é indicação automática de broca. Se o esmalte está íntegro, o tratamento é controle da doença. A restauração trata a consequência; não controla a causa.</p>
</div>

<h3>Cárie radicular e recidiva</h3>
<ul>
  <li><strong>Cárie radicular:</strong> comum em idosos, recessão e xerostomia; dentina exposta é mais suscetível.</li>
  <li><strong>Recidiva:</strong> lesão ao redor de restauração, geralmente por margem infiltrada, excesso, placa ou técnica inadequada.</li>
</ul>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>O dente não “apodrece de fora para dentro” como uma fruta. É mais como uma balança: se a desmineralização pesa mais que a remineralização por tempo suficiente, aparece a lesão.</p>
</div>
`
      },
      {
        id: "m3l2",
        title: "Diagnóstico, ICDAS e decisão de tratamento",
        minutes: 9,
        intro: "O ICDAS organiza o que você vê. A decisão não depende só do código: depende de atividade, risco e acesso.",
        content: `
<p class="lead">O diagnóstico de cárie combina inspeção visual, radiografias, transiluminação, separação temporária e avaliação de risco. O objetivo é detectar cedo e decidir entre prevenção, intervenção mínima e restauração.</p>

<h3>Exame visual e ICDAS</h3>
<table>
  <thead><tr><th>Código</th><th>Achado</th><th>Leitura clínica</th></tr></thead>
  <tbody>
    <tr><td>0</td><td>Saudável</td><td>Sem lesão.</td></tr>
    <tr><td>1</td><td>Primeira alteração visível após secagem</td><td>Lesão inicial de esmalte.</td></tr>
    <tr><td>2</td><td>Lesão visível sem secagem, esmalte íntegro</td><td>Mancha branca ativa; não invasivo.</td></tr>
    <tr><td>3</td><td>Microcavidade sem dentina visível</td><td>Decisão conforme atividade e acesso.</td></tr>
    <tr><td>4</td><td>Sombra escura de dentina, esmalte íntegro</td><td>Lesão dentinária; avaliar restauração.</td></tr>
    <tr><td>5</td><td>Cavidade com dentina exposta</td><td>Restauração indicada.</td></tr>
    <tr><td>6</td><td>Cavidade extensa, dentina evidente</td><td>Restauração e possível proteção pulpar.</td></tr>
  </tbody>
</table>

<div class="callout exam">
  <strong>ICDAS não é prescrição</strong>
  <p>O código descreve a lesão; a conduta depende de atividade, risco, acesso e expectativa. ICDAS 3 pode ser tratado sem broca em algumas situações; ICDAS 5 quase sempre exige restauração.</p>
</div>

<h3>Exames complementares</h3>
<ul>
  <li><strong>Radiografia interproximal:</strong> lesões proximais e recidivas; não detecta lesões muito iniciais.</li>
  <li><strong>Transiluminação (FOTI):</strong> auxilia em proximais.</li>
  <li><strong>Separação temporária:</strong> confirma cavitação proximal.</li>
  <li><strong>Teste de vitalidade:</strong> quando há dúvida pulpar.</li>
</ul>

<h3>Avaliação de risco</h3>
<p>Considere histórico de cárie, placa, dieta, flúor, saliva, higiene, restaurações, aparelho e condições sistêmicas. Risco alto exige controle mais intensivo e retornos mais curtos.</p>

<h3>Decisão de tratamento</h3>
<ol>
  <li><strong>Controlar a doença:</strong> higiene, flúor, dieta e saliva.</li>
  <li><strong>Remineralizar</strong> lesões iniciais ativas.</li>
  <li><strong>Selar</strong> fissuras de risco quando indicado.</li>
  <li><strong>Restaurar</strong> cavitação, dentina exposta, dor ou risco de progressão.</li>
  <li><strong>Reavaliar</strong> o resultado e manter prevenção.</li>
</ol>

<div class="callout warn">
  <strong>Erro comum</strong>
  <p>Restaurar todas as manchas brancas “para garantir” é sobretratamento. A prova valoriza a mínima intervenção baseada em risco e atividade.</p>
</div>
`
      },
      {
        id: "m3l3",
        title: "Preparos cavitários e proteção do complexo dentinopulpar",
        minutes: 9,
        intro: "Princípios de Black ainda aparecem, mas a prova cobra a lógica minimamente invasiva e a proteção da dentina.",
        content: `
<p class="lead">Preparo cavitário é a remoção controlada de tecido dentário para receber o material restaurador. Os princípios clássicos de Black continuam úteis, mas a dentística moderna prioriza preservar estrutura e selar a dentina.</p>

<h3>Nomenclatura essencial</h3>
<ul>
  <li><strong>Paredes circundantes</strong> (gengival, pulpar, axial, incisal) e <strong>paredes de fundo</strong>.</li>
  <li><strong>Ângulo diedro</strong> (entre duas paredes) e <strong>triedro</strong> (entre três).</li>
  <li><strong>Caixa proximal</strong> e <strong>caixa oclusal</strong>.</li>
  <li><strong>Istmo</strong>: região mais estreita da cavidade.</li>
</ul>

<h3>Princípios de Black (resumo)</h3>
<ol>
  <li>Remover tecido cariado e tecido não suportado.</li>
  <li>Obter forma de contorno e resistência.</li>
  <li>Preservar estrutura sadia.</li>
  <li>Garantir forma de retenção quando o material exige.</li>
  <li>Permitir instrumentação e acabamento.</li>
</ol>
<p>Com adesão, a retenção mecânica perde protagonismo: preparos mais conservadores e arredondados são possíveis.</p>

<h3>Minimamente invasivo</h3>
<ul>
  <li>Remover apenas tecido irreversivelmente comprometido.</li>
  <li>Preservar esmalte sadio e zonas de contato.</li>
  <li>Selar dentina e evitar exposição pulpar desnecessária.</li>
  <li>Usar isolamento adequado e controle de umidade.</li>
</ul>

<div class="callout exam">
  <strong>Quando a cavidade é “convencional”?</strong>
  <p>Quando o material não adere (amálgama), quando há grande perda estrutural ou quando a forma de resistência exige. Em resina composta, o preparo pode ser mais conservador.</p>
</div>

<h3>Proteção do complexo dentinopulpar</h3>
<table>
  <thead><tr><th>Situação</th><th>Conduta típica</th></tr></thead>
  <tbody>
    <tr><td>Dentina sadia próxima à polpa</td><td>Adesivo e restauração; evitar secagem excessiva.</td></tr>
    <tr><td>Dentina cariada próxima à polpa</td><td>Remoção seletiva e selamento; reavaliar.</td></tr>
    <tr><td>Exposição pulpar puntiforme</td><td>Pulpotomia/capeamento conforme protocolo e viabilidade.</td></tr>
    <tr><td>Exposição ampla ou polpa irreversível</td><td>Endodontia; não mascarar com curativo.</td></tr>
  </tbody>
</table>

<h3>Materiais de proteção</h3>
<ul>
  <li><strong>Hidróxido de cálcio:</strong> estímulo de reparo e ação antibacteriana; pode ser solúvel e ter baixa resistência.</li>
  <li><strong>Cimento de ionômero de vidro:</strong> libera flúor, boa compatibilidade; usar conforme indicação.</li>
  <li><strong>Adesivos:</strong> selam a dentina e reduzem sensibilidade, mas exigem controle de umidade.</li>
  <li><strong>MTA:</strong> indicações específicas de reparo e capeamento.</li>
</ul>

<div class="callout warn">
  <strong>Cuidado com o “forro universal”</strong>
  <p>Nem toda cavidade precisa de forro. A decisão depende de profundidade, proximidade pulpar, material e protocolo. Forrar por rotina pode prejudicar adesão e selamento.</p>
</div>

<div class="callout analogy">
  <strong>Analogia</strong>
  <p>A dentina é como um telhado poroso: se você não sela, a água entra e a estrutura sofre. O adesivo é a impermeabilização; a restauração é a telha.</p>
</div>
`
      }
    ]
  }
]);
