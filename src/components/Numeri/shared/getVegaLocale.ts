import path from "path";
import fs from "fs";
import { LangCode } from "src/model";

export function getVegaLocale(lang: LangCode) {
  const vegaLocalePath = path.join(
    process.cwd(),
    "src",
    "components",
    "Numeri",
    "shared",
    "locale",
    lang
  );

  const vegaFormatLocale = JSON.parse(
    fs.readFileSync(path.join(vegaLocalePath, "locale.json"), "utf8")
  );

  const vegaTimeFormatLocale = JSON.parse(
    fs.readFileSync(path.join(vegaLocalePath, "time-locale.json"), "utf8")
  );
  return {
    formatLocale: vegaFormatLocale,
    timeFormatLocale: vegaTimeFormatLocale,
  };
}
