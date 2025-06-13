import { Place } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { AddressResult, Coordinates } from "src/model";
import MuiItaliaAutocomplete from "../MuiItaliaAutocomplete";
import { useTranslation } from "src/hook/useTranslation";

const BASE_URL = "https://webapi.dev.notifichedigitali.it/location";

interface Props {
  setSearchCoordinates: (coordinates: Coordinates) => void;
}

const PickupPointsAutocomplete: React.FC<Props> = ({
  setSearchCoordinates,
}) => {
  const { t } = useTranslation(["pickup"]);
  const [addresses, setAddresses] = useState<AddressResult[]>([]);
  const [loading, setLoading] = useState(false);

  const searchAddresses = async (query: string) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/searchAddress?address=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setAddresses(data.data);
    } catch (error: any) {
      console.error("Error searching addresses:", error);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const getCoordinates = async (placeId: string, address: string) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/getPlaceCoordinates?placeId=${encodeURIComponent(placeId)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const coordinates: Coordinates = await response.json();

      setSearchCoordinates(coordinates);
    } catch (error: any) {
      console.error("Error getting coordinates:", error);
    } finally {
      setLoading(false);
    }
  };

  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  const debouncedSearch = debounce((query: string) => {
    if (query.length >= 3) {
      searchAddresses(query);
    } else {
      setAddresses([]);
    }
  }, 500);

  const handleAddressSelect = (selectedAddress: string) => {
    const selectedResult = addresses.find(
      (addr) => addr.address.Label === selectedAddress
    );
    if (selectedResult) {
      getCoordinates(selectedResult.placeId, selectedAddress);
    }
  };

  const handleInputChange = (value: string) => {
    debouncedSearch(value);
  };

  const options = addresses.map((addr) => addr.address.Label || "");

  const renderItem = (index: number) => {
    console.log(index);
    const item = addresses[index];
    const placeType = item.placeType;

    const getTitle = () => {
      if (placeType === "Locality") return item.address.Locality;
      if (placeType === "Street") return item.address.Street;
      if (placeType === "District") return item.address.District;
      return item.address.Label;
    };

    const getSubtitle = () => {
      if (placeType === "Street" || placeType === "District")
        return `${item.address.Locality} ${item.address.SubRegion?.Code}`;
      return "Italia";
    };

    return (
      <Stack>
        <Stack direction="row" display="flex" alignItems="center" spacing={1}>
          <Place sx={{ color: "text.secondary", fontSize: "16px" }} />

          <Typography fontWeight="600">{getTitle()}</Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary" ml={3}>
          {getSubtitle()}
        </Typography>
      </Stack>
    );
  };

  return (
    <MuiItaliaAutocomplete
      options={options}
      sx={{ mt: 4 }}
      label={t("autocomplete-label")}
      placeholder={t("autocomplete-label")}
      noResultsText={loading ? "Caricamento..." : "Nessun risultato"}
      onInputChange={handleInputChange}
      onSelect={handleAddressSelect}
      renderValue={(_, index) => renderItem(index)}
      hasClearIcon
      hideArrow
      avoidLocalFiltering
    />
  );
};

export default PickupPointsAutocomplete;
