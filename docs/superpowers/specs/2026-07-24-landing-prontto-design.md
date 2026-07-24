# Landing page do Prontto — design

Data: 2026-07-24

## Contexto

O Prontto é o produto SaaS de atendimento comercial automatizado por WhatsApp e Instagram
(hoje desenvolvido no repositório `hub-social`, ainda sob o nome antigo). A Raro Tecnologia
segue vendendo serviços; o Prontto é produto dela, com marca própria.

Esta landing tem dois objetivos, nesta ordem:

1. **Converter** quem chega no `prontto.ai` em conversa no WhatsApp.
2. **Provar publicamente a relação produto-empresa**, requisito da Meta para aprovar
   "Prontto" como display name do número. A submissão "Raro - Prontto" foi reprovada;
   as diretrizes exigem que o nome seja referenciado no site do negócio.

## Decisões

| Decisão | Escolha |
|---|---|
| Identidade visual | Própria do Prontto (não herda a paleta da Raro) |
| Escopo | Enxuta: prova para a Meta + conversão. Sem preços, sem páginas legais |
| Destino do CTA | Número novo do Prontto: `wa.me/554431701799` |
| Idioma | Só PT-BR (sem i18n) |
| Stack | HTML/CSS/JS puro, sem build — mesmo padrão do site da Raro |
| Deploy | GitHub Pages + `CNAME` |

## Direção criativa

**"A conversa é a prova."** A página não descreve o produto: ela o executa. O hero traz
uma cena de chat animada — mensagem do lead chegando de madrugada, indicador de digitando,
resposta em poucos segundos, com o horário visível. O visitante entende a promessa
("atende na hora, 24h") antes de ler qualquer parágrafo.

A dor (lead perdido por demora) aparece em uma linha de subtítulo, não como abertura.

### Identidade

- **Paleta:** base carvão/preta com acento âmbar-tangerina. Separa o produto do azul
  corporativo da Raro e carrega o calor humano do "pronto?". Evita deliberadamente o
  verde do WhatsApp, que é marca da Meta.
- **Tipografia:** display em Instrument Sans, corpo em Inter (via Google Fonts).
  Difere da Raro (Inter display + IBM Plex Sans corpo) mantendo legibilidade.

## Estrutura da página

Página única, rolagem curta:

1. **Header** — logo Prontto + botão WhatsApp
2. **Hero** — headline, subheadline com a dor, CTA e a cena de chat animada
3. **Como funciona** — 3 passos: lead chega → Prontto atende e qualifica → chega no
   funil preenchido
4. **O que ele faz** — 4 cards: responde em segundos 24h · entende áudio e imagem ·
   preenche o CRM sozinho · volta quando o lead some
5. **Faixa de dogfooding** — "Este site é atendido pelo próprio Prontto. Manda uma
   mensagem e testa." O CTA vira demonstração.
6. **Rodapé** — "Prontto — um produto **Raro Tecnologia**", com link para
   `rarotecnologia.com`. Esta linha é a evidência pública exigida pela Meta.

## Arquitetura de arquivos

```
prontto.ai/
├── index.html
├── css/
│   ├── base.css        # reset, tokens (:root), tipografia, botões
│   ├── sections.css    # header, hero, passos, cards, faixa, rodapé
│   └── chat.css        # cena de conversa animada
├── logo/               # símbolo e wordmark
├── favicon/
├── og-image            # 1200×630 para compartilhamento
├── robots.txt
├── CNAME               # prontto.ai
└── README.md
```

**Sem agregador `styles.css`.** O site da Raro usa um porque tem três páginas e o
agregador evita repetir cinco `<link>` em cada uma. Aqui há uma página só, então o
motivo não existe — e `@import` em CSS cria cascata serial de requisições, atrasando a
renderização. Os módulos entram como `<link>` direto no `<head>`, na ordem da cascata,
baixando em paralelo.

Três módulos, não cinco: `chat.css` fica isolado por ser a peça mais complexa.

## Fora de escopo

- **Preços e planos** — o billing (MEI/Asaas) ainda não existe; preço na página trava
  negociação.
- **Páginas legais** (termos, privacidade) — quando forem necessárias, copiar o padrão
  da Raro.
- **i18n** — só PT-BR. Se o produto internacionalizar, avaliar na hora.

## Dependências e pendências

- **Número do WhatsApp:** +55 44 3170-1799 (fixo, Maringá). Como é fixo, a verificação
  na Cloud API tem que ser por chamada de voz, não SMS.
- **Logo e favicon do Prontto:** ainda não existem. A primeira versão usa um wordmark
  tipográfico (texto estilizado), sem símbolo. Substituir quando houver identidade
  gráfica definitiva.
- **og-image:** gerar a partir do hero depois que a página estiver fechada.

## Critérios de sucesso

1. A página carrega rápido, sem build e sem dependência externa além das fontes.
2. O rodapé nomeia "Prontto" como produto da Raro Tecnologia, com link — suficiente
   para a Meta verificar a relação.
3. O CTA leva ao WhatsApp certo, com mensagem pré-preenchida.
4. Responsiva: a cena de chat funciona no celular, onde a maioria vai abrir.
