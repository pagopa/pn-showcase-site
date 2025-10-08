import { Place } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { CopyToClipboardButton } from "@pagopa/mui-italia";
import React from "react";
import { useTranslation } from "src/hook/useTranslation";

type Props = {
  address: string;
};

const Address: React.FC<Props> = ({ address }) => {
  const { t } = useTranslation(["pickup"]);

  return (
    <List>
      <Typography
        fontSize="16px"
        fontWeight={600}
        color="text.secondary"
        sx={{ px: 0, mb: 1 }}
      >
        {t("drawer.address")}
      </Typography>
      <ListItem sx={{ px: 0 }}>
        <ListItemIcon>
          <Place color="primary" sx={{ width: 24, height: 24 }} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant="body2"
              fontWeight={700}
              color="primary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordBreak: "break-word",
                ml: 1,
              }}
            >
              {address}
            </Typography>
          }
        />
        <CopyToClipboardButton
          value={address}
          tooltipTitle={t("drawer.address-copied")}
          sx={{ flexShrink: 0 }}
        />
      </ListItem>
    </List>
  );
};

export default Address;
