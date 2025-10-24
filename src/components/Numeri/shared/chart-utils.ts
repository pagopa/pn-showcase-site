import {
  Scene as VegaScene,
  SceneGroup as VegaSceneGroup,
  Spec as VegaSpec,
  View,
  parse,
} from "vega";
import { expressionInterpreter } from "vega-interpreter";
import vegaUrlParser from "vega-schema-url-parser";

import { TopLevelSpec as VegaLiteSpec, compile } from "vega-lite";
import { cacheLoader } from "./vega-cache-loader";

/**
 * Search for a key-value match within a tree.
 * @param {Object} element The agnostic tree to search in
 * @param {string} matchingKey A key to match
 * @param {*} matchingValue A value to match
 * @returns {* | null} The found element or null
 */
// REF: https://stackoverflow.com/questions/9133500/how-to-find-a-node-in-a-tree-with-javascript
const isMatchingKeyInVegaScene = (
  scene: VegaScene,
  field: keyof VegaScene | keyof VegaSceneGroup
): field is keyof VegaScene => field in scene;

const isMatchingKeyInVegaSceneGroup = (
  scene: VegaSceneGroup,
  field: keyof VegaScene | keyof VegaSceneGroup
): field is keyof VegaSceneGroup => field in scene;

const isVegaScene = (
  element: VegaScene | VegaSceneGroup
): element is VegaScene => "clip" in element;

export function searchTree(
  element: VegaScene | VegaSceneGroup,
  matchingKey: keyof VegaScene | keyof VegaSceneGroup,
  matchingValue: string
): VegaScene | VegaSceneGroup | null {
  if (!("items" in element)) return null;
  if (isVegaScene(element) && isMatchingKeyInVegaScene(element, matchingKey)) {
    if (element[matchingKey] === matchingValue) {
      return element;
    }
  }
  if (
    !isVegaScene(element) &&
    isMatchingKeyInVegaSceneGroup(element, matchingKey)
  ) {
    if (element[matchingKey] === matchingValue) {
      return element;
    }
  }
  let result: VegaScene | VegaSceneGroup | null = null;
  for (const item of element.items) {
    result = searchTree(item, matchingKey, matchingValue);
    if (result) break;
  }
  return result;
}

/**
 * Convert both a Vega and Vega-Lite spec to a Vega spec.
 * @param {vegaSpec | vegaLiteSpec} chartSpec A Vega or Vega-Lite json spec
 * @returns {vegaSpec} The converted Vega spec
 */
export function toVegaSpec(chartSpec: VegaLiteSpec | VegaSpec): VegaSpec {
  if (!chartSpec.$schema) return {};
  const { library } = vegaUrlParser(chartSpec.$schema);
  const vgSpec =
    library === "vega-lite"
      ? compile(chartSpec as VegaLiteSpec).spec
      : chartSpec;
  return vgSpec as VegaSpec;
}

/**
 * Compile a Vega or Vega-Lite spec to get corresponding Vega scenegraph.
 * @param {vegaSpec | vegaLiteSpec} chartSpec A Vega or Vega-Lite json spec
 * @returns {Promise<vegaScene>} A Promise of compiled Vega scenegraph
 */

export type VegaSceneRoot = {
  root: VegaScene | VegaSceneGroup;
};
export async function getScenegraph(
  chartSpec: VegaLiteSpec | VegaSpec
): Promise<VegaSceneRoot> {
  const vgSpec = toVegaSpec(chartSpec);
  const view = await new View(parse(vgSpec, undefined, { ast: true }), {
    // ...chartConfig,
    expr: expressionInterpreter,
    renderer: "none",
    loader: cacheLoader,
  }).runAsync();
  const scenegraph = view.scenegraph();
  return scenegraph as unknown as VegaSceneRoot;
}

/**
 * Search for a key-value match within a compiled scenegraph from a Vega or Vega-Lite spec.
 * @param {Object} chartSpec The Vega or Vega-Lite json spec to compile
 * @param {string} matchingKey The key to search for in the scene
 * @param {*} matchingValue The value to search for in the scene
 * @returns {Promise<vegaSceneGroup | null>} A Promise of found element or null
 */
export async function searchScenegraph(
  chartSpec: VegaSpec | VegaLiteSpec,
  matchingKey: keyof VegaScene | keyof VegaSceneGroup,
  matchingValue: string
): Promise<VegaScene | VegaSceneGroup | null> {
  const scenegraph = await getScenegraph(chartSpec);
  return searchTree(scenegraph.root, matchingKey, matchingValue);
}

/**
 * Compile a Vega or Vega-Lite spec to get corresponding marks from scenegraph.
 * @param {vegaSpec | vegaLiteSpec} chartSpec A Vega or Vega-Lite json spec
 * @returns {Promise<vegaSceneItem[]>} A Promise of found marks array or null
 */
export async function getMarks(
  chartSpec: VegaLiteSpec | VegaSpec
): Promise<VegaScene[] | VegaSceneGroup[]> {
  const marks = await searchScenegraph(chartSpec, "role", "mark");
  if (marks === null) return [];
  if ("items" in marks) {
    return marks.items;
  }
  return [];
}
