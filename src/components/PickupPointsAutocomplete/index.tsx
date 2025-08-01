import React, { useCallback, useEffect, useRef, useState } from "react";

import { GpsFixed } from "@mui/icons-material";
import { Box } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { areCoordinatesEqual } from "@utils/map";
import { useConfig } from "src/context/config-context";
import useCurrentPosition from "src/hook/useCurrentPosition";
import { useTranslation } from "src/hook/useTranslation";
import {
  AddressResult,
  Coordinates,
  OptionType,
  RaddOperator,
} from "src/model";
import MuiItaliaAutocomplete from "../MuiItaliaAutocomplete";
import AddressItem from "./AddressItem";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import LoadingState from "./LoadingState";

const SEARCH_DELAY = 500;
const MIN_QUERY_LENGTH = 3;
const CURRENT_POSITION_OPTION_ID = "userPosition";

interface Props {
  searchCoordinates: Coordinates | null;
  setSearchCoordinates: (coordinates: Coordinates) => void;
  setSelectedPoint: (point: RaddOperator | null) => void;
}

const createApiUrl = (endpoint: string, params: Record<string, string>) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  return `${endpoint}?${searchParams.toString()}`;
};

const PickupPointsAutocomplete: React.FC<Props> = ({
  searchCoordinates,
  setSearchCoordinates,
  setSelectedPoint,
}) => {
  const { t } = useTranslation(["pickup"]);
  const { userPosition, deniedAccess } = useCurrentPosition();
  const [addresses, setAddresses] = useState<AddressResult[]>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [shouldShowEmptyState, setShouldShowEmptyState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { API_BASE_URL } = useConfig();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showCurrentPositionOption = !deniedAccess && userPosition;

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
      setSelectedPoint(null);
    } catch (error) {
      setFetchError(true);
    }
  };

  const handleCurrentPosition = () => {
    if (userPosition) {
      setSelectedPoint(null);
      setSearchCoordinates(userPosition);
    }
  };

  const debouncedSearch = useCallback((query: string) => {
    if (!query) {
      setAddresses([]);
      setShouldShowEmptyState(false);
      return;
    }

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

  const renderItem = (option: OptionType) => {
    if (option.id === CURRENT_POSITION_OPTION_ID) {
      return (
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          fontWeight={600}
          color="primary.main"
        >
          <GpsFixed sx={{ fontSize: "16px" }} />
          {option.label}
        </Box>
      );
    }

    const address = addresses.find((addr) => addr.placeId === option.id);
    if (!address) return null;

    return <AddressItem address={address} />;
  };

  const renderEmptyState = () => {
    if (!shouldShowEmptyState) return <></>;

    if (isLoading) return <LoadingState />;

    return fetchError ? <ErrorState /> : <EmptyState />;
  };

  const handleSelect = (option: any) => {
    if (option.id === CURRENT_POSITION_OPTION_ID) {
      handleCurrentPosition();
    } else {
      getCoordinates(option.id.toString());
    }
  };

  const getPlaceholder = () => {
    if (
      (searchCoordinates &&
        areCoordinatesEqual(userPosition, searchCoordinates)) ||
      (userPosition && !searchCoordinates)
    ) {
      return t("autocomplete.current-position");
    }

    return undefined;
  };

  const currentPositionHandler = (option: OptionType) =>
    showCurrentPositionOption && option.id === CURRENT_POSITION_OPTION_ID
      ? ""
      : option.label;

  const options = [];

  if (showCurrentPositionOption) {
    options.push({
      id: CURRENT_POSITION_OPTION_ID,
      label: t("autocomplete.current-position-cta"),
    });
  }

  addresses.forEach((addr) => {
    options.push({
      id: addr.placeId,
      label: addr.address.Label || "",
    });
  });

  useEffect(() => {
    if (areCoordinatesEqual(userPosition, searchCoordinates)) {
      setAddresses([]);
      setShouldShowEmptyState(false);
    }
  }, [userPosition, searchCoordinates]);

  return (
    <>
      <MuiItaliaAutocomplete
        options={options}
        sx={{ mt: 4 }}
        label={t("autocomplete.label")}
        placeholder={getPlaceholder()}
        onInputChange={debouncedSearch}
        onSelect={handleSelect}
        renderOption={renderItem}
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
        setInputValueOnSelect={currentPositionHandler}
        overridenInputvalue={
          areCoordinatesEqual(userPosition, searchCoordinates) ? "" : undefined
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
