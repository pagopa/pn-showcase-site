import { ReactNode, useContext, useEffect, useState } from "react";

import { Box, Stack } from "@mui/material";

import { Footer, ButtonNaked, LangCode as MuiLangCode, Languages, LangLabels } from "@pagopa/mui-italia";

import { getAppData } from "../api";
import NavigationBar from "./NavigationBar";
import { langCodes } from "../utils/constants";
import { LangCode } from "src/model";
import { useTranslation } from "src/hook/useTranslation";
import LangContext from "src/context/lang-context";

interface Props {
  children?: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const appData = getAppData();
  const {t} = useTranslation(['common']);
  const {lang, changeLanguage} = useContext(LangContext);

  const [windowURL, setWindowURL] = useState<string>();

  const availableLanguages = langCodes.reduce((obj, code) => {
    obj[code] = langCodes.reduce((innerObj, code) => {
      innerObj[code] = t(`footer.${code}`);
      return innerObj
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
              aria-label={appData.common.pagoPALink.ariaLabel}
              href={appData.common.pagoPALink.href}
              color="text"
              target="_blank"
              rel="noopener noreferrer"
              disableRipple
              disableTouchRipple
            >
              {appData.common.pagoPALink.label}
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
        <NavigationBar {...appData.common.navigation} />
        <Box sx={{ flexGrow: 1 }} component="main">
          {children}
        </Box>
        <Footer
          loggedUser={false}
          companyLink={{
            ...appData.common.pagoPALink,
            onClick: () =>
              window.open(appData.common.pagoPALink.href, "_blank"),
          }}
          legalInfo={appData.common.companyLegalInfo}
          postLoginLinks={appData.common.postLoginLinks}
          preLoginLinks={appData.common.preLoginLinks(windowURL)}
          currentLangCode={lang}
          onLanguageChanged={(lng) => changeLanguage(lng as LangCode)}
          languages={availableLanguages}
          productsJsonUrl={appData.common.productJson}
        />
      </Stack>
    </Box>
  );
};

export default Layout;
