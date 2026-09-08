# Implementation Plan: Punti di ritiro Poste Italiane

Specifica di riferimento:
[`poste-pickup-points.md`](./poste-pickup-points.md).

## Overview

Il lavoro coinvolge due repository:

- `pagopa/pn-bff`: nuova Lambda Node.js che interroga il servizio Poste,
  applica un filtro Poste predefinito per la tipologia di punto SEND, valida e
  normalizza la risposta e la espone tramite API Gateway;
- `pagopa/pn-showcase-site`: client statico Next.js che richiede gli uffici
  Poste nella viewport, li unisce ai CAF del CSV e adatta il dettaglio alla
  tipologia.

Il piano usa task piccoli, ordinati per dipendenza. Un task è completato solo
quando:

1. tutti gli acceptance criteria sono soddisfatti;
2. tutte le verifiche indicate sono superate;
3. la review con `/code-review-and-quality` non presenta finding Critical o
   richieste di modifica irrisolte.

## Repository e riferimenti

### Frontend

```text
Repository: pagopa/pn-showcase-site
Branch base: develop
Stack: Next.js 15, React 18, TypeScript 5, MapLibre
```

### Backend

```text
Repository: pagopa/pn-bff
Branch base: develop
Stack Lambda: Node.js 24, CommonJS, Mocha, Chai, NYC
Infrastructure: CloudFormation, API Gateway REST, WAF
```

Pattern backend da seguire:

```text
functions/searchAddressesLambda/
docs/openapi/api-internal-location.yaml
docs/openapi/api-external-location.yaml
docs/openapi/aws/api-location-PUBLIC-aws.yaml
scripts/aws/cfn/microservice.yml
codegen/config.json
```

## Architecture Decisions

- **Lambda dedicata:** creare `postePickupPointsLambda` in `pn-bff`, separata
  dalla Lambda di autocomplete, perché usa un provider, un contratto, failure
  mode e limiti differenti.
- **Endpoint pubblico stabile:** esporre
  `GET /delivery-points/poste` tramite API Gateway. Il frontend non osserva URL,
  payload o dettagli dell'API Poste.
- **Filtro upstream predefinito:** la Lambda invia sempre la tipologia/filtro
  Poste che identifica i punti abilitati SEND. Il valore esatto deve essere
  confermato nel Task 1 e configurato tramite variabile d'ambiente, senza
  accettarlo dal browser.
- **Bounding box pubblico:** il frontend invia limiti geografici; la Lambda li
  converte in centro e span per `POST /v3/map/geoList`.
- **Validazione su entrambi i confini:** la Lambda valida query utente e risposta
  Poste; il frontend valida comunque la risposta BFF prima del rendering.
- **Paginazione esplicita:** contratto pubblico con `page` e `pageSize`; la
  Lambda traduce in `offset` e `limit` senza loop upstream non limitati.
- **Degrado parziale:** un errore Poste non rende indisponibili i CAF.
- **Nessuna nuova dipendenza frontend:** typecheck, lint, build e test browser
  restano i quality gate del sito.
- **Osservabilità senza dati sensibili:** log strutturati con request ID, durata,
  status e numero risultati; niente payload completi, cookie, token o dati
  personali.

## Dependency Graph

```text
Task 1: filtro Poste e contratto upstream
                    |
                    v
Task 2: OpenAPI pubblico BFF
                    |
          +---------+---------+
          |                   |
          v                   v
Task 3: Lambda verticale  Task 6: modelli/client frontend
          |
          v
Task 4: hardening Lambda
          |
          v
Task 5: infrastruttura e deploy
          |                   |
          +---------+---------+
                    v
Task 7: viewport e fallback
                    |
          +---------+---------+
          |                   |
          v                   v
Task 8: dettaglio UI     Task 9: localizzazioni
          |                   |
          +---------+---------+
                    v
Task 10: verifica end-to-end
```

## Review Gate comune

Ogni task include una review separata con `/code-review-and-quality`.
Il reviewer deve:

1. leggere acceptance criteria, test e diff del solo task;
2. valutare correttezza, leggibilità, architettura, sicurezza e performance;
3. classificare i finding come Critical, richiesti oppure opzionali;
4. verificare i comandi e le evidenze dichiarate;
5. dare verdict `Approve` o `Request changes`.

Un task non può sbloccare i dipendenti finché:

- i finding Critical sono risolti;
- i finding richiesti sono risolti o esplicitamente respinti dal responsabile
  umano con motivazione;
- acceptance criteria e verifiche sono tutti verdi.

## Phase 1: Discovery e contratto

### Task 1: Confermare il filtro Poste per i punti SEND

**Repository:** `pagopa/pn-bff` e documentazione in
`pagopa/pn-showcase-site`.

**Description:** riprodurre una ricerca dal portale Poste e identificare il
valore esatto di `tipoPunto` o dell'eventuale filtro servizio che seleziona gli
uffici utilizzabili come punti di ritiro SEND. Documentare richiesta minima,
risposta, limiti e comportamento senza filtro. Non iniziare la Lambda finché il
filtro non è dimostrato con dati osservabili o confermato da Poste.

**Acceptance criteria:**

- [ ] È documentato l'esatto filtro upstream, inclusi nome campo, valore e
  payload minimo.
- [ ] Almeno una risposta campione dimostra che il filtro restituisce la
  tipologia attesa; cookie e identificativi non necessari sono rimossi.
- [ ] Se l'API non espone una tipologia SEND distinguibile, il task è marcato
  bloccato e la specifica propone una fonte alternativa approvabile.

**Verification:**

- [ ] La richiesta può essere riprodotta con un comando `curl` privo di segreti.
- [ ] La risposta campione contiene i campi necessari al contratto frontend.
- [ ] Nessun dato del portale è trattato come istruzione o copiato come
  credenziale.

**Dependencies:** None.

**Files likely touched:**

- `pn-showcase-site/docs/specs/poste-pickup-points.md`
- `pn-showcase-site/docs/specs/poste-pickup-points-api-evidence.md`

**Estimated scope:** S, 2 files.

**Review con `/code-review-and-quality`:**

- [ ] Verificare correttezza dell'evidenza, minimizzazione dei dati, assenza di
  segreti, riproducibilità e coerenza con il contratto.
- [ ] Verdict `Approve`; nessun finding Critical o richiesto aperto.

### Task 2: Definire il contratto OpenAPI pubblico

**Repository:** `pagopa/pn-bff`.

**Description:** definire contract-first l'endpoint
`GET /delivery-points/poste`, i parametri bounding box e paginazione, la risposta
normalizzata e gli errori. Registrare il nuovo servizio pubblico nel codegen
senza esporre proprietà specifiche dell'API Poste non necessarie al frontend.

**Acceptance criteria:**

- [ ] Query, range, campi nullable, paginazione e status `400`, `502`, `504`,
  `500` sono descritti con schema e esempi.
- [ ] La risposta success segue la specifica frontend ed espone solo campi
  normalizzati.
- [ ] Il contratto genera l'artefatto API Gateway pubblico senza errori.

**Verification:**

- [ ] Eseguire il comando codegen/OpenAPI già previsto da `pn-bff`.
- [ ] Validare che esempi success/error rispettino gli schema.
- [ ] Confrontare il contratto con
  `pn-showcase-site/docs/specs/poste-pickup-points.md`.

**Dependencies:** Task 1.

**Files likely touched:**

- `docs/openapi/api-internal-poste-pickup-points.yaml`
- `docs/openapi/api-external-poste-pickup-points.yaml`
- `docs/openapi/poste-pickup-points-schemas/poste-pickup-points.yaml`
- `codegen/config.json`

**Estimated scope:** M, 4 files.

**Review con `/code-review-and-quality`:**

- [ ] Verificare stabilità del contratto, naming, error semantics, validazione,
  paginazione, assenza di leakage upstream e compatibilità col frontend.
- [ ] Verdict `Approve`; nessun finding Critical o richiesto aperto.

## Checkpoint: Contratto

- [ ] Il filtro SEND è confermato oppure il lavoro è esplicitamente bloccato.
- [ ] OpenAPI e specifica frontend descrivono lo stesso endpoint.
- [ ] La review dei Task 1-2 è approvata.
- [ ] Review umana prima di avviare implementazioni backend e frontend.

## Phase 2: Lambda backend

### Task 3: Implementare una slice Lambda end-to-end

**Repository:** `pagopa/pn-bff`.

**Description:** creare la Lambda dedicata con entry point, validazione dei
parametri, chiamata HTTP a Poste con filtro fisso, normalizzazione della prima
pagina e risposta API Gateway. La slice deve coprire un percorso nominale reale
con test che simulano l'upstream.

**Acceptance criteria:**

- [ ] Bounding box e paginazione validi producono il payload Poste atteso,
  incluso il filtro SEND non controllabile dal client.
- [ ] Una risposta Poste valida viene normalizzata esattamente nello schema
  OpenAPI e non conserva campi upstream superflui.
- [ ] Parametri mancanti, non numerici, fuori range o con min/max invertiti
  restituiscono `400` nel formato errori del repository.

**Verification:**

- [ ] `cd functions/postePickupPointsLambda && npm ci`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Il test nominale verifica URL, metodo, timeout, payload e output.

**Dependencies:** Task 2.

**Files likely touched:**

- `functions/postePickupPointsLambda/package.json`
- `functions/postePickupPointsLambda/package-lock.json`
- `functions/postePickupPointsLambda/index.js`
- `functions/postePickupPointsLambda/src/app/eventHandler.js`
- `functions/postePickupPointsLambda/src/app/posteClient.js`

**Estimated scope:** M, 5 files.

**Review con `/code-review-and-quality`:**

- [ ] Verificare tutti i cinque assi, con attenzione a validazione query,
  timeout HTTP, filtro non sovrascrivibile, log e mapping della risposta
  esterna.
- [ ] Verdict `Approve`; nessun finding Critical o richiesto aperto.

### Task 4: Coprire failure mode e paginazione Lambda

**Repository:** `pagopa/pn-bff`.

**Description:** completare i test e l'implementazione per paginazione,
risposte malformate, timeout, errori HTTP Poste e protezione da carichi
eccessivi. Gli errori upstream non devono esporre body o dettagli interni.

**Acceptance criteria:**

- [ ] `page` e `pageSize` sono tradotti in `offset` e `limit`, con massimo 100
  elementi per richiesta e senza loop non limitati.
- [ ] Timeout e risposte HTTP/non conformi sono distinti in `504` e `502`;
  errori inattesi diventano `500` senza dettagli sensibili.
- [ ] I test coprono limiti geografici, paginazione, null opzionali, payload
  malformato e tutti gli status di errore.

**Verification:**

- [ ] `cd functions/postePickupPointsLambda && npm test`
- [ ] `npm run coverage`
- [ ] `npm run build`
- [ ] La coverage del nuovo codice soddisfa la soglia Sonar del repository.

**Dependencies:** Task 3.

**Files likely touched:**

- `functions/postePickupPointsLambda/src/app/eventHandler.js`
- `functions/postePickupPointsLambda/src/app/posteClient.js`
- `functions/postePickupPointsLambda/src/app/posteMapper.js`
- `functions/postePickupPointsLambda/src/test/eventHandler.test.js`
- `functions/postePickupPointsLambda/src/test/posteClient.test.js`

**Estimated scope:** M, 5 files.

**Review con `/code-review-and-quality`:**

- [ ] Verificare correttezza dei failure mode, copertura comportamentale,
  assenza di broad catch success-shaped, limiti delle operazioni e redazione
  dei log.
- [ ] Verdict `Approve`; nessun finding Critical o richiesto aperto.

### Task 5: Esporre e rendere operativa la Lambda

**Repository:** `pagopa/pn-bff`.

**Description:** collegare Lambda, API Gateway, permission, configurazione,
WAF e allarmi seguendo il pattern `SearchAddressesLambda`. Il filtro upstream,
base URL e timeout devono essere configurabili per ambiente; il browser non può
fornirli.

**Acceptance criteria:**

- [ ] CloudFormation crea Lambda Node.js 24, execution role minima, invoke
  permission e variabili d'ambiente senza segreti hardcoded.
- [ ] API Gateway espone `/delivery-points/poste` con CORS per il sito, timeout
  coerente e integrazione `aws_proxy`.
- [ ] WAF/rate limit, metriche e allarmi rendono visibili error rate, durata e
  throttling della nuova Lambda.

**Verification:**

- [ ] Generare e validare
  `docs/openapi/aws/api-poste-pickup-points-PUBLIC-aws.yaml`.
- [ ] Validare il template CloudFormation con gli strumenti già usati in CI.
- [ ] Eseguire package/build della Lambda e la pipeline repository applicabile.

**Dependencies:** Task 4.

**Files likely touched:**

- `docs/openapi/aws/api-poste-pickup-points-PUBLIC-aws.yaml`
- `scripts/aws/cfn/microservice.yml`
- `functions/postePickupPointsLambda/README.md`
- `functions/postePickupPointsLambda/sonar-project.properties`
- file di configurazione ambiente già usato da `microservice.yml`

**Estimated scope:** M, 5 files.

**Review con `/code-review-and-quality`:**

- [ ] Verificare least privilege, esposizione pubblica, CORS, WAF, timeout,
  osservabilità, configurazione per ambiente e rollback.
- [ ] Verdict `Approve`; nessun finding Critical o richiesto aperto.

## Checkpoint: Backend

- [ ] Test, coverage e package Lambda sono verdi.
- [ ] OpenAPI/API Gateway e CloudFormation sono validi.
- [ ] Il filtro SEND non è controllabile dal client.
- [ ] Errori e log non espongono payload sensibili.
- [ ] Le review dei Task 3-5 sono approvate.
- [ ] Endpoint disponibile almeno in ambiente dev o mock contrattuale
  equivalente prima del wiring finale frontend.

## Phase 3: Integrazione frontend

### Task 6: Introdurre il client Poste tipizzato

**Repository:** `pagopa/pn-showcase-site`.

**Description:** introdurre il modello discriminato `CAF | POSTE`, il client
per il contratto BFF, la validazione runtime della risposta e le funzioni pure
di mapping e deduplicazione. Il task non modifica ancora il comportamento
visibile.

**Acceptance criteria:**

- [ ] I componenti possono usare i campi comuni solo tramite `PickupPoint` e
  devono restringere `type` per i campi specifici.
- [ ] Il client costruisce esclusivamente URL sotto `API_BASE_URL`, supporta
  `AbortSignal` e segue la paginazione contrattuale.
- [ ] Risposte non `2xx`, shape invalide, coordinate invalide e paginazione
  incoerente producono errori espliciti.

**Verification:**

- [ ] `yarn tsc --noEmit`
- [ ] `yarn lint`
- [ ] Ispezione manuale: nessun riferimento frontend a domini Poste.

**Dependencies:** Task 2; può procedere in parallelo ai Task 3-5 usando il
contratto OpenAPI approvato.

**Files likely touched:**

- `src/model/index.ts`
- `src/api/postePickupPoints.ts`
- `src/utils/map.ts`

**Estimated scope:** M, 3 files.

**Review con `/code-review-and-quality`:**

- [ ] Verificare type safety, validazione al confine, errori, paginazione,
  cancellazione e assenza di coupling con l'upstream Poste.
- [ ] Verdict `Approve`; nessun finding Critical o richiesto aperto.

### Task 7: Caricare Poste dalla viewport con fallback CAF

**Repository:** `pagopa/pn-showcase-site`.

**Description:** collegare la mappa al client Poste attraverso un hook che
gestisce viewport iniziale, `moveend`, debounce, abort, race condition e retry.
La pagina mantiene sorgenti CAF e Poste separate e deriva la lista unificata.

**Acceptance criteria:**

- [ ] Apertura, ricerca, geolocalizzazione, pan e zoom aggiornano gli uffici
  Poste per la viewport corrente senza richieste duplicate.
- [ ] Una risposta annullata o obsoleta non modifica punti né stato errore.
- [ ] Un errore Poste lascia CAF e interazioni disponibili e mostra un alert
  non bloccante con retry sull'ultima viewport.

**Verification:**

- [ ] `yarn tsc --noEmit`
- [ ] `yarn lint`
- [ ] Browser con mock: iniziale, pan/zoom rapido, risposta fuori ordine,
  errore e retry.

**Dependencies:** Task 6 e disponibilità del Task 5 o mock contrattuale.

**Files likely touched:**

- `src/hook/usePostePickupPoints.ts`
- `src/components/PickupPointsMap/index.tsx`
- `src/pages/[lang]/mappa-punti-di-ritiro.tsx`

**Estimated scope:** M, 3 files.

**Review con `/code-review-and-quality`:**

- [ ] Verificare race condition, cleanup degli effect, frequenza richieste,
  re-render, fallback, accessibilità dell'errore e regressioni CAF.
- [ ] Verdict `Approve`; nessun finding Critical o richiesto aperto.

### Task 8: Adattare elenco e dettaglio alla tipologia

**Repository:** `pagopa/pn-showcase-site`.

**Description:** rendere selezione, chiavi, copia informazioni e contenuti del
dialog coerenti col discriminante. Conservare lo stesso marker per CAF e Poste.

**Acceptance criteria:**

- [ ] Chiavi e selezione usano `type:id`, evitando collisioni tra sorgenti.
- [ ] Il dettaglio CAF resta invariato; il dettaglio Poste mostra nome,
  indirizzo, telefono se presente, orari, frazionario e indicazioni.
- [ ] Alert, testi, ID e codici specifici CAF non compaiono nel dettaglio Poste.

**Verification:**

- [ ] `yarn tsc --noEmit`
- [ ] `yarn lint`
- [ ] Browser desktop/mobile: confronto CAF prima/dopo e dettaglio Poste.

**Dependencies:** Task 7.

**Files likely touched:**

- `src/components/PickupPointsList/index.tsx`
- `src/components/PickupPointsInfoDialog/index.tsx`
- `src/components/PickupPointsInfoDialog/Contacts.tsx`
- `src/components/PickupPointsInfoDialog/OpeningHours.tsx`

**Estimated scope:** M, 4 files.

**Review con `/code-review-and-quality`:**

- [ ] Verificare correttezza dei narrowing, regressioni CAF, copy negli appunti,
  link esterni, accessibilità, leggibilità e render non necessari.
- [ ] Verdict `Approve`; nessun finding Critical o richiesto aperto.

### Task 9: Localizzare stati e contenuti Poste

**Repository:** `pagopa/pn-showcase-site`.

**Description:** aggiungere nelle cinque lingue supportate i testi per
indisponibilità/retry, dettaglio Poste, frazionario e annunci accessibili. Non
introdurre stringhe utente hardcoded.

**Acceptance criteria:**

- [ ] Italiano, inglese, francese, tedesco e sloveno contengono le stesse nuove
  chiavi.
- [ ] Nessuna route mostra una chiave grezza o un testo CAF per un punto Poste.
- [ ] Alert e retry hanno label comprensibili e accessibili.

**Verification:**

- [ ] `yarn build`
- [ ] Aprire le cinque route lingua e controllare successo ed errore Poste.
- [ ] Confrontare automaticamente l'insieme delle chiavi dei cinque JSON.

**Dependencies:** Task 7; può procedere in parallelo al Task 8.

**Files likely touched:**

- `public/locales/it/pickup.json`
- `public/locales/en/pickup.json`
- `public/locales/fr/pickup.json`
- `public/locales/de/pickup.json`
- `public/locales/sl/pickup.json`

**Estimated scope:** M, 5 files.

**Review con `/code-review-and-quality`:**

- [ ] Verificare parità delle chiavi, coerenza terminologica, assenza di
  hardcoding, leggibilità e nessuna regressione delle traduzioni esistenti.
- [ ] Verdict `Approve`; nessun finding Critical o richiesto aperto.

## Checkpoint: Frontend

- [ ] Typecheck e lint sono verdi.
- [ ] CAF resta funzionante senza endpoint Poste.
- [ ] Viewport, abort, retry e deduplicazione rispettano la specifica.
- [ ] UI e traduzioni sono corrette nelle cinque lingue.
- [ ] Le review dei Task 6-9 sono approvate.

## Phase 4: Verifica cross-repository

### Task 10: Verificare il flusso end-to-end

**Repository:** `pagopa/pn-bff` e `pagopa/pn-showcase-site`.

**Description:** verificare il flusso completo contro l'ambiente dev della
Lambda o un mock equivalente al contratto, includendo comportamento browser,
rete, console, accessibilità e failure mode.

**Acceptance criteria:**

- [ ] CAF e Poste appaiono senza duplicati all'apertura e dopo ricerca,
  geolocalizzazione, pan e zoom.
- [ ] Timeout/errore Poste lascia CAF utilizzabile e retry ripristina i punti.
- [ ] Il browser chiama solo `API_BASE_URL`; console, rete e accessibilità non
  mostrano errori relativi alla feature.

**Verification:**

- [ ] Backend:
  `cd functions/postePickupPointsLambda && npm test && npm run build`
- [ ] Frontend:
  `yarn tsc --noEmit && yarn lint && yarn build`
- [ ] Browser desktop/mobile: screenshot, console, richieste di rete, DOM e
  accessibility tree per percorso nominale ed errore/retry.

**Dependencies:** Task 5, Task 8 e Task 9.

**Files likely touched:** nessuno; eventuali correzioni devono ricadere nel task
che ha introdotto il difetto e ripetere la relativa review.

**Estimated scope:** S, 0 file salvo fix.

**Review con `/code-review-and-quality`:**

- [ ] Review finale cross-repository su contratto, implementazioni, test,
  infrastruttura e risultati browser lungo tutti i cinque assi.
- [ ] Verdict `Approve`; nessun finding Critical o richiesto aperto.

## Checkpoint: Complete

- [ ] Tutti i task hanno acceptance criteria e verifiche superati.
- [ ] Tutte le review hanno verdict `Approve`.
- [ ] OpenAPI pubblicato e Lambda disponibile nell'ambiente concordato.
- [ ] Build backend e frontend sono verdi.
- [ ] Evidenze browser desktop/mobile acquisite.
- [ ] Nessun segreto o dettaglio upstream non necessario è versionato.
- [ ] La modifica è pronta per review umana e rilascio coordinato.

## Parallelization Opportunities

- Dopo il Task 2, Task 3 e Task 6 possono procedere in parallelo in due sessioni
  e repository distinti.
- Dopo il Task 7, Task 8 e Task 9 possono procedere in parallelo; condividono
  solo il modello già stabilizzato.
- Task 4 dipende dall'implementazione del Task 3.
- Task 5 dipende dai failure mode e requisiti operativi del Task 4.
- Task 10 è sempre sequenziale e parte solo dopo backend deployabile e frontend
  completo.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Il filtro SEND non è una tipologia Poste pubblica | High | Task 1 bloccante; nessuna assunzione silenziosa |
| Modifica non annunciata dell'API Poste | High | Lambda adapter, validazione runtime e test fixture minime |
| API terza non formalmente destinata a integrazioni | High | Conferma ownership/uso prima del rilascio; timeout e rollback |
| Endpoint pubblico abusato | High | WAF, rate limit, bounding box e page size limitati |
| Troppe richieste da pan/zoom | Medium | `moveend`, debounce, abort e metriche |
| Risposte fuori ordine | Medium | `AbortController` e request identity |
| Viewport ampia | Medium | Paginazione esplicita, massimo 100 per pagina |
| Collisione ID CAF/Poste | Low | Chiave composta `type:id` |
| Indisponibilità Poste | Medium | CAF sempre disponibili, alert e retry |
| Regressione dettaglio CAF | Medium | Unione discriminata, test browser e review dedicata |
| Divergenza OpenAPI/frontend | High | Contract-first, checkpoint e verifica cross-repository |

## Open Questions

- Qual è il valore definitivo della tipologia/filtro Poste che identifica gli
  uffici abilitati SEND? Il Task 1 deve risolverlo prima della Lambda.
- L'uso server-to-server di `mapcollection.poste.it` è autorizzato e supportato
  da Poste per produzione, oppure serve un endpoint/accordo dedicato?
- Quali origin devono essere ammessi da CORS nei diversi ambienti? Evitare `*`
  in produzione se la piattaforma consente una allowlist.
- Quali soglie WAF, timeout Lambda e allarmi devono essere usate? Partire dai
  valori del servizio Location e farle approvare dagli owner operativi.
