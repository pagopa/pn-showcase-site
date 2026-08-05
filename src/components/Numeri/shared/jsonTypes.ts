export type SectionTwoData = {
  last_run: Date;
  enti_attivi: Array<EntiPerAnno>;
  geo_comuni: Array<GeoComuni>;
  top10_ambiti: Array<Ambiti>;
  top10_atti: Array<Atto>;
  notif_enti_category: Array<CategoriaEnte>;
};

export type EntiPerAnno = {
  year: string | null;
  num_enti: number;
  pct_variazione_vs_anno_prec: number | null;
};

export type GeoComuni = {
  year: string | null;
  regione: string;
  num_comuni_attivi: number;
  perc_comuni_attivi: number;
};

export type Ambiti = {
  year: string | null;
  categoria_ente: string | null;
  ambito: string;
  num_iun: number;
  ranking: number;
};

export type Atto = {
  year: string | null;
  tipologia_atto: string;
  num_iun: number;
  ranking: number;
};

export type CategoriaEnte = {
  year: string | null;
  categoria_ente: string;
  num_iun: number;
  ranking: number;
};
