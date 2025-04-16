import { langCodes } from "../utils/constants";

export interface RaddOperator {
  denomination: string;
  city: string;
  address: string;
  province: string;
  cap: string;
  contacts: string;
  latitude?: number;
  longitude?: number;
}

export interface Point {
  descrizione: string;
  città: string;
  via: string;
  provincia: string;
  cap: string;
  telefono: string;
  latitudine?: string;
  longitudine?: string;
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
