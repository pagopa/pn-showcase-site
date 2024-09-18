import { ReactNode, useContext, useEffect, useState } from "react";

import { Box, Stack } from "@mui/material";

import { Footer, ButtonNaked, Languages, LangLabels } from "@pagopa/mui-italia";

import NavigationBar from "./NavigationBar";
import { langCodes, PAGOPA_HOME } from "../utils/constants";
import { LangCode } from "../model";
import { useTranslation } from "../hook/useTranslation";
import LangContext from "../context/lang-context";
import {
  companyLegalInfo,
  pagoPALink,
  postLoginLinks,
  preLoginLinks,
  productJson,
} from "../utils/footer";

interface Props {
  children?: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation(["common"]);
  const { lang, changeLanguage } = useContext(LangContext);

  const [windowURL, setWindowURL] = useState<string>();

  const availableLanguages = langCodes.reduce((obj, code) => {
    obj[code] = langCodes.reduce((innerObj, code) => {
      innerObj[code] = t(`footer.${code}`);
      return innerObj;
    }, {} as LangLabels);
    return obj;
  }, {} as Languages);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowURL(window.location.origin);
    }
  }, []);

  return (
    <Box sx={{ height: "100vh" }}>
      <Stack
        direction="column"
        sx={{ minHeight: "100vh" }} // 100vh per sticky footer
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            justifyContent: "center",
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
            minHeight: "48px",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" justifyContent="space-between" px={3}>
            <ButtonNaked
              sx={{
                fontWeight: "bold",
              }}
              size="small"
              aria-label={t("pagopaLink.ariaLabel")}
              href={PAGOPA_HOME}
              color="text"
              target="_blank"
              rel="noopener noreferrer"
              disableRipple
              disableTouchRipple
            >
              {t("pagopaLink.label")}
            </ButtonNaked>
            {/* <ButtonNaked
              size="small"
              aria-label={appData.common.assistance.ariaLabel}
              href={`mailto:${assistanceEmail}`}
              color="text"
              target="_blank"
              rel="noopener noreferrer"
              disableRipple
              disableTouchRipple
              startIcon={<HelpOutlineOutlinedIcon fontSize="inherit" />}
            >
              {appData.common.assistance.label}
            </ButtonNaked> */}
          </Stack>
        </Stack>
        <NavigationBar />
        <Box sx={{ flexGrow: 1 }} component="main">
          {children}
        </Box>
        <Footer
          loggedUser={false}
          companyLink={{
            ...pagoPALink(t, lang),
            onClick: () => window.open(PAGOPA_HOME, "_blank"),
          }}
          legalInfo={companyLegalInfo(t, lang)}
          postLoginLinks={postLoginLinks(t, lang)}
          preLoginLinks={preLoginLinks(t, lang, windowURL)}
          currentLangCode={lang}
          onLanguageChanged={(lng) => changeLanguage(lng as LangCode)}
          languages={availableLanguages}
          productsJsonUrl={productJson}
        />
      </Stack>
    </Box>
  );
};

export default Layout;
