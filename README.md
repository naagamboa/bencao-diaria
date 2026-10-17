# 🙏 Bênção Diária

Aplicativo de mensagens diárias de fé via WhatsApp, com assinatura mensal (R$ 49,90 ou R$ 79,00), 3 dias grátis, PIX/cartão via Mercado Pago e painel administrativo.

## Como funciona (visão do assinante)
1. Assina na landing page (nome + WhatsApp), paga o PIX — ou agenda no cartão.
2. Recebe todo dia (6h, 12h ou 20h, escolha dele): versículo + reflexão + oração.
3. Responde **AMÉM** — recebe o conteúdo completo, ganha streak 🔥 e libera a janela de 24h (mensagem barata).
4. Pode responder: `1/2/3` (mudar horário), `PIX` (renovar), `INDICAR` (ganhar 1 mês grátis), `PARAR` (cancelar), `VOLTAR`, `EXCLUIR` (LGPD), `AJUDA`.

## Funcionalidades
- **Fluxo Amém**: resposta abre janela de atendimento de 24h — envios de "service" (baratos) em vez de templates de marketing.
- **Streak de fé**: contador de dias consecutivos respondendo Amém, com presente a cada 7 dias.
- **Indique e ganhe**: cada amigo que assina = 30 dias grátis para quem indicou.
- **Renovação automática**: PIX avulso + preapproval de cartão (Mercado Pago).
- **Manutenção diária (9h)**: expira vencidos, winback, lembrete de renovação (3 dias antes), boas-vindas pós-pagamento.
- **Painel admin**: MRR, taxa de resposta (Amém), assinantes, pagamentos, aprovação manual de PIX, envio de mensagem avulsa, editor de devocionais.
- **LGPD**: consentimento com data/hora, opt-out (`PARAR`), anonimização (`EXCLUIR`), política de privacidade em `/privacidade`.
- **Modo dev**: sem chaves da Meta/Mercado Pago, tudo roda simulado (envios logados no console, PIX fake).

## Stack
Python 3.11+ · FastAPI · SQLAlchemy · SQLite (troque por Postgres em produção) · APScheduler · WhatsApp Cloud API (Meta) · Mercado Pago.

## Setup local (Windows)
```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env      # preencha depois
python scripts\seed_content.py
.\run.ps1                   # ou: uvicorn app.main:app --reload --port 8000
```
- Landing: http://localhost:8000
- Painel: http://localhost:8000/admin (credenciais do `.env`)
- Testes: `python -m pytest tests/ -q`

Sem `WHATSAPP_ACCESS_TOKEN` e `MP_ACCESS_TOKEN`, o app roda em modo dev: PIX simulado e mensagens impressas no console. Você pode testar o fluxo todo (cadastro → amém → PARAR → renovação) sem gastar nada.

## Configuração de produção

### WhatsApp (Meta)
1. Crie o app no [Meta for Developers](https://developers.facebook.com) → produto WhatsApp.
2. Configure o webhook: `https://seudominio.com/webhooks/whatsapp` com o `WHATSAPP_VERIFY_TOKEN` do `.env` (a Meta envia `hub.mode`, `hub.verify_token`, `hub.challenge` — já tratado).
3. Assine os campos `messages` (recebe mensagens e status).
4. Regras anti-banimento: envie só para quem consentiu, pare imediatamente no `PARAR`, nunca compre listas.

### Templates para aprovar no Meta Business Manager (categoria **utility**)
| Nome | Uso | Corpo sugerido |
|---|---|---|
| `welcome_blessing` | boas-vindas pós-pagamento | `Olá {{1}}! Sua assinatura da Bênção Diária está ativa. Amanhã cedo chega sua primeira bênção. Responda AMÉM quando receber. Deus te abençoe!` |
| `daily_blessing` | bênção diária fora da janela 24h (categoria **marketing**, mais caro — evite) | `Olá {{1}}! Sua bênção de hoje: {{2}}. Abra o WhatsApp para receber a mensagem completa e responder AMÉM.` |
| `renewal_reminder` | lembrete de renovação 3 dias antes | `{{1}}, faltam {{2}} dias para o fim da sua Bênção Diária. Responda PIX para renovar e continuar recebendo. Deus te abençoe!` |

> Dica de ouro: como o fluxo pede resposta diária (**AMÉM**), quase todos os envios caem na janela de 24h como "service" — muito mais baratos. Uma mensagem em texto livre com o versículo completo + CTA para responder Amém rende muito mais engajamento do que template seco.

### Mercado Pago
1. Crie a aplicação e pegue o `MP_ACCESS_TOKEN`.
2. Webhook: `https://seudominio.com/webhooks/mercadopago` (eventos de payment e preapproval). Assinatura conferida via `MP_WEBHOOK_SECRET`.
3. PIX: taxa 0% para QR avulso pela maioria dos bancos; link PIX a partir de ~0,99%; cartão a partir de ~3,99%. Para recorrência no cartão usamos `preapproval`.

### Servidor
Qualquer VPS ou PaaS com HTTPS (Railway, Render, Fly.io, Hetzner). SQLite aguenta bem até poucos milhares de assinantes; migre para Postgres quando escalar. Faça backup do `data.db` diariamente.

## Custos reais do WhatsApp em 2026 (e a brecha legítima do "Amém")
Valores de referência (BRL, pesquise os atuais no seu painel Meta):
- Mensagem de **marketing** (template fora da janela 24h): ~R$ 0,32 por mensagem.
- Mensagem de **utility**: ~R$ 0,035.
- **Service** (dentro da janela de 24h aberta por mensagem do usuário): **1.000 primeiras por mês grátis por número**, depois ~R$ 0,035.

**A brecha legítima**: quando o assinante responde "Amém", abre-se a janela de atendimento de 24h — as mensagens seguintes no dia seguinte são "service" (grátis até 1.000/mês, depois ~R$ 0,035), em vez de marketing a ~R$ 0,32. Com 1.000 assinantes ativos respondendo Amém, a economia vs. disparar templates de marketing é de ~R$ 8.800/mês. Isso está dentro dos Termos da Meta (é engajamento genuíno pedido ao usuário), mas nunca force artificialmente: o CTA "responda AMÉM" é a mecânica do produto, não um truque.

> ⚠️ A antiga nota "amém não isenta taxas" estava desatualizada: desde as mudanças de precificação (per-message, janela de service), resposta do usuário abre a janela de 24h e mensagens de serviço têm regra própria. Confirme sempre os valores atuais em Meta → WhatsApp Manager → Visão geral de custos.

## Números e finanças (visão de negócio)
- **Preços**: Essencial R$ 49,90 · Premium R$ 79,00 (3 dias grátis → converte bem em devocional diário).
- **Unit economics (1.000 assinantes Essencial)**: MRR R$ 49,9k. Custos: WhatsApp ~R$ 400–1.200 (regime service) ou até ~R$ 9k se for tudo marketing; Mercado Pago PIX ~1% (~R$ 500) ou cartão ~4% (~R$ 2k); infra ~R$ 200–500. **Margem bruta > 95% no regime service.**
- **Break-even**: com custos fixos de ~R$ 2k/mês (infra + MEI/contador), algo entre **45 e 60 assinantes** já cobre tudo.
- **Ponto de atenção tributária**: MEI tem teto de **R$ 81 mil/ano** — ~1.350 assinantes Essencial ≈ R$ 673k/ano, então planeje migrar para **ME no Simples Nacional** (Anexo III começa com alíquota efetiva baixa, ~6%) antes de estourar o teto, para não pagar multa retroativa.
- **Churn**: é o inimigo número 1 de assinatura devocional (natural após 3–6 meses). Combata com streak (o contador vicia positivamente), conteúdo que não repete em ~31 dias, pedidos de oração no domingo (Premium) e sazonalidade (Natal, Páscoa, Dia das Mães — picos de assinatura).
- **LTV/CAC**: meta saudável LTV > 6 meses (~R$ 300) com CAC < R$ 60. Indicação (1 mês grátis) pode baixar o CAC a ~R$ 0.

## Como virar viral
1. **Todo conteúdo tem um CTA de compartilhar**: o versículo do dia termina com "Compartilhe com alguém que precisa ler isso hoje" — quem compartilha, espalha a marca.
2. **Convite com benefício mútuo**: quem indica ganha 30 dias; quem chega via link ganha os 3 dias grátis + bônus (ex.: "Devocional de Bênçãos Financeiras" de 7 dias).
3. **Streak como status social**: "🔥 Não quebre sua sequência de Amém!" — perda aversiva aumenta retenção e gera prints orgânicos.
4. **Igrejas e células como canal**: ofereça 2 meses grátis para líderes de grupos pequenos; cada grupo é um cluster de indicações naturais. Parceria de co-branding ("Bênção Diária × Igreja X").
5. **TikTok/Reels com conteúdo extraído do próprio produto**: contagem regressiva do Natal, "versículo que 10 mil pessoas amaram hoje" com captura de tela da mensagem real (prova social).
6. **Presentes**: "Presenteie sua mãe com um ano de bênçãos" (R$ 499/ano pré-pago) — compra emocional forte em datas comemorativas.
7. **WhatsApp Status/bio**: incentive o assinante a postar o versículo do dia no status com a marca d'água — custo zero e alcance exponencial.

## Estrutura do projeto
```
app/
  config.py        # settings (lê .env)
  models.py        # User, Payment, MessageLog, Content, Referral
  db.py            # engine, sessão, migrações leves (ensure_schema)
  whatsapp.py      # envio (texto/template), dev mode, parse do webhook
  payments.py      # PIX, preapproval de cartão, assinatura MP
  scheduler.py     # broadcast diário (service vs marketing) + manutenção
  routes_users.py  # cadastro, status, renovação, cartão, opt-in/out, LGPD
  routes_webhooks.py # fluxos do Amém, comandos, ativação, webhook MP
  routes_admin.py  # métricas, ações, aprovação manual, disparos
  routes_auth.py   # login do painel
scripts/
  seed_content.py  # 31 devocionais únicos (ciclo de 365 dias)
static/
  landing.html     # página pública + fluxo PIX com confirmação automática
  admin.html       # painel administrativo completo
  obrigado.html    # pós-pagamento
  privacidade.html # política LGPD
tests/
  test_basic.py    # 14 testes
```

## API principal
- `POST /users/subscribe` — cadastro + PIX
- `GET /users/{id}/status` — polling de pagamento
- `POST /users/{id}/renew` · `/{id}/card` · `/{id}/optout` · `/{id}/optin` · `DELETE /{id}/data`
- `GET|POST /webhooks/whatsapp` — verificação Meta e mensagens
- `POST /webhooks/mercadopago` — pagamentos (idempotente, valida valor)
- `POST /auth/admin/login` · `GET /admin/stats` · `GET /admin/users` · `POST /admin/payments/{id}/approve` · `POST /admin/broadcast` · `POST /admin/maintenance`
- `GET|POST|DELETE /content` — devocionais

## Notas legais
- LGPD: consentimento registrado com data, opt-out imediato, anonimização sob pedido. Mantenha registros de pagamento pelo prazo fiscal.
- Não contorne as regras do WhatsApp: a estratégia Amém é engajamento real, documentada nos termos (janela de atendimento). Listas compradas e disparos em massa = banimento.
- Consulte um contador (MEI → ME) e um advogado para termos de uso.
