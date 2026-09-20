/*
  TRACKING DO SITE (GA4 + Meta Pixel)

  Um arquivo so, incluido no <head> de todas as paginas. Para trocar um ID,
  edite apenas as duas constantes abaixo.

  Alem do pageview padrao, todo clique em link de WhatsApp (wa.me) dispara:
    - GA4:   evento "whatsapp_click" (marcar como conversao no painel do GA4)
    - Pixel: evento padrao "Contact"
  O parametro "location" diz de que parte da pagina veio o clique
  (id da <section> mais proxima, ou header/footer).
*/
(function () {
  var GA4_ID = "G-LHW7TZGK24";
  var META_PIXEL_ID = "2090476029013728";

  /* ---- GA4 (gtag.js) ---- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA4_ID);

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
  document.head.appendChild(s);

  /* ---- Meta Pixel ---- */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0";
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s)
  }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");

  /* ---- Cliques no WhatsApp ---- */
  document.addEventListener("click", function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest("a[href]") : null;
    if (!a || a.href.indexOf("wa.me/") === -1) return;

    var region = a.closest("section, header, footer");
    var location = region ? (region.id || region.tagName.toLowerCase()) : "page";

    gtag("event", "whatsapp_click", {
      location: location,
      link_text: (a.textContent || "").trim().slice(0, 80),
      transport_type: "beacon"
    });
    fbq("track", "Contact", { content_name: location });
  });
})();
