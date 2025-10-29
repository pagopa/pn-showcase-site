import { useContext, useEffect, useState } from "react";
import {
  SceneText,
  Scene as VegaScene,
  SceneGroup as VegaSceneGroup,
} from "vega";
import { TopLevelSpec } from "vega-lite";
import { getMarks } from "../shared/chart-utils";
import LangContext from "src/context/lang-context";

type Props = {
  spec: TopLevelSpec;
};

const isSceneText = (
  item: VegaScene | VegaSceneGroup | SceneText
): item is SceneText => "text" in item;

const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

function parseItalianDate(dateString: string) {
  const match = dateString.match(dateRegex);

  if (!match) {
    throw new Error(`Formato data non valido: ${dateString}`);
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  const dateObj = new Date(year, month - 1, day);
  return dateObj;
}

const KpiWrapperDate = ({ spec }: Props) => {
  const [text, setText] = useState("#");
  const { lang } = useContext(LangContext);

  useEffect(() => {
    getMarks(spec)
      .then((marks) => {
        if (!marks[0]) {
          return;
        }
        if (isSceneText(marks[0])) {
          setText(marks[0].text);
        }
      })
      .catch(console.error);
  });

  return (
    <>
      {text === "#"
        ? "#"
        : new Intl.DateTimeFormat(lang).format(parseItalianDate(text))}
    </>
  );
};

export default KpiWrapperDate;
