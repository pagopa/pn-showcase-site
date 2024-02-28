import { useEffect, useState } from "react";
import {
  SceneText,
  Scene as VegaScene,
  SceneGroup as VegaSceneGroup,
  Spec as VegaSpec,
  View,
  parse,
} from "vega";
import { expressionInterpreter } from "vega-interpreter";

import { Typography } from "@mui/material";
import { TopLevelSpec } from "vega-lite";
import { VegaSceneRoot, searchTree, toVegaSpec } from "../shared/chart-utils";
import { cacheLoader } from "../shared/vega-cache-loader";

type Props = {
  spec: TopLevelSpec | VegaSpec;
  className?: string;
};
const isSceneText = (
  item: VegaScene | VegaSceneGroup | SceneText
): item is SceneText => "text" in item;

const KpiAuthority = ({ spec, ...restProps }: Props): JSX.Element => {
  const [text, setText] = useState("#");
  const [scenegraph, setScenegraph] = useState<VegaSceneRoot | null>(null);

  useEffect(() => {
    function getText(): string {
      if (scenegraph === null) return "";
      const scene = searchTree(scenegraph.root, "role", "mark");
      if (scene === null) return "";
      const marks = scene.items;
      return isSceneText(marks[0]) ? marks[0].text : "";
    }

    setText(getText());
  }, [scenegraph]);

  useEffect(() => {
    const vgSpec = toVegaSpec(spec);
    new View(parse(vgSpec, undefined, { ast: true }), {
      expr: expressionInterpreter,
      renderer: "none",
      loader: cacheLoader,
    })
      .runAsync()
      .then((viewRes) =>
        setScenegraph(viewRes.scenegraph() as unknown as VegaSceneRoot)
      );
  }, [spec]);

  return (
    <Typography variant="h4" sx={{ mt: 3 }} {...restProps}>
      {text}
    </Typography>
  );
};

export default KpiAuthority;
