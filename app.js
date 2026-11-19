(function () {
  "use strict";

  const MODULES = window.CI_MODULES || [];
  const CARDS = window.CI_CARDS || [];
  const QUESTIONS = window.CI_QUESTIONS || [];
  const MATERIALS = window.CI_MATERIALS || [];
  const GLOSSARY = window.CI_GLOSSARY || [];
  const PLAN = window.CI_PLAN || [];
  const PLANS = window.CI_PLANS || {};
  const STORAGE_KEY = "ci-progress-v3";
  const LETTERS = ["A", "B", "C", "D", "E"];
  const LEVEL_LABEL = { facil: "Fácil", medio: "Médio", dificil: "Difícil" };

  const MODULE_TRACK = {
    m1: "perio", m2: "perio",
    m3: "dent", m4: "dent",
    m5: "prot", m6: "prot",
    m7: "cir", m8: "cir",
    m9: "integ"
  };

  const TRACKS = [
    {
      id: "perio", name: "Periodontia", short: "Periodontia", icon: "i-scaler", accent: "green",
      kicker: "UC Periodontia",
      desc: "Exame periodontal, PSR, classificação 2017 (estágio/grau), RAR, cirurgia e manutenção.",
      eyebrow: "Periodontia · exame, classificação, RAR e manutenção",
      title: "Periodontia", note: "a base de todo plano de tratamento",
      lead: "Entenda o exame periodontal, a classificação de 2017 e a sequência RAR → reavaliação → manutenção. Sem isso, prótese e dentística não se sustentam.",
      strategy: ["PS, MG e NIC: saiba calcular antes de interpretar.", "Estágio é gravidade; grau é velocidade.", "RAR sem reavaliação em 4–8 semanas não fecha diagnóstico.", "Manutenção não é opcional: é parte do tratamento."],
      focus: [
        { t: "PS, MG e NIC", d: "A conta que separa bolsa de perda de inserção." },
        { t: "PSR e exame completo", d: "Códigos 0–4 e quando aprofundar." },
        { t: "Estágio x grau", d: "Gravidade/complexidade versus progressão/risco." },
        { t: "RAR e reavaliação", d: "O que medir e quando decidir cirurgia." },
        { t: "Manutenção e prognóstico", d: "Intervalos por risco e sinais de recidiva." }
      ]
    },
    {
      id: "dent", name: "Dentística", short: "Dentística", icon: "i-tooth", accent: "terra",
      kicker: "UC Dentística",
      desc: "Cárie e ICDAS, preparos, adesão, resina composta, ionômero e falhas restauradoras.",
      eyebrow: "Dentística · cárie, adesão e restauração",
      title: "Dentística", note: "a doença antes do buraco",
      lead: "Cárie é doença, não buraco. Aqui você estuda diagnóstico, ICDAS, preparos, adesão e resina — na ordem em que a decisão clínica acontece.",
      strategy: ["Trate a doença antes de restaurar a consequência.", "ICDAS descreve; não prescreve tratamento.", "Dentina úmida, nunca encharcada nem seca demais.", "Contração e fotoativação explicam boa parte das falhas."],
      focus: [
        { t: "Cárie como doença", d: "Des-remineralização, dieta e saliva." },
        { t: "ICDAS e decisão", d: "Quando prevenir, selar ou restaurar." },
        { t: "Adesão", d: "Condicionamento, primer, bond e camada híbrida." },
        { t: "Resina composta", d: "Contração, fator C, incrementos e fotoativação." },
        { t: "Falhas restauradoras", d: "Sensibilidade, fratura, manchamento e recidiva." }
      ]
    },
    {
      id: "prot", name: "Prótese", short: "Prótese", icon: "i-crown", accent: "blue",
      kicker: "UC Prótese",
      desc: "PPR (Kennedy/Applegate), coroas, prótese total, DVO, RC/MIC e ajuste oclusal.",
      eyebrow: "Prótese · PPR, fixa, total e oclusão",
      title: "Prótese", note: "função, estética e oclusão",
      lead: "PPR, coroas, prótese total e oclusão. Aprenda a indicar, planejar e ajustar sem começar pelo material.",
      strategy: ["Classifique pelo espaço mais posterior (Applegate).", "Eixo de inserção é comum à prótese inteira.", "Retenção, estabilidade e suporte não são sinônimos.", "Ajuste oclusal vem depois da adaptação."],
      focus: [
        { t: "Kennedy e Applegate", d: "I–IV e as regras que resolvem os casos ambíguos." },
        { t: "Componentes da PPR", d: "Apoio, grampo, conector e selim." },
        { t: "Eixo de inserção", d: "Paralelismo, zonas retentivas e moldagem." },
        { t: "Prótese total", d: "Etapas, planos de cera, DVO e reabsorção." },
        { t: "Oclusão", d: "RC, MIC, guias e ajuste." }
      ]
    },
    {
      id: "cir", name: "Cirurgia", short: "Cirurgia", icon: "i-syringe", accent: "berry",
      kicker: "UC Cirurgia",
      desc: "Exodontia, instrumental, anestesia e doses, sutura, pós-operatório e urgências.",
      eyebrow: "Cirurgia · exodontia, anestesia e urgências",
      title: "Cirurgia", note: "técnica e segurança",
      lead: "Exodontia, instrumental, anestesia, sutura e complicações. O foco é reduzir trauma e reconhecer risco antes que vire urgência.",
      strategy: ["Avaliação pré-operatória vale mais que força.", "Odontossecção reduz trauma em dentes complexos.", "Calcule mg e respeite a dose máxima por peso.", "Pós-operatório bem orientado evita alveolite."],
      focus: [
        { t: "Avaliação pré-operatória", d: "Riscos, medicações e imagem." },
        { t: "Técnica de exodontia", d: "Sindesmotomia, luxação, fórceps e odontossecção." },
        { t: "Anestesia", d: "Doses máximas, vasoconstritor e aspiração." },
        { t: "Sutura e pós-operatório", d: "Fios, técnica, prazo e orientações." },
        { t: "Complicações", d: "Hemorragia, alveolite, infecção e comunicação bucosinusal." }
      ]
    },
    {
      id: "integ", name: "Casos integrados", short: "Integração", icon: "i-target", accent: "mustard",
      kicker: "Revisão final · opcional",
      desc: "A sequência do plano de tratamento, casos que misturam as quatro UCs e o checklist de véspera.",
      eyebrow: "Revisão integrada · casos e plano de tratamento",
      title: "Casos integrados", note: "só depois das quatro matérias",
      lead: "Casos que conectam as quatro UCs e a sequência do plano de tratamento. Use como revisão final, não como substituto das matérias separadas.",
      strategy: ["Urgência → doença → reavaliação → reabilitação.", "Nunca reabilite sobre periodontite ativa.", "Estética não tem prioridade sobre infecção.", "A sequência é a resposta da maioria das questões."],
      focus: [
        { t: "Sequência do plano", d: "As 7 etapas que organizam qualquer caso." },
        { t: "Periodontia antes da prótese", d: "Por que a fundação vem primeiro." },
        { t: "Casos comentados", d: "Cinco situações que misturam as UCs." },
        { t: "Erros de prova", d: "As confusões que mais derrubam." },
        { t: "Checklist final", d: "Revisão de véspera em 20 pontos." }
      ]
    }
  ];
  const TRACK_BY_ID = {};
  TRACKS.forEach((track) => { TRACK_BY_ID[track.id] = track; });

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const BY_ID = {};
  const LESSONS = [];
  MODULES.forEach((mod, mi) => {
    mod.track = MODULE_TRACK[mod.id] || "integ";
    BY_ID[mod.id] = mod;
    mod.lessons.forEach((lesson, li) => {
      LESSONS.push({ lesson: lesson, module: mod, mi: mi, li: li, index: LESSONS.length });
    });
  });
  const CARD_BY_ID = {};
  CARDS.forEach((card) => { CARD_BY_ID[card.id] = card; });

  const DEFAULT_STATE = {
    theme: null,
    track: null,
    examDate: "",
    examDates: {},
    lessons: {},
    cards: {},
    quizStats: { answered: 0, correct: 0 },
    trackStats: { perio: { answered: 0, correct: 0 }, dent: { answered: 0, correct: 0 }, prot: { answered: 0, correct: 0 }, cir: { answered: 0, correct: 0 }, integ: { answered: 0, correct: 0 } },
    quizHistory: [],
    examHistory: [],
    plan: {},
    lastLesson: null
  };

  let state = loadState();
  let activeLesson = null;
  let openModules = new Set([MODULES[0] ? MODULES[0].id : ""]);
  let deck = [];
  let deckIndex = 0;
  let quiz = null;
  let exam = null;
  let examRemaining = 45 * 60;
  let quizReviewMode = "all";
  let glossaryQuery = "";
  let glossaryLetter = "";
  let toastTimer = null;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
      const parsed = JSON.parse(raw);
      const trackStats = Object.assign({}, DEFAULT_STATE.trackStats);
      Object.keys(trackStats).forEach((id) => {
        trackStats[id] = Object.assign({ answered: 0, correct: 0 }, parsed.trackStats && parsed.trackStats[id]);
      });
      return Object.assign(JSON.parse(JSON.stringify(DEFAULT_STATE)), parsed, {
        track: TRACK_BY_ID[parsed.track] ? parsed.track : null,
        lessons: Object.assign({}, parsed.lessons),
        cards: Object.assign({}, parsed.cards),
        plan: Object.assign({}, parsed.plan),
        quizStats: Object.assign({ answered: 0, correct: 0 }, parsed.quizStats),
        trackStats: trackStats,
        quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [],
        examHistory: Array.isArray(parsed.examHistory) ? parsed.examHistory : []
      });
    } catch (err) {
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      /* armazenamento indisponível: o site continua funcionando na sessão */
    }
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function svg(name) {
    return '<svg aria-hidden="true"><use href="#' + name + '"></use></svg>';
  }

  function normalize(text) {
    return String(text || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function stripHtml(html) {
    const div = document.createElement("div");
    div.innerHTML = html || "";
    return (div.textContent || div.innerText || "").replace(/\s+/g, " ").trim();
  }

  function fmt(value, digits) {
    const d = typeof digits === "number" ? digits : 2;
    return value.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  function fmtInt(value) {
    return Math.round(value).toLocaleString("pt-BR");
  }

  function pct(part, total) {
    return total ? Math.round((part / total) * 100) : 0;
  }

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function withShuffledOptions(question) {
    const options = question.options.map((text, index) => ({ text: text, correct: index === question.answer }));
    const shuffled = shuffle(options);
    return Object.assign({}, question, {
      options: shuffled.map((option) => option.text),
      answer: shuffled.findIndex((option) => option.correct)
    });
  }

  function moduleOf(id) {
    return BY_ID[id] || null;
  }

  function moduleLabel(id) {
    const mod = moduleOf(id);
    return mod ? mod.short : "Módulo";
  }

  function selectedTrack() {
    return state.track ? TRACK_BY_ID[state.track] || null : null;
  }

  function modulesOfTrack(trackId) {
    return MODULES.filter((mod) => mod.track === trackId);
  }

  function visibleModules() {
    return state.track ? modulesOfTrack(state.track) : MODULES;
  }

  function visibleLessons() {
    return LESSONS.filter((entry) => !state.track || entry.module.track === state.track);
  }

  function moduleNumberInTrack(id) {
    const mod = moduleOf(id);
    if (!mod) return 0;
    const list = modulesOfTrack(mod.track);
    return list.indexOf(mod) + 1;
  }

  function cardsOfTrack() {
    return CARDS.filter((card) => !state.track || (moduleOf(card.module) && moduleOf(card.module).track === state.track));
  }

  function questionsOfTrack() {
    return QUESTIONS.filter((q) => !state.track || (moduleOf(q.module) && moduleOf(q.module).track === state.track));
  }

  function glossaryOfTrack() {
    return GLOSSARY.filter((item) => !state.track || (moduleOf(item.module) && moduleOf(item.module).track === state.track));
  }

  function planOfTrack() {
    return state.track && PLANS[state.track] ? PLANS[state.track] : PLAN;
  }

  function currentQuizStats() {
    if (!state.track) return state.quizStats;
    return state.trackStats[state.track] || { answered: 0, correct: 0 };
  }

  function lessonById(id) {
    const item = LESSONS.find((entry) => entry.lesson.id === id);
    return item || null;
  }

  function firstLessonOf(mod) {
    return mod && mod.lessons.length ? mod.lessons[0] : null;
  }

  function nextIncompleteLesson(mod) {
    if (!mod) return null;
    return mod.lessons.find((lesson) => !state.lessons[lesson.id]) || mod.lessons[0] || null;
  }

  function dateLabel(ts) {
    return new Date(ts).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  }

  function toast(message) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  }

  /* ----------------------------- tema ----------------------------- */

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#151b14" : "#2f5d3a");
    state.theme = theme;
    saveState();
  }

  function initTheme() {
    const theme = state.theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#151b14" : "#2f5d3a");
  }

  /* ------------------------- matérias ---------------------------- */

  function updateSubjectChrome() {
    const track = selectedTrack();
    const btn = $("#btn-subject");
    const label = $("#subject-btn-label");
    if (!track) {
      if (btn) btn.hidden = true;
      document.body.removeAttribute("data-subject");
      return;
    }
    if (btn) {
      btn.hidden = false;
      btn.dataset.track = track.id;
      btn.setAttribute("aria-label", "Matéria atual: " + track.name + ". Trocar de matéria");
    }
    if (label) label.textContent = track.short;
    document.body.setAttribute("data-subject", track.id);
    document.title = track.short + " · Clínica Integrada";
  }

  function openSubjectGate() {
    const gate = $("#subject-gate");
    if (!gate) return;
    const close = $("#btn-close-gate");
    if (close) close.hidden = !selectedTrack();
    gate.hidden = false;
    document.body.classList.add("gate-open");
    const first = gate.querySelector("[data-subject-choice]");
    if (first) first.focus();
  }

  function closeSubjectGate() {
    if (!selectedTrack()) return;
    const gate = $("#subject-gate");
    if (gate) gate.hidden = true;
    document.body.classList.remove("gate-open");
  }

  function selectSubject(trackId) {
    const track = TRACK_BY_ID[trackId];
    if (!track) return;
    state.track = trackId;
    state.lastLesson = null;
    activeLesson = null;
    deck = [];
    deckIndex = 0;
    quiz = null;
    if (exam && exam.timer) clearInterval(exam.timer);
    exam = null;
    const quizSetup = $("#quiz-setup"); if (quizSetup) quizSetup.hidden = false;
    const quizGame = $("#quiz-game"); if (quizGame) quizGame.hidden = true;
    const quizResults = $("#quiz-results"); if (quizResults) quizResults.hidden = true;
    const examSetup = $("#exam-setup"); if (examSetup) examSetup.hidden = false;
    const examGame = $("#exam-game"); if (examGame) examGame.hidden = true;
    const examResults = $("#exam-results"); if (examResults) examResults.hidden = true;
    openModules = new Set(modulesOfTrack(trackId).map((mod) => mod.id));
    saveState();
    updateSubjectChrome();
    closeSubjectGate();
    populateSelects();
    applySubjectToPage();
    renderHome();
    renderSidebar();
    renderContinue();
    buildDeck();
    updateDeckStats();
    renderQuizSetupMeta();
    renderExamSetupMeta();
    renderGlossary();
    renderPlan();
    updateDateInput();
    updateCountdown();
    navigate("inicio");
    toast("Matéria selecionada: " + track.name + ".");
  }

  function focusListHtml(track) {
    return track.focus.map((item) => '<li><span>' + String(track.focus.indexOf(item) + 1).padStart(2, "0") + '</span><div><strong>' + esc(item.t) + "</strong><p>" + esc(item.d) + "</p></div></li>").join("");
  }

  function applySubjectToPage() {
    const track = selectedTrack();
    if (!track) return;

    const mods = modulesOfTrack(track.id);
    const lessons = visibleLessons();
    const cards = cardsOfTrack();
    const questions = questionsOfTrack();
    const facts = $$(".hero-facts strong");
    if (facts.length >= 4) {
      facts[0].textContent = mods.length;
      facts[1].textContent = lessons.length;
      facts[2].textContent = cards.length;
      facts[3].textContent = questions.length;
    }

    const eyebrow = $("#view-inicio .hero-copy .eyebrow");
    if (eyebrow) eyebrow.innerHTML = '<span class="dot"></span> ' + esc(track.eyebrow);
    const title = $("#view-inicio .hero-copy h1");
    if (title) title.innerHTML = esc(track.title) + '<span class="h1-note">' + esc(track.note) + "</span>";
    const lead = $("#view-inicio .hero-lead");
    if (lead) lead.textContent = track.lead;

    const modulesTitle = $("#modules-section h2");
    if (modulesTitle) modulesTitle.textContent = "Os " + mods.length + " módulos de " + track.short;
    const modulesSub = $("#modules-section .section-sub");
    if (modulesSub) modulesSub.textContent = "Conteúdo isolado de " + track.name + ": aulas, flashcards e questões só desta matéria.";

    const focusTitle = $("#view-inicio .exam-focus h2");
    if (focusTitle) focusTitle.textContent = "O que mais cai em " + track.short;
    const focusSub = $("#view-inicio .exam-focus .exam-focus-copy > p:not(.eyebrow)");
    if (focusSub) focusSub.textContent = "Os pontos que sustentam as questões de " + track.name + ". Domine antes de misturar com outra área.";
    const focusList = $("#view-inicio .focus-list");
    if (focusList) focusList.innerHTML = focusListHtml(track);

    const countdownTitle = $("#countdown-title");
    if (countdownTitle) countdownTitle.textContent = "Contagem · " + track.short;

    const pageHeads = {
      flashcards: { h1: "Flashcards · " + track.short, p: "Somente cartões de " + track.name + ". Leia a frente, responda em voz alta e vire." },
      questoes: { h1: "Questões · " + track.short, p: "Treino com correção apenas de " + track.name + ". Cada resposta vem com explicação." },
      simulado: { h1: "Simulado · " + track.short, p: "Somente " + track.name + ". Responda sem consulta e receba o mapa dos erros por módulo." },
      resumo: { h1: "Resumão · " + track.short, p: "Revisão de véspera de " + track.name + ": tabelas, classificações e pegadinhas." },
      glossario: { h1: "Glossário · " + track.short, p: "Termos de " + track.name + " explicados em linguagem direta." },
      materiais: { h1: "Materiais · " + track.short, p: "Referências para conferir o conteúdo de " + track.name + " e levar para a clínica." },
      plano: { h1: "Plano de " + track.short, p: "Caminho de estudo de " + track.name + " até a prova. Marque cada tarefa feita." }
    };
    Object.keys(pageHeads).forEach((view) => {
      const head = $("#view-" + view + " .page-head");
      if (!head) return;
      const h1 = head.querySelector("h1");
      const p = head.querySelector("p:not(.eyebrow)");
      if (h1) h1.textContent = pageHeads[view].h1;
      if (p) p.textContent = pageHeads[view].p;
    });

    const examCount = track.id === "integ" ? 30 : 20;
    const examMinutes = track.id === "integ" ? 45 : 30;
    const badge = $("#exam-setup .exam-badge");
    if (badge) badge.innerHTML = svg("i-clock") + " " + examMinutes + " minutos";
    const rules = $$("#exam-setup .exam-rules li span");
    if (rules[0]) {
      rules[0].parentElement.innerHTML = "<span>" + examCount + "</span> questões de " + esc(track.id === "integ" ? "todas as UCs" : track.short);
    }
    if (rules[1]) rules[1].textContent = examMinutes;
    const strategy = $("#exam-setup .tip-list");
    if (strategy) strategy.innerHTML = track.strategy.map((item) => "<li>" + esc(item) + "</li>").join("");

    const allowed = {
      perio: ["periodontia"],
      dent: ["dentistica"],
      prot: ["protese"],
      cir: ["cirurgia"],
      integ: ["mapa", "pegadinhas"]
    }[track.id] || [];
    let firstVisible = null;
    $$(".summary-tab").forEach((tab) => {
      const on = allowed.indexOf(tab.dataset.summaryTab) !== -1;
      tab.hidden = !on;
      if (on && !firstVisible) firstVisible = tab;
    });
    $$(".summary-panel").forEach((panel) => {
      panel.hidden = allowed.indexOf(panel.dataset.summaryPanel) === -1;
    });
    $$(".summary-tab").forEach((tab) => {
      tab.classList.toggle("active", tab === firstVisible);
      tab.setAttribute("aria-selected", tab === firstVisible ? "true" : "false");
    });
    $$(".summary-panel").forEach((panel) => {
      panel.classList.toggle("active", firstVisible && panel.dataset.summaryPanel === firstVisible.dataset.summaryTab);
    });

    const planCta = $("#modules-section .section-head .btn");
    if (planCta) planCta.innerHTML = "Ver plano de " + esc(track.short) + " " + svg("i-calendar");

    const planNote = $("#view-plano .summary-note p");
    if (planNote) {
      const notes = {
        perio: "Se o tempo apertar: PS/NIC, PSR, estágio/grau e manutenção. Depois, 20 questões e o simulado de Periodontia.",
        dent: "Se o tempo apertar: ICDAS, dentina úmida, camada híbrida e contração/fotoativação. Depois, 20 questões e o simulado de Dentística.",
        prot: "Se o tempo apertar: Kennedy/Applegate, componentes da PPR, RC/MIC e DVO. Depois, 20 questões e o simulado de Prótese.",
        cir: "Se o tempo apertar: doses anestésicas, sequência da exodontia, pós-operatório e complicações. Depois, 20 questões e o simulado de Cirurgia.",
        integ: "Se o tempo apertar: sequência do plano, periodontia antes da prótese, casos comentados e as 10 pegadinhas. Depois, o simulado misto."
      };
      planNote.textContent = notes[track.id] || planNote.textContent;
    }

    $$(".materials-group").forEach((group) => {
      let visible = 0;
      $$(".material-card[data-subject]", group).forEach((card) => {
        const on = track.id === "integ" || card.dataset.subject === track.id || card.dataset.subject === "geral";
        card.hidden = !on;
        if (on) visible += 1;
      });
      const count = group.querySelector(".materials-group-head span");
      if (count) count.textContent = visible + (visible === 1 ? " item" : " itens");
      group.hidden = visible === 0;
    });
  }

  /* --------------------------- navegação -------------------------- */

  const VIEWS = $$("[data-view-name]").map((section) => section.dataset.viewName);

  function navigate(view, lesson) {
    if (!selectedTrack()) {
      openSubjectGate();
      return;
    }
    if (VIEWS.indexOf(view) === -1) view = "inicio";
    const target = "#" + view + (lesson ? "/" + lesson : "");
    if (location.hash === target) {
      route();
    } else {
      location.hash = target;
    }
  }

  function route() {
    const raw = location.hash.replace(/^#/, "");
    const parts = raw.split("/");
    const view = VIEWS.indexOf(parts[0]) !== -1 ? parts[0] : "inicio";
    const lesson = parts[1] || null;
    if (!raw || VIEWS.indexOf(parts[0]) === -1) {
      history.replaceState(null, "", "#inicio");
    }
    showView(view);
    if (view === "aprender") {
      if (lesson) {
        openLesson(lesson);
      } else {
        showLessonEmpty();
      }
    }
  }

  function showView(view) {
    $$(".view").forEach((section) => {
      section.hidden = section.dataset.viewName !== view;
    });
    $$(".main-nav a").forEach((link) => {
      link.classList.toggle("active", link.dataset.view === view);
    });
    closeMenu();
    window.scrollTo(0, 0);
    if (view === "flashcards") {
      ensureDeck();
      renderCard();
    }
    if (view === "questoes") {
      renderQuizSetupMeta();
    }
    if (view === "simulado") {
      renderExamSetupMeta();
    }
    if (view === "materiais") {
      renderMaterials();
    }
    if (view === "glossario") {
      renderGlossary();
    }
    if (view === "plano") {
      renderPlan();
    }
    updateReadingProgress();
  }

  function closeMenu() {
    const nav = $("#main-nav");
    const btn = $("#btn-menu");
    if (nav) nav.classList.remove("open");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  /* ---------------------------- início ---------------------------- */

  function renderHomeModules() {
    const host = $("#home-modules");
    if (!host) return;
    host.innerHTML = visibleModules().map((mod) => {
      const done = mod.lessons.filter((lesson) => state.lessons[lesson.id]).length;
      const total = mod.lessons.length;
      const ratio = total ? done / total : 0;
      const circumference = 2 * Math.PI * 15;
      const offset = circumference * (1 - ratio);
      const percent = Math.round(ratio * 100);
      return (
        '<div class="module-card acc-' + esc(mod.accent) + '" role="button" tabindex="0" data-module="' + esc(mod.id) + '" aria-label="Abrir módulo: ' + esc(mod.title) + '">' +
          '<span class="module-icon">' + svg(mod.icon) + "</span>" +
          '<span class="module-body">' +
            "<h3>" + esc(mod.title) + "</h3>" +
            "<p>" + esc(mod.blurb) + "</p>" +
            '<span class="module-meta"><span>' + total + " aulas</span><span>" + (done === total ? "concluído" : done + "/" + total) + "</span></span>" +
          "</span>" +
          '<span class="module-progress" aria-hidden="true">' +
            '<svg viewBox="0 0 36 36"><circle class="bg" cx="18" cy="18" r="15"></circle>' +
            '<circle class="fg" cx="18" cy="18" r="15" stroke-dasharray="' + circumference.toFixed(2) + '" stroke-dashoffset="' + offset.toFixed(2) + '"></circle></svg>' +
            "<span>" + percent + "%</span>" +
          "</span>" +
        "</div>"
      );
    }).join("");
  }

  function renderStats() {
    const lessons = visibleLessons();
    const cards = cardsOfTrack();
    const questions = questionsOfTrack();
    const done = lessons.filter((entry) => state.lessons[entry.lesson.id]).length;
    const known = cards.filter((card) => state.cards[card.id] === "known").length;
    const stats = currentQuizStats();
    const answered = stats.answered;
    const correct = stats.correct;
    const accuracy = answered ? Math.round((correct / answered) * 100) : null;

    const set = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };
    const bar = (id, width) => {
      const el = document.getElementById(id);
      if (el) el.style.width = Math.max(0, Math.min(100, width)) + "%";
    };

    set("stat-lessons", done + "/" + lessons.length);
    set("stat-cards", known + "/" + cards.length);
    set("stat-questions", fmtInt(answered));
    set("stat-accuracy", accuracy === null ? "—" : accuracy + "%");
    bar("stat-lessons-bar", pct(done, lessons.length));
    bar("stat-cards-bar", pct(known, cards.length));
    bar("stat-questions-bar", pct(answered, questions.length || 1));
    bar("stat-accuracy-bar", accuracy === null ? 0 : accuracy);
  }

  function renderContinue() {
    const title = $("#continue-title");
    const desc = $("#continue-desc");
    const btn = $("#btn-continue");
    if (!title || !desc || !btn) return;
    let target = state.lastLesson ? lessonById(state.lastLesson) : null;
    if (target && state.track && target.module.track !== state.track) target = null;
    if (!target) {
      const list = visibleLessons();
      const entry = list.find((item) => !state.lessons[item.lesson.id]) || list[0];
      target = entry || null;
    }
    if (!target) {
      title.textContent = "Comece pela primeira aula";
      desc.textContent = "O conteúdo ainda está carregando. Recarregue a página.";
      return;
    }
    const lesson = target.lesson;
    const mod = target.module;
    if (state.lastLesson) {
      title.textContent = "Retomar: " + lesson.title;
      desc.textContent = mod.title + " · " + lesson.minutes + " min. " + stripHtml(lesson.intro);
      btn.innerHTML = "Retomar estudo " + svg("i-arrow");
    } else {
      title.textContent = "Comece pela primeira aula";
      desc.textContent = mod.title + ": " + stripHtml(lesson.intro);
      btn.innerHTML = "Começar agora " + svg("i-arrow");
    }
    btn.dataset.lesson = lesson.id;
    btn.hidden = false;
  }

  function renderHome() {
    renderHomeModules();
    renderStats();
    renderContinue();
  }

  /* --------------------------- aprender --------------------------- */

  function renderSidebar() {
    const host = $("#module-list");
    if (!host) return;
    host.innerHTML = visibleModules().map((mod, mi) => {
      const done = mod.lessons.filter((lesson) => state.lessons[lesson.id]).length;
      const isOpen = openModules.has(mod.id);
      const links = mod.lessons.map((lesson) => {
        const isActive = activeLesson && activeLesson.lesson.id === lesson.id;
        return (
          '<button class="lesson-link' + (state.lessons[lesson.id] ? " done" : "") + (isActive ? " active" : "") + '" data-lesson="' + esc(lesson.id) + '">' +
            '<span class="lesson-dot" aria-hidden="true"></span>' +
            "<span>" + esc(lesson.title) + "</span>" +
          "</button>"
        );
      }).join("");
      return (
        '<div class="module-group acc-' + esc(mod.accent) + (isOpen ? " open" : "") + '" data-module-group="' + esc(mod.id) + '">' +
          '<button class="module-toggle" data-toggle-module="' + esc(mod.id) + '" aria-expanded="' + (isOpen ? "true" : "false") + '">' +
            '<span class="m-ico">' + svg(mod.icon) + "</span>" +
            '<span class="m-title">' + (mi + 1) + ". " + esc(mod.short) + "</span>" +
            '<span class="m-count">' + done + "/" + mod.lessons.length + "</span>" +
            '<svg class="chev" aria-hidden="true"><use href="#i-chevron"></use></svg>' +
          "</button>" +
          '<div class="lesson-links">' + links + "</div>" +
        "</div>"
      );
    }).join("");

    const list = visibleLessons();
    const doneCount = list.filter((entry) => state.lessons[entry.lesson.id]).length;
    const label = $("#sidebar-progress-label");
    const bar = $("#sidebar-progress-bar");
    if (label) label.textContent = doneCount + " de " + list.length + " aulas";
    if (bar) bar.style.width = pct(doneCount, list.length) + "%";
  }

  function showLessonEmpty() {
    activeLesson = null;
    const empty = $("#lesson-empty");
    const article = $("#lesson-article");
    if (empty) empty.hidden = false;
    if (article) article.hidden = true;
    renderSidebar();
  }

  function setCompleteButton() {
    const btn = $("#btn-complete-lesson");
    if (!btn || !activeLesson) return;
    const done = !!state.lessons[activeLesson.lesson.id];
    btn.classList.toggle("is-done", done);
    btn.innerHTML = svg("i-check") + (done ? " Concluída" : " Marcar como concluída");
    btn.setAttribute("aria-pressed", done ? "true" : "false");
  }

  function openLesson(id) {
    const entry = lessonById(id);
    if (!entry) {
      showLessonEmpty();
      return;
    }
    if (state.track && entry.module.track !== state.track) {
      showLessonEmpty();
      toast("Essa aula é de outra matéria. Troque de matéria no topo.");
      return;
    }
    activeLesson = entry;
    state.lastLesson = id;
    openModules.add(entry.module.id);
    saveState();

    const empty = $("#lesson-empty");
    const article = $("#lesson-article");
    if (empty) empty.hidden = true;
    if (article) article.hidden = false;

    const pill = $("#lesson-module-pill");
    if (pill) pill.textContent = "Módulo " + moduleNumberInTrack(entry.module.id) + " · " + entry.module.short;
    const minutes = $("#lesson-minutes");
    if (minutes) minutes.textContent = entry.lesson.minutes;
    const title = $("#lesson-title");
    if (title) title.textContent = entry.lesson.title;
    const intro = $("#lesson-intro");
    if (intro) intro.textContent = stripHtml(entry.lesson.intro);
    const content = $("#lesson-content");
    if (content) content.innerHTML = entry.lesson.content;

    setCompleteButton();
    renderSidebar();

    const trackLessons = visibleLessons();
    const trackIndex = trackLessons.findIndex((item) => item.lesson.id === id);
    const position = $("#lesson-position");
    if (position) {
      position.textContent = "Aula " + (trackIndex + 1) + " de " + trackLessons.length + " · Módulo " + moduleNumberInTrack(entry.module.id) + " de " + visibleModules().length;
    }

    const prev = $("#btn-prev-lesson");
    const next = $("#btn-next-lesson");
    if (prev) prev.disabled = trackIndex <= 0;
    if (next) next.disabled = trackIndex >= trackLessons.length - 1;
  }

  function toggleLessonDone() {
    if (!activeLesson) return;
    const id = activeLesson.lesson.id;
    if (state.lessons[id]) {
      delete state.lessons[id];
      toast("Aula marcada como não concluída.");
    } else {
      state.lessons[id] = true;
      toast("Aula concluída. Bom avanço!");
    }
    saveState();
    setCompleteButton();
    renderSidebar();
    renderHome();
  }

  /* -------------------------- flashcards -------------------------- */

  function ensureDeck() {
    if (!deck.length || $("#cards-order").value === "review") {
      buildDeck();
    }
  }

  function buildDeck() {
    const moduleSel = $("#cards-module");
    const orderSel = $("#cards-order");
    const moduleId = moduleSel ? moduleSel.value : "all";
    const order = orderSel ? orderSel.value : "default";
    let list = CARDS.filter((card) => (!state.track || (moduleOf(card.module) && moduleOf(card.module).track === state.track)) && (moduleId === "all" || card.module === moduleId));
    if (order === "review") list = list.filter((card) => state.cards[card.id] === "review");
    if (order === "shuffle") list = shuffle(list);
    deck = list;
    if (deckIndex >= deck.length) deckIndex = 0;
    renderCard();
  }

  function renderCard() {
    const counter = $("#card-counter");
    const moduleLabelEl = $("#card-module-label");
    const front = $("#card-front");
    const back = $("#card-back");
    const flip = $("#flashcard");
    const reviewBtn = $("#btn-card-review");
    const knownBtn = $("#btn-card-known");
    if (!front || !back) return;

    if (!deck.length) {
      if (counter) counter.textContent = "Nenhum cartão neste filtro";
      if (moduleLabelEl) moduleLabelEl.textContent = "";
      front.textContent = "Nada por aqui.";
      back.textContent = "Troque o módulo ou a ordem, ou reinicie o baralho para voltar a ver todos os cartões.";
      if (flip) flip.classList.remove("flipped");
      if (reviewBtn) reviewBtn.disabled = true;
      if (knownBtn) knownBtn.disabled = true;
      updateDeckStats();
      return;
    }

    if (reviewBtn) reviewBtn.disabled = false;
    if (knownBtn) knownBtn.disabled = false;
    if (deckIndex >= deck.length) deckIndex = 0;
    const card = deck[deckIndex];
    const mod = moduleOf(card.module);
    if (counter) counter.textContent = "Cartão " + (deckIndex + 1) + " de " + deck.length;
    if (moduleLabelEl) moduleLabelEl.textContent = mod ? mod.title : "";
    front.textContent = card.front;
    back.textContent = card.back;
    if (flip) {
      flip.classList.remove("flipped");
      flip.setAttribute("aria-pressed", "false");
    }
    updateDeckStats();
  }

  function advanceCard() {
    if (!deck.length) return;
    deckIndex = (deckIndex + 1) % deck.length;
    renderCard();
  }

  function markCard(status) {
    if (!deck.length) return;
    const card = deck[deckIndex];
    state.cards[card.id] = status;
    saveState();
    if ($("#cards-order").value === "review") {
      const shouldAdvance = status === "review" && deck.length > 1;
      const nextIndex = shouldAdvance ? (deckIndex + 1) % deck.length : deckIndex;
      buildDeck();
      if (shouldAdvance && deck.length > 1) {
        deckIndex = nextIndex % deck.length;
        renderCard();
      }
    } else {
      advanceCard();
    }
    updateDeckStats();
  }

  function updateDeckStats() {
    const cards = cardsOfTrack();
    const known = cards.filter((card) => state.cards[card.id] === "known").length;
    const review = cards.filter((card) => state.cards[card.id] === "review").length;
    const unseen = cards.length - known - review;
    const set = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };
    set("deck-known", known);
    set("deck-review", review);
    set("deck-unseen", unseen);
    const bar = $("#deck-bar");
    if (bar) bar.style.width = pct(known, cards.length) + "%";
    const note = $("#deck-note");
    if (note) {
      if (known === cards.length && cards.length) {
        note.textContent = "Baralho dominado. Agora revise pelo simulado para manter o conteúdo fresco.";
      } else if (review > 0) {
        note.textContent = "Você tem " + review + " cartão(ões) marcado(s) para revisar. Use a ordem “Só os que preciso revisar”.";
      } else if (known > 0) {
        note.textContent = "Bom ritmo. Faltam " + unseen + " cartões novos para percorrer o baralho inteiro.";
      } else {
        note.textContent = "Comece pelos cartões do módulo que você acabou de estudar.";
      }
    }
  }

  function resetDeck() {
    if (!window.confirm("Reiniciar todo o progresso dos flashcards?")) return;
    state.cards = {};
    saveState();
    buildDeck();
    updateDeckStats();
    renderStats();
    toast("Baralho reiniciado.");
  }

  function openCard(id) {
    const card = CARD_BY_ID[id];
    if (!card) return;
    $("#cards-module").value = card.module;
    $("#cards-order").value = "default";
    deckIndex = 0;
    buildDeck();
    const found = deck.findIndex((item) => item.id === id);
    if (found >= 0) deckIndex = found;
    renderCard();
    navigate("flashcards");
  }

  /* ---------------------------- questões -------------------------- */

  function populateSelects() {
    const mods = visibleModules();
    const options = mods.map((mod, i) => '<option value="' + esc(mod.id) + '">' + (i + 1) + ". " + esc(mod.short) + "</option>").join("");
    ["cards-module", "quiz-module"].forEach((id) => {
      const select = document.getElementById(id);
      if (select) select.innerHTML = '<option value="all">Todos os módulos</option>' + options;
    });
  }

  function filteredQuestions(moduleId, level) {
    return QUESTIONS.filter((q) => (!state.track || (moduleOf(q.module) && moduleOf(q.module).track === state.track)) && (moduleId === "all" || q.module === moduleId) && (level === "all" || q.level === level));
  }

  function startQuiz() {
    const moduleId = $("#quiz-module").value;
    const level = $("#quiz-level").value;
    const countValue = $("#quiz-count").value;
    let list = filteredQuestions(moduleId, level);
    if (!list.length) {
      toast("Não há questões com esses filtros.");
      return;
    }
    list = shuffle(list).map(withShuffledOptions);
    if (countValue !== "all") list = list.slice(0, parseInt(countValue, 10) || 10);
    quiz = {
      list: list,
      index: 0,
      answers: [],
      selected: null,
      answered: false,
      score: 0
    };
    quizReviewMode = "all";
    $("#quiz-setup").hidden = true;
    $("#quiz-game").hidden = false;
    $("#quiz-results").hidden = true;
    renderQuizQuestion();
    window.scrollTo(0, 0);
  }

  function renderQuizQuestion() {
    const q = quiz.list[quiz.index];
    const mod = moduleOf(q.module);
    const progressLabel = $("#quiz-progress-label");
    const scoreLabel = $("#quiz-score-label");
    const bar = $("#quiz-progress-bar");
    if (progressLabel) progressLabel.textContent = "Questão " + (quiz.index + 1) + " de " + quiz.list.length;
    if (scoreLabel) scoreLabel.textContent = quiz.score + (quiz.score === 1 ? " acerto" : " acertos");
    if (bar) bar.style.width = ((quiz.index / quiz.list.length) * 100).toFixed(2) + "%";
    $("#quiz-q-module").textContent = "Módulo " + moduleNumberInTrack(q.module) + " · " + (mod ? mod.short : "");
    $("#quiz-q-level").textContent = LEVEL_LABEL[q.level] || q.level;
    $("#quiz-question").textContent = q.prompt;
    const optionsHost = $("#quiz-options");
    optionsHost.innerHTML = q.options.map((option, i) =>
      '<button class="option" data-option="' + i + '" aria-pressed="false"><span class="letter">' + LETTERS[i] + "</span><span>" + esc(option) + "</span></button>"
    ).join("");
    const feedback = $("#quiz-feedback");
    feedback.hidden = true;
    feedback.className = "feedback";
    feedback.innerHTML = "";
    $("#btn-confirm-quiz").hidden = false;
    $("#btn-confirm-quiz").disabled = true;
    $("#btn-next-quiz").hidden = true;
    quiz.selected = null;
    quiz.answered = false;
  }

  function selectQuizOption(index) {
    if (!quiz || quiz.answered) return;
    quiz.selected = index;
    $$("#quiz-options .option").forEach((btn, i) => {
      btn.classList.toggle("selected", i === index);
      btn.setAttribute("aria-pressed", i === index ? "true" : "false");
    });
    $("#btn-confirm-quiz").disabled = false;
  }

  function confirmQuizAnswer() {
    if (!quiz || quiz.answered || quiz.selected === null) return;
    const q = quiz.list[quiz.index];
    const correct = quiz.selected === q.answer;
    quiz.answered = true;
    quiz.answers[quiz.index] = { selected: quiz.selected, correct: correct };
    if (correct) quiz.score += 1;

    state.quizStats.answered += 1;
    if (correct) state.quizStats.correct += 1;
    if (state.track) {
      const ts = state.trackStats[state.track] || { answered: 0, correct: 0 };
      ts.answered += 1;
      if (correct) ts.correct += 1;
      state.trackStats[state.track] = ts;
    }
    saveState();

    $$("#quiz-options .option").forEach((btn, i) => {
      btn.classList.add("disabled");
      btn.classList.remove("selected");
      if (i === q.answer) btn.classList.add("correct");
      if (i === quiz.selected && !correct) btn.classList.add("wrong");
      btn.disabled = true;
    });

    const feedback = $("#quiz-feedback");
    feedback.hidden = false;
    feedback.className = "feedback " + (correct ? "ok" : "no");
    feedback.innerHTML =
      "<strong>" + (correct ? "Resposta correta." : "Não foi essa.") + "</strong>" +
      "<p>" + (correct ? "" : "A resposta correta é <strong>" + LETTERS[q.answer] + ") " + esc(q.options[q.answer]) + "</strong>. ") + esc(q.explanation) + "</p>";

    $("#btn-confirm-quiz").hidden = true;
    const nextBtn = $("#btn-next-quiz");
    nextBtn.hidden = false;
    nextBtn.innerHTML = (quiz.index === quiz.list.length - 1 ? "Ver resultado" : "Próxima") + " " + svg("i-arrow");
    $("#quiz-score-label").textContent = quiz.score + (quiz.score === 1 ? " acerto" : " acertos");
    updateQuizProgress();
    renderStats();
  }

  function updateQuizProgress() {
    const bar = $("#quiz-progress-bar");
    if (bar) bar.style.width = (((quiz.index + 1) / quiz.list.length) * 100).toFixed(2) + "%";
    const label = $("#quiz-progress-label");
    if (label) label.textContent = "Questão " + (quiz.index + 1) + " de " + quiz.list.length;
  }

  function nextQuizQuestion() {
    if (!quiz) return;
    if (quiz.index === quiz.list.length - 1) {
      finishQuiz();
      return;
    }
    quiz.index += 1;
    renderQuizQuestion();
  }

  function finishQuiz() {
    if (!quiz) return;
    $("#quiz-game").hidden = true;
    $("#quiz-setup").hidden = true;
    $("#quiz-results").hidden = false;

    const total = quiz.list.length;
    const score = quiz.score;
    const percent = pct(score, total);
    $("#quiz-result-score").textContent = score;
    $("#quiz-result-total").textContent = "/ " + total;
    $("#quiz-result-title").textContent = percent >= 90 ? "Excelente!" : percent >= 75 ? "Muito bem!" : percent >= 60 ? "No caminho." : "Hora de revisar.";
    $("#quiz-result-message").textContent =
      "Você acertou " + score + " de " + total + " (" + percent + "%). " +
      (percent >= 75 ? "Mantenha o ritmo e faça o simulado cronometrado." : percent >= 60 ? "Revise os erros abaixo antes de tentar de novo." : "Volte às aulas dos módulos com mais erros e refaça o treino.");

    quizReviewMode = "all";
    $("#btn-quiz-errors").textContent = "Revisar erros";
    renderBreakdown($("#quiz-breakdown"), quiz.list, quiz.answers.map((answer) => answer || null));
    renderQuizReview();
    renderQuizHistory();
    renderQuizSetupMeta();

    const moduleId = $("#quiz-module").value;
    const label = moduleId === "all" ? "Treino " + (selectedTrack() ? selectedTrack().short : "misto") : moduleLabel(moduleId);
    state.quizHistory.unshift({ date: Date.now(), score: score, total: total, label: label, track: state.track });
    state.quizHistory = state.quizHistory.slice(0, 8);
    saveState();
    renderQuizHistory();
    renderStats();
    window.scrollTo(0, 0);
  }

  function renderQuizReview() {
    const host = $("#quiz-review");
    if (!host) return;
    let entries = quiz.list.map((q, i) => ({ q: q, a: quiz.answers[i] || null }));
    if (quizReviewMode === "errors") {
      entries = entries.filter((entry) => !entry.a || entry.a.selected !== entry.q.answer);
    }
    if (!entries.length) {
      host.innerHTML = '<p class="empty-state">Nenhum erro neste treino. Muito bem!</p>';
      return;
    }
    host.innerHTML = entries.map((entry) => reviewItem(entry.q, entry.a ? entry.a.selected : null)).join("");
  }

  function reviewItem(q, selected) {
    const ok = selected === q.answer;
    const mod = moduleOf(q.module);
    const mi = mod ? moduleNumberInTrack(mod.id) : 0;
    const your = selected === null || typeof selected === "undefined"
      ? "Em branco"
      : LETTERS[selected] + ") " + q.options[selected];
    return (
      '<article class="review-item ' + (ok ? "ok" : "no") + '">' +
        '<p class="review-origin">Módulo ' + mi + " · " + esc(mod ? mod.short : "") + " · " + esc(LEVEL_LABEL[q.level] || q.level) + "</p>" +
        '<p class="review-q">' + esc(q.prompt) + "</p>" +
        '<p class="review-answer"><strong>Correta:</strong> ' + LETTERS[q.answer] + ") " + esc(q.options[q.answer]) +
          (ok ? "" : "<br><strong>Sua resposta:</strong> " + esc(your)) + "</p>" +
        '<p class="review-expl">' + esc(q.explanation) + "</p>" +
      "</article>"
    );
  }

  function renderBreakdown(host, questions, answers) {
    if (!host) return;
    const groups = {};
    questions.forEach((q, i) => {
      if (!groups[q.module]) groups[q.module] = { total: 0, correct: 0 };
      groups[q.module].total += 1;
      const answer = answers[i];
      if (answer && answer.selected === q.answer) groups[q.module].correct += 1;
    });
    host.innerHTML = Object.keys(groups).map((moduleId) => {
      const group = groups[moduleId];
      const mod = moduleOf(moduleId);
      const ratio = pct(group.correct, group.total);
      return (
        '<div class="breakdown-item' + (ratio < 60 ? " low" : "") + '">' +
          '<div class="bd-head"><span>' + esc(mod ? mod.short : moduleId) + "</span><span>" + group.correct + "/" + group.total + "</span></div>" +
          '<div class="bd-bar"><i style="width:' + ratio + '%"></i></div>' +
        "</div>"
      );
    }).join("");
  }

  function renderQuizSetupMeta() {
    const stats = currentQuizStats();
    const answered = stats.answered;
    const correct = stats.correct;
    const accuracy = answered ? Math.round((correct / answered) * 100) : null;
    const accuracyEl = $("#quiz-overall-accuracy");
    if (accuracyEl) accuracyEl.textContent = accuracy === null ? "—" : accuracy + "%";
    const countEl = $("#quiz-overall-count");
    if (countEl) countEl.textContent = answered + " questão(ões) respondida(s)";
    renderQuizHistory();
  }

  function renderQuizHistory() {
    const host = $("#quiz-history");
    if (!host) return;
    const history = state.quizHistory.filter((item) => item.track === state.track);
    if (!history.length) {
      host.innerHTML = '<li class="empty-history">Nenhum treino ainda.</li>';
      return;
    }
    host.innerHTML = history.slice(0, 6).map((item) =>
      "<li><span>" + esc(item.label || "Treino") + " · " + dateLabel(item.date) + '</span><span class="h-score">' + item.score + "/" + item.total + "</span></li>"
    ).join("");
  }

  function quitQuiz() {
    quiz = null;
    $("#quiz-game").hidden = true;
    $("#quiz-results").hidden = true;
    $("#quiz-setup").hidden = false;
    renderQuizSetupMeta();
    window.scrollTo(0, 0);
  }

  /* ---------------------------- simulado -------------------------- */

  function startExam() {
    const pool = questionsOfTrack();
    if (!pool.length) {
      toast("Banco de questões indisponível.");
      return;
    }
    if (exam && exam.timer) clearInterval(exam.timer);
    const minutes = state.track === "integ" ? 45 : 30;
    const total = Math.min(state.track === "integ" ? 30 : 20, pool.length);
    exam = {
      list: shuffle(pool).slice(0, total).map(withShuffledOptions),
      answers: new Array(total).fill(null),
      marked: new Set(),
      index: 0,
      timer: null,
      finished: false,
      minutes: minutes
    };
    examRemaining = minutes * 60;
    $("#exam-setup").hidden = true;
    $("#exam-results").hidden = true;
    $("#exam-game").hidden = false;
    renderExamQuestion();
    updateExamTimer();
    exam.timer = setInterval(() => {
      examRemaining -= 1;
      updateExamTimer();
      if (examRemaining <= 0) {
        finishExam(true);
      }
    }, 1000);
    window.scrollTo(0, 0);
  }

  function updateExamTimer() {
    const strong = $("#exam-timer strong");
    if (!strong) return;
    const seconds = Math.max(0, examRemaining);
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    strong.textContent = String(minutes).padStart(2, "0") + ":" + String(rest).padStart(2, "0");
  }

  function renderExamQuestion() {
    const q = exam.list[exam.index];
    const mod = moduleOf(q.module);
    $("#exam-q-module").textContent = "Módulo " + moduleNumberInTrack(q.module) + " · " + (mod ? mod.short : "");
    $("#exam-q-level").textContent = LEVEL_LABEL[q.level] || q.level;
    $("#exam-question").textContent = q.prompt;
    $("#exam-options").innerHTML = q.options.map((option, i) =>
      '<button class="option' + (exam.answers[exam.index] === i ? " selected" : "") + '" data-option="' + i + '" aria-pressed="' + (exam.answers[exam.index] === i ? "true" : "false") + '">' +
        '<span class="letter">' + LETTERS[i] + "</span><span>" + esc(option) + "</span>" +
      "</button>"
    ).join("");
    $("#btn-exam-prev").disabled = exam.index === 0;
    $("#btn-exam-next").disabled = exam.index === exam.list.length - 1;
    const markBtn = $("#btn-exam-mark");
    const isMarked = exam.marked.has(exam.index);
    markBtn.textContent = isMarked ? "Desmarcar" : "Marcar para revisar";
    markBtn.classList.toggle("btn-ghost", true);
    updateExamProgress();
    renderExamPalette();
  }

  function selectExamOption(index) {
    if (!exam || exam.finished) return;
    exam.answers[exam.index] = index;
    $$("#exam-options .option").forEach((btn, i) => {
      btn.classList.toggle("selected", i === index);
      btn.setAttribute("aria-pressed", i === index ? "true" : "false");
    });
    updateExamProgress();
    renderExamPalette();
  }

  function updateExamProgress() {
    if (!exam) return;
    const answered = exam.answers.filter((answer) => answer !== null).length;
    $("#exam-progress-label").textContent = answered + " de " + exam.list.length + " respondidas";
  }

  function renderExamPalette() {
    const host = $("#exam-palette");
    if (!host || !exam) return;
    host.innerHTML = exam.list.map((q, i) =>
      '<button class="' + (exam.answers[i] !== null ? "answered " : "") + (exam.marked.has(i) ? "marked " : "") + (i === exam.index ? "current" : "") +
      '" data-palette="' + i + '" aria-label="Questão ' + (i + 1) + (exam.answers[i] !== null ? ", respondida" : ", em branco") + '">' + (i + 1) + "</button>"
    ).join("");
  }

  function goExamQuestion(index) {
    if (!exam || index < 0 || index >= exam.list.length) return;
    exam.index = index;
    renderExamQuestion();
  }

  function toggleExamMark() {
    if (!exam) return;
    if (exam.marked.has(exam.index)) {
      exam.marked.delete(exam.index);
    } else {
      exam.marked.add(exam.index);
    }
    renderExamQuestion();
  }

  function finishExam(auto) {
    if (!exam || exam.finished) return;
    const blanks = exam.answers.filter((answer) => answer === null).length;
    if (!auto && blanks > 0) {
      if (!window.confirm("Você deixou " + blanks + " questão(ões) em branco. Entregar assim mesmo?")) return;
    }
    exam.finished = true;
    if (exam.timer) {
      clearInterval(exam.timer);
      exam.timer = null;
    }

    let score = 0;
    exam.answers.forEach((answer, i) => {
      if (answer !== null && answer === exam.list[i].answer) score += 1;
    });
    const total = exam.list.length;
    const percent = pct(score, total);
    const answered = total - blanks;

    state.quizStats.answered += answered;
    state.quizStats.correct += score;
    if (state.track) {
      const ts = state.trackStats[state.track] || { answered: 0, correct: 0 };
      ts.answered += answered;
      ts.correct += score;
      state.trackStats[state.track] = ts;
    }
    state.examHistory.unshift({
      date: Date.now(),
      score: score,
      total: total,
      track: state.track,
      seconds: (exam.minutes || 45) * 60 - Math.max(0, examRemaining)
    });
    state.examHistory = state.examHistory.slice(0, 8);
    saveState();

    $("#exam-game").hidden = true;
    $("#exam-setup").hidden = true;
    $("#exam-results").hidden = false;
    $("#exam-result-score").textContent = score;
    $("#exam-result-total").textContent = "/ " + total;
    $("#exam-result-title").textContent = percent >= 90 ? "Pronto para a prova!" : percent >= 75 ? "Bom resultado." : percent >= 60 ? "Dá para melhorar." : "Ainda precisa revisar.";
    $("#exam-result-message").textContent =
      "Você acertou " + score + " de " + total + " (" + percent + "%) em " + (auto ? (exam.minutes || 45) + " minutos" : "tempo livre") + ". " +
      (percent >= 75 ? "Mantenha a revisão dos erros e durma bem antes da prova." : "Volte aos módulos com pior desempenho, releia as aulas e refaça o simulado.");

    renderBreakdown($("#exam-breakdown"), exam.list, exam.answers.map((answer) => ({ selected: answer })));
    $("#exam-review").innerHTML = exam.list.map((q, i) => reviewItem(q, exam.answers[i])).join("");
    renderExamSetupMeta();
    renderStats();
    if (auto) toast("Tempo encerrado. Simulado entregue automaticamente.");
    window.scrollTo(0, 0);
  }

  function renderExamSetupMeta() {
    const host = $("#exam-history");
    const history = state.examHistory.filter((item) => item.track === state.track);
    if (host) {
      if (!history.length) {
        host.innerHTML = '<li class="empty-history">Nenhum simulado ainda.</li>';
      } else {
        host.innerHTML = history.slice(0, 6).map((item) =>
          "<li><span>Simulado · " + dateLabel(item.date) + '</span><span class="h-score">' + item.score + "/" + item.total + "</span></li>"
        ).join("");
      }
    }
    const bestEl = $("#exam-best");
    if (bestEl) {
      if (!history.length) {
        bestEl.textContent = "Melhor resultado: —";
      } else {
        const best = history.reduce((acc, item) => (item.score / item.total > acc.score / acc.total ? item : acc), history[0]);
        bestEl.textContent = "Melhor resultado: " + best.score + "/" + best.total + " (" + pct(best.score, best.total) + "%)";
      }
    }
  }

  function retryExam() {
    if (exam && exam.timer) clearInterval(exam.timer);
    exam = null;
    $("#exam-results").hidden = true;
    $("#exam-game").hidden = true;
    $("#exam-setup").hidden = false;
    renderExamSetupMeta();
    window.scrollTo(0, 0);
  }

  /* --------------------------- materiais -------------------------- */

  function renderMaterials() {
    const host = $("#materials-list");
    if (!host) return;
    if (!MATERIALS.length) {
      host.innerHTML = '<p class="empty-state">Os materiais ainda não foram carregados.</p>';
      return;
    }

    const groups = [];
    MATERIALS.forEach((item) => {
      let group = groups.find((entry) => entry.name === item.group);
      if (!group) {
        group = { name: item.group, items: [] };
        groups.push(group);
      }
      group.items.push(item);
    });

    host.innerHTML = groups.map((group) => (
      '<section class="materials-group">' +
        '<div class="materials-group-head">' +
          "<h2>" + esc(group.name) + "</h2>" +
          "<span>" + group.items.length + (group.items.length === 1 ? " arquivo" : " arquivos") + "</span>" +
        "</div>" +
        '<div class="materials-grid">' +
          group.items.map((item) => (
            '<a class="material-card" href="' + esc(encodeURI(item.file)) + '" target="_blank" rel="noopener">' +
              '<span class="material-kind">' + esc(item.kind) + "</span>" +
              '<span class="material-copy"><strong>' + esc(item.title) + "</strong><span>" + esc(item.note) + "</span></span>" +
              '<span class="material-open" aria-hidden="true">' + svg("i-arrow") + "</span>" +
            "</a>"
          )).join("") +
        "</div>" +
      "</section>"
    )).join("");
  }

  /* --------------------------- glossário -------------------------- */

  function renderGlossary() {
    const listHost = $("#glossary-list");
    const lettersHost = $("#glossary-letters");
    const empty = $("#glossary-empty");
    if (!listHost) return;

    const terms = glossaryOfTrack();
    const letters = Array.from(new Set(terms.map((item) => normalize(item.term).charAt(0).toUpperCase()).filter(Boolean))).sort();
    if (lettersHost) {
      lettersHost.innerHTML = letters.map((letter) =>
        '<button data-letter="' + esc(letter) + '" class="' + (glossaryLetter === letter ? "active" : "") + '">' + esc(letter) + "</button>"
      ).join("");
    }

    const query = normalize(glossaryQuery);
    const filtered = terms.filter((item) => {
      const matchesQuery = !query || normalize(item.term + " " + item.definition).indexOf(query) !== -1;
      const matchesLetter = !glossaryLetter || normalize(item.term).charAt(0).toUpperCase() === glossaryLetter;
      return matchesQuery && matchesLetter;
    }).sort((a, b) => a.term.localeCompare(b.term, "pt-BR"));

    listHost.innerHTML = filtered.map((item) => {
      const mod = moduleOf(item.module);
      return (
        '<article class="glossary-item">' +
          "<h3>" + esc(item.term) + "</h3>" +
          "<p>" + esc(item.definition) + "</p>" +
          '<span class="g-module">' + esc(mod ? mod.title : "Geral") + "</span>" +
        "</article>"
      );
    }).join("");
    if (empty) empty.hidden = filtered.length > 0;
  }

  /* ----------------------------- plano ---------------------------- */

  function renderPlan() {
    const host = $("#plan-list");
    if (!host) return;
    const plan = planOfTrack();
    let total = 0;
    let done = 0;
    host.innerHTML = plan.map((day, index) => {
      const dayDone = day.tasks.filter((task) => state.plan[task.id]).length;
      total += day.tasks.length;
      done += dayDone;
      const tasks = day.tasks.map((task) => {
        const checked = !!state.plan[task.id];
        return (
          '<label class="plan-task">' +
            '<input type="checkbox" data-plan-task="' + esc(task.id) + '"' + (checked ? " checked" : "") + ">" +
            '<span class="plan-check">' + svg("i-check") + "</span>" +
            "<span>" + esc(task.text) +
              ' <span class="p-link" data-plan-view="' + esc(task.view) + '" data-plan-lesson="' + esc(task.lesson || "") + '">abrir</span>' +
            "</span>" +
          "</label>"
        );
      }).join("");
      return (
        '<article class="plan-day">' +
          '<div class="plan-day-head">' +
            '<span class="plan-day-num">' + (index + 1) + "</span>" +
            "<div><h2>" + esc(day.day) + " · " + esc(day.date) + " — " + esc(day.title) + "</h2><p>" + esc(day.focus) + "</p></div>" +
            '<span class="plan-day-progress">' + dayDone + "/" + day.tasks.length + "</span>" +
          "</div>" +
          '<div class="plan-tasks">' + tasks + "</div>" +
        "</article>"
      );
    }).join("");
    const progress = $("#plan-progress");
    if (progress) progress.textContent = pct(done, total) + "%";
    const progressBar = $("#plan-progress-bar");
    if (progressBar) progressBar.style.width = pct(done, total) + "%";
  }

  /* ----------------------------- busca ---------------------------- */

  function buildSearchIndex() {
    const index = [];
    visibleLessons().forEach((entry) => {
      index.push({
        kind: "Aula",
        id: entry.lesson.id,
        title: entry.lesson.title,
        text: entry.module.title + " " + stripHtml(entry.lesson.intro) + " " + stripHtml(entry.lesson.content)
      });
    });
    glossaryOfTrack().forEach((item) => {
      index.push({ kind: "Glossário", id: item.term, title: item.term, text: item.definition });
    });
    cardsOfTrack().forEach((card) => {
      index.push({ kind: "Flashcard", id: card.id, title: card.front, text: card.back + " " + moduleLabel(card.module) });
    });
    return index;
  }

  function renderSearch(query) {
    const host = $("#search-results");
    if (!host) return;
    const term = normalize(query.trim());
    if (term.length < 2) {
      host.innerHTML = '<p class="search-hint">Digite pelo menos 2 letras. Ex.: “estágio”, “adesão”, “Kennedy”, “alveolite”.</p>';
      return;
    }
    const matches = [];
    buildSearchIndex().forEach((item) => {
      const haystack = normalize(item.title + " " + item.text);
      const position = haystack.indexOf(term);
      if (position !== -1) {
        const text = item.text.replace(/\s+/g, " ").trim();
        const start = Math.max(0, position - 40);
        matches.push({
          kind: item.kind,
          id: item.id,
          title: item.title,
          snippet: (start > 0 ? "…" : "") + text.slice(start, start + 150) + (text.length > start + 150 ? "…" : ""),
          position: position
        });
      }
    });
    matches.sort((a, b) => a.position - b.position);
    if (!matches.length) {
      host.innerHTML = '<p class="search-hint">Nada encontrado. Tente outra palavra ou um termo mais curto.</p>';
      return;
    }
    host.innerHTML = matches.slice(0, 14).map((item) =>
      '<button class="search-result" data-result-kind="' + esc(item.kind) + '" data-result-id="' + esc(item.id) + '">' +
        '<span class="sr-kind">' + esc(item.kind) + "</span>" +
        '<p class="sr-title">' + esc(item.title) + "</p>" +
        '<p class="sr-snippet">' + esc(item.snippet) + "</p>" +
      "</button>"
    ).join("");
  }

  function openSearch() {
    const dialog = $("#search-dialog");
    if (!dialog) return;
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    setTimeout(() => {
      const input = $("#search-input");
      if (input) input.focus();
    }, 40);
  }

  function closeSearch() {
    const dialog = $("#search-dialog");
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  function handleSearchResult(kind, id) {
    closeSearch();
    if (kind === "Aula") {
      navigate("aprender", id);
    } else if (kind === "Flashcard") {
      openCard(id);
    } else if (kind === "Glossário") {
      glossaryQuery = id;
      glossaryLetter = "";
      $("#glossary-search").value = id;
      navigate("glossario");
      renderGlossary();
    }
  }

  /* --------------------------- contagem --------------------------- */

  function updateCountdown() {
    const target = new Date(state.examDate).getTime();
    const daysEl = $("#cd-days");
    const hoursEl = $("#cd-hours");
    const minEl = $("#cd-min");
    const secEl = $("#cd-sec");
    const note = $("#countdown-note");
    if (!daysEl) return;
    if (!isFinite(target)) {
      [daysEl, hoursEl, minEl, secEl].forEach((el) => { if (el) el.textContent = "—"; });
      if (note) note.textContent = "A data da prova ainda não foi publicada na uLife. Use “ajustar” para registrá-la.";
      return;
    }
    const diff = target - Date.now();
    const safe = Math.max(0, diff);
    const days = Math.floor(safe / 86400000);
    const hours = Math.floor((safe % 86400000) / 3600000);
    const minutes = Math.floor((safe % 3600000) / 60000);
    const seconds = Math.floor((safe % 60000) / 1000);
    daysEl.textContent = String(days);
    hoursEl.textContent = String(hours).padStart(2, "0");
    minEl.textContent = String(minutes).padStart(2, "0");
    secEl.textContent = String(seconds).padStart(2, "0");
    if (note) {
      if (diff <= 0) {
        note.textContent = "A data marcada já passou. Ajuste para acompanhar a contagem da próxima prova.";
      } else if (days === 0) {
        note.textContent = "É hoje. Revise o Resumão e os flashcards marcados para revisar. Nada de assunto novo.";
      } else if (days <= 2) {
        note.textContent = "Reta final: revise o resumão, os flashcards marcados e faça o simulado da matéria.";
      } else {
        note.textContent = "Plano sugerido: 3 blocos de estudo por matéria até a prova.";
      }
    }
  }

  function updateDateInput() {
    const input = $("#exam-date-input");
    if (input) input.value = state.examDate;
  }

  /* --------------------------- progresso -------------------------- */

  function updateReadingProgress() {
    const bar = $("#reading-progress");
    const topbar = $("#topbar");
    if (topbar) topbar.classList.toggle("scrolled", window.scrollY > 8);
    if (!bar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    bar.style.width = (value * 100).toFixed(2) + "%";
  }

  /* ----------------------------- eventos -------------------------- */

  function bindEvents() {
    window.addEventListener("hashchange", route);
    window.addEventListener("scroll", updateReadingProgress, { passive: true });

    document.addEventListener("click", (event) => {
      const subjectChoice = event.target.closest("[data-subject-choice]");
      if (subjectChoice) {
        selectSubject(subjectChoice.dataset.subjectChoice);
        return;
      }

      const go = event.target.closest("[data-go]");
      if (go) {
        const view = go.dataset.go;
        const lesson = go.dataset.lesson || null;
        navigate(view, lesson);
        return;
      }

      const lessonBtn = event.target.closest("[data-lesson]");
      if (lessonBtn) {
        navigate("aprender", lessonBtn.dataset.lesson);
        return;
      }

      const moduleCard = event.target.closest(".module-card[data-module]");
      if (moduleCard) {
        const mod = moduleOf(moduleCard.dataset.module);
        const lesson = nextIncompleteLesson(mod);
        if (lesson) navigate("aprender", lesson.id);
        return;
      }

      const toggle = event.target.closest("[data-toggle-module]");
      if (toggle) {
        const id = toggle.dataset.toggleModule;
        const group = toggle.closest(".module-group");
        const isOpen = group.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        if (isOpen) openModules.add(id); else openModules.delete(id);
        return;
      }

      const planLink = event.target.closest("[data-plan-view]");
      if (planLink) {
        event.preventDefault();
        event.stopPropagation();
        navigate(planLink.dataset.planView, planLink.dataset.planLesson || null);
        return;
      }

      const searchResult = event.target.closest("[data-result-kind]");
      if (searchResult) {
        handleSearchResult(searchResult.dataset.resultKind, searchResult.dataset.resultId);
        return;
      }
    });

    const btnSubject = $("#btn-subject");
    if (btnSubject) btnSubject.addEventListener("click", openSubjectGate);
    const btnCloseGate = $("#btn-close-gate");
    if (btnCloseGate) btnCloseGate.addEventListener("click", closeSubjectGate);
    const gate = $("#subject-gate");
    if (gate) {
      gate.addEventListener("click", (event) => {
        if (event.target === gate) closeSubjectGate();
      });
    }

    const btnMenu = $("#btn-menu");
    if (btnMenu) {
      btnMenu.addEventListener("click", () => {
        const nav = $("#main-nav");
        const open = nav.classList.toggle("open");
        btnMenu.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    const btnTheme = $("#btn-theme");
    if (btnTheme) {
      btnTheme.addEventListener("click", () => {
        applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    }

    const btnSearch = $("#btn-search");
    if (btnSearch) btnSearch.addEventListener("click", openSearch);
    const btnCloseSearch = $("#btn-close-search");
    if (btnCloseSearch) btnCloseSearch.addEventListener("click", closeSearch);
    const searchInput = $("#search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (event) => renderSearch(event.target.value));
    }
    const searchDialog = $("#search-dialog");
    if (searchDialog) {
      searchDialog.addEventListener("close", () => {
        if (searchInput) searchInput.value = "";
        if ($("#search-results")) {
          $("#search-results").innerHTML = '<p class="search-hint">Digite pelo menos 2 letras. Ex.: “estágio”, “adesão”, “Kennedy”, “alveolite”.</p>';
        }
      });
    }

    const btnTop = $("#btn-top");
    if (btnTop) btnTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    const btnComplete = $("#btn-complete-lesson");
    if (btnComplete) btnComplete.addEventListener("click", toggleLessonDone);

    const btnPrev = $("#btn-prev-lesson");
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        if (!activeLesson) return;
        const list = visibleLessons();
        const index = list.findIndex((item) => item.lesson.id === activeLesson.lesson.id);
        const prev = list[index - 1];
        if (prev) navigate("aprender", prev.lesson.id);
      });
    }
    const btnNext = $("#btn-next-lesson");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (!activeLesson) return;
        const list = visibleLessons();
        const index = list.findIndex((item) => item.lesson.id === activeLesson.lesson.id);
        const next = list[index + 1];
        if (next) navigate("aprender", next.lesson.id);
      });
    }

    const btnLessonCards = $("#btn-lesson-cards");
    if (btnLessonCards) {
      btnLessonCards.addEventListener("click", () => {
        if (!activeLesson) return;
        $("#cards-module").value = activeLesson.module.id;
        $("#cards-order").value = "default";
        deckIndex = 0;
        buildDeck();
        navigate("flashcards");
      });
    }
    const btnLessonQuiz = $("#btn-lesson-quiz");
    if (btnLessonQuiz) {
      btnLessonQuiz.addEventListener("click", () => {
        if (!activeLesson) return;
        $("#quiz-module").value = activeLesson.module.id;
        $("#quiz-level").value = "all";
        $("#quiz-count").value = "10";
        navigate("questoes");
        toast("Filtro ajustado para " + activeLesson.module.short + ".");
      });
    }

    const flashcard = $("#flashcard");
    if (flashcard) {
      flashcard.addEventListener("click", () => {
        if (!deck.length) return;
        const flipped = flashcard.classList.toggle("flipped");
        flashcard.setAttribute("aria-pressed", flipped ? "true" : "false");
      });
    }
    const btnCardReview = $("#btn-card-review");
    if (btnCardReview) btnCardReview.addEventListener("click", () => markCard("review"));
    const btnCardKnown = $("#btn-card-known");
    if (btnCardKnown) btnCardKnown.addEventListener("click", () => markCard("known"));

    ["cards-module", "cards-order"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("change", () => {
          deckIndex = 0;
          buildDeck();
        });
      }
    });
    const btnResetDeck = $("#btn-reset-deck");
    if (btnResetDeck) btnResetDeck.addEventListener("click", resetDeck);

    const btnStartQuiz = $("#btn-start-quiz");
    if (btnStartQuiz) btnStartQuiz.addEventListener("click", startQuiz);
    const quizOptions = $("#quiz-options");
    if (quizOptions) {
      quizOptions.addEventListener("click", (event) => {
        const option = event.target.closest("[data-option]");
        if (option) selectQuizOption(parseInt(option.dataset.option, 10));
      });
    }
    const btnConfirmQuiz = $("#btn-confirm-quiz");
    if (btnConfirmQuiz) btnConfirmQuiz.addEventListener("click", confirmQuizAnswer);
    const btnNextQuiz = $("#btn-next-quiz");
    if (btnNextQuiz) btnNextQuiz.addEventListener("click", nextQuizQuestion);
    const btnQuitQuiz = $("#btn-quit-quiz");
    if (btnQuitQuiz) btnQuitQuiz.addEventListener("click", quitQuiz);
    const btnQuizRetry = $("#btn-quiz-retry");
    if (btnQuizRetry) {
      btnQuizRetry.addEventListener("click", () => {
        $("#quiz-results").hidden = true;
        $("#quiz-setup").hidden = false;
        quiz = null;
        renderQuizSetupMeta();
        window.scrollTo(0, 0);
      });
    }
    const btnQuizErrors = $("#btn-quiz-errors");
    if (btnQuizErrors) {
      btnQuizErrors.addEventListener("click", () => {
        if (!quiz) return;
        if (quizReviewMode === "all") {
          const errors = quiz.answers.filter((answer, i) => !answer || answer.selected !== quiz.list[i].answer).length;
          if (!errors) {
            toast("Você não errou nenhuma questão neste treino.");
            return;
          }
          quizReviewMode = "errors";
          btnQuizErrors.textContent = "Ver todas";
        } else {
          quizReviewMode = "all";
          btnQuizErrors.textContent = "Revisar erros";
        }
        renderQuizReview();
      });
    }

    const btnStartExam = $("#btn-start-exam");
    if (btnStartExam) btnStartExam.addEventListener("click", startExam);
    const examOptions = $("#exam-options");
    if (examOptions) {
      examOptions.addEventListener("click", (event) => {
        const option = event.target.closest("[data-option]");
        if (option) selectExamOption(parseInt(option.dataset.option, 10));
      });
    }
    const btnExamPrev = $("#btn-exam-prev");
    if (btnExamPrev) btnExamPrev.addEventListener("click", () => { if (exam) goExamQuestion(exam.index - 1); });
    const btnExamNext = $("#btn-exam-next");
    if (btnExamNext) btnExamNext.addEventListener("click", () => { if (exam) goExamQuestion(exam.index + 1); });
    const btnExamMark = $("#btn-exam-mark");
    if (btnExamMark) btnExamMark.addEventListener("click", toggleExamMark);
    const btnFinishExam = $("#btn-finish-exam");
    if (btnFinishExam) btnFinishExam.addEventListener("click", () => finishExam(false));
    const palette = $("#exam-palette");
    if (palette) {
      palette.addEventListener("click", (event) => {
        const button = event.target.closest("[data-palette]");
        if (button) goExamQuestion(parseInt(button.dataset.palette, 10));
      });
    }
    const btnExamReview = $("#btn-exam-review");
    if (btnExamReview) {
      btnExamReview.addEventListener("click", () => {
        const review = $("#exam-review");
        if (review) review.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    const btnExamRetry = $("#btn-exam-retry");
    if (btnExamRetry) btnExamRetry.addEventListener("click", retryExam);

    $$(".summary-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        $$(".summary-tab").forEach((item) => {
          item.classList.toggle("active", item === tab);
          item.setAttribute("aria-selected", item === tab ? "true" : "false");
        });
        $$(".summary-panel").forEach((panel) => {
          panel.classList.toggle("active", panel.dataset.summaryPanel === tab.dataset.summaryTab);
        });
      });
    });

    const btnPrint = $("#btn-print");
    if (btnPrint) btnPrint.addEventListener("click", () => window.print());

    const glossarySearch = $("#glossary-search");
    if (glossarySearch) {
      glossarySearch.addEventListener("input", (event) => {
        glossaryQuery = event.target.value;
        renderGlossary();
      });
    }
    const glossaryLetters = $("#glossary-letters");
    if (glossaryLetters) {
      glossaryLetters.addEventListener("click", (event) => {
        const button = event.target.closest("[data-letter]");
        if (!button) return;
        glossaryLetter = glossaryLetter === button.dataset.letter ? "" : button.dataset.letter;
        renderGlossary();
      });
    }

    const planList = $("#plan-list");
    if (planList) {
      planList.addEventListener("change", (event) => {
        const input = event.target.closest("[data-plan-task]");
        if (!input) return;
        const id = input.dataset.planTask;
        if (input.checked) state.plan[id] = true; else delete state.plan[id];
        saveState();
        renderPlan();
      });
    }

    const btnEditDate = $("#btn-edit-date");
    const dateEditor = $("#date-editor");
    if (btnEditDate && dateEditor) {
      btnEditDate.addEventListener("click", () => {
        dateEditor.hidden = !dateEditor.hidden;
        if (!dateEditor.hidden) {
          updateDateInput();
          $("#exam-date-input").focus();
        }
      });
    }
    const btnSaveDate = $("#btn-save-date");
    if (btnSaveDate) {
      btnSaveDate.addEventListener("click", () => {
        const value = $("#exam-date-input").value;
        if (!value || !isFinite(new Date(value).getTime())) {
          toast("Escolha uma data e hora válidas.");
          return;
        }
        state.examDate = value;
        if (state.track) state.examDates[state.track] = value;
        saveState();
        updateCountdown();
        if (dateEditor) dateEditor.hidden = true;
        toast("Data da prova atualizada.");
      });
    }

    document.addEventListener("keydown", (event) => {
      const tag = (event.target.tagName || "").toLowerCase();
      const typing = tag === "input" || tag === "textarea" || tag === "select" || event.target.isContentEditable;
      const card = event.target.closest && event.target.closest(".module-card[data-module]");
      if (card && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        const mod = moduleOf(card.dataset.module);
        const lesson = nextIncompleteLesson(mod);
        if (lesson) navigate("aprender", lesson.id);
        return;
      }
      if ((event.key === "/" || (event.key.toLowerCase() === "k" && (event.ctrlKey || event.metaKey))) && !typing) {
        event.preventDefault();
        openSearch();
        return;
      }
      if (event.key === "Escape") {
        closeMenu();
        const gate = $("#subject-gate");
        if (gate && !gate.hidden && selectedTrack()) closeSubjectGate();
        return;
      }
      const onCards = !$("#view-flashcards").hidden;
      if (!onCards || typing || !deck.length) return;
      if (event.target.closest && event.target.closest("button, a")) return;
      if (event.code === "Space") {
        event.preventDefault();
        const flipped = $("#flashcard").classList.toggle("flipped");
        $("#flashcard").setAttribute("aria-pressed", flipped ? "true" : "false");
      } else if (event.key === "1") {
        event.preventDefault();
        markCard("review");
      } else if (event.key === "2") {
        event.preventDefault();
        markCard("known");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        advanceCard();
      }
    });
  }

  /* ------------------------------ init ---------------------------- */

  function init() {
    initTheme();
    updateSubjectChrome();
    if (selectedTrack()) applySubjectToPage();
    populateSelects();
    bindEvents();
    renderHome();
    renderSidebar();
    renderContinue();
    renderQuizSetupMeta();
    renderExamSetupMeta();
    renderGlossary();
    renderPlan();
    buildDeck();
    updateDeckStats();
    updateDateInput();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    if (!location.hash) history.replaceState(null, "", "#inicio");
    route();
    if (!selectedTrack()) {
      openSubjectGate();
    } else {
      const gate = $("#subject-gate");
      if (gate) gate.hidden = true;
      document.body.classList.remove("gate-open");
    }
    updateReadingProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
