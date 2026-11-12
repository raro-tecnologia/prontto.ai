# Prontto, landing page

Site estático (HTML/CSS, sem build) do **Prontto**, produto de atendimento comercial
automatizado por WhatsApp e Instagram da Raro Tecnologia. Publicado em
[prontto.ai](https://prontto.ai).

## Stack

- HTML + CSS puro, custom properties, sem framework e sem JavaScript
- Fontes: Plus Jakarta Sans (display) e Inter (corpo), via Google Fonts
- Deploy: GitHub Pages (branch `main`, raiz `/`) + domínio custom (`CNAME`)

## Estrutura

```
.
├── index.html          # home (JSON-LD: Organization, SoftwareApplication, FAQPage)
├── coexistencia-whatsapp/index.html   # landing /coexistencia-whatsapp/
├── crm-whatsapp-ia/index.html         # landing /crm-whatsapp-ia/
├── css/
│   ├── base.css        # reset, tokens (:root), tipografia, botões
│   ├── sections.css    # cabeçalho, hero, passos, cartões, faixa, rodapé, breakpoints
│   └── chat.css        # cena de conversa animada do hero
├── logo/               # wordmark em SVG (arquivo-mestre) e PNG
├── favicon/
├── img/                # selo oficial Meta Business Partner (PNG @2x, arte sem alteração)
├── og-image.png        # 1200×630 para compartilhamento
├── preview.sh          # capturas em desktop e mobile via Chrome headless
├── robots.txt          # libera buscadores e crawlers de IA, aponta o sitemap
├── sitemap.xml         # estático: atualize ao criar página nova
├── llms.txt            # resumo do produto para assistentes de IA (GEO)
└── CNAME               # prontto.ai
```

Os módulos CSS entram como `<link>` separados no `<head>`, na ordem da cascata.
Não existe agregador com `@import`: ele serializaria as requisições e atrasaria a
primeira renderização.

## Rodar localmente

```bash
open index.html
```

A home abre direto do arquivo. As páginas internas usam caminhos absolutos (`/css/...`),
então para elas sirva a raiz: `python3 -m http.server` e acesse `localhost:8000`.

As páginas internas repetem o cabeçalho e o rodapé da home (a pasta `logo/` não é
publicada, por isso a logo vai inline). Ao mudar o rodapé da home, replique nelas.

## Conferir o visual

```bash
./preview.sh
```

Gera `.preview/desktop.png` e `.preview/mobile.png` com Chrome headless em container.
Requer Docker. O projeto precisa ficar sob `/Users`, que o Docker Desktop compartilha.

## Marca

- `logo/prontto-wordmark.svg` é o **arquivo-mestre**. Usa `fill="currentColor"`, então
  herda a cor do contexto: basta inseri-lo inline e definir `color`.
- Não existe fonte vetorial anterior. Qualquer variação parte desse SVG.
- Paleta: navy `#0d263c` (tinta da logo) e âmbar `#f6a623`.

## Contato

WhatsApp (44) 3170-1799 · [rarotecnologia.com](https://rarotecnologia.com)

## Deploy

Push na branch `main` publica automaticamente via GitHub Pages.
