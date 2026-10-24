# Recepten

Een eenvoudige, statische website met familierecepten, gehost via GitHub Pages.
Recepten hebben elk hun eigen pagina en worden op de startpagina gegroepeerd
per maaltijdtype. De site is installeerbaar als PWA en werkt na het eerste
bezoek ook offline.

## Recepten

- Hoofdgerechten
  - Pasta Rode Pesto
- Salades
  - Italiaanse salade met tomaat en mozzarella
- Nagerechten
  - Lemon bars
  - Crème brûlée-tiramisu

## Functies

- **Zoeken en filteren** - zoekveld en filterchips (vegetarisch, snel klaar,
  glutenvrij) op de startpagina.
- **Verrassingsrecept** - knop die naar een willekeurig recept navigeert.
- **Aantal aanpassen** - elk recept heeft een porties-/stukkenteller die de
  hoeveelheden in de ingrediëntenlijst live herberekent.
- **Print recept** - printvriendelijke knop per recept (gebruikt de bestaande
  printstylesheet).
- **Scherm actief houden** - knop die de Screen Wake Lock API gebruikt zodat
  een telefoon niet vergrendelt tijdens het koken (alleen zichtbaar als de
  browser dit ondersteunt).
- **Donkere modus** - volgt automatisch de systeemvoorkeur
  (`prefers-color-scheme`).
- **SEO en delen** - Open Graph/Twitter-tags en schema.org `Recipe`
  structured data per recept voor rijkere zoekresultaten en linkpreviews.
- **PWA** - installeerbaar via het webmanifest, met een service worker die de
  pagina's en afbeeldingen cachet voor gebruik zonder stabiele wifi.

## Lokaal bekijken

Open [index.html](index.html) direct in de browser, of serveer de map met een
eenvoudige static file server. De service worker en Wake Lock API vereisen
een secure context (HTTPS of `localhost`); via `file://` werken die twee
functies niet, de rest van de site wel.

## Structuur

- [index.html](index.html) - de startpagina met zoeken, filters en recepten
  per maaltijdtype
- [recipes/](recipes) - een losse pagina per recept
- [styles.css](styles.css) - alle opmaak, inclusief donkere modus
- [files/](files) - receptfoto's (elk als `.jpg`/`.png` met een geoptimaliseerde
  `.webp`-variant)
- [icons/](icons) - PWA-iconen
- [home.js](home.js) - zoeken, filteren en het verrassingsrecept
- [recipe-interactions.js](recipe-interactions.js) - printknop en porties-/
  stukkenteller
- [wake-lock.js](wake-lock.js) - "scherm actief houden"-knop
- [pwa-register.js](pwa-register.js) / [sw.js](sw.js) - PWA-registratie en
  offline caching
- [manifest.webmanifest](manifest.webmanifest) - PWA-manifest

## Nieuw recept toevoegen

1. Maak een nieuwe pagina in [recipes/](recipes), gebaseerd op een bestaand
   recept (bijv. [recipes/pasta-rode-pesto.html](recipes/pasta-rode-pesto.html)).
2. Stel de `.category-badge` en eventuele `.tag-badge`'s (vegetarisch, snel
   klaar, glutenvrij, ...) in op het juiste maaltijdtype/kenmerken.
3. Vul de `.recipe-meta`-regel (bereidingstijd, baktijd/kooktijd, aantal
   porties of stukken) en pas het schema.org-script aan.
4. Zet de ingrediëntenhoeveelheden die je wilt laten meeschalen in een
   `<span data-amt="...">` en stel `data-base-servings` in op het
   `.servings-control`-element.
5. Voeg een `.recipe-card` toe aan de bijbehorende categorie in
   [index.html](index.html) (met `data-tags` en `data-search` voor de
   zoek-/filterfunctie), of maak een nieuwe categorie-sectie aan.
6. Voeg het nieuwe recept toe aan de `APP_SHELL`-lijst in [sw.js](sw.js) zodat
   het ook offline beschikbaar is, en verhoog `CACHE_NAME` bij het aanpassen
   van gecachete bestanden zodat gebruikers de update ontvangen.
