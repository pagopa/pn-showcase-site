import { langCodes } from "../utils/constants";

export interface OpeningDays {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface RaddOperator extends OpeningDays {
  denomination: string;
  type: string;
  city: string;
  address: string;
  province: string;
  region: string;
  cap: string;
  contacts: string;
  latitude: number;
  longitude: number;
  distance?: number;
}

export interface Point {
  descrizione: string;
  tipologia: string;
  città: string;
  via: string;
  provincia: string;
  cap: string;
  telefono: string;
  latitudine?: string;
  longitudine?: string;
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
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
