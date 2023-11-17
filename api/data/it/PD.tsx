import { Box, Button, Card, CardActions, CardContent, Container, Grid, Link, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CodeIcon from '@mui/icons-material/Code';

export const Cards1 = () => {
    const cards1Data = [
        {
            title: "1. Termini e Condizioni di adesione e uso",
            buttons: [
                {
                    label: "Leggi i Termini e Condizioni",
                    color: "primary",
                    link: "https://docs.pagopa.it/documento-1-termini-condizioni-di-adesione-e-uso/",
                    icon: <ArrowForwardIcon sx={{ color: "#0073E6" }} />,
                },
            ],
        },
        {
            title: "2. Atto di Nomina a Responsabile Trattamento Dati Personali",
            buttons: [
                {
                    label: "Leggi l’Atto di Nomina",
                    color: "primary",
                    link: "https://docs.pagopa.it/doc.2-atto-di-nomina-a-responsabile-trattamento-da/",
                    icon: <ArrowForwardIcon sx={{ color: "#0073E6" }} />,
                },
            ],
        },
        {
            title: "3. Documentazione tecnica",
            buttons: [
                // {
                //     label: "Vai al documento",
                //     color: "primary",
                //     link: "https://developer.pagopa.it/send/overview",
                //     icon: <ArrowForwardIcon sx={{ color: "#0073E6" }} />,
                // },
                {
                    label: "Leggi il manuale operativo",
                    color: "primary",
                    link: "https://docs.pagopa.it/manuale-operativo/",
                    icon: <ArrowForwardIcon sx={{ color: "#0073E6" }} />,
                },
                {
                    label: "API b2b per le pubbliche amministrazioni e per l'avanzamento delle notifiche",
                    color: "primary",
                    link: "https://petstore.swagger.io/?url=https://raw.githubusercontent.com/pagopa/pn-delivery/pn-openapi-prod/docs/openapi/api-external-b2b-pa-bundle.yaml",
                    icon: <ArrowForwardIcon sx={{ color: "#0073E6" }} />,
                },
                // {
                //     label: "Vai alle API B2B per l’avanzamento delle notifiche",
                //     color: "primary",
                //     link: "#",
                //     icon: <ArrowForwardIcon sx={{ color: "#0073E6" }} />,
                // },
            ],
        },
        {
            title: "4. Ciclo attivo",
            buttons: [
                {
                    label: "Vai al documento",
                    color: "primary",
                    link: "https://docs.pagopa.it/documento-4-ciclo-attivo-pn",
                    icon: <ArrowForwardIcon sx={{ color: "#0073E6" }} />,
                },
            ],
        },
        {
            title: "5. Modulo di Profilazione",
            description: "Necessario per l’avvio in esercizio",
            buttons: [
                {
                    label: "Apri il documento",
                    color: "primary",
                    link: "/static/documents/Modulo preventivo di fornitura.xlsx",
                    icon: <ArrowForwardIcon sx={{ color: "#0073E6" }} />,
                },
            ],
        },
        {
            title: "6. Modulo di Commessa",
            description: "Necessario per la fatturazione",
            buttons: [
                {
                    label: "Compila il modulo",
                    color: "primary",
                    link: "/static/documents/Modulo Ordinativo Commessa per Anticipazione.xlsx",
                    icon: <ArrowForwardIcon sx={{ color: "#0073E6" }} />,
                },
            ],
        },
        {
            title: "7. SLA di servizio",
            buttons: [
                {
                    label: "Vai al documento",
                    color: "primary",
                    link: "https://docs.pagopa.it/sla-di-servizio/",
                    icon: <ArrowForwardIcon sx={{ color: "#0073E6" }} />,
                },
            ],
        },

    ];

    return (
        <Box pb={8} pt={8}>
            <Container maxWidth="xl" className="customCard">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} pb={4} sx={{ pr: { md: 10, xs: 0, sm: 0 } }}>
                        <Box>
                            <Stack>
                                <Typography variant="h4" tabIndex={0} aria-label="Come aderire a SEND" sx={{ color: "primary.contrastText" }} pb={4}>
                                    Come aderire a SEND
                                </Typography>
                                <Typography variant="h6" tabIndex={0} aria-label="Per gli enti" sx={{ color: "primary.contrastText" }} pb={4}>
                                    Per gli enti
                                </Typography>
                                <Typography variant="body2" tabIndex={0} aria-label="" sx={{ color: "primary.contrastText" }} pb={2}>
                                    Per aderire a SEND è necessario scegliere come integrarsi, direttamente o avvalendosi di uno dei{" "}
                                    <Link href="https://docs.pagopa.it/lista-partner-tecnologici-pn_pagopa-s.p.a./"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label=""
                                        sx={{ color: "primary.contrastText", textDecoration: "underline", fontWeight: "bold" }}
                                    >
                                        Partner e Intermediari tecnologici
                                    </Link>
                                    , e sottoscrivere l’accordo di adesione.
                                </Typography>
                                <Typography variant="body2" tabIndex={0} aria-label="" sx={{ color: "primary.contrastText" }} pb={2}>
                                    Per ricevere l'accordo di adesione, l'ente deve accedere all'
                                    <Link href="https://selfcare.pagopa.it/auth/login?onSuccess=%2Fonboarding%2Fprod-pn"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label=""
                                        sx={{ color: "primary.contrastText", textDecoration: "underline", fontWeight: "bold" }}
                                    >
                                        Area Riservata
                                    </Link>
                                    {" "}e seguire i passaggi descritti in{" "}
                                    <Link href="https://docs.pagopa.it/area-riservata-enti-piattaforma-notifiche/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label=""
                                        sx={{ color: "primary.contrastText", textDecoration: "underline", fontWeight: "bold" }}
                                    >
                                        questa guida
                                    </Link>
                                    .
                                </Typography>
                                <Typography variant="body2" tabIndex={0} aria-label="" sx={{ color: "primary.contrastText" }} pb={2}>
                                    Una volta sottoscritto l'accordo in digitale, l'ente dovrà caricarlo e inviarlo a PagoPA S.p.A. sempre dall'Area Riservata integrando i seguenti documenti e moduli debitamente compilati ove richiesto.
                                </Typography>
                                <Typography variant="body2" tabIndex={0} aria-label="" sx={{ color: "primary.contrastText" }} pb={2}>
                                    Per ulteriori informazioni e chiarimenti, è possibile{" "}
                                    <Link href="https://docs.pagopa.it/faq-enti"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label=""
                                        sx={{ color: "primary.contrastText", textDecoration: "underline", fontWeight: "bold" }}
                                    >
                                        consultare le FAQ
                                    </Link>
                                    {" "}dedicate agli enti.
                                </Typography>
                                <Button variant="contained" sx={{ width: "max-content", backgroundColor: "#FFFFFF", color: "#0073E6", '&:hover': { backgroundColor: "#FFFFFF", color: "#0073E6" } }} href="https://selfcare.pagopa.it/auth/login?onSuccess=%2Fonboarding%2Fprod-pn">
                                    Aderisci a SEND
                                </Button>
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid container spacing={2} xs={12} md={8} sx={{ ml: { xs: 0, sm: 0 } }}>
                        {/* Left column */}
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2} direction="column" justifyContent="space-between">
                                {cards1Data.slice(0, Math.ceil(cards1Data.length / 2)).map((card, index) => (
                                    <Grid item key={index}>
                                        <Card className="customCardContent">
                                            <CardContent sx={{ textAlign: "left" }}>
                                                <Typography variant="h5" component="div">
                                                    {card.title}
                                                </Typography>
                                                {card.description && (
                                                    <Typography variant="body2">
                                                        {card.description}
                                                    </Typography>
                                                )}
                                            </CardContent>
                                            <CardActions>
                                                <Stack direction="column" spacing={1}>
                                                    {card.buttons.map((button, buttonIndex) => (
                                                        <Button
                                                            key={buttonIndex}
                                                            size="small"
                                                            color={"primary"}
                                                            href={button.link}
                                                            endIcon={button.icon || <ArrowForwardIcon />}
                                                            sx={{ justifyContent: "start" }}
                                                            disableRipple={true}
                                                        >
                                                            {button.label}
                                                        </Button>
                                                    ))}
                                                </Stack>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>

                        {/* Right column */}
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2} direction="column" justifyContent="space-between">
                                {cards1Data.slice(Math.ceil(cards1Data.length / 2)).map((card, index) => (
                                    <Grid item key={index}>
                                        <Card className="customCardContent">
                                            <CardContent sx={{ textAlign: "left" }}>
                                                <Typography variant="h5" component="div">
                                                    {card.title}
                                                </Typography>
                                                {card.description && (
                                                    <Typography variant="body2">
                                                        {card.description}
                                                    </Typography>
                                                )}
                                            </CardContent>
                                            <CardActions>
                                                <Stack direction="column" spacing={1}>
                                                    {card.buttons.map((button, buttonIndex) => (
                                                        <Button
                                                            key={buttonIndex}
                                                            size="small"
                                                            color={"primary"}
                                                            href={button.link}
                                                            endIcon={button.icon || <ArrowForwardIcon />}
                                                            sx={{ justifyContent: "start" }}
                                                            disableRipple={true}
                                                        >
                                                            {button.label}
                                                        </Button>
                                                    ))}
                                                </Stack>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};


export const Cards2 = () => {
    const cards2Data = [
        //   {
        //       title: "Manuale onboarding dell’ente",
        //       description: "",
        //       buttons: [
        //           {
        //               label: "Vai al manuale",
        //               color: "primary",
        //               link: "#",
        //               icon: <ArrowForwardIcon sx={{ color: "#0073E6" }} />,
        //           },
        //       ],
        //   },
        //   {
        //       title: "Workflow della notifica",
        //       description: "",
        //       buttons: [
        //           {
        //               label: "Vai al documento",
        //               color: "primary",
        //               link: "#",
        //               icon: <ArrowForwardIcon sx={{ color: "#0073E6" }} />,
        //           },
        //       ],
        //   },
        {
            title: "Costi di notifica digitale e analogica",
            description: "",
            buttons: [
                {
                    label: "Vai ai costi",
                    color: "primary",
                    link: "/static/documents/Analisi Ente - Cittadino v1.0.xlsx - ENTE (PagoPA).pdf",
                    icon: <ArrowForwardIcon sx={{ color: "#0073E6" }} />,
                },
            ],
        },
        //   {
        //       title: "Kit di comunicazione",
        //       description: "",
        //       buttons: [
        //           {
        //               label: "Vai al kit",
        //               color: "primary",
        //               link: "#",
        //               icon: <ArrowForwardIcon sx={{ color: "#0073E6" }} />,
        //           },
        //       ],
        //   },
    ];

    return (
        <Box pb={8} pt={8} className="customCardContent">
            <Container maxWidth="xl" className="customCard">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} sx={{ pr: { md: 10, xs: 0, sm: 0 } }}>
                        <Box>
                            <Stack>
                                <Typography variant="h4" tabIndex={0} aria-label="Vuoi approfondire?" pb={4}>
                                    Vuoi approfondire?
                                </Typography>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid container spacing={2} xs={12} md={8} sx={{ ml: { xs: 0, sm: 0 } }}>
                        {/* Left column */}
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2} direction="column" justifyContent="space-between">
                                {cards2Data.slice(0, Math.ceil(cards2Data.length / 2)).map((card, index) => (
                                    <Grid item key={index}>
                                        <Card className="customCardContent">
                                            <CardContent sx={{ textAlign: "left" }}>
                                                <Typography variant="h5" component="div">
                                                    {card.title}
                                                </Typography>
                                                {card.description && (
                                                    <Typography variant="body2">
                                                        {card.description}
                                                    </Typography>
                                                )}
                                            </CardContent>
                                            <CardActions>
                                                <Stack direction="column" spacing={1}>
                                                    {card.buttons.map((button, buttonIndex) => (
                                                        <Button
                                                            key={buttonIndex}
                                                            size="small"
                                                            color={"primary"}
                                                            href={button.link}
                                                            endIcon={button.icon || <ArrowForwardIcon />}
                                                            sx={{ justifyContent: "start" }}
                                                            disableRipple={true}
                                                        >
                                                            {button.label}
                                                        </Button>
                                                    ))}
                                                </Stack>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        {/* Right column */}
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2} direction="column" justifyContent="space-between">
                                {cards2Data.slice(Math.ceil(cards2Data.length / 2)).map((card, index) => (
                                    <Grid item key={index}>
                                        <Card className="customCardContent">
                                            <CardContent sx={{ textAlign: "left" }}>
                                                <Typography variant="h5" component="div">
                                                    {card.title}
                                                </Typography>
                                                {card.description && (
                                                    <Typography variant="body2">
                                                        {card.description}
                                                    </Typography>
                                                )}
                                            </CardContent>
                                            <CardActions>
                                                <Stack direction="column" spacing={1}>
                                                    {card.buttons.map((button, buttonIndex) => (
                                                        <Button
                                                            key={buttonIndex}
                                                            size="small"
                                                            color={ "primary"}
                                                            href={button.link}
                                                            endIcon={button.icon || <ArrowForwardIcon />}
                                                            sx={{ justifyContent: "start" }}
                                                            disableRipple={true}
                                                        >
                                                            {button.label}
                                                        </Button>
                                                    ))}
                                                </Stack>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};


export const StripeLink = () => {
    return (
        <Box sx={{ backgroundColor: "#17324D" }} padding={2}>
            <Container maxWidth="xl">
                <Grid container spacing={2} >
                    <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Typography variant="body2" color="white" display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <CodeIcon sx={{ fontSize: "20px", marginRight: "10px" }} />
                            Il tuo ente ha già aderito e hai bisogno di approfondire le fasi di integrazione alla Piattaforma?
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} href="https://developer.pagopa.it/send/overview">
                            Vai alla documentazione tecnica
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
