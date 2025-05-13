import React, { useEffect, useState } from "react";
import { RaddOperator } from "../../model";
import { Button } from "@mui/material";
import { useTranslation } from "src/hook/useTranslation";

type Props = {
  point: RaddOperator;
  fullAddress: string;
};

const ShareButton: React.FC<Props> = ({ point, fullAddress }) => {
  const { t } = useTranslation(["pickup"]);
  const [isMobile, setIsMobile] = useState(false);
  const [canShare, setCanShare] = useState(false);

  const handleCopyInformation = () => {
    const pointInformation = `${point?.denomination} - ${fullAddress}`;
    navigator.clipboard.writeText(pointInformation);
  };

  const handleSharePoint = async () => {
    try {
      await navigator.share({
        title: `SEND - Punto di Ritiro ${point.denomination}`,
        text: fullAddress,
      });
    } catch (err) {
      handleCopyInformation();
    }
  };

  const handleClick = () => {
    if (isMobile && canShare) {
      handleSharePoint();
    } else {
      handleCopyInformation();
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      const userAgent =
        typeof window !== "undefined" ? navigator.userAgent : "";

      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        );
      setIsMobile(mobile);

      const shareAvailable =
        typeof navigator !== "undefined" && navigator.share !== undefined;

      setCanShare(shareAvailable);
    };

    checkMobile();
  }, []);

  return (
    <Button variant="contained" fullWidth onClick={handleClick}>
      {t("share")}
    </Button>
  );
};

export default ShareButton;
