/* =====================================================================
   RENDERER
   Baut Header, Projekt-Raster, Projektseiten und Lightbox aus
   den Daten in content/site.js. Normalerweise musst du hier nichts
   ändern, um Inhalte zu pflegen.
   ===================================================================== */
(function () {
  "use strict";

  const S = window.SITE;
  if (!S) {
    document.body.innerHTML = "<p style='padding:40px'>content/site.js konnte nicht geladen werden.</p>";
    return;
  }

  const page = document.body.dataset.page || "work";
  const app = document.getElementById("app");

  /* ---------------------------------------------------------------- Helfer */
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const projectUrl = (p) => `project.html?p=${encodeURIComponent(p.slug)}`;

  function setMeta(title, description) {
    document.title = title ? `${S.title} – ${title}` : S.title;
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.name = "description";
      document.head.appendChild(m);
    }
    m.content = description || S.description || "";
  }

  /* ---------------------------------------------------------------- Global */
  document.documentElement.lang = S.lang || "de";
  /* Hintergrund pro Seite: Standard (S.background) + ggf. Projekt-Standard
     (S.projectBackground) + eigene Werte der Seite/des Projekts. */
  function applyBackground(...layers) {
    const norm = (b) => (typeof b === "string" ? { image: b } : b || {});
    const bg = Object.assign({}, ...layers.map(norm));
    const root = document.documentElement.style;
    if (bg.image) {
      // Pfad absolut machen: relative url() in CSS-Variablen würden sonst relativ
      // zu assets/css/style.css aufgelöst (→ Bild nicht gefunden).
      const url = new URL(bg.image, document.baseURI).href;
      root.setProperty("--bg-image", `url("${url}")`);
    }
    if (bg.overlay !== undefined) root.setProperty("--bg-overlay", String(bg.overlay));
    if (bg.position) root.setProperty("--bg-position", bg.position);
    if (bg.color) root.setProperty("--bg", bg.color);
  }
  if (S.favicon && !document.querySelector('link[rel="icon"]')) {
    const l = document.createElement("link");
    l.rel = "icon";
    l.href = S.favicon;
    document.head.appendChild(l);
  }

  /* ---------------------------------------------------------------- Header */
  function renderHeader() {
    const activePage = page === "project" ? "work" : page;
    const links = S.nav
      .map((n) => `<a href="${esc(n.href)}"${n.page === activePage ? ' class="is-active" aria-current="page"' : ""}>${esc(n.label)}</a>`)
      .join("");

    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <nav class="site-nav" aria-label="Hauptnavigation">${links}</nav>
      <a class="logo" href="index.html">${esc(S.name)}</a>
      <button class="menu-toggle" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobile-nav">
        <span></span><span></span><span></span>
      </button>`;
    document.body.prepend(header);

    const mobile = document.createElement("div");
    mobile.className = "mobile-nav";
    mobile.id = "mobile-nav";
    mobile.innerHTML = `<button class="menu-close" aria-label="Menü schließen"></button>${links}`;
    document.body.appendChild(mobile);

    const toggle = header.querySelector(".menu-toggle");
    const open = (state) => {
      mobile.classList.toggle("is-open", state);
      toggle.setAttribute("aria-expanded", String(state));
      document.body.style.overflow = state ? "hidden" : "";
    };
    toggle.addEventListener("click", () => open(true));
    mobile.querySelector(".menu-close").addEventListener("click", () => open(false));
    mobile.addEventListener("click", (e) => { if (e.target.tagName === "A") open(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") open(false); });

    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------- Footer + Nach oben */
  function renderFooter() {
    if (S.footer) {
      const f = document.createElement("footer");
      f.className = "site-footer";
      f.innerHTML = S.footer;
      document.body.appendChild(f);
    }

    const btn = document.createElement("button");
    btn.className = "back-to-top";
    btn.setAttribute("aria-label", "Nach oben");
    btn.innerHTML = '<svg viewBox="0 0 26 26" aria-hidden="true"><polygon points="13 .5 0 13.5 7.5 13.5 7.5 25.5 18.5 25.5 18.5 13.5 26 13.5"/></svg>';
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.body.appendChild(btn);
    const onScroll = () => btn.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------- Work-Raster */
  function renderWork() {
    applyBackground(S.background);
    setMeta("", S.description);
    app.innerHTML = `
      <h1 class="visually-hidden">${esc(S.title)} – Work</h1>
      <div class="project-grid">
        ${S.projects
          .map(
            (p, i) => `
          <a class="project-cover" href="${projectUrl(p)}">
            <img src="${esc(p.cover)}" alt="" ${i > 5 ? 'loading="lazy"' : ""} decoding="async">
            <span class="cover-title">${esc(p.title)}</span>
          </a>`
          )
          .join("")}
      </div>`;
  }

  /* ---------------------------------------------------------------- Module */
  function renderModule(m, ctx) {
    switch (m.type) {
      case "text": {
        const cls = ["module", "module-text"];
        if (m.size === "large") cls.push("is-large");
        if (m.size === "xl") cls.push("is-xl");
        if (m.align === "center") cls.push("is-center");
        return `<div class="${cls.join(" ")}"><div class="rich-text">${m.html || ""}</div></div>`;
      }

      case "image": {
        const idx = ctx.images.push({ src: m.full || m.src, alt: m.alt || ctx.title }) - 1;
        const dims = m.width && m.height ? ` width="${m.width}" height="${m.height}"` : "";
        return `
          <figure class="module module-image" style="margin:0 auto">
            <button type="button" data-lb="${idx}" aria-label="Bild vergrößern">
              <img src="${esc(m.src)}" alt="${esc(m.alt || ctx.title)}"${dims} loading="lazy" decoding="async">
            </button>
            ${m.caption ? `<figcaption class="caption rich-text">${m.caption}</figcaption>` : ""}
          </figure>`;
      }

      case "gallery": {
        const rowH = m.rowHeight ? `--gallery-row-h:${m.rowHeight}px;` : "";
        const items = m.images
          .map((img) => {
            const idx = ctx.images.push({ src: img.full || img.src, alt: img.alt || ctx.title, caption: img.caption }) - 1;
            const ar = img.w && img.h ? img.w / img.h : 1.5;
            return `
              <button type="button" class="gallery-item" data-lb="${idx}"
                style="flex:${ar.toFixed(4)} 1 calc(${ar.toFixed(4)} * var(--gallery-row-h))" aria-label="Bild vergrößern">
                <i style="padding-bottom:${(100 / ar).toFixed(4)}%"></i>
                <img src="${esc(img.src)}" alt="${esc(img.alt || ctx.title)}" loading="lazy" decoding="async">
              </button>`;
          })
          .join("");
        return `<div class="module module-gallery"><div class="gallery" style="${rowH}">${items}</div></div>`;
      }

      case "video": {
        let inner;
        const ratio = m.ratio || 56.25;
        if (m.file) {
          const attrs = m.autoplay ? "autoplay muted loop playsinline" : "controls playsinline preload=\"metadata\"";
          const poster = m.poster ? ` poster="${esc(m.poster)}"` : "";
          inner = `<div class="video-frame" style="padding-bottom:${ratio}%"><video src="${esc(m.file)}" ${attrs}${poster}></video></div>`;
        } else {
          inner = `
            <div class="video-frame" style="padding-bottom:${ratio}%">
              <iframe src="${esc(m.embed)}" title="${esc(m.title || ctx.title)}" loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>
            </div>`;
        }
        return `<div class="module module-video">${inner}${m.caption ? `<div class="caption rich-text">${m.caption}</div>` : ""}</div>`;
      }

      case "row": {
        const cols = m.columns
          .map((c) => `<div class="row-col" style="flex:${c.width || 1} 1 0">${(c.modules || []).map((x) => renderModule(x, ctx)).join("")}</div>`)
          .join("");
        return `<div class="module module-row"><div class="row align-${m.align || "top"}">${cols}</div></div>`;
      }

      default:
        console.warn("Unbekannter Modul-Typ:", m);
        return "";
    }
  }

  function renderModules(modules, title) {
    const ctx = { images: [], title };
    const html = `<div class="modules">${(modules || []).map((m) => renderModule(m, ctx)).join("")}</div>`;
    return { html, images: ctx.images };
  }

  function pageHeader(title, description) {
    return `
      <header class="page-header">
        <h1>${esc(title)}</h1>
        ${description ? `<p class="description">${esc(description)}</p>` : ""}
      </header>`;
  }

  /* ---------------------------------------------------------------- Projektseite */
  function renderProject() {
    const slug = new URLSearchParams(location.search).get("p");
    const i = S.projects.findIndex((p) => p.slug === slug);
    const p = S.projects[i];
    applyBackground(S.background, S.projectBackground, p && p.background);

    if (!p) {
      setMeta("Nicht gefunden");
      app.innerHTML = `${pageHeader("Projekt nicht gefunden")}<p style="text-align:center"><a href="index.html">← Zurück zu allen Projekten</a></p>`;
      return;
    }

    setMeta(p.title, p.description);
    const { html, images } = renderModules(p.modules, p.title);

    let pager = "";
    if (S.projectNav && S.projects.length > 1) {
      const prev = S.projects[(i - 1 + S.projects.length) % S.projects.length];
      const next = S.projects[(i + 1) % S.projects.length];
      pager = `
        <nav class="project-pager" aria-label="Weitere Projekte">
          <a class="prev" href="${projectUrl(prev)}">← ${esc(prev.title)}</a>
          <a class="all" href="index.html">Alle Projekte</a>
          <a class="next" href="${projectUrl(next)}">${esc(next.title)} →</a>
        </nav>`;
    }

    app.innerHTML = pageHeader(p.title, p.description) + html + pager;
    initLightbox(images);
  }

  /* ---------------------------------------------------------------- Einfache Seiten */
  function renderSimplePage(key) {
    const pg = S.pages[key];
    applyBackground(S.background, pg && pg.background);
    if (!pg) return;
    setMeta(pg.title, pg.description);
    const { html, images } = renderModules(pg.modules, pg.title);
    app.innerHTML = pageHeader(pg.title, pg.description) + html;
    initLightbox(images);
  }

  /* ---------------------------------------------------------------- Lightbox */
  function initLightbox(images) {
    if (!images.length) return;

    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Bildansicht");
    lb.innerHTML = `
      <img alt="">
      <button class="lb-close" aria-label="Schließen">×</button>
      <button class="lb-prev" aria-label="Vorheriges Bild">‹</button>
      <button class="lb-next" aria-label="Nächstes Bild">›</button>
      <div class="lb-count"></div>`;
    document.body.appendChild(lb);

    const img = lb.querySelector("img");
    const count = lb.querySelector(".lb-count");
    let current = 0;
    let lastFocus = null;

    const show = (n) => {
      current = (n + images.length) % images.length;
      img.src = images[current].src;
      img.alt = images[current].alt || "";
      count.textContent = images.length > 1 ? `${current + 1} / ${images.length}` : "";
    };
    const open = (n) => {
      lastFocus = document.activeElement;
      show(n);
      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
      lb.querySelector(".lb-close").focus();
    };
    const close = () => {
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    };

    const single = images.length < 2;
    lb.querySelector(".lb-prev").hidden = single;
    lb.querySelector(".lb-next").hidden = single;

    app.addEventListener("click", (e) => {
      const t = e.target.closest("[data-lb]");
      if (t) open(+t.dataset.lb);
    });
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
    lb.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });

    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });

    // Wischen auf Touch-Geräten
    let x0 = null;
    lb.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ---------------------------------------------------------------- Eigener Mauszeiger */
  function initCursor() {
    // Standardwerte – können in content/site.js mit `cursor: { … }` überschrieben werden
    const c = Object.assign(
      {
        enabled: true,
        color: "#1f5bff",   // Farbe
        size: 14,           // Durchmesser in px
        hoverSize: 44,      // Größe über Links und Projekten
        blend: "multiply"   // "multiply" | "screen" | "difference" | "normal" …
      },
      S.cursor
    );
    if (!c.enabled) return;
    // Nur bei echter Maus (nicht auf Touch-Geräten)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    if (c.color) root.style.setProperty("--cursor-color", c.color);
    if (c.size) root.style.setProperty("--cursor-size", `${c.size}px`);
    if (c.blend) root.style.setProperty("--cursor-blend", c.blend);
    const scaleHover = c.hoverSize && c.size ? c.hoverSize / c.size : 3;
    root.style.setProperty("--cursor-hover-scale", String(scaleHover));

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot);

    let x = -100, y = -100, raf = null;
    const draw = () => {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = null;
    };
    const interactive = "a, button, [data-lb], label, input, textarea, select";

    document.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
      dot.classList.add("is-visible");
      if (!raf) raf = requestAnimationFrame(draw);
    }, { passive: true });

    document.addEventListener("mouseover", (e) => {
      // Über eingebetteten Videos (iframes) bekommt die Seite keine Mausdaten → ausblenden
      if (e.target.tagName === "IFRAME") return dot.classList.remove("is-visible");
      dot.classList.toggle("is-hover", !!e.target.closest(interactive));
    });
    document.addEventListener("mouseout", (e) => {
      if (!e.relatedTarget) dot.classList.remove("is-visible");
    });
    document.addEventListener("mousedown", () => dot.classList.add("is-down"));
    document.addEventListener("mouseup", () => dot.classList.remove("is-down"));
  }

  /* ---------------------------------------------------------------- Start */
  renderHeader();
  if (page === "work") renderWork();
  else if (page === "project") renderProject();
  else renderSimplePage(page);
  renderFooter();
  initCursor();
})();
