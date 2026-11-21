# Portfolio – João Rio Lübeck

Nachbau meines Adobe-Portfolio-Auftritts (joaoriolubeck.myportfolio.com) als schlanke,
statische Website: reines HTML, CSS und JavaScript, ohne Build-Schritt und ohne Framework.
Sie läuft direkt auf **GitHub Pages**.

## Aufbau

```
index.html          Startseite „Work“ (Projekt-Raster)
project.html        Projektseite, z. B. project.html?p=kw9
about.html          About
contact.html        Contact
404.html            Fehlerseite

content/site.js     ← ALLE INHALTE: Name, Navigation, Texte, Projekte, Bilder, Videos
assets/css/style.css  Design (Farben, Schrift, Abstände oben in :root)
assets/js/main.js   baut die Seiten aus content/site.js
assets/images/      lokale Bilder (nach dem Download-Skript)
tools/download-images.py  holt die Bilder von Adobe ins Repo
```

Für neue Inhalte musst du fast immer nur **`content/site.js`** bearbeiten.

## 1. Lokal ansehen

Einfach `index.html` im Browser öffnen (Doppelklick). Alternativ mit lokalem Server:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## 2. Bilder von Adobe übernehmen (wichtig!)

Am Anfang zeigen die Bild-Links noch auf Adobes Server (`cdn.myportfolio.com`).
Damit die Seite unabhängig wird, einmal im Projektordner ausführen:

```bash
python3 tools/download-images.py
```

Das Skript lädt alle ~53 Bilder nach `assets/images/<projekt>/` und trägt die
lokalen Pfade automatisch in `content/site.js` ein. **Mach das, bevor du dein
Adobe-Portfolio löschst oder das Abo kündigst.**

## 3. Videos

Die meisten Videos sind noch über den Adobe-Videoplayer eingebettet
(`www-ccv.adobe.io/...`). Die funktionieren, solange die Videos bei Adobe liegen.
Langfristig besser: Videos auf **YouTube** oder **Vimeo** hochladen und den Link tauschen:

```js
{ type: "video", embed: "https://www.youtube.com/embed/VIDEO-ID", ratio: 56.25 }
// oder Vimeo:
{ type: "video", embed: "https://player.vimeo.com/video/VIDEO-ID", ratio: 56.25 }
```

Oder als MP4 direkt im Repo (GitHub erlaubt max. 100 MB pro Datei, besser < 50 MB):

```js
{ type: "video", file: "assets/videos/showreel.mp4", ratio: 56.25 }
{ type: "video", file: "assets/videos/loop.mp4", ratio: 56.25, autoplay: true } // stumm, in Schleife
```

`ratio` = Höhe ÷ Breite × 100 (16:9 = 56.25, 4:3 = 75, 9:16 = 177.78).

## 4. Auf GitHub Pages veröffentlichen

1. Auf github.com ein neues Repository anlegen.
   - Heißt es **`<dein-github-name>.github.io`**, ist die Seite direkt unter
     `https://<dein-github-name>.github.io` erreichbar.
   - Jeder andere Name (z. B. `portfolio`) → `https://<dein-github-name>.github.io/portfolio/`
2. Alle Dateien dieses Ordners hochladen (per Drag & Drop im Browser oder mit Git):
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<dein-github-name>/<repo-name>.git
   git push -u origin main
   ```
3. Im Repo: **Settings → Pages → Source: „Deploy from a branch“ → Branch `main`, Ordner `/ (root)`** → Save.
4. Nach ~1 Minute ist die Seite online. Jede Änderung, die du pushst, wird automatisch übernommen.

Eigene Domain? Unter Settings → Pages → „Custom domain“ eintragen.

## Neues Projekt hinzufügen

1. Bilder nach `assets/images/<neuer-slug>/` kopieren.
2. In `content/site.js` im Array `projects` einen Eintrag ergänzen (Position = Position im Raster):

```js
{
  slug: "mein-neues-projekt",
  title: "Mein neues Projekt",
  description: "Kurze Unterzeile",
  cover: "assets/images/mein-neues-projekt/cover.jpg",
  modules: [
    { type: "image", src: "assets/images/mein-neues-projekt/01.jpg", width: 1920, height: 1080 },
    { type: "text", html: "<p>Beschreibung des Projekts …</p>" },
    { type: "gallery", images: [
        { src: "assets/images/mein-neues-projekt/02.jpg", w: 1920, h: 1280 },
        { src: "assets/images/mein-neues-projekt/03.jpg", w: 1080, h: 1350 }
    ]},
    { type: "row", columns: [
        { width: 60, modules: [ { type: "image", src: "…", width: 1600, height: 900 } ] },
        { width: 40, modules: [ { type: "text", html: "<p>Text neben dem Bild</p>" } ] }
    ]}
  ]
}
```

`w`/`h` bzw. `width`/`height` sind die Pixelmaße des Bildes – damit wird die Galerie
im „Justified“-Look (wie bei Adobe) gesetzt.

## Design ändern

Oben in `assets/css/style.css` (Block `:root`) stehen Schrift, Farben, Abstände,
Breite des Rasters usw. als Variablen. Hintergrundbild: `background` in `content/site.js`.

## Was gegenüber Adobe dazugekommen ist

- Lightbox für alle Bilder (Pfeiltasten, Esc, Wischen auf dem Handy)
- „Vorheriges / Nächstes Projekt“ unter jeder Projektseite (`projectNav: false` schaltet es ab)
- Projekttitel auf Touch-Geräten sichtbar (dort gibt es kein Hover)
- Kontakt-Adresse als anklickbarer `mailto:`-Link
- kein Tracking, kein Adobe-Code, volle Kontrolle über alles
