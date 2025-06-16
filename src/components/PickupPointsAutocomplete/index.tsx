import React, { useCallback, useState } from "react";

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
  const [hasError, setHasError] = useState(false);
  const [shouldShowEmptyState, setShouldShowEmptyState] = useState(false);

  const searchAddresses = async (query: string): Promise<void> => {
    try {
      const url = createApiUrl("searchAddress", { address: query });
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }

      const data = await response.json();
      setAddresses(data.data || []);
      setHasError(false);
    } catch (error) {
      console.error("Error searching addresses:", error);
      setAddresses([]);
      setHasError(true);
    }
  };

  const getCoordinates = async (placeId: string): Promise<void> => {
    try {
      const url = createApiUrl("getPlaceCoordinates", { placeId });
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }

      const coordinates: Coordinates = await response.json();
      setSearchCoordinates(coordinates);
      setHasError(false);
    } catch (error) {
      console.error("Error getting coordinates:", error);
      setHasError(true);
    }
  };

  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.length >= MIN_QUERY_LENGTH) {
        searchAddresses(query);
        setShouldShowEmptyState(true);
      } else {
        setAddresses([]);
        setShouldShowEmptyState(false);
      }
    }, SEARCH_DELAY),
    [debounce]
  );

  const handleInputChange = (value: string): void => {
    debouncedSearch(value);
  };

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

    return hasError ? <ErrorState /> : <EmptyState />;
  };

  const options = addresses.map((addr) => addr.address.Label || "");

  return (
    <MuiItaliaAutocomplete
      options={options}
      sx={{ mt: 4 }}
      label={t("autocomplete-label")}
      placeholder={t("autocomplete-label")}
      onInputChange={handleInputChange}
      onSelect={handleAddressSelect}
      renderValue={(_, index) => renderItem(index)}
      hasClearIcon
      hideArrow
      avoidLocalFiltering
      emptyState={renderEmptyState()}
    />
  );
};

export default PickupPointsAutocomplete;
