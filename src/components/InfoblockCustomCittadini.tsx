
import { Box, Container, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IMAGES_PATH } from '@utils/constants';
import { useTranslation } from 'src/hook/useTranslation';

const InfoblockCustomCittadini: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation(['common', 'cittadini']);
  
    // const buttonStyle = {
    //   color: "rgba(255, 255, 255, 1)",
    //   borderColor: "rgba(255, 255, 255, 0.5)",
    //   borderWidth: 2,
    //   borderStyle: 'solid',
    //   backgroundColor: 'transparent',
    //   '&:hover': {
    //     backgroundColor: "rgba(255, 255, 255, 0.1)",
    //     borderColor: "rgba(255, 255, 255, 0.7)",
    //     color: "background.paper",
    //     boxShadow: 'none',
    //   },
    //   textTransform: 'none',
    //   width: '100%',
    //   boxShadow: 'none',
    //   padding: '6px 12px',
    // };
  
    return (
      <Box pb={8} pt={8} sx={{ background: '#0b3ee3', color: 'white' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ width: '100%', padding: isMobile ? 1 : 4 }}>
                <img
                  src={`${IMAGES_PATH}/pf-infoblock-6.png`}
                  alt="Descrizione immagine"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ color: "primary.contrastText" }} pb={4}>
                {t('infoblock_custom.title', {ns: 'cittadini'})}
              </Typography>
              <Typography variant="body2" sx={{ color: "primary.contrastText" }} pb={2}>
                {t('infoblock_custom.description_1', {ns: 'cittadini'})}
              </Typography>
              <Typography variant="body2" sx={{ color: "primary.contrastText" }} pb={2}>
                {t('infoblock_custom.description_2', {ns: 'cittadini'})}
              </Typography>
              <Stack direction="row" spacing={2} justifyContent={"flex-start"} alignItems={"center"} className="stack-responsive">
                <a
                  href="https://play.google.com/store/apps/details?id=it.pagopa.io.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${IMAGES_PATH}/google-play-badge.png`}
                    alt={t('infoblock_custom.googleAltText', {ns: 'cittadini'})}
                    className="button-cittadini"
                  />
                </a>
                <a
                  href="https://apps.apple.com/it/app/io/id1501681835"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${IMAGES_PATH}/app-store-badge.png`}
                    alt={t('infoblock_custom.appleAltText', {ns: 'cittadini'})}
                    className="button-cittadini"
                  />
                </a>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  };

  export default InfoblockCustomCittadini;