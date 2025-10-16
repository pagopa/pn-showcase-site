export type SectionTwoData = {
  last_run: Date;
  enti_attivi: number;
  perc_enti_attivi: number;
  geo_comuni: Array<GeoComuni>;
  top10_ambiti: Array<Top10Ambiti>;
};

export type GeoComuni = {
  regione: string;
  num_comuni_tot: number;
  num_comuni_attivi: number;
  perc_comuni_attivi: number;
};

export type Top10Ambiti = {
  ambito: string;
  num_iun: number;
  ranking: number;
  categoria_ente: null | string;
};
