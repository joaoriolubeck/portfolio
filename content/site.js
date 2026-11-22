/* =====================================================================
   INHALT DER WEBSITE
   ---------------------------------------------------------------------
   Hier pflegst du alles: Name, Navigation, Seiten und Projekte.
   Die Reihenfolge im Array `projects` = Reihenfolge im Raster auf "Work".

   Modul-Typen (für `modules` in Projekten und Seiten):
     { type: "text",    html: "<p>…</p>", align: "left|center", size: "normal|large|xl" }
     { type: "image",   src, width, height, alt?, caption? }
     { type: "gallery", images: [{ src, w, h, alt?, caption? }], rowHeight? }
     { type: "video",   embed: "https://…"  ODER  file: "assets/videos/x.mp4",
                        ratio: 56.25 (Höhe/Breite in %), caption?, autoplay? }
     { type: "row",     align: "top|center|bottom",
                        columns: [{ width: 60, modules: [ … ] }, { width: 40, modules: [ … ] }] }
   ===================================================================== */

window.SITE = {
  name: "João Rio Lübeck",
  title: "João Rio de Lima Lübeck",
  description: "I am Joao Rio, graphic designer and student.",
  lang: "de",

  favicon: "assets/images/site/favicon.jpg",
  background: "assets/images/site/background.jpg",

  // Navigation oben links. `page` muss zum data-page-Attribut der HTML-Datei passen.
  nav: [
    { label: "Work", href: "index.html", page: "work" },
    { label: "About", href: "about.html", page: "about" },
    { label: "Contact", href: "contact.html", page: "contact" }
  ],

  // Unter jedem Projekt Links zum vorherigen/nächsten Projekt anzeigen
  projectNav: true,

  // Fußzeile (leer lassen = keine Fußzeile). HTML erlaubt.
  footer: "",

  /* ------------------------------------------------------------------
     EINFACHE SEITEN (About, Contact, …)
     ------------------------------------------------------------------ */
  pages: {
    about: {
      title: "About",
      modules: [
        {
          type: "text",
          size: "large",
          html: `
<p>Ich bin João Rio, Student der Medientechnik an der TH Deggendorf. Die Begeisterung für kreative Gestaltung und digitales Design begleitet mich schon seit meiner Kindheit. Bereits als Kind habe ich mit Design und Videobearbeitung experimentiert. Mit zwölf Jahren entdeckte ich After Effects und fing an, aus Spaß Motion Graphics zu erstellen, von Intros für Freunde und kleinen Edits bis hin zu YouTube-Animationen und eigenen Projekten, durch die ich mich stetig verbessern konnte.</p>
<p>Über die Jahre entwickelte sich aus dieser Neugier ein umfassendes Interesse an der Medienwelt. Heute habe ich die Möglichkeit, das gesamte Spektrum dieses Bereichs zu erkunden: von Programmierung und Technik bis hin zu Design. Es macht mir großen Spaß, technisches Know-how mit Kreativität zu verbinden, um Ideen zum Leben zu erwecken, sei es durch Animationen, visuelles Design oder multimediale Projekte.</p>`
        }
      ]
    },

    contact: {
      title: "Contact",
      modules: [
        {
          type: "text",
          size: "xl",
          align: "center",
          html: `<p><a href="mailto:joaolubeck@gmail.com"><strong>joaolubeck@gmail.com</strong></a></p>`
        }
      ]
    }
  },

  /* ------------------------------------------------------------------
     PROJEKTE
     slug  = Teil der URL: project.html?p=<slug>
     cover = Vorschaubild im Raster (16:9 wird zugeschnitten)
     ------------------------------------------------------------------ */
  projects: [
    {
      slug: "interaktiver-360-raum",
      title: "Interaktiver 360° Raum",
      description: "Der Raum als lebendige Stimmung („Kreise der Bewegung“)",
      cover: "assets/images/interaktiver-360-raum/cover.png",
      modules: [
        { type: "image", src: "assets/images/interaktiver-360-raum/01.png", width: 1669, height: 932 },
        {
          type: "text",
          html: `
<p><strong>Der Raum als lebendige Stimmung („Kreise der Bewegung“)</strong></p>
<p>Dieses Projekt entstand im Rahmen des Moduls „Experimentelle Videoproduktion“ in Zusammenarbeit mit meiner Teampartnerin Alina Wagner. Ziel der interaktiven 360-Grad-Rauminstallation war es, den „Vibe“ einer Gruppe (das Kennenlernen, den Austausch und den Zusammenhalt) visuell und akustisch erlebbar zu machen.</p>
<p>Die Installation ist für bis zu vier Personen ausgelegt und besitzt einen eigenen szenischen Aufbau: Betritt ein Nutzer das 360-Grad-Lab, wird er von einem ROD-Laserscanner getrackt und die Umgebung erwacht zum Leben. Der Hintergrund baut sich stückweise aus unscharfen, leuchtenden und ineinanderfließenden Formen auf. Jedem Teilnehmer wird ein scharfkantiger, farbiger Kreis sowie ein eigener musikalischer Beat (erstellt aus einem alltäglichen Ampel-Piepsen via BandLab) zugewiesen. Durch den starken Kontrast heben sich die User-Kreise deutlich vom geblurrten Hintergrund ab. Sie folgen der Bewegung der Personen und reagieren visuell auf deren individuelle Audiospur. Versammeln sich die Nutzer im Zentrum, interagieren ihre Repräsentationen: Die Kreise verschmelzen organisch (technisch gelöst durch Metaballs im 3D-Raum), verfärben sich und die einzelnen Beats formen gemeinsam eine dynamische Komposition.</p>`
        },
        { type: "video", embed: "https://www-ccv.adobe.io/v1/player/ccv/Fc5EwL-R8KK/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View", ratio: 56.25 },
        {
          type: "row",
          align: "top",
          columns: [
            {
              width: 59,
              modules: [
                {
                  type: "gallery",
                  images: [
                    { src: "assets/images/interaktiver-360-raum/02.png", w: 1489, h: 666 },
                    { src: "assets/images/interaktiver-360-raum/03.png", w: 1064, h: 629 },
                    { src: "assets/images/interaktiver-360-raum/04.png", w: 478, h: 710 },
                    { src: "assets/images/interaktiver-360-raum/05.png", w: 1669, h: 934 },
                    { src: "assets/images/interaktiver-360-raum/06.png", w: 900, h: 576 }
                  ]
                }
              ]
            },
            {
              width: 41,
              modules: [
                { type: "video", embed: "https://www-ccv.adobe.io/v1/player/ccv/DfXiXJwjeMA/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View", ratio: 67.42 }
              ]
            }
          ]
        },
        {
          type: "text",
          html: `<p>Technisch realisiert wurde das Projekt hauptsächlich in TouchDesigner. Um die Herausforderungen des Laserscanners beim Tracking mehrerer Personen zu meistern, entwickelte ich eigens ein Python-Skript zur Spielerzuordnung. Zudem flossen meine Vorkenntnisse in After Effects und der Musikbearbeitung stark in die visuelle und auditive Gestaltung ein. Das finale Erlebnis zeigt eindrucksvoll, wie komplexe Technik und kreative Gestaltung verschmelzen können, um das unsichtbare Zusammenspiel einer Gruppe im Raum sichtbar zu machen.</p>`
        }
      ]
    },

    {
      slug: "doschauher-tv",
      title: "Doschauher TV",
      description: "Lichtgestaltung & technische Live-Produktion",
      cover: "assets/images/doschauher-tv/cover.jpg",
      modules: [
        {
          type: "gallery",
          images: [
            { src: "assets/images/doschauher-tv/01.jpg", w: 1920, h: 1080 },
            { src: "assets/images/doschauher-tv/02.png", w: 3840, h: 2880 },
            { src: "assets/images/doschauher-tv/03.png", w: 3840, h: 2880 },
            { src: "assets/images/doschauher-tv/04.jpg", w: 1095, h: 1533 },
            { src: "assets/images/doschauher-tv/05.jpg", w: 1920, h: 1439 },
            { src: "assets/images/doschauher-tv/06.jpg", w: 1600, h: 1132 }
          ]
        },
        {
          type: "text",
          html: `
<p>Im vierten Semester meines Medientechnik-Studiums an der TH Deggendorf war ich im Rahmen des Moduls „Grundlagen der Studioproduktion“ an der Umsetzung von Doschauher TV beteiligt. Bei diesem Großprojekt produziert ein studentisches Team eigenverantwortlich zwei 60-minütige Live-Talksendungen vor Publikum im Medienatelier, die parallel gestreamt werden. Ziel ist es, redaktionelle Konzeption und technische Studiogewerke in einer professionellen Produktionsstruktur zusammenzuführen.</p>
<p>Als Verantwortliche für das Gewerk Licht habe ich gemeinsam mit einer Kommilitonin den gesamten Beleuchtungs-Workflow geleitet und umgesetzt. Abgestimmt auf die redaktionelle Gesamtkonzeption und die dramaturgischen Anforderungen der Show entwickelten wir eine adäquate visuelle Stilistik. Unser technischer Aufgabenbereich umfasste:</p>
<ul>
  <li><strong>Konzeption &amp; Rigging:</strong> Planung des Setups sowie die praktische Arbeit an der Lichtdecke (Aufhängen, Ausrichten und Verkabeln der Studiotechnik).</li>
  <li><strong>Programmierung &amp; Operation:</strong> Einrichtung der Lichtstimmungen am Pult und die dynamische Live-Steuerung während der Proben und Sendungen.</li>
</ul>
<p>Das Projekt vermittelte tiefgehende Einblicke in die Funktionsweise und die hierarchischen Strukturen eines professionellen TV-Studios. Neben der handwerklichen Präzision an den Studiokomponenten forderte die Arbeit unter echten Live-Bedingungen vor allem klare Kommunikation, vorausschauendes Handeln und die enge, verantwortungsbewusste Abstimmung mit der Bildregie und anderen Technikgewerken.</p>`
        },
        {
          type: "row",
          align: "top",
          columns: [
            { width: 50, modules: [{ type: "video", embed: "https://www.youtube.com/embed/I8-OiaFmSqw", ratio: 56.25 }] },
            { width: 50, modules: [{ type: "video", embed: "https://www.youtube.com/embed/fIBu0U2q_l8", ratio: 56.25 }] }
          ]
        }
      ]
    },

    {
      slug: "thd-hochschule-app",
      title: "THD Hochschule App",
      description: "",
      cover: "assets/images/thd-hochschule-app/cover.png",
      modules: [
        {
          type: "video",
          embed: "https://www-ccv.adobe.io/v1/player/ccv/6hb-673RveP/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
          ratio: 56.25,
          caption: `
<p>Im Rahmen des Moduls „UI/UX Design“ im vierten Semester haben wir im Vierer-Team (gemeinsam mit Max Aulinger, Tobias Schreiber und Bastian Fuchs) die offizielle App der TH Deggendorf grundlegend überarbeitet und neu entwickelt. Ziel war es, eine minimalistische, hochfunktionale Anwendung zu schaffen, die den Studienalltag durch intuitive Abläufe und praxisnahe Features spürbar erleichtert.</p>
<p><strong>UI/UX &amp; Konzeption:</strong> Gemeinsame Ausarbeitung der Informationsarchitektur und der Designsprache. Der Schwerpunkt lag auf klarem Minimalismus und einer durchdachten User Experience, bei der Usability und die schnelle Erreichbarkeit aller Kernfunktionen im Vordergrund stehen.</p>
<p><strong>Entwicklung &amp; AI-Workflow:</strong> In der technischen Umsetzung teilten wir die Programmieraufgaben auf. Durch den gezielten Einsatz KI-gestützter Entwicklungswerkzeuge in Kombination mit den eigenen Programmierkenntnissen des Teams entstand aus dem Entwurf eine tatsächlich funktionierende, lauffähige Anwendung.</p>
<p><strong>Motion Design:</strong> Für die Abschlusspräsentation habe ich eine Motion-Design-Animation in Adobe After Effects konzipiert und umgesetzt. Das Video setzt die Kernfunktionen, das neue UX-Konzept und die visuelle Designsprache dynamisch in Szene und macht die Interaktionen der App anschaulich erlebbar.</p>`
        },
        {
          type: "gallery",
          images: [
            { src: "assets/images/thd-hochschule-app/01.png", w: 1179, h: 2556 },
            { src: "assets/images/thd-hochschule-app/02.png", w: 1179, h: 2556 },
            { src: "assets/images/thd-hochschule-app/03.png", w: 1179, h: 2556 },
            { src: "assets/images/thd-hochschule-app/04.png", w: 499, h: 907 },
            { src: "assets/images/thd-hochschule-app/05.png", w: 499, h: 907 },
            { src: "assets/images/thd-hochschule-app/06.png", w: 499, h: 907 },
            { src: "assets/images/thd-hochschule-app/07.png", w: 499, h: 907 }
          ]
        }
      ]
    },

    {
      slug: "multiple-exposure-fotografie",
      title: "Multiple Exposure Fotografie",
      description: "",
      cover: "assets/images/multiple-exposure-fotografie/cover.jpg",
      modules: [
        {
          type: "text",
          html: `<p>Auf dieser Seite zeige ich verschiedene Bildreihen, in denen ich mehrere Aufnahmen zu gemeinsamen Motiven verbinde. Dafür fotografiere ich über einen Zeitraum hinweg verschiedene Bilder und kombiniere sie anschließend in Photoshop mit unterschiedlichen Überblendungen. So entsteht ein digitaler Multiple-Exposure-Effekt, bei dem sich Momente, Formen und Stimmungen miteinander vermischen.</p>`
        },
        { type: "text", html: `<p><strong>Juazeiro do Norte Brasilien 2024-2026</strong></p>` },
        {
          type: "gallery",
          images: [
            { src: "assets/images/multiple-exposure-fotografie/01.jpg", w: 1920, h: 1440 },
            { src: "assets/images/multiple-exposure-fotografie/02.jpg", w: 1920, h: 1440 },
            { src: "assets/images/multiple-exposure-fotografie/03.jpg", w: 1920, h: 1440 },
            { src: "assets/images/multiple-exposure-fotografie/04.jpg", w: 1920, h: 1440 },
            { src: "assets/images/multiple-exposure-fotografie/05.jpg", w: 1920, h: 1440 },
            { src: "assets/images/multiple-exposure-fotografie/06.jpg", w: 1920, h: 1440 },
            { src: "assets/images/multiple-exposure-fotografie/07.jpg", w: 1920, h: 1440 }
          ]
        },
        { type: "text", html: `<p><strong>Inca Trail Peru 2025</strong></p>` },
        {
          type: "gallery",
          images: [
            { src: "assets/images/multiple-exposure-fotografie/08.jpg", w: 3840, h: 2880 },
            { src: "assets/images/multiple-exposure-fotografie/09.jpg", w: 3840, h: 2880 },
            { src: "assets/images/multiple-exposure-fotografie/10.jpg", w: 3840, h: 2880 },
            { src: "assets/images/multiple-exposure-fotografie/11.jpg", w: 3840, h: 2880 }
          ]
        },
        { type: "text", html: `<p><strong>Irland 2025</strong></p>` },
        {
          type: "gallery",
          images: [
            { src: "assets/images/multiple-exposure-fotografie/12.jpg", w: 3840, h: 2880 },
            { src: "assets/images/multiple-exposure-fotografie/13.jpg", w: 3840, h: 2880 },
            { src: "assets/images/multiple-exposure-fotografie/14.jpg", w: 3840, h: 2880 }
          ]
        }
      ]
    },

    {
      slug: "apple-product-project",
      title: "Apple Product Project",
      description: "",
      cover: "assets/images/apple-product-project/cover.jpg",
      modules: [
        {
          type: "video",
          embed: "https://www-ccv.adobe.io/v1/player/ccv/479Uwmm4V-d/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
          ratio: 56.25,
          caption: `<p>Dieses Animationsprojekt aus meinem ersten Semester widmete sich der Konzeption und Gestaltung eines fiktiven Apple-Produkts. Ich entwarf eine Soundbar, die sich nahtlos in das bestehende Apple-Ökosystem einfügt, und entwickelte dazu die passende visuelle Identität sowie die User Experience. Das finale Ergebnis ist eine Animation im Stil einer authentischen Apple-Werbung, die das Design und die Kernfunktionen des Produkts eindrucksvoll in Szene setzt.</p>`
        }
      ]
    },

    {
      slug: "therme-eins-bad-fuessing",
      title: "Therme Eins Bad Füssing",
      description: "",
      cover: "assets/images/therme-eins-bad-fuessing/cover.jpg",
      modules: [
        { type: "image", src: "assets/images/therme-eins-bad-fuessing/01.png", width: 1920, height: 1078 },
        {
          type: "text",
          html: `<p>Für diese Animation im Beckenbereich der „Therme Eins“ in Bad Füssing entwarf ich ein visuelles 3440×480-Panorama, das direkt auf eine der Poolwände projiziert wird. Das Projekt begann mit Parallax-Experimenten meiner eigenen Bergfotos aus Peru und entwickelte sich im Verlauf zu einer 2D-Landschaft, in der diese Aufnahmen dezent als Texturen integriert bleiben. Die fertige Animation präsentiert eine ruhige, atmosphärische Szene mit Bergen, Häusern, Schmetterlingen, Heißluftballons und sanften Blumenbewegungen auf einer Wiese.</p>`
        },
        {
          type: "video",
          embed: "https://www-ccv.adobe.io/v1/player/ccv/8-L44YHKRaT/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
          ratio: 56.25,
          caption: `<p style="text-align:center">Animation Loop<br>3440×480-Panorama</p>`
        }
      ]
    },

    {
      slug: "festival-design",
      title: "Festival Design",
      description: "",
      cover: "assets/images/festival-design/cover.jpg",
      modules: [
        {
          type: "row",
          align: "center",
          columns: [
            {
              width: 76,
              modules: [
                {
                  type: "gallery",
                  images: [
                    { src: "assets/images/festival-design/01.jpg", w: 1684, h: 2384 },
                    { src: "assets/images/festival-design/02.jpg", w: 3840, h: 2715 },
                    { src: "assets/images/festival-design/03.jpg", w: 3840, h: 2559 },
                    { src: "assets/images/festival-design/04.jpg", w: 3840, h: 2560 },
                    { src: "assets/images/festival-design/05.jpg", w: 3840, h: 2160 },
                    { src: "assets/images/festival-design/06.jpg", w: 3840, h: 2560 },
                    { src: "assets/images/festival-design/07.jpg", w: 3840, h: 2560 },
                    { src: "assets/images/festival-design/08.jpg", w: 3840, h: 2559 }
                  ]
                }
              ]
            },
            {
              width: 24,
              modules: [
                { type: "video", embed: "https://www-ccv.adobe.io/v1/player/ccv/QsidiUU-5hp/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View", ratio: 300.47 }
              ]
            }
          ]
        },
        {
          type: "text",
          html: `
<p>Im dritten Semester meines Studiums an der Hochschule entwickelte ich für ein fiktives Festival eine vollständige visuelle Identität. Inspiriert von kulturellen Veranstaltungen aus meiner Heimatstadt in Brasilien entstand ein stimmiges Designsystem, das sich konsequent über alle Anwendungen hinwegzieht, von Postern und Stickern bis zu Tickets und verschiedenen Mockups.</p>
<p>Ziel des Projekts war es, eine starke, wiedererkennbare Bildsprache zu entwickeln, die alle Berührungspunkte des Festivalerlebnisses harmonisch miteinander verbindet.</p>`
        }
      ]
    },

    {
      slug: "kw9",
      title: "KW9",
      description: "",
      cover: "assets/images/kw9/cover.png",
      modules: [
        {
          type: "video",
          embed: "https://www-ccv.adobe.io/v1/player/ccv/L_jwKgDQpRo/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
          ratio: 56.25,
          caption: `<p>Während meines Schülerpraktikums 2022 bei <a href="https://kw-neun.de" target="_blank" rel="noopener">KW9</a>, einer Marketing- und Designagentur in Augsburg, hatte ich die Möglichkeit, eine Animation zu konzipieren und zu entwickeln. Meine Aufgabe bestand darin, die visuelle Ausrichtung zu definieren, die Schlüsselelemente zu gestalten und die finale Animation im Einklang mit den kreativen Standards der Agentur zum Leben zu erwecken. Durch dieses Projekt konnte ich praktische Erfahrungen in einem professionellen Studioumfeld sammeln und gleichzeitig einen Beitrag zur visuellen Kommunikation von KW9 leisten.</p>`
        }
      ]
    },

    {
      slug: "motion-design-showreel",
      title: "Motion Design Showreel",
      description: "",
      cover: "assets/images/motion-design-showreel/cover.png",
      modules: [
        { type: "video", embed: "https://www-ccv.adobe.io/v1/player/ccv/-t2kijgsE_5/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View", ratio: 56.25 }
      ]
    }
  ]
};
