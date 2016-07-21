<!-- .slide: data-state="titlepage" -->

# Modulares Frontend mit Element-Queries
-----
<!-- .slide: data-state="titlepage" -->

# Problemstellung...
-----
Stellt Euch vor, Ihr macht das Frontend einer großen und komplexen Webpräsenz.
-----
Stellt Euch vor, Eure Designabteilung produziert erste Seitendesigns, die Ihr sofort beginnt, umzusetzen.

<span class="fragment">(Die Roadmap ist stramm und Ihr wollt keine Zeit verlieren)</span>
-----

Stellt Euch vor, Teil der ersten vorliegenden Seite ist ein Visitenkarten-Element.

<img src="./images/vcard-wide.png">
-----
<!-- .slide: data-state="titlepage" -->

# Auf geht's...
-----
<!-- .slide: data-background="images/reactions/tumblr_inline_mmrb6wlC0g1qz4rgp.gif" -->
-----
So sieht Euer erster CSS-Wurf aus, verewigt in der `startpage.css`:

```
.startpage {
.startpage .header { ... }
.startpage .main { ... }
.startpage .main .vcard { ... }
```
-----
In der Zwischenzeit wurden weitere Seitentypen designed.
<p class="fragment">Ihr schaut sie Euch an...</p>
<p class="fragment">... und entdeckt die Visitenkarte in einem anderen Design!</p>
-----
<!-- .slide: data-background="images/reactions/r4lKi9i.gif" -->
-----
<!-- .slide: data-state="titlepage" -->

# Fehler Nummer eins:

<p class="fragment">Nicht modular gedacht und die Styles des Elements mit der Startseite verheiratet!</p>
-----
<!-- .slide: data-background="images/reactions/tumblr_inline_mmrb6wlC0g1qz4rgp.gif" -->
-----
Ihr baut also Euer CSS um, und verlegt alles, was mit der Visitenkarte zu tun hat in eine `vcard.css`:

```
.vcard {
    display: block;
    overflow: hidden;
    margin-bottom: 1rem;
    font-size: 0;
    background-color: #fac91d;
    border: 1px solid #999;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.vcard:last-child {
    margin-bottom: 0;
}
```
-----
Jetzt ist das Visitenkarten-Element schön portabel!
-----
Parallel zu dieser Arbeit, gibt es erste Konzepte dazu, wie die Seite reponsive aussieht.
-----
Das Visitenkarten-Element soll dort dann so aussehen:

<img src="./images/vcard-narrow.png">
-----
<!-- .slide: data-background="images/reactions/tumblr_inline_mmrb6wlC0g1qz4rgp.gif" -->
-----
Ihr löst das ganz klassisch mit Hilfe von Media Queries:
```
.vcard-left,
.vcard-right {
    display: inline-block;
    width: 50%;
}

@media screen and (max-width: 24rem) {
    .vcard-left,
    .vcard-right {
        width: 100%;
    }
}
```
-----
In der Zwischenzeit wurden weitere Seitentypen designed.
<p class="fragment">Ihr schaut sie Euch an...</p>
<p class="fragment">... und entdeckt die Visitenkarte schon wieder in einem anderen Design.</p>
<p class="fragment">Diesmal aber in der Seitenspalte!</p>
-----
<!-- .slide: data-background="images/backgrounds/head%20shot.jpg" -->
-----
[Demo](./demos/media-queries/)
-----
<!-- .slide: data-background="images/reactions/tumblr_inline_mmrb6wlC0g1qz4rgp.gif" -->
-----
```
.vcard-left, .vcard-right {
    display: inline-block;
    width: 50%;
}

.aside .vcard-left, .aside .vcard-right {
    width: 100%;
}

@media screen and (max-width: 24rem) {
    .vcard-left, .vcard-right {
        width: 100%;
    }
}
```
-----
<!-- .slide: data-state="titlepage" -->

# Fehler Nummer zwei:

<p class="fragment">Keine allgemeingültige Lösung gefunden und die Styles des Elements mit der Seitenleiste verheiratet!</p>
<p class="fragment">Das Konstrukt fällt sofort in sich zusammen, sobald die Visitenkarte in ein anderes Element verschachtelt wird.</p>
-----
<!-- .slide: data-state="titlepage" -->

# Lösungsansatz Nummer eins: Flexbox
-----
```
.vcard {
    display: flex;
    flex-wrap: wrap;
}

.vcard-left, .vcard-right {
    width: auto;
    flex-grow: 1;
    flex-shrink: 0;
}

.vcard-left { flex-basis: 7rem; }
.vcard-left { flex-basis: 13rem; }
```

[Demo](./demos/flexbox/)
-----
<!-- .slide: data-state="titlepage" -->

# Lösungsansatz Nummer zwei: min-width + max-width + calc
-----
```
.vcard-left, .vcard-right {
    min-width: 50%;
    max-width: 100%;
    width: calc((384px - 100%) * 384);
}
```

[Demo](./demos/min-max-width-calc/)
[Erklärung](https://medium.freecodecamp.com/the-fab-four-technique-to-create-responsive-emails-without-media-queries-baf11fdfa848)
-----
Trotzdem fehlt noch was:

<img src="./images/vcard-wide.png">
<img src="./images/vcard-narrow.png">

<p class="fragment">Die Ausrichtung der Inhaltselemente verändert sich</a>
<p class="fragment">Die Schriftgröße passt sich an</a>
-----
<!-- .slide: data-state="titlepage" -->

# Lösungsansatz Nummer drei: Element Queries (Polyfill)
-----
CSS bei "Mobile First":

```
.vcard[min-width~="24rem"] .vcard-left {
    width: 33%;
    text-align: right;
}

.vcard[min-width~="24rem"] .vcard-right {
    width: 67%;
    text-align: left;
}
```
-----
Weil es ein Polyfill ist, brauchen wir noch ein JavaScript:

```
<script src="ResizeSensor.js"></script>
<script src="ElementQueries.js"></script>
```

[Demo](./demos/element-queries/)
-----
Falls wir es mit einer per AJAX, React oder Angular dynamisch zusammengebauten Seite zu tun haben, dann müssen wir den Polyfill nach Änderungen am DOM-Baum händisch triggern:

```
ElementQueries.init();
```

bzw. wenn wir wissen, dass der DOM-Baum sich nur in der Seitenleiste geändert hat:

```
ElementQueries.init(document.getElementById('#aside');
```
-----
[Demo aller Lösungen zusammen](./demos/drag-n-drop/)
