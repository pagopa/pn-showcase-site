import { langCodes } from "../utils/constants";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface OpeningDays {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface RaddOperator extends OpeningDays, Coordinates {
  locationId: string;
  external_codes: string;
  denomination: string;
  city: string;
  address: string;
  province: string;
  cap: string;
  contacts: string;
  distance?: number;
  rawOpeningHours: string;
  appointmentRequired: boolean;
  email: string;
  website: string;
}

export interface Point {
  locationId: string;
  codici_esterni: string;
  descrizione: string;
  tipologia: string;
  città: string;
  indirizzo: string;
  provincia: string;
  regione: string;
  cap: string;
  telefoni: string;
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
  latitudine: string;
  longitudine: string;
  orari_apertura: string;
  richiede_appuntamento: string;
  email: string;
  website: string;
}

// localization //
export type LangCode = (typeof langCodes)[number];
export interface I18n {
  [key: string]: I18n | string;
}
// ------------ //

// Result of searchAddress API
export interface AddressResult {
  placeId: string;
  placeType: string;
  address: Address;
}

interface Address {
  Label?: string;
  Country?: {
    Code2?: string;
    Code3?: string;
    Name?: string;
  };
  Region?: {
    Name?: string;
  };
  SubRegion?: {
    Code?: string;
    Name?: string;
  };
  Locality?: string;
  District?: string;
  PostalCode?: string;
  Street?: string;
}

export type OptionType = { id: string | number; label: string };
