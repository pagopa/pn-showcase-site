import { LangCode } from "../model";

// localization //
export const langCodes = ["it", "en", "fr", "de", "sl"] as const;
export const LS_LANG_PROP_NAME = "lang";
export const DEFAULT_LANG: LangCode = "it";
// ------------- //

export const MAP_MARKERS = [
  { id: "base-marker", path: "/static/images/map/base-marker.png" },
  { id: "selected-marker", path: "/static/images/map/selected-marker.png" },
  { id: "searched-marker", path: "/static/images/map/searched-marker.png" },
];
