# Backend API for simulating stocktrading

[![Build Status](https://travis-ci.org/jespernyhlen/project-backend-api.svg?branch=master)](https://travis-ci.org/jespernyhlen/project-backend-api)

[![Build Status](https://scrutinizer-ci.com/g/jespernyhlen/project-backend-api/badges/build.png?b=master)](https://scrutinizer-ci.com/g/jespernyhlen/project-backend-api/build-status/master) [![Code Coverage](https://scrutinizer-ci.com/g/jespernyhlen/project-backend-api/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/jespernyhlen/project-backend-api/?branch=master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/jespernyhlen/project-backend-api/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/jespernyhlen/project-backend-api/?branch=master)

### Get started

To start the app, simply use the commands `npm install` followed by `npm start`.

### `npm install`

This command will install all modules listed as dependencies and is a first step to run the app.

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:8888](http://localhost:8888) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `npm reset`

This will run a bash script to reset the database and insert standard values.

### `npm test`

This will run several tests using Mocha and Chai. Report output in ./coverage.

### Projekt backend

Detta är ett backend API med en inkluderad databas och routes för att kommunicera med användaren. Grunden är byggd med Express och SQLite. Express är det mest använda ramverket för att bygga webbapplikationer samt APIer med Node.js. Det är användarvänligt, enkelt att komma igång med och skapar en simpel uppbyggnad. Även om det finns liknande alternativ som i denna storleksgrad möjligvis hade passat bättre för att optimera prestandan, är det ett rimligt alternativ att ta.

Valet av SQLite föll på att jag har tidigare erfarenhet av denna och det är en enkel process att integrera samt drifsätta. Till start var tanken att implementera mera funktioner i webbplatsen där en relationsdatabas kändes som det mest passande. Dock var tiden för knapp vilket begränsade mina implementationer och datan som behövde lagras blev minimal. Med detta som utgångsläge hade valet av databas möjligt ändrats.

För att göra applikationen säkrare och mer användarvänlig har jag inkluderat ytterliggare beroenden. I app.js finner du användande av t.ex. cors, bodyparser och middlewares för att tillåta kross-domän kommunikation, parsa json-data samt kontrollera/verifiera inkommande jwt-tokens för specifika routes.

Applikationen går enklast att dela upp i två delar. Samtliga inkommande requests tas emot i app.js, men skickas sedan vidare till en utav två alternativa objekt. Den ena är "auth", vilket tar hand om inloggning samt registrering. Den andra är "user", sköter kommunikationen med användarinformation i databasen, där köpmedel och köpobjekt är inkluderade.

### Integration och enhetstester

För mina tester valdes Mocha och Chai som verktyg. De är välkända och rekommenderade verktyg som enkelt kan implementeras och är något jag tidigare haft erfarenhet av. Detta gjorde att jag kunde fokusera mer på testningen och mindre på själva implementeringen utav verktyget. Största delen av testen gjordes som integrationstest. Eftersom applikationen och flödet genom den inte är särskilt stor, säkerställdes även de mindre bitarna av koden/funktionerna, som i andra fall enhetstester borde fokusera på. Med fokus på integrationstester täcktes nästan hela applikationen upp redan med denna grund och är nöjd över implementationen och resultatet.

I sånna här situationer kan jag tycka det är svårt att hitta väsentliga delar att testa med enhetstester, men fann ändå en bra infallsvinkel för de. Det som fattades för kodtäckningen var retur av databaserros, vilket kan vara svårt att återskapa. Men även vid fall där queryparameter saknades när ett request väl kommit till funktionen. Detta hade såklart kunna byggas om då denna funktion aldrig skulle anropas utan en sådan parameter och kan vara en brist i min kod. Men detta gav en bättra inblick i hur du kan isolera dina enhetstester för att gå in djupare och mer specifikt för ett testfall.

En Cl-kedja har skapats med hjälp av Travis och Scrutinizer för att automatiskt köra testerna. Det är bra verktyg som ger resultat vid varje uppdatering. Med dessa inbyggda verktyg måste man dock hålla koll och bygga på testerna allt eftersom koden blir större, för att bibehålla dess funktion och kodteckning. Men även om testerna inte skulle utökas mer kan det vara bra att få en rapport av de gamla testerna. Möjligheten finns att du uppdaterat din tidigare kod och byggt upp ett resultat som du inte tänkt på nu men tidigare.

Jag blev nöjd med resultatet som testerna gav mig, även om jag själv vet att mycket skulle kunna uppdateras för att vara mer relevanta. Men 10 i kodkvalitet samt 94% kodteckning känns som ett vettigt resultat.
