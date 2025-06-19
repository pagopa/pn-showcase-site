import React, { useCallback, useRef, useState } from "react";

import { useTranslation } from "src/hook/useTranslation";
import { AddressResult, Coordinates } from "src/model";
import MuiItaliaAutocomplete from "../MuiItaliaAutocomplete";
import AddressItem from "./AddressItem";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";

const BASE_URL = "https://webapi.dev.notifichedigitali.it/location";
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
  return `${BASE_URL}/${endpoint}?${searchParams.toString()}`;
};

const PickupPointsAutocomplete: React.FC<Props> = ({
  setSearchCoordinates,
}) => {
  const { t } = useTranslation(["pickup"]);
  const [addresses, setAddresses] = useState<AddressResult[]>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [shouldShowEmptyState, setShouldShowEmptyState] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchAddresses = async (query: string): Promise<void> => {
    try {
      setFetchError(false);
      const url = createApiUrl("searchAddress", { address: query });
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }

      const data = await response.json();
      setAddresses(data.data || []);
    } catch (error) {
      setAddresses([]);
      setFetchError(true);
    }
  };

  const getCoordinates = async (placeId: string): Promise<void> => {
    try {
      setFetchError(false);
      const url = createApiUrl("getPlaceCoordinates", { placeId });
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

  const handleAddressSelect = (selectedAddress: string): void => {
    const selectedResult = addresses.find(
      (addr) => addr.address.Label === selectedAddress
    );

    if (selectedResult) {
      getCoordinates(selectedResult.placeId);
    }
  };

  const renderItem = (index: number) => {
    const address = addresses[index];
    return <AddressItem address={address} />;
  };

  const renderEmptyState = () => {
    if (!shouldShowEmptyState) return <></>;

    return fetchError ? <ErrorState /> : <EmptyState />;
  };

  const options = addresses.map((addr) => addr.address.Label || "");

  return (
    <MuiItaliaAutocomplete
      options={options}
      sx={{ mt: 4 }}
      label={t("autocomplete.label")}
      placeholder={t("autocomplete.label")}
      onInputChange={debouncedSearch}
      onSelect={handleAddressSelect}
      renderOption={(_, index) => renderItem(index)}
      hasClearIcon
      hideArrow
      avoidLocalFiltering
      emptyState={renderEmptyState()}
    />
  );
};

export default PickupPointsAutocomplete;
