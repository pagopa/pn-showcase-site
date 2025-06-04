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
  denomination: string;
  type: string;
  city: string;
  address: string;
  normalizedAddress: string;
  province: string;
  region: string;
  cap: string;
  contacts: string;
  distance?: number;
}

export interface Point {
  descrizione: string;
  tipologia: string;
  città: string;
  via: string;
  indirizzo_AWS: string;
  provincia: string;
  regione: string;
  cap: string;
  telefono: string;
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
  latitudine: string;
  longitudine: string;
}

export type PaginationData = {
  size: number;
  totalElements: number;
  numOfDisplayedPages: number;
  currentPage: number;
};

// localization //
export type LangCode = (typeof langCodes)[number];
export interface I18n {
  [key: string]: I18n | string;
}
// ------------ //
