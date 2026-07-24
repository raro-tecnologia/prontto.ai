# Landing page do Prontto — plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar em `prontto.ai` uma landing page de uma tela que converte visitante em conversa no WhatsApp e nomeia publicamente o Prontto como produto da Raro Tecnologia, requisito da Meta para aprovar o display name.

**Architecture:** Site estático sem build. Um `index.html` e três módulos CSS carregados por `<link>` direto no `<head>` (sem agregador `@import`, que serializa requisições). A cena de chat animada é CSS puro, sem JavaScript. Deploy por GitHub Pages com `CNAME`.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox, keyframes), Google Fonts (Plus Jakarta Sans + Inter). Zero dependências de runtime, zero JavaScript de terceiros.

## Global Constraints

- **Sem travessões (—) em qualquer texto visível ao visitante.** Use vírgula, ponto ou parênteses. Vale para toda a copy da página.
- **PT-BR apenas.** Sem `i18n.js`, sem atributos `data-i18n`, sem seletor de idioma.
- **Sem build.** Nenhum `package.json`, bundler, pré-processador ou passo de compilação. Abrir `index.html` no navegador tem que funcionar.
- **Número do WhatsApp:** `554431701799`. Link canônico: `https://wa.me/554431701799?text=Oi!%20Vim%20pelo%20site%20do%20Prontto%20e%20quero%20saber%20mais.`
- **O rodapé precisa conter o texto "Raro Tecnologia" com link para `https://rarotecnologia.com`.** É a evidência que a Meta verifica. Nenhuma tarefa pode removê-lo.
- **Sem preços, planos ou valores** em qualquer lugar da página.
- **Paleta:** navy `#0d263c` (tinta da logo) como base, âmbar `#f6a623` como acento. Não usar o verde do WhatsApp (`#25d366`) como cor de marca. Um ponto de status "online" em verde genérico na cena de chat é aceitável, por ser convenção universal de interface.
- **Acessibilidade:** todo texto precisa de contraste mínimo 4.5:1 contra seu fundo. Toda animação precisa ser desligada sob `prefers-reduced-motion: reduce`.
- **Nunca referencie tarefa, PR ou feature em comentário de código.**

---

### Task 1: Fundação, cabeçalho e rodapé

Entrega uma página que já carrega, já tem a marca no lugar e já satisfaz o requisito da Meta. É o menor recorte que vale um deploy.

**Files:**
- Create: `/Users/rchiarandi/projects/raro/prontto.ai/index.html`
- Create: `/Users/rchiarandi/projects/raro/prontto.ai/css/base.css`
- Create: `/Users/rchiarandi/projects/raro/prontto.ai/css/sections.css`
- Create: `/Users/rchiarandi/projects/raro/prontto.ai/CNAME`
- Create: `/Users/rchiarandi/projects/raro/prontto.ai/robots.txt`
- Create: `/Users/rchiarandi/projects/raro/prontto.ai/preview.sh`
- Modify: `/Users/rchiarandi/projects/raro/prontto.ai/.gitignore`

**Interfaces:**
- Consumes: assets já commitados em `logo/` e `favicon/` (ver spec).
- Produces: as custom properties de `css/base.css` (`--ink`, `--ink-deep`, `--amber`, `--paper`, `--text-soft`, `--space-*`, `--radius`, `--shell`), as classes `.container`, `.btn`, `.btn--primary`, `.btn--ghost`, `.eyebrow`, e o link canônico do WhatsApp. Todas as tarefas seguintes dependem destes nomes.

- [ ] **Step 1: Criar o `.gitignore` com a pasta de previews**

Substitua o conteúdo de `.gitignore` por:

```
.DS_Store
.preview/
```

- [ ] **Step 2: Criar o script de preview**

Crie `preview.sh`. Ele renderiza a página em desktop e mobile usando Chrome headless num container, sem instalar nada no host. O projeto fica sob `/Users`, que o Docker Desktop compartilha (`/private/tmp` não é compartilhado).

```bash
#!/usr/bin/env bash
# Renderiza a pagina em desktop e mobile para conferencia visual.
set -euo pipefail

cd "$(dirname "$0")"
mkdir -p .preview

docker run --rm -v "$PWD":/w zenika/alpine-chrome \
  --no-sandbox --disable-gpu --hide-scrollbars \
  --window-size=1440,1100 \
  --screenshot=/w/.preview/desktop.png \
  file:///w/index.html

docker run --rm -v "$PWD":/w zenika/alpine-chrome \
  --no-sandbox --disable-gpu --hide-scrollbars \
  --window-size=390,1400 \
  --screenshot=/w/.preview/mobile.png \
  file:///w/index.html

echo "gerado: .preview/desktop.png e .preview/mobile.png"
```

Torne executável:

```bash
chmod +x /Users/rchiarandi/projects/raro/prontto.ai/preview.sh
```

- [ ] **Step 3: Criar `CNAME` e `robots.txt`**

`CNAME` (uma linha, sem protocolo):

```
prontto.ai
```

`robots.txt`:

```
User-agent: *
Allow: /
```

- [ ] **Step 4: Criar `css/base.css` com os tokens**

```css
/* Reset, tokens da marca, tipografia e botoes. */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:root {
    /* Tinta da logo e suas variacoes */
    --ink: #0d263c;
    --ink-deep: #081a2a;
    --ink-soft: #1c3a56;
    --ink-line: rgba(255, 255, 255, 0.12);

    /* Acento */
    --amber: #f6a623;
    --amber-strong: #e08f10;
    --amber-glow: rgba(246, 166, 35, 0.28);

    /* Superficies claras */
    --paper: #fbfaf8;
    --paper-alt: #f3f1ec;
    --border: #e4e0d9;

    /* Texto */
    --text: #0d263c;
    --text-soft: #4d6072;
    --text-on-dark: rgba(255, 255, 255, 0.78);

    --font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
    --font-body: 'Inter', system-ui, sans-serif;

    --space-xs: 0.5rem;
    --space-sm: 1rem;
    --space-md: 1.5rem;
    --space-lg: 2.5rem;
    --space-xl: 4rem;
    --space-2xl: 6rem;

    --shell: 1120px;
    --radius: 14px;
    --radius-lg: 24px;
    --shadow: 0 2px 8px rgba(13, 38, 60, 0.06);
    --shadow-lg: 0 24px 60px rgba(8, 26, 42, 0.18);
    --ease: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-body);
    font-size: 17px;
    line-height: 1.6;
    color: var(--text);
    background-color: var(--paper);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
}

h1, h2, h3 {
    font-family: var(--font-display);
    line-height: 1.15;
    letter-spacing: -0.03em;
    font-weight: 800;
}

h1 { font-size: clamp(2.25rem, 5vw, 3.4rem); }
h2 { font-size: clamp(1.75rem, 3.4vw, 2.5rem); }
h3 { font-size: 1.15rem; font-weight: 700; letter-spacing: -0.02em; }

p { margin-bottom: var(--space-sm); }
p:last-child { margin-bottom: 0; }

a { color: inherit; text-decoration: none; }

img, svg { max-width: 100%; }

.container {
    width: 100%;
    max-width: var(--shell);
    margin: 0 auto;
    padding: 0 var(--space-md);
}

/* Rotulo curto acima de um titulo de secao */
.eyebrow {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--amber-strong);
    margin-bottom: var(--space-sm);
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.9rem 1.6rem;
    border: 1px solid transparent;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    cursor: pointer;
    transition: transform var(--ease), background-color var(--ease),
                box-shadow var(--ease), border-color var(--ease);
}

.btn svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
}

.btn--primary {
    background-color: var(--amber);
    color: var(--ink);
    box-shadow: 0 8px 24px var(--amber-glow);
}

.btn--primary:hover {
    background-color: var(--amber-strong);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px var(--amber-glow);
}

.btn--ghost {
    background-color: transparent;
    color: #fff;
    border-color: var(--ink-line);
}

.btn--ghost:hover {
    border-color: rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.06);
}

.btn:focus-visible,
a:focus-visible {
    outline: 3px solid var(--amber);
    outline-offset: 3px;
}
```

- [ ] **Step 5: Criar `css/sections.css` com cabeçalho e rodapé**

```css
/* Cabecalho */
.site-header {
    position: sticky;
    top: 0;
    z-index: 20;
    background-color: rgba(8, 26, 42, 0.88);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--ink-line);
}

.site-header .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    height: 68px;
}

.brand {
    display: flex;
    align-items: center;
    color: #fff;
}

.brand svg {
    height: 26px;
    width: auto;
}

.header-cta {
    padding: 0.6rem 1.2rem;
    font-size: 0.92rem;
}

/* Rodape */
.site-footer {
    background-color: var(--ink-deep);
    color: var(--text-on-dark);
    padding: var(--space-xl) 0 var(--space-lg);
}

.site-footer .container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-md);
}

.footer-brand svg {
    height: 30px;
    width: auto;
    color: #fff;
    margin-bottom: var(--space-xs);
}

.footer-parent {
    font-size: 0.95rem;
}

.footer-parent a {
    color: #fff;
    font-weight: 600;
    border-bottom: 1px solid var(--amber);
    padding-bottom: 1px;
}

.footer-parent a:hover {
    color: var(--amber);
}

.footer-contact {
    font-size: 0.9rem;
    text-align: right;
}

.footer-contact a:hover {
    color: var(--amber);
}
```

- [ ] **Step 6: Criar `index.html` com head, cabeçalho, main vazio e rodapé**

O `<svg>` do wordmark é inline (e não `<img>`) para herdar cor via `currentColor`, ficando branco no cabeçalho escuro sem precisar de um segundo arquivo.

Onde o markup abaixo diz `<!-- COLE AQUI ... -->`, substitua pelo conteúdo integral de `logo/prontto-wordmark.svg`. Para ver o que copiar:

```bash
cat /Users/rchiarandi/projects/raro/prontto.ai/logo/prontto-wordmark.svg
```

O arquivo já é um elemento `<svg>` completo, com `viewBox`, `fill="currentColor"` e `role="img"`. Copie do `<svg` até `</svg>` inclusive, sem alterar nada. Ele aparece duas vezes: uma no cabeçalho e uma no rodapé.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prontto | Seu lead atendido em segundos, 24 horas por dia</title>
    <meta name="description" content="O Prontto atende seus leads no WhatsApp e no Instagram em segundos, qualifica a conversa e preenche o CRM sozinho. Um produto Raro Tecnologia.">

    <meta property="og:title" content="Prontto | Seu lead atendido em segundos">
    <meta property="og:description" content="Atendente de IA que responde na hora, qualifica o lead e preenche o CRM sozinho.">
    <meta property="og:url" content="https://prontto.ai">
    <meta property="og:type" content="website">

    <link rel="icon" href="favicon/favicon.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16.png">
    <link rel="apple-touch-icon" href="favicon/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/sections.css">
    <link rel="stylesheet" href="css/chat.css">
</head>
<body>
    <header class="site-header">
        <div class="container">
            <a class="brand" href="/" aria-label="Prontto, página inicial">
                <!-- COLE AQUI o conteudo completo de logo/prontto-wordmark.svg -->
            </a>
            <a class="btn btn--primary header-cta"
               href="https://wa.me/554431701799?text=Oi!%20Vim%20pelo%20site%20do%20Prontto%20e%20quero%20saber%20mais."
               target="_blank" rel="noopener">
                Falar no WhatsApp
            </a>
        </div>
    </header>

    <main>
        <!-- hero, como funciona, o que faz e faixa entram nas tarefas seguintes -->
    </main>

    <footer class="site-footer">
        <div class="container">
            <div class="footer-brand">
                <!-- COLE AQUI o conteudo completo de logo/prontto-wordmark.svg -->
                <p class="footer-parent">
                    Um produto <a href="https://rarotecnologia.com" target="_blank" rel="noopener">Raro Tecnologia</a>
                </p>
            </div>
            <div class="footer-contact">
                <p>
                    <a href="https://wa.me/554431701799?text=Oi!%20Vim%20pelo%20site%20do%20Prontto%20e%20quero%20saber%20mais."
                       target="_blank" rel="noopener">WhatsApp (44) 3170-1799</a>
                </p>
            </div>
        </div>
    </footer>
</body>
</html>
```

- [ ] **Step 7: Criar `css/chat.css` vazio para o `<link>` não dar 404**

```css
/* Cena de conversa animada do hero. Implementada na Task 3. */
```

- [ ] **Step 8: Verificar os requisitos verificáveis por texto**

Rode da raiz do projeto:

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai
grep -c 'rarotecnologia.com' index.html
grep -c '554431701799' index.html
grep -c 'lang="pt-BR"' index.html
grep -o '—' index.html | wc -l
```

Esperado, nesta ordem: `1` ou mais, `2` ou mais, `1`, e `0` travessões.

- [ ] **Step 9: Verificar visualmente**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai && ./preview.sh
```

Esperado: gera `.preview/desktop.png` e `.preview/mobile.png`. Abra as duas imagens. O cabeçalho deve mostrar o wordmark branco sobre navy à esquerda e o botão âmbar à direita. O rodapé deve mostrar o wordmark e a linha "Um produto Raro Tecnologia" com "Raro Tecnologia" sublinhado em âmbar.

- [ ] **Step 10: Commit**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai
git add -A
git commit -m "feat: fundacao da landing com cabecalho, rodape e tokens da marca"
```

---

### Task 2: Hero

**Files:**
- Modify: `/Users/rchiarandi/projects/raro/prontto.ai/index.html` (dentro de `<main>`)
- Modify: `/Users/rchiarandi/projects/raro/prontto.ai/css/sections.css` (acrescentar ao fim)

**Interfaces:**
- Consumes: tokens e `.btn`, `.btn--primary`, `.btn--ghost` da Task 1.
- Produces: a section `.hero` com a coluna `.hero-visual`, onde a Task 3 injeta a cena de chat. A âncora `#como-funciona`, usada pelo botão secundário, é criada na Task 4.

- [ ] **Step 1: Acrescentar o CSS do hero ao fim de `css/sections.css`**

```css
/* Hero */
.hero {
    position: relative;
    background: radial-gradient(120% 100% at 15% 0%, var(--ink-soft) 0%, var(--ink-deep) 60%);
    color: #fff;
    padding: var(--space-2xl) 0;
    overflow: hidden;
}

.hero::after {
    /* brilho ambar difuso atras da cena de chat */
    content: "";
    position: absolute;
    top: 10%;
    right: -10%;
    width: 46%;
    height: 70%;
    background: radial-gradient(circle, var(--amber-glow) 0%, transparent 68%);
    pointer-events: none;
}

.hero .container {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    align-items: center;
    gap: var(--space-xl);
}

.hero h1 {
    margin-bottom: var(--space-md);
    text-wrap: balance;
}

.hero h1 em {
    font-style: normal;
    color: var(--amber);
}

.hero-sub {
    font-size: 1.12rem;
    color: var(--text-on-dark);
    max-width: 34rem;
    margin-bottom: var(--space-lg);
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
}

.hero-note {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.55);
}
```

- [ ] **Step 2: Inserir o markup do hero dentro de `<main>` no `index.html`**

Substitua o comentário dentro de `<main>` por:

```html
        <section class="hero">
            <div class="container">
                <div class="hero-copy">
                    <h1>Seu lead é atendido <em>em segundos</em>. A qualquer hora.</h1>
                    <p class="hero-sub">
                        Quem responde primeiro leva a venda, e o lead que chega de madrugada
                        não espera até segunda. O Prontto atende no WhatsApp e no Instagram,
                        qualifica a conversa e entrega o contato no seu funil já preenchido.
                    </p>
                    <div class="hero-actions">
                        <a class="btn btn--primary"
                           href="https://wa.me/554431701799?text=Oi!%20Vim%20pelo%20site%20do%20Prontto%20e%20quero%20saber%20mais."
                           target="_blank" rel="noopener">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.25-1.38A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.13c-1.6 0-3.09-.47-4.35-1.28l-.31-.2-3.11.82.83-3.03-.2-.32A8.1 8.1 0 0 1 3.87 12 8.13 8.13 0 1 1 12 20.13zm4.5-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/></svg>
                            Conversar com o Prontto
                        </a>
                        <a class="btn btn--ghost" href="#como-funciona">Ver como funciona</a>
                    </div>
                    <p class="hero-note">Sem instalar nada. O número que você já usa continua o mesmo.</p>
                </div>
                <div class="hero-visual">
                    <!-- a cena de chat entra na Task 3 -->
                </div>
            </div>
        </section>
```

- [ ] **Step 3: Verificar visualmente**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai && ./preview.sh
```

Esperado: hero escuro ocupando a primeira dobra, com a headline em duas ou três linhas, "em segundos" em âmbar, dois botões lado a lado e a coluna da direita ainda vazia.

- [ ] **Step 4: Conferir que não entrou travessão**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai && grep -o '—' index.html | wc -l
```

Esperado: `0`.

- [ ] **Step 5: Commit**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai
git add -A
git commit -m "feat: hero com promessa central e chamadas para acao"
```

---

### Task 3: Cena de chat animada

A peça que faz a página provar a promessa em vez de descrevê-la. CSS puro, sem JavaScript: uma linha do tempo de 12 segundos em laço, com a mensagem do lead, o indicador de digitando, a resposta e o selo de tempo entrando em sequência.

**Files:**
- Modify: `/Users/rchiarandi/projects/raro/prontto.ai/css/chat.css` (substituir o placeholder)
- Modify: `/Users/rchiarandi/projects/raro/prontto.ai/index.html` (dentro de `.hero-visual`)

**Interfaces:**
- Consumes: `.hero-visual` da Task 2 e os tokens da Task 1.
- Produces: nada consumido por tarefas seguintes.

- [ ] **Step 1: Escrever `css/chat.css`**

Todos os elementos compartilham a mesma duração (12s) e se diferenciam pelas porcentagens dos keyframes, e não por `animation-delay`. Com laço infinito, `animation-delay` desalinharia as repetições.

```css
/* Cena de conversa do hero: uma linha do tempo de 12s em laco. */
.chat-scene {
    width: min(400px, 100%);
    margin-left: auto;
    background-color: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--ink-line);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    padding: var(--space-sm);
    backdrop-filter: blur(6px);
}

.chat-top {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.35rem 0.35rem var(--space-sm);
    border-bottom: 1px solid var(--ink-line);
    margin-bottom: var(--space-sm);
}

.chat-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: var(--amber);
    color: var(--ink);
    display: grid;
    place-items: center;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1.05rem;
    flex-shrink: 0;
}

.chat-who {
    display: flex;
    flex-direction: column;
    line-height: 1.3;
    min-width: 0;
}

.chat-who strong {
    color: #fff;
    font-size: 0.95rem;
    font-weight: 600;
}

.chat-online {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
}

.chat-online::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #34d399;
}

.chat-clock {
    margin-left: auto;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.45);
    font-variant-numeric: tabular-nums;
}

.chat-body {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    min-height: 232px;
}

.bubble {
    max-width: 84%;
    padding: 0.7rem 0.95rem;
    border-radius: 16px;
    font-size: 0.94rem;
    line-height: 1.45;
    opacity: 0;
}

.bubble--in {
    align-self: flex-start;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    border-bottom-left-radius: 5px;
    animation: bubble-in 12s infinite;
}

.bubble--out {
    align-self: flex-end;
    background-color: var(--amber);
    color: var(--ink);
    font-weight: 500;
    border-bottom-right-radius: 5px;
    animation: bubble-out 12s infinite;
}

.typing {
    align-self: flex-end;
    display: flex;
    gap: 4px;
    padding: 0.8rem 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    border-bottom-right-radius: 5px;
    opacity: 0;
    animation: typing-window 12s infinite;
}

.typing span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
    animation: typing-dot 1.2s infinite;
}

.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }

.chat-badge {
    align-self: flex-end;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--amber);
    opacity: 0;
    animation: badge-in 12s infinite;
}

.chat-badge::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--amber);
}

/* Linha do tempo: entra, segura, sai, espera o proximo ciclo. */
@keyframes bubble-in {
    0%, 3% { opacity: 0; transform: translateY(10px); }
    7%, 86% { opacity: 1; transform: translateY(0); }
    94%, 100% { opacity: 0; transform: translateY(-6px); }
}

@keyframes typing-window {
    0%, 11% { opacity: 0; transform: translateY(10px); }
    15%, 27% { opacity: 1; transform: translateY(0); }
    30%, 100% { opacity: 0; transform: translateY(0); }
}

@keyframes bubble-out {
    0%, 30% { opacity: 0; transform: translateY(10px); }
    35%, 86% { opacity: 1; transform: translateY(0); }
    94%, 100% { opacity: 0; transform: translateY(-6px); }
}

@keyframes badge-in {
    0%, 37% { opacity: 0; }
    42%, 86% { opacity: 1; }
    94%, 100% { opacity: 0; }
}

@keyframes typing-dot {
    0%, 60%, 100% { opacity: 0.35; transform: translateY(0); }
    30% { opacity: 1; transform: translateY(-3px); }
}

/* Sem animacao: mostra o estado final da conversa. */
@media (prefers-reduced-motion: reduce) {
    .bubble--in,
    .bubble--out,
    .chat-badge {
        animation: none;
        opacity: 1;
    }

    .typing {
        display: none;
    }

    .typing span {
        animation: none;
    }
}
```

- [ ] **Step 2: Inserir o markup dentro de `.hero-visual` no `index.html`**

Substitua o comentário dentro de `<div class="hero-visual">` por:

```html
                    <div class="chat-scene" aria-hidden="true">
                        <div class="chat-top">
                            <span class="chat-avatar">P</span>
                            <span class="chat-who">
                                <strong>Prontto</strong>
                                <span class="chat-online">online agora</span>
                            </span>
                            <span class="chat-clock">23:47</span>
                        </div>
                        <div class="chat-body">
                            <p class="bubble bubble--in">Oi, vi o anúncio de vocês. Ainda dá tempo de contratar?</p>
                            <div class="typing"><span></span><span></span><span></span></div>
                            <p class="bubble bubble--out">Oi! Dá sim 👋 Me conta rapidinho, é para você ou para a sua empresa?</p>
                            <span class="chat-badge">respondeu em 4 segundos</span>
                        </div>
                    </div>
```

A cena leva `aria-hidden="true"` porque é ilustração: a promessa já está escrita na headline e no subtítulo, e um leitor de tela anunciando bolhas de conversa fictícias só atrapalharia.

- [ ] **Step 3: Verificar visualmente**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai && ./preview.sh
```

Esperado: o card de chat aparece na coluna direita do hero. Como a captura é um instante da animação, pode pegar o ciclo em qualquer ponto. Se o card sair completamente vazio, rode de novo para pegar outro instante antes de concluir que há erro.

- [ ] **Step 4: Verificar a linha do tempo no navegador**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai && open index.html
```

Esperado, em laço de 12 segundos: a mensagem do lead entra, o indicador de digitando aparece e some, a resposta em âmbar entra, o selo "respondeu em 4 segundos" aparece, tudo some e recomeça. Nada deve saltar ou piscar entre ciclos.

- [ ] **Step 5: Commit**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai
git add -A
git commit -m "feat: cena de conversa animada no hero"
```

---

### Task 4: Como funciona e o que ele faz

**Files:**
- Modify: `/Users/rchiarandi/projects/raro/prontto.ai/index.html` (após `.hero`)
- Modify: `/Users/rchiarandi/projects/raro/prontto.ai/css/sections.css` (acrescentar ao fim)

**Interfaces:**
- Consumes: tokens e `.eyebrow` da Task 1.
- Produces: a âncora `#como-funciona`, referenciada pelo botão secundário do hero na Task 2.

- [ ] **Step 1: Acrescentar o CSS ao fim de `css/sections.css`**

```css
/* Blocos claros */
.band {
    padding: var(--space-2xl) 0;
}

.band--alt {
    background-color: var(--paper-alt);
}

.band-head {
    max-width: 40rem;
    margin-bottom: var(--space-xl);
}

.band-head p {
    color: var(--text-soft);
    font-size: 1.05rem;
}

/* Como funciona: tres passos numerados */
.steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
    counter-reset: passo;
}

.step {
    counter-increment: passo;
}

.step::before {
    content: counter(passo);
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--ink);
    color: var(--amber);
    font-family: var(--font-display);
    font-weight: 800;
    margin-bottom: var(--space-sm);
}

.step h3 { margin-bottom: 0.4rem; }

.step p {
    color: var(--text-soft);
    font-size: 0.98rem;
}

/* O que ele faz: quatro cartoes */
.features {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
}

.feature {
    background-color: #fff;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: var(--space-lg);
    box-shadow: var(--shadow);
    transition: transform var(--ease), box-shadow var(--ease);
}

.feature:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(13, 38, 60, 0.1);
}

.feature h3 { margin-bottom: 0.4rem; }

.feature p {
    color: var(--text-soft);
    font-size: 0.98rem;
}
```

- [ ] **Step 2: Inserir as duas sections no `index.html`, logo após `</section>` do hero**

```html
        <section class="band" id="como-funciona">
            <div class="container">
                <div class="band-head">
                    <span class="eyebrow">Como funciona</span>
                    <h2>Do primeiro "oi" ao funil preenchido, sem ninguém digitar cadastro.</h2>
                </div>
                <div class="steps">
                    <div class="step">
                        <h3>O lead chama</h3>
                        <p>No WhatsApp ou no Instagram, a qualquer hora do dia. Por texto, áudio ou foto.</p>
                    </div>
                    <div class="step">
                        <h3>O Prontto atende</h3>
                        <p>Responde na hora, entende o contexto da conversa e faz as perguntas que qualificam o lead.</p>
                    </div>
                    <div class="step">
                        <h3>Chega pronto no funil</h3>
                        <p>O card aparece no seu CRM com os campos preenchidos e o próximo contato já agendado.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="band band--alt">
            <div class="container">
                <div class="band-head">
                    <span class="eyebrow">O que ele faz</span>
                    <h2>Um atendente que não dorme, não esquece e não deixa lead na fila.</h2>
                </div>
                <div class="features">
                    <article class="feature">
                        <h3>Responde em segundos, 24 horas</h3>
                        <p>Sem fila, sem horário comercial e sem lead esperando até segunda-feira para receber a primeira resposta.</p>
                    </article>
                    <article class="feature">
                        <h3>Entende áudio e imagem</h3>
                        <p>O cliente manda um áudio de quarenta segundos ou a foto de um produto. O Prontto entende e responde no mesmo assunto.</p>
                    </article>
                    <article class="feature">
                        <h3>Preenche o CRM sozinho</h3>
                        <p>Nome, necessidade, prazo e o que mais o seu time precisa saber. Tudo registrado durante a conversa.</p>
                    </article>
                    <article class="feature">
                        <h3>Volta quando o lead some</h3>
                        <p>Follow-up automático no tempo certo, mudando a abordagem a cada tentativa em vez de repetir a mesma mensagem.</p>
                    </article>
                </div>
            </div>
        </section>
```

- [ ] **Step 3: Verificar visualmente e conferir a âncora**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai && ./preview.sh
grep -c 'id="como-funciona"' index.html
grep -o '—' index.html | wc -l
```

Esperado: a âncora aparece `1` vez, zero travessões, e o desktop mostra três passos numerados em círculos navy com o número em âmbar, seguidos de quatro cartões brancos em grade 2×2 sobre fundo bege.

- [ ] **Step 4: Commit**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai
git add -A
git commit -m "feat: secoes de como funciona e capacidades do produto"
```

---

### Task 5: Faixa de dogfooding

O fecho da página: transforma o CTA em demonstração, dizendo que quem responde do outro lado é o próprio produto.

**Files:**
- Modify: `/Users/rchiarandi/projects/raro/prontto.ai/index.html` (após a section de capacidades)
- Modify: `/Users/rchiarandi/projects/raro/prontto.ai/css/sections.css` (acrescentar ao fim)

**Interfaces:**
- Consumes: tokens, `.btn` e `.btn--primary` da Task 1.
- Produces: nada consumido por tarefas seguintes.

- [ ] **Step 1: Acrescentar o CSS ao fim de `css/sections.css`**

```css
/* Faixa final */
.closing {
    background: radial-gradient(100% 140% at 50% 0%, var(--ink-soft) 0%, var(--ink-deep) 65%);
    color: #fff;
    padding: var(--space-2xl) 0;
    text-align: center;
}

.closing h2 {
    max-width: 24ch;
    margin: 0 auto var(--space-sm);
    text-wrap: balance;
}

.closing p {
    max-width: 46ch;
    margin: 0 auto var(--space-lg);
    color: var(--text-on-dark);
    font-size: 1.08rem;
}
```

- [ ] **Step 2: Inserir a section no `index.html`, logo após a section de capacidades**

```html
        <section class="closing">
            <div class="container">
                <h2>Este site é atendido pelo próprio Prontto.</h2>
                <p>
                    Manda uma mensagem agora e veja o produto trabalhando. Quem responde
                    do outro lado é ele, e um humano entra na conversa quando fizer sentido.
                </p>
                <a class="btn btn--primary"
                   href="https://wa.me/554431701799?text=Oi!%20Vim%20pelo%20site%20do%20Prontto%20e%20quero%20saber%20mais."
                   target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.25-1.38A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.13c-1.6 0-3.09-.47-4.35-1.28l-.31-.2-3.11.82.83-3.03-.2-.32A8.1 8.1 0 0 1 3.87 12 8.13 8.13 0 1 1 12 20.13zm4.5-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/></svg>
                    Conversar com o Prontto
                </a>
            </div>
        </section>
```

- [ ] **Step 3: Verificar**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai && ./preview.sh
grep -c 'wa.me/554431701799' index.html
```

Esperado: o contador de links do WhatsApp agora é `4` (cabeçalho, hero, faixa final e rodapé). A faixa aparece centralizada em navy escuro antes do rodapé.

- [ ] **Step 4: Commit**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai
git add -A
git commit -m "feat: faixa final convidando a testar o proprio produto"
```

---

### Task 6: Responsividade e acabamento

**Files:**
- Modify: `/Users/rchiarandi/projects/raro/prontto.ai/css/sections.css` (acrescentar ao fim)
- Modify: `/Users/rchiarandi/projects/raro/prontto.ai/css/chat.css` (acrescentar ao fim)

**Interfaces:**
- Consumes: todas as classes das tarefas anteriores.
- Produces: nada consumido por tarefas seguintes.

**Atenção à cascata:** os `<link>` carregam na ordem `base.css`, `sections.css`,
`chat.css`. Media query não aumenta especificidade, então uma regra `.chat-scene`
dentro de `@media` em `sections.css` perderia para a regra `.chat-scene` de
`chat.css`, que vem depois. Por isso o ajuste responsivo da cena de chat vai em
`chat.css`, e não junto dos outros breakpoints.

- [ ] **Step 1: Acrescentar os breakpoints ao fim de `css/sections.css`**

```css
/* Responsivo */
@media (max-width: 900px) {
    .hero .container {
        grid-template-columns: 1fr;
        gap: var(--space-lg);
    }

    .hero-sub { max-width: none; }

    .steps { grid-template-columns: 1fr; gap: var(--space-md); }
    .features { grid-template-columns: 1fr; }
}

@media (max-width: 620px) {
    :root {
        --space-2xl: 4rem;
        --space-xl: 2.5rem;
    }

    .site-header .container { height: 60px; }

    .brand svg { height: 22px; }

    .header-cta {
        padding: 0.5rem 0.9rem;
        font-size: 0.85rem;
    }

    .hero-actions .btn { width: 100%; }

    .site-footer .container {
        flex-direction: column;
        align-items: flex-start;
    }

    .footer-contact { text-align: left; }
}
```

- [ ] **Step 2: Acrescentar o ajuste da cena de chat ao fim de `css/chat.css`**

```css
/* No empilhamento do hero a cena passa a alinhar pela esquerda. */
@media (max-width: 900px) {
    .chat-scene {
        margin-left: 0;
        margin-right: auto;
    }
}
```

- [ ] **Step 3: Verificar nas duas larguras**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai && ./preview.sh
```

Esperado em `.preview/mobile.png` (390px): hero em coluna única com o card de chat abaixo do texto e alinhado à esquerda, botões ocupando a largura toda, passos e cartões empilhados, rodapé alinhado à esquerda. Nada pode vazar horizontalmente.

- [ ] **Step 4: Confirmar que não há rolagem horizontal**

Abra `index.html` no navegador, reduza a janela para 360px de largura e confirme que não aparece barra de rolagem horizontal.

- [ ] **Step 5: Commit**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai
git add -A
git commit -m "feat: breakpoints para tablet e celular"
```

---

### Task 7: Imagem social e README

**Files:**
- Create: `/Users/rchiarandi/projects/raro/prontto.ai/og-image.png`
- Create: `/Users/rchiarandi/projects/raro/prontto.ai/README.md`
- Modify: `/Users/rchiarandi/projects/raro/prontto.ai/index.html` (`<head>`)

**Interfaces:**
- Consumes: a página pronta das tarefas anteriores e `preview.sh` da Task 1.
- Produces: nada consumido por tarefas seguintes.

- [ ] **Step 1: Gerar a captura no formato social**

A proporção de compartilhamento é 1200×630. Rode:

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai
docker run --rm -v "$PWD":/w zenika/alpine-chrome \
  --no-sandbox --disable-gpu --hide-scrollbars \
  --window-size=1200,630 \
  --screenshot=/w/og-image.png \
  file:///w/index.html
ls -la og-image.png
```

Esperado: arquivo criado, mostrando o hero enquadrado em 1200×630.

- [ ] **Step 2: Conferir o enquadramento**

Abra `og-image.png`. A headline e o card de chat precisam estar visíveis e não cortados ao meio. Se o card de chat aparecer vazio (a captura pegou um vão da animação), rode o comando do Step 1 de novo.

- [ ] **Step 3: Referenciar a imagem no `<head>`**

Acrescente as duas linhas logo abaixo de `<meta property="og:type" content="website">`:

```html
    <meta property="og:image" content="https://prontto.ai/og-image.png">
    <meta name="twitter:card" content="summary_large_image">
```

- [ ] **Step 4: Escrever o `README.md`**

```markdown
# Prontto — landing page

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
├── index.html          # página única
├── css/
│   ├── base.css        # reset, tokens (:root), tipografia, botões
│   ├── sections.css    # cabeçalho, hero, passos, cartões, faixa, rodapé, breakpoints
│   └── chat.css        # cena de conversa animada do hero
├── logo/               # wordmark em SVG (arquivo-mestre) e PNG
├── favicon/
├── og-image.png        # 1200×630 para compartilhamento
├── preview.sh          # capturas em desktop e mobile via Chrome headless
├── robots.txt
└── CNAME               # prontto.ai
```

Os módulos CSS entram como `<link>` separados no `<head>`, na ordem da cascata.
Não existe agregador com `@import`: ele serializaria as requisições e atrasaria a
primeira renderização.

## Rodar localmente

```bash
open index.html
```

Como não há build nem requisição relativa a servidor, abrir o arquivo direto funciona.

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
```

- [ ] **Step 5: Commit**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai
git add -A
git commit -m "feat: imagem de compartilhamento social e README do projeto"
```

---

### Task 8: Publicar no GitHub Pages

Esta tarefa precisa da conta do GitHub e do acesso ao DNS do domínio. Confirme com o dono do projeto antes de executar.

**Files:**
- Nenhum arquivo novo. Configuração de repositório remoto e DNS.

**Interfaces:**
- Consumes: o repositório local com todos os commits das tarefas anteriores.
- Produces: o site público em `https://prontto.ai`, que é a evidência exigida pela Meta.

- [ ] **Step 1: Criar o repositório remoto e publicar**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai
gh repo create prontto-ai --public --source=. --remote=origin --push
```

Esperado: repositório criado e branch `main` enviada.

- [ ] **Step 2: Ativar o GitHub Pages na raiz da branch `main`**

```bash
cd /Users/rchiarandi/projects/raro/prontto.ai
gh api -X POST "repos/{owner}/prontto-ai/pages" \
  -f "source[branch]=main" -f "source[path]=/"
```

Esperado: resposta JSON com o status da configuração. Se retornar erro dizendo que já existe, siga adiante.

- [ ] **Step 3: Apontar o DNS do domínio**

No painel do registrador do `prontto.ai`, crie os quatro registros A do apex apontando para os IPs do GitHub Pages:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

E um CNAME de `www` para `<usuario>.github.io`.

Se o DNS estiver na Cloudflare, deixe os registros como "Somente DNS" (nuvem cinza), e não com proxy ativo. O proxy quebra a emissão do certificado do GitHub Pages.

- [ ] **Step 4: Confirmar a propagação e o certificado**

```bash
dig +short prontto.ai
curl -sI https://prontto.ai | head -3
```

Esperado: o `dig` lista os quatro IPs do GitHub Pages, e o `curl` retorna `HTTP/2 200`. A emissão do certificado pode levar alguns minutos após o DNS propagar.

- [ ] **Step 5: Confirmar que a prova para a Meta está no ar**

```bash
curl -s https://prontto.ai | grep -o 'rarotecnologia.com'
```

Esperado: pelo menos uma ocorrência. Com isso a página pública já nomeia o Prontto como produto da Raro Tecnologia, e o pedido de display name "Prontto" pode ser submetido no WhatsApp Manager.

---

## Depois deste plano

Fora do escopo desta implementação, na ordem em que fazem sentido:

1. Submeter "Prontto" como display name no WhatsApp Manager, agora com a prova pública no ar. Lembre que, depois do número registrado, a Meta exige 30 dias entre trocas de nome.
2. Conectar o número `554431701799` como conta no produto e escrever o prompt do agente que atende a landing. A verificação do número é por chamada de voz, porque é linha fixa.
3. Páginas de termos e privacidade, quando houver cadastro ou cobrança.
