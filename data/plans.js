window.CI_PLANS = {
  perio: [
    {
      id: "p1", day: "Bloco 1", date: "teoria", title: "Exame e classificação",
      focus: "PS, NIC, PSR e classificação 2017. Sem isso, o tratamento vira chute.",
      tasks: [
        { id: "p1t1", text: "Ler as 3 aulas do módulo 1 (exame e diagnóstico).", view: "aprender", lesson: "m1l1" },
        { id: "p1t2", text: "Fazer os 24 flashcards de Periodontia.", view: "flashcards" },
        { id: "p1t3", text: "Treinar a conta de NIC e os códigos do PSR.", view: "resumo" },
        { id: "p1t4", text: "Responder 10 questões de diagnóstico.", view: "questoes" }
      ]
    },
    {
      id: "p2", day: "Bloco 2", date: "tratamento", title: "RAR, cirurgia e manutenção",
      focus: "A sequência que a prova cobra: tratar, reavaliar, indicar cirurgia e manter.",
      tasks: [
        { id: "p2t1", text: "Ler as 3 aulas do módulo 2 (tratamento).", view: "aprender", lesson: "m2l1" },
        { id: "p2t2", text: "Revisar a tabela de estágio x grau.", view: "resumo" },
        { id: "p2t3", text: "Responder 10 questões de tratamento.", view: "questoes" },
        { id: "p2t4", text: "Voltar aos flashcards marcados para revisar.", view: "flashcards" }
      ]
    },
    {
      id: "p3", day: "Bloco 3", date: "fechamento", title: "Simulado e revisão",
      focus: "Feche a matéria com o simulado de Periodontia e corrija tudo.",
      tasks: [
        { id: "p3t1", text: "Fazer o resumão de Periodontia.", view: "resumo" },
        { id: "p3t2", text: "Fazer o simulado de 20 questões em 30 minutos.", view: "simulado" },
        { id: "p3t3", text: "Revisar todos os erros do simulado.", view: "questoes" }
      ]
    }
  ],
  dent: [
    {
      id: "d1", day: "Bloco 1", date: "teoria", title: "Cárie e decisão",
      focus: "Cárie como doença, ICDAS e a escolha entre prevenir, selar e restaurar.",
      tasks: [
        { id: "d1t1", text: "Ler as 3 aulas do módulo 3 (cárie).", view: "aprender", lesson: "m3l1" },
        { id: "d1t2", text: "Fazer os 24 flashcards de Dentística.", view: "flashcards" },
        { id: "d1t3", text: "Revisar ICDAS no resumão.", view: "resumo" },
        { id: "d1t4", text: "Responder 10 questões de cárie.", view: "questoes" }
      ]
    },
    {
      id: "d2", day: "Bloco 2", date: "materiais", title: "Adesão e resina",
      focus: "Condicionamento, dentina úmida, contração, incrementos e fotoativação.",
      tasks: [
        { id: "d2t1", text: "Ler as 3 aulas do módulo 4 (materiais).", view: "aprender", lesson: "m4l1" },
        { id: "d2t2", text: "Revisar a sequência de adesão em 4 passos.", view: "resumo" },
        { id: "d2t3", text: "Responder 10 questões de materiais.", view: "questoes" },
        { id: "d2t4", text: "Voltar aos flashcards marcados para revisar.", view: "flashcards" }
      ]
    },
    {
      id: "d3", day: "Bloco 3", date: "fechamento", title: "Simulado e revisão",
      focus: "Feche Dentística com o simulado e a correção dos erros.",
      tasks: [
        { id: "d3t1", text: "Fazer o resumão de Dentística.", view: "resumo" },
        { id: "d3t2", text: "Fazer o simulado de 20 questões em 30 minutos.", view: "simulado" },
        { id: "d3t3", text: "Revisar todos os erros do simulado.", view: "questoes" }
      ]
    }
  ],
  prot: [
    {
      id: "r1", day: "Bloco 1", date: "PPR", title: "Kennedy e componentes",
      focus: "Classificação, Applegate, apoio, grampo, conector e eixo de inserção.",
      tasks: [
        { id: "r1t1", text: "Ler as 3 aulas do módulo 5 (PPR).", view: "aprender", lesson: "m5l1" },
        { id: "r1t2", text: "Fazer os 24 flashcards de Prótese.", view: "flashcards" },
        { id: "r1t3", text: "Revisar Kennedy e Applegate no resumão.", view: "resumo" },
        { id: "r1t4", text: "Responder 10 questões de PPR.", view: "questoes" }
      ]
    },
    {
      id: "r2", day: "Bloco 2", date: "fixa e total", title: "Coroas, PT e oclusão",
      focus: "Preparo, provisório, etapas da PT, DVO, RC/MIC e ajuste.",
      tasks: [
        { id: "r2t1", text: "Ler as 3 aulas do módulo 6 (fixa, PT e oclusão).", view: "aprender", lesson: "m6l1" },
        { id: "r2t2", text: "Revisar RC, MIC e DVO no resumão.", view: "resumo" },
        { id: "r2t3", text: "Responder 10 questões de prótese fixa/total.", view: "questoes" },
        { id: "r2t4", text: "Voltar aos flashcards marcados para revisar.", view: "flashcards" }
      ]
    },
    {
      id: "r3", day: "Bloco 3", date: "fechamento", title: "Simulado e revisão",
      focus: "Feche Prótese com o simulado e a correção dos erros.",
      tasks: [
        { id: "r3t1", text: "Fazer o resumão de Prótese.", view: "resumo" },
        { id: "r3t2", text: "Fazer o simulado de 20 questões em 30 minutos.", view: "simulado" },
        { id: "r3t3", text: "Revisar todos os erros do simulado.", view: "questoes" }
      ]
    }
  ],
  cir: [
    {
      id: "c1", day: "Bloco 1", date: "exodontia", title: "Avaliação e técnica",
      focus: "Riscos, instrumental, sindesmotomia, luxação e odontossecção.",
      tasks: [
        { id: "c1t1", text: "Ler as 3 aulas do módulo 7 (exodontia).", view: "aprender", lesson: "m7l1" },
        { id: "c1t2", text: "Fazer os 24 flashcards de Cirurgia.", view: "flashcards" },
        { id: "c1t3", text: "Revisar a sequência da exodontia no resumão.", view: "resumo" },
        { id: "c1t4", text: "Responder 10 questões de exodontia.", view: "questoes" }
      ]
    },
    {
      id: "c2", day: "Bloco 2", date: "anestesia", title: "Anestesia, sutura e urgências",
      focus: "Doses máximas, técnicas, fios, pós-operatório e complicações.",
      tasks: [
        { id: "c2t1", text: "Ler as 3 aulas do módulo 8 (anestesia e urgências).", view: "aprender", lesson: "m8l1" },
        { id: "c2t2", text: "Treinar o cálculo de dose máxima no resumão.", view: "resumo" },
        { id: "c2t3", text: "Responder 10 questões de anestesia/cirurgia.", view: "questoes" },
        { id: "c2t4", text: "Voltar aos flashcards marcados para revisar.", view: "flashcards" }
      ]
    },
    {
      id: "c3", day: "Bloco 3", date: "fechamento", title: "Simulado e revisão",
      focus: "Feche Cirurgia com o simulado e a correção dos erros.",
      tasks: [
        { id: "c3t1", text: "Fazer o resumão de Cirurgia.", view: "resumo" },
        { id: "c3t2", text: "Fazer o simulado de 20 questões em 30 minutos.", view: "simulado" },
        { id: "c3t3", text: "Revisar todos os erros do simulado.", view: "questoes" }
      ]
    }
  ],
  integ: [
    {
      id: "i1", day: "Bloco 1", date: "casos", title: "Plano de tratamento",
      focus: "A sequência que resolve a maioria dos casos: urgência, doença, reavaliação, reabilitação.",
      tasks: [
        { id: "i1t1", text: "Ler as 3 aulas do módulo 9.", view: "aprender", lesson: "m9l1" },
        { id: "i1t2", text: "Revisar o mapa da prova no resumão.", view: "resumo" },
        { id: "i1t3", text: "Responder 10 questões de integração.", view: "questoes" }
      ]
    },
    {
      id: "i2", day: "Bloco 2", date: "véspera", title: "Pegadinhas e simulado final",
      focus: "Revise as 10 pegadinhas e faça o simulado misto de 30 questões.",
      tasks: [
        { id: "i2t1", text: "Ler as 10 pegadinhas do resumão.", view: "resumo" },
        { id: "i2t2", text: "Fazer o simulado de 30 questões em 45 minutos.", view: "simulado" },
        { id: "i2t3", text: "Revisar todos os erros.", view: "questoes" }
      ]
    }
  ]
};
