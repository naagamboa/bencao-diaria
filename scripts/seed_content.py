# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app.db import SessionLocal, Base, engine
from app.models import Content
Base.metadata.create_all(bind=engine)

samples = [
    (1, "A graça que basta", "2 Coríntios 12:9", "A minha graça te basta, porque o poder se aperfeiçoa na fraqueza.", "Hoje, onde você se sente fraco, Deus quer ser forte. Não esconda sua fraqueza; ofereça-a a Ele.", "Senhor, em minha fraqueza, seja Tu minha força. Amém."),
    (2, "Caminho seguro", "Salmos 119:105", "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.", "A Palavra de Deus ilumina decisões. Leia um trecho hoje e deixe-a guiar seus passos.", "Pai, ilumina meu caminho hoje. Amém."),
    (3, "Descanso para a alma", "Mateus 11:28", "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", "O cansaço da alma tem remédio: a presença de Jesus. Tire um minuto de silêncio hoje.", "Jesus, descanso em Ti. Amém."),
    (4, "Coragem para hoje", "Josué 1:9", "Não to mandei eu? Esforça-te e tem bom ânimo; não temas, nem te espantes.", "Coragem não é ausência de medo, é confiar que Deus vai contigo.", "Senhor, dá-me coragem para hoje. Amém."),
    (5, "Provisão garantida", "Filipenses 4:19", "O meu Deus suprirá todas as vossas necessidades, segundo as suas riquezas em glória.", "Deus conhece suas necessidades antes mesmo de você pedir. Confie.", "Pai, confio em Tua provisão. Amém."),
    (6, "Perdão completo", "1 João 1:9", "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar.", "O perdão de Deus é completo. Não carregue hoje o que já foi perdoado.", "Senhor, obrigado pelo perdão. Amém."),
    (7, "Alegria na esperança", "Romanos 15:13", "Ora, o Deus de esperança vos encha de todo o gozo e paz.", "Esperança não é otimismo; é certeza de que Deus cumpre suas promessas.", "Deus de esperança, enche-me hoje. Amém."),
    (8, "Força renovada", "Isaías 40:31", "Os que esperam no Senhor renovarão as suas forças.", "A águia não foge da tempestade; ela voa acima dela. Espere no Senhor.", "Senhor, renova minhas forças hoje. Amém."),
    (9, "Entrega o teu caminho", "Salmos 37:5", "Entrega o teu caminho ao Senhor; confia nele, e ele o fará.", "Não é desistir, é confiar. Entregue hoje aquilo que mais pesa no seu coração.", "Pai, entrego meus planos em Tuas mãos. Amém."),
    (10, "Ansiedade vencida", "1 Pedro 5:7", "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.", "Deus não diz para não sentir, mas para lançar. Ele cuida de você.", "Senhor, deixo minha ansiedade contigo. Amém."),
    (11, "Nunca sozinho", "Hebreus 13:5", "Não te deixarei, nem te desampararé.", "O silêncio não é ausência. Deus está com você agora, neste instante.", "Deus, obrigado por nunca me abandonar. Amém."),
    (12, "Paz que excede", "Filipenses 4:7", "A paz de Deus, que excede todo o entendimento, guardará os vossos corações.", "Não é a paz do mundo, que depende das circunstâncias — é a paz de quem confia.", "Jesus, dá-me a Tua paz hoje. Amém."),
    (13, "O Bom Pastor", "Salmos 23:1", "O Senhor é o meu pastor; nada me faltará.", "Se Ele é o pastor, você não caminha sozinho. Siga em frente com confiança.", "Bom Pastor, guia-me hoje. Amém."),
    (14, "Fé em ação", "Tiago 2:17", "Assim também a fé, se não tiver as obras, é morta em si mesma.", "Dê hoje um passo pequeno, mas real, na direção daquilo que você crê.", "Senhor, minha fé vai andar hoje. Amém."),
    (15, "A voz de Deus", "João 10:27", "As minhas ovelhas ouvem a minha voz, e eu conheço-as.", "Deus fala: pela Palavra, pela paz, pelas circunstâncias. Aprenda a reconhecer a voz dEle.", "Pai, ensina-me a ouvir Tua voz. Amém."),
    (16, "Generosidade", "Lucas 6:38", "Dai, e ser-vos-á dado; medida boa, recalcada e transbordante.", "Você nunca fica mais pobre por abençoar alguém. Generosidade é semente.", "Senhor, abre minhas mãos para dar. Amém."),
    (17, "Gratidão", "1 Tessalonicenses 5:18", "Em tudo dai graças, porque esta é a vontade de Deus.", "Gratidão muda o olhar: em vez do que falta, enxergue o que já foi dado.", "Deus, obrigado por tudo. Amém."),
    (18, "Renovo de mente", "Romanos 12:2", "Transformai-vos pela renovação do vosso entendimento.", "O que você pensa forma o que você vive. Alimente sua mente com o bem.", "Senhor, renova minha mente. Amém."),
    (19, "Alegria verdadeira", "Neemias 8:10", "A alegria do Senhor é a vossa força.", "Circunstâncias mudam; a alegria que vem de Deus permanece e sustenta.", "Senhor, minha alegria vem de Ti. Amém."),
    (20, "Amor incondicional", "Romanos 8:38-39", "Nada nos poderá separar do amor de Deus.", "Não é pelo que você faz; é por quem Ele é. O amor dEle não depende do seu dia.", "Deus, obrigado por me amar assim. Amém."),
    (21, "Seja forte", "1 Coríntios 16:13", "Vigiai, estai firmes na fé; portai-vos varonilmente, e fortalecei-vos.", "Firmeza não é dureza: é raiz profunda. Fique firme no que você crê.", "Senhor, firma meus passos. Amém."),
    (22, "Confiança total", "Provérbios 3:5", "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento.", "Você não precisa entender tudo hoje. Confie em quem vê o amanhã.", "Pai, confio em Ti de todo o coração. Amém."),
    (23, "Vitória certa", "Romanos 8:37", "Em todas estas coisas somos mais do que vencedores, por aquele que nos amou.", "Você não está vencendo por pouco: em Cristo, você é mais que vencedor.", "Jesus, obrigado pela vitória. Amém."),
    (24, "A pedra removida", "Marcos 11:23", "Quem disser a este monte: Levanta-te e lança-te no mar... tê-lo-á.", "Todo obstáculo que Deus quer remover começa a se mover quando você crê.", "Senhor, creio no Teu poder. Amém."),
    (25, "Luz do mundo", "Mateus 5:14", "Vós sois a luz do mundo; não se pode esconder uma cidade edificada sobre um monte.", "Onde você entra, Deus quer brilhar. Ilumine alguém hoje com um gesto.", "Senhor, faz brilhar Tua luz através de mim. Amém."),
    (26, "Cura e restauração", "Salmos 147:3", "Sara os quebrantados de coração e liga-lhes as feridas.", "Deus não despreza coração ferido. Ele restaura onde dói, com ternura.", "Deus, restaura meu coração. Amém."),
    (27, "Entregue as rédeas", "Salmos 46:10", "Parem e saibam que eu sou Deus.", "A pressa rouba a fé. Pare hoje por um instante e reconheça: Ele é Deus.", "Senhor, Tu és Deus. Eu descanso. Amém."),
    (28, "Família abençoada", "Josué 24:15", "Eu e a minha casa serviremos ao Senhor.", "Deus deseja abençoar sua família. Comece você a plantar fé dentro de casa.", "Pai, abençoa minha família. Amém."),
    (29, "Tempo de Deus", "Eclesiastes 3:1", "Tudo tem o seu tempo determinado.", "O relógio de Deus não atrasa nem adianta. Você está no tempo certo.", "Senhor, confio no Teu tempo. Amém."),
    (30, "Proteção divina", "Salmos 91:1", "Aquele que habita no esconderijo do Altíssimo... à sombra do Onipotente descansará.", "Sua casa, seu trabalho, sua família: coloque tudo aos cuidados do Altíssimo.", "Altíssimo, guarda minha família. Amém."),
    (31, "Recomeçar", "Lamentações 3:22-23", "As misericórdias do Senhor são a causa de não sermos consumidos... renovam-se cada manhã.", "As misericórdias se renovam cada manhã. Hoje é um novo começo.", "Senhor, obrigado por mais uma chance. Amém."),
]

db = SessionLocal()
for d, t, ref, vt, refl, pray in samples:
    if not db.query(Content).filter(Content.day_index == d).first():
        db.add(Content(day_index=d, title=t, verse_ref=ref, verse_text=vt, reflection=refl, prayer=pray))
db.commit()

base = db.query(Content).filter(Content.day_index <= 31).order_by(Content.day_index).all()
for day in range(32, 366):
    if db.query(Content).filter(Content.day_index == day).first():
        continue
    src = base[(day - 1) % len(base)]
    db.add(Content(day_index=day, title=src.title, verse_ref=src.verse_ref, verse_text=src.verse_text,
                   reflection=src.reflection, prayer=src.prayer))
db.commit()
db.close()
print("Seed concluído: 365 dias de devocionais (31 únicos).")
