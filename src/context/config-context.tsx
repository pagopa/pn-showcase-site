"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Loading from "src/components/loading";

const urlPattern = /^(https?:\/\/)[a-z0-9._?=\-/]+$/i;

export type ShowcaseConfig = {
  API_BASE_URL: string;
  CLOUDFRONT_MAP_URL: string;
  GEOLOCATION_ASSISTANCE_URL: string;
};

const isConfigValid = (
  config: ShowcaseConfig | null
): config is ShowcaseConfig => {
  return (
    !!config &&
    urlPattern.test(config.API_BASE_URL) &&
    urlPattern.test(config.CLOUDFRONT_MAP_URL) &&
    urlPattern.test(config.GEOLOCATION_ASSISTANCE_URL)
  );
};

const ConfigContext = createContext<ShowcaseConfig | null>(null);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<ShowcaseConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const response = await fetch("/conf/config.json");
      const data = await response.json();
      if (!isConfigValid(data)) {
        throw new Error("invalid config format.");
      }
      setConfig(data);
    } catch (error) {
      console.error("Error loading config.json:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  if (error) {
    return <p>Error loading configuration: {error}</p>;
  }
  if (!config) return <Loading />;

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};
