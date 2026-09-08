# Spec: Punti di ritiro Poste Italiane

## Objective

Integrare nello store locator SEND gli uffici di Poste Italiane abilitati al
ritiro, mantenendo i punti CAF caricati dal CSV esistente.

Gli uffici Poste sono una nuova tipologia di punto di ritiro a livello di
dominio, ma nella UI usano lo stesso marker dei CAF. Elenco e dettaglio devono
adattare i contenuti alla tipologia, evitando testi e campi specifici dei CAF
quando il punto selezionato è un ufficio Poste.

Il frontend non chiama direttamente i servizi Poste. Il sito è esportato
staticamente e l'API osservata consente richieste browser solo da
`https://www.poste.it`; il backend configurato tramite `API_BASE_URL` espone
quindi un contratto stabile e normalizzato per il frontend, filtra gli uffici
abilitati a SEND e isola il progetto da variazioni dell'API di terze parti.

### Comportamento utente

- All'apertura della pagina, caricare i CAF dal CSV e gli uffici Poste presenti
  nella viewport iniziale.
- Aggiornare gli uffici Poste quando la viewport cambia per ricerca indirizzo,
  geolocalizzazione, pan o zoom.
- Applicare debounce alle richieste generate dal movimento della mappa e
  annullare o ignorare le risposte obsolete.
- Unire CAF e Poste in un solo elenco e in una sola mappa, eliminando eventuali
  duplicati per identificativo composto da tipologia e ID.
- Mantenere lo stesso marker grafico per entrambe le tipologie.
- Se Poste non è disponibile, continuare a mostrare i CAF e visualizzare un
  avviso non bloccante con azione di retry.

## External API Analysis

Il portale pubblico Poste dichiara:

```text
Map API base URL: https://mapcollection.poste.it
Search endpoint: POST /v3/map/geoList
Point type: UfficioPostale
Detail endpoint: GET /v3/map/dettaglioUp/{frazionario}
```

Payload di ricerca osservato:

```json
{
  "lon": 12.4964,
  "lat": 41.9028,
  "spanLon": 0.2,
  "spanLat": 0.2,
  "tipoPunto": ["UfficioPostale"],
  "limit": 100,
  "offset": 0
}
```

La risposta di ricerca include almeno `id`, `frazionario`, `nomePunto`,
`indirizzoPunto`, `citta`, `provincia`, `cap`, `lat`, `lon`, `numeroTelefono`
e `orari`.

Questi dettagli sono informativi per il team backend e non costituiscono il
contratto pubblico del frontend. Le risposte Poste sono dati non attendibili e
devono essere validate dal backend prima della normalizzazione.

## Frontend API Contract

### Request

```http
GET {API_BASE_URL}/delivery-points/poste?minLatitude=41.80&minLongitude=12.35&maxLatitude=42.00&maxLongitude=12.65&page=1&pageSize=100
```

Vincoli:

- `minLatitude` e `maxLatitude`: numeri compresi tra -90 e 90.
- `minLongitude` e `maxLongitude`: numeri compresi tra -180 e 180.
- `minLatitude < maxLatitude`.
- `minLongitude < maxLongitude`.
- `page`: intero maggiore o uguale a 1.
- `pageSize`: intero tra 1 e 100.

Il backend traduce il bounding box in centro e span richiesti da Poste, gestisce
la paginazione upstream e restituisce esclusivamente uffici abilitati al ritiro
SEND.

### Success response

```json
{
  "data": [
    {
      "id": "P-Cv5phXa9MduGBTe5lEbA",
      "type": "POSTE",
      "name": "Roma 4",
      "address": "Via Delle Terme Di Diocleziano 30",
      "city": "Roma",
      "province": "RM",
      "postalCode": "00185",
      "latitude": 41.90147791,
      "longitude": 12.4975448,
      "phone": "0648886920",
      "externalCode": "55195",
      "openingHours": {
        "monday": "08:20-19:05",
        "tuesday": "08:20-19:05",
        "wednesday": "08:20-19:05",
        "thursday": "08:20-19:05",
        "friday": "08:20-19:05",
        "saturday": "08:20-12:35",
        "sunday": "CHIUSO"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 100,
    "hasNextPage": false
  }
}
```

Il backend deve restituire sempre lo stesso schema. I campi opzionali assenti
sono `null`, non stringhe vuote e non proprietà mancanti.

### Error response

```json
{
  "error": {
    "code": "POSTE_PICKUP_POINTS_UNAVAILABLE",
    "message": "Poste pickup points are temporarily unavailable"
  }
}
```

Semantica:

- `400`: bounding box o paginazione non validi.
- `502`: risposta Poste non valida o errore del servizio upstream.
- `504`: timeout del servizio Poste.
- `500`: errore interno non riconducibile al servizio upstream.

Il frontend tratta qualsiasi risposta non `2xx` o non conforme allo schema come
errore Poste non bloccante.

## Tech Stack

- Next.js 15 con Pages Router e output statico.
- React 18 e TypeScript 5.
- Material UI e `@pagopa/mui-italia`.
- MapLibre tramite `react-map-gl`.
- Papa Parse per il registro CAF in CSV.
- Nessuna nuova dipendenza per questa funzionalità.

## Commands

```bash
# Development
cp public/conf/config-dev.json public/conf/config.json
yarn dev

# Type checking
yarn tsc --noEmit

# Lint
yarn lint

# Production build
yarn build
```

## Project Structure

```text
src/pages/[lang]/mappa-punti-di-ritiro.tsx
  Orchestrazione del caricamento CAF e Poste e gestione errori.

src/model/
  Contratti di dominio discriminati per CAF e Poste.

src/api/
  Client e validazione al confine della risposta backend Poste.

src/utils/
  Mapper CSV/DTO e funzioni pure di merge e deduplicazione.

src/components/PickupPointsMap/
  Richiesta dati al cambio della viewport e rendering dei punti.

src/components/PickupPointsList/
  Elenco unificato e ordinamento per distanza.

src/components/PickupPointsInfoDialog/
  Dettaglio adattato alla tipologia del punto.

public/locales/*/pickup.json
  Testi localizzati per dettaglio Poste, avviso e retry.

docs/specs/
  Specifiche funzionali e contratti.
```

## Code Style

Usare un'unione discriminata per impedire che campi CAF vengano usati per un
ufficio Poste:

```ts
type PickupPoint = CafPickupPoint | PostePickupPoint;

interface PostePickupPoint extends BasePickupPoint {
  type: "POSTE";
  externalCode: string | null;
  phone: string | null;
}

function getPickupPointKey(point: PickupPoint): string {
  return `${point.type}:${point.id}`;
}
```

Convenzioni:

- componenti e tipi in PascalCase;
- funzioni, hook e proprietà in camelCase;
- costanti globali in UPPER_SNAKE_CASE;
- doppi apici, virgole finali e formattazione coerente con Prettier esistente;
- nessun cast non sicuro per accettare la risposta esterna;
- validazione concentrata nel client API, non ripetuta nei componenti.

## Testing Strategy

Il repository non dispone di un test runner e non ne viene aggiunto uno.

- Type check per verificare l'unione discriminata e il wiring dei componenti.
- Lint e build di produzione per verificare compatibilità con l'export statico.
- Test browser con risposta backend controllata o mock di rete:
  - caricamento iniziale CAF + Poste;
  - aggiornamento dopo ricerca, geolocalizzazione, pan e zoom;
  - debounce e assenza di duplicati dopo viewport sovrapposte;
  - risposta obsoleta ignorata;
  - dettaglio CAF invariato;
  - dettaglio Poste senza testi di prenotazione CAF;
  - errore Poste con CAF visibili, avviso e retry funzionante;
  - layout desktop e mobile, console senza errori.

## Boundaries

- **Always:** mantenere disponibile il CSV CAF; validare il DTO Poste al confine;
  usare richieste cancellabili o protezione da race condition; localizzare i
  nuovi testi in tutte le lingue supportate; preservare accessibilità e
  ordinamento per distanza.
- **Ask first:** cambiare il contratto backend; aggiungere dipendenze; cambiare
  CI o deployment; introdurre filtri per tipologia; usare marker diversi;
  modificare il formato del CSV.
- **Never:** chiamare `mapcollection.poste.it` direttamente dal browser;
  incorporare cookie, token o header osservati sul portale Poste; mostrare
  uffici non dichiarati SEND dal backend; nascondere i CAF per un errore Poste;
  usare una risposta esterna senza validazione.

## Success Criteria

- I punti CAF continuano a essere caricati dal CSV e mantengono comportamento e
  dettaglio attuali.
- Gli uffici Poste SEND nella viewport sono richiesti all'apertura e dopo
  ricerca, geolocalizzazione, pan o zoom.
- Le richieste di viewport sono debounced e una risposta obsoleta non sovrascrive
  quella più recente.
- CAF e Poste compaiono in elenco e mappa, sono ordinabili per distanza e non
  presentano duplicati.
- Il dettaglio Poste mostra nome, indirizzo, telefono se disponibile, orari,
  frazionario e indicazioni stradali, senza copy specifica dei CAF.
- Un errore Poste lascia visibili e utilizzabili i CAF e mostra un avviso
  non bloccante con retry.
- Nessuna richiesta browser viene inviata direttamente a domini Poste.
- Type check, lint e build completano senza errori.
- I flussi browser desktop e mobile descritti nella strategia di test risultano
  conformi e senza errori console.

## Open Questions

Nessuna per il perimetro frontend. L'implementazione backend del contratto è
un'attività separata e deve essere disponibile o simulabile per la verifica
end-to-end.
