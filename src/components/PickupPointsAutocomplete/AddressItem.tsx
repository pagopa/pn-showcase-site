import { Place } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { AddressResult } from "src/model";

const AddressItem: React.FC<{ address: AddressResult }> = ({ address }) => {
  const { placeType, address: addressData } = address;

  const getTitle = (): string => {
    switch (placeType) {
      case "Locality":
        return addressData.Locality || "";
      case "Street":
        return addressData.Street || "";
      case "District":
        return addressData.District || "";
      default:
        return addressData.Label || "";
    }
  };

  const getSubtitle = (): string => {
    if (placeType === "Street" || placeType === "District") {
      const locality = addressData.Locality || "";
      const subRegionCode = addressData.SubRegion?.Code || "";
      return `${locality} ${subRegionCode}`.trim();
    }
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

export default AddressItem;
