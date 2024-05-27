import { NextPage } from "next";
import { useRef, useState } from "react";
import { Box, Button, Fade, Stack, Typography, Grid } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';

import {
  getAssistenzaHeadingTitleData,
  getAssistenzaTabsData,
  getAssistenzaContentBlockData,
} from "api";
import HeadingTitle from "src/components/HeadingTitle";
import Tabs from "src/components/Tabs";
import PageHead from "src/components/PageHead";

const DarkInfoblockAssistenza = () => {
  return (
    <Box sx={{ backgroundColor: "#0B3EE3", paddingTop: 8, paddingBottom: 8, width: '100%' }}>
      <Stack alignItems="center" justifyContent="center">
        <Typography variant="h6" component="h2" color="white" gutterBottom>
          Siamo qui per te
        </Typography>
        <Typography variant="body2" color="white" textAlign="center" marginBottom={2}>
          Non hai trovato la risposta che cercavi? Scrivici inviando una richiesta di assistenza o chiama il contact center.
        </Typography>
      </Stack>
    </Box>
  );
};

const LightStripeAssistenza = () => {
  return (
    <Box sx={{ backgroundColor: "#F5F5F5", paddingTop: 8, paddingBottom: 8, width: '100%' }}>
      <Stack alignItems="center" justifyContent="center">
        <MailIcon sx={{ fontSize: "40px", color: "#0062C3" }} />
        <Typography variant="h6" component="h2" sx={{ color: "#17324D" }} gutterBottom>
          Siamo qui per te
        </Typography>
        <Typography variant="body2" sx={{ color: "#17324D" }} textAlign="center" marginBottom={2}>
          Non hai trovato la risposta che cercavi? Scrivici inviando una richiesta di assistenza o chiama il contact center.
        </Typography>
        <Button variant="outlined" color="primary">Scrivici</Button>
      </Stack>
    </Box>
  );
};

const ContactInfoAssistenza = () => {
  return (
    <Grid container spacing={0} sx={{ width: '100%' }}>
      <Grid item xs={12} md={6} sx={{ backgroundColor: '#F5F5F5', padding: 4 }}>
        <Stack alignItems="center" justifyContent="center" spacing={2}>
          <MailIcon sx={{ fontSize: "40px", color: "#0062C3" }} />
          <Typography variant="h6" component="h2" sx={{ color: "#17324D" }} gutterBottom>
            Scrivici
          </Typography>
          <Typography variant="body2" sx={{ color: "#17324D" }} textAlign="center" marginBottom={2}>
            Richiedi assistenza via email scrivendo a destinatari-send@assistenza.pagopa.it: includi informazioni utili come il codice univoco della notifica (IUN).
          </Typography>
          <Button variant="outlined" color="primary">Scrivici</Button>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6} sx={{ backgroundColor: '#FAFAFA', padding: 4 }}>
        <Stack alignItems="center" justifyContent="center" spacing={2}>
          <PhoneIcon sx={{ fontSize: "40px", color: "#0062C3" }} />
          <Typography variant="h6" component="h2" sx={{ color: "#17324D" }} gutterBottom>
            Chiamaci
          </Typography>
          <Typography variant="body2" sx={{ color: "#17324D" }} textAlign="center" marginBottom={2}>
            Il contact center di PagoPA S.p.A. è a tua disposizione al numero 06.4520.2323 per assistenza dedicata dal lunedì al venerdì dalle 08 alle 20 e il sabato dalle 08.00 alle 14.00.
          </Typography>
          <Button variant="outlined" color="primary">Chiamaci</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

const Assistenza: NextPage = () => {
  const [currentTab, setCurrentTab] = useState({ index: 0, visible: true });
  const transitionDuration = 500;
  const containerRef = useRef(null);
  const tabsData = getAssistenzaTabsData("tabs assistenza 1");
  const headingTitleData = getAssistenzaHeadingTitleData("heading title assistenza 1");
  const handleTabChange = (tab: number) => {
    if (tab === currentTab.index) {
      return;
    }
    setCurrentTab({ index: currentTab.index, visible: false });
    setTimeout(
      () => setCurrentTab({ index: tab, visible: true }),
      transitionDuration
    );
  };

  const contentData = getAssistenzaContentBlockData(`content assistenza ${currentTab.index + 1}`);

  return (
    <Stack alignItems="center">
      <PageHead
        title="SEND - Servizio Notifiche Digitali | Assistenza"
        description="Domande frequenti e risorse dedicate all'assistenza per il servizio notifiche digitali SEND"
      />
      <HeadingTitle {...headingTitleData} />
      <Tabs {...tabsData} onTabChange={handleTabChange} />
      <Box ref={containerRef} sx={{ width: '100%', maxWidth: '1200px', mt: 4 }}>
        <Fade in={currentTab.visible} timeout={transitionDuration}>
          <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: 2 }}>
            {contentData.content}
          </Box>
        </Fade>
      </Box>
      {currentTab.index === 0 && <DarkInfoblockAssistenza />}
      {currentTab.index === 1 && <LightStripeAssistenza />}
      {currentTab.index === 0 && <ContactInfoAssistenza />}
    </Stack>
  );
};

export default Assistenza;
