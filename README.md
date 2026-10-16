# Recepten

Een eenvoudige, statische website met familierecepten, gehost via GitHub Pages.
Recepten hebben elk hun eigen pagina en worden op de startpagina gegroepeerd
per maaltijdtype.

## Recepten

- Hoofdgerechten
  - Pasta Rode Pesto
- Salades
  - Italiaanse salade met tomaat en mozzarella
- Nagerechten
  - Lemon bars

## Lokaal bekijken

Open [index.html](index.html) direct in de browser, of serveer de map met een
eenvoudige static file server.

## Structuur

- [index.html](index.html) - de startpagina met recepten per maaltijdtype
- [recipes/](recipes) - een losse pagina per recept
- [styles.css](styles.css) - alle opmaak
- [files/](files) - receptfoto's

## Nieuw recept toevoegen

1. Maak een nieuwe pagina in [recipes/](recipes), gebaseerd op een bestaand
   recept (bijv. [recipes/pasta-rode-pesto.html](recipes/pasta-rode-pesto.html)).
2. Stel de `.category-badge` in op het juiste maaltijdtype.
3. Voeg een `.recipe-card` toe aan de bijbehorende categorie in
   [index.html](index.html) (of maak een nieuwe categorie-sectie aan).
