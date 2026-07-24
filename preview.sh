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
