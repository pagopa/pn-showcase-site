import { useEffect, useState } from "react";
import { ImmutableLike, StyleSpecification } from "react-map-gl/maplibre";
import { useConfig } from "src/context/config-context";

type Props = {
  setMapError: (error: boolean) => void;
};

const recurseExpression = (
  exp: RegExp,
  prevPropertyRegex: RegExp,
  nextProperty: string
): any => {
  if (!Array.isArray(exp)) return exp;

  if (exp[0] !== "coalesce") {
    return exp.map((v) =>
      recurseExpression(v, prevPropertyRegex, nextProperty)
    );
  }

  const first = exp[1];
  const second = exp[2];

  let isMatch =
    Array.isArray(first) &&
    first[0] === "get" &&
    !!first[1]?.match?.(prevPropertyRegex)?.[0];

  isMatch = isMatch && Array.isArray(second) && second[0] === "get";
  isMatch = isMatch && !exp?.[4];

  if (!isMatch) {
    return exp.map((v) =>
      recurseExpression(v, prevPropertyRegex, nextProperty)
    );
  }

  return [
    "coalesce",
    ["get", nextProperty],
    ["get", "name:en"],
    ["get", "name"],
  ];
};

const updateLayer = (
  layer: any,
  prevPropertyRegex: RegExp,
  nextProperty: string
) => ({
  ...layer,
  layout: {
    ...layer.layout,
    "text-field": recurseExpression(
      layer.layout["text-field"],
      prevPropertyRegex,
      nextProperty
    ),
  },
});

const setPreferredLanguage = (
  style: StyleSpecification,
  language: string
): StyleSpecification => {
  let nextStyle = { ...style };

  nextStyle.layers = nextStyle.layers.map((layer) => {
    if (layer.type !== "symbol" || !layer?.layout?.["text-field"]) {
      return layer;
    }

    return updateLayer(layer, /^name:([A-Za-z\-\_]+)$/g, `name:${language}`);
  });

  return nextStyle;
};

const useLocalizedStyleDescriptor = ({ setMapError }: Props) => {
  const { CLOUDFRONT_MAP_URL } = useConfig();
  const [styleDescriptor, setStyleDescriptor] = useState<
    string | StyleSpecification | ImmutableLike<StyleSpecification> | undefined
  >(undefined);

  const language = "it";

  useEffect(() => {
    const getStyleWithPreferredLanguage = async (preferredLanguage: string) => {
      try {
        const response = await fetch(CLOUDFRONT_MAP_URL);

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const styleObject: StyleSpecification = await response.json();

        const localizedStyle = setPreferredLanguage(
          styleObject,
          preferredLanguage
        );

        setStyleDescriptor(localizedStyle);
      } catch (error) {
        console.error("Error fetching style:", error);
        setMapError(true);
      }
    };

    getStyleWithPreferredLanguage(language);
  }, [CLOUDFRONT_MAP_URL]);

  return styleDescriptor;
};

export default useLocalizedStyleDescriptor;
