import React, { useCallback, useRef, useState } from "react";

import { Box } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useConfig } from "src/context/config-context";
import useCurrentPosition from "src/hook/useCurrentPosition";
import { useTranslation } from "src/hook/useTranslation";
import { AddressResult, Coordinates } from "src/model";
import MuiItaliaAutocomplete from "../MuiItaliaAutocomplete";
import AddressItem from "./AddressItem";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import LoadingState from "./LoadingState";

const SEARCH_DELAY = 500;
const MIN_QUERY_LENGTH = 3;

interface Props {
  setSearchCoordinates: (coordinates: Coordinates) => void;
}

const createApiUrl = (endpoint: string, params: Record<string, string>) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  return `${endpoint}?${searchParams.toString()}`;
};

const PickupPointsAutocomplete: React.FC<Props> = ({
  setSearchCoordinates,
}) => {
  const { t } = useTranslation(["pickup"]);
  const { userPosition } = useCurrentPosition();
  const [addresses, setAddresses] = useState<AddressResult[]>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [shouldShowEmptyState, setShouldShowEmptyState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { API_BASE_URL } = useConfig();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchAddresses = async (query: string): Promise<void> => {
    try {
      setIsLoading(true);
      setFetchError(false);
      const endpoint = `${API_BASE_URL}/location/searchAddress`;
      const url = createApiUrl(endpoint, { address: query });
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }

      const data = await response.json();
      setAddresses(data.data || []);
    } catch (error) {
      setAddresses([]);
      setFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getCoordinates = async (placeId: string): Promise<void> => {
    try {
      setFetchError(false);
      const endpoint = `${API_BASE_URL}/location/getPlaceCoordinates`;
      const url = createApiUrl(endpoint, { placeId });
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }

      const coordinates: Coordinates = await response.json();
      setSearchCoordinates(coordinates);
    } catch (error) {
      setFetchError(true);
    }
  };

  const debouncedSearch = useCallback((query: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (query.length >= MIN_QUERY_LENGTH) {
        searchAddresses(query);
        setShouldShowEmptyState(true);
      } else {
        setAddresses([]);
        setShouldShowEmptyState(false);
      }
    }, SEARCH_DELAY);
  }, []);

  const renderItem = (index: number) => {
    const address = addresses[index];
    return <AddressItem address={address} />;
  };

  const renderEmptyState = () => {
    if (!shouldShowEmptyState) return <></>;

    if (isLoading) return <LoadingState />;

    return fetchError ? <ErrorState /> : <EmptyState />;
  };

  const options = addresses.map((addr) => ({
    id: addr.placeId,
    label: addr.address.Label || "",
  }));

  return (
    <>
      <MuiItaliaAutocomplete
        options={options}
        sx={{ mt: 4 }}
        label={t("autocomplete.label")}
        placeholder={
          userPosition ? t("autocomplete.current-position") : undefined
        }
        onInputChange={debouncedSearch}
        onSelect={(option) => getCoordinates(option.id.toString())}
        renderOption={(_, index) => renderItem(index)}
        hasClearIcon
        hideArrow
        avoidLocalFiltering
        emptyState={renderEmptyState()}
        inputStyle={
          userPosition
            ? {
                "&::placeholder": {
                  color: "textPrimary",
                  opacity: 1,
                },
              }
            : undefined
        }
      />

      <Box aria-live="polite" sx={visuallyHidden}>
        {isLoading && shouldShowEmptyState
          ? "Caricamento degli indirizzi"
          : shouldShowEmptyState && addresses.length > 0
          ? `Trovati ${addresses.length} indirizzi`
          : ""}
      </Box>
    </>
  );
};

export default PickupPointsAutocomplete;
