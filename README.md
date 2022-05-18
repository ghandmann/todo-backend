# Todo-Backend mit WebSockets

**HINWEIS**: Dieses Repository enthält eine Beispielanwendung für die Vorlesung "Web Anwendungen 2" an der Hochschule Albstadt-Sigmaringen.

Ziel ist es, zeitgemäße Softwareentwicklungszyklen mithilfe von git, GitHub, Softwaretests, CI/CD-Pipelines, Feature-Branches, CodeReviews und PullRequests aufzuzeigen.

## Starten

```shell
$ npm install
$ npm run start
```

Öffnen Sie dann einen Browser auf [http://localhost:3000/todo.html](http://localhost:3000/todo.html).

Um die Multi-User-Synchronisation zu sehen, müssen sie die WebSeite am besten in zwei Browsern gleichzeitig öffnen.

### Websocat

Mit dem Tool [websocat](https://github.com/vi/websocat) können Sie sich zum WebSocket-Server auch via Kommandozeilen-Client verbinden.
Dort werden dann die JSON-Nachrichten direkt auf der Konsole angezeigt, immer wenn ein Todo-Item hinzugefügt oder gelöscht wird.

```shell
$ websocat ws://localhost:3000/live-updates/
```

Das Programm können Sie jederzeit mit `ctrl+c` beenden.


## Server

Serverseitig wird das Node.JS Modul [ws](https://www.npmjs.com/package/ws) eingesetzt.

## Client

Auf Clientseite wird die standard Browser-API für [Websockets](https://developer.mozilla.org/de/docs/Web/API/WebSocket) verwendet.

## Tests

Die Tests können mit `npm test` ausgeführt werden.

Während der Entwicklung können die Tests im sogenannten "watch mode" ausgeführt werden: `npm test -- -w`. Dadurch wird bei jedem speichern automatisch der Test ausgeführt.

## Testabdeckung

Zusätzlich zu den Tests, kann auch die sog. Testabdeckung ermittelt werden. Dazu kann einfach das Kommando `npm run cover` verwendet werden. Danach findet sich in `./coverage/index.html` ein sog. coverage report. Dieser zeigt auf, welche Zeilen des Quellcodes durch die Ausführung der Tests erreicht wurden.

## Notizen für die Live Session
* Tests zeigen
    * lokal ausführen
    * watch mode
    * Fehler provozieren
* Lokal neuen Branch erzeugen (ClearAll Feature)
    * "Fehlerhafte" Änderung durchführen
    * Commiten und pushen
    * Pull-Request auf GitHub erzeugen
    * Pipeline-Ergebnis zeigen
    * Fehler beheben
    * CodeReview
    * Merge in `main`
* Testabdeckung zeigen
    * `npx nyc mocha`
    * `npm run cover`
    * Coverage-Report in `./coverage` zeigen
    * Coverage-Report in Workflow-Artifacts zeigen