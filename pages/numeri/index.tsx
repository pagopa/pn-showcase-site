import type { NextPage } from "next";

import PageHead from "../../src/components/PageHead";
import { Hero } from "@pagopa/mui-italia";
import { IMAGES_PATH } from "@utils/constants";
import Completion from "src/components/Numeri/components/Completion";
import DashboardIntro from "src/components/Numeri/components/DashboardIntro";
import KpiAuthoritiesServices from "src/components/Numeri/components/KpiAuthoritiesServices";
import KpiNotifications from "src/components/Numeri/components/KpiNotifications";
import NotificationsTrend from "src/components/Numeri/components/NotificationsTrend";
import TabsNav from "src/components/Numeri/components/TabsNav";
import TopServices from "src/components/Numeri/components/TopServices";
import { curYear, firstYear } from "src/components/Numeri/shared/constants";
import { useState } from "react";
import { Container, Typography, Grid } from "@mui/material";

type Tabs = {
    id: number | null;
    label: string;
};

const numYear = curYear - firstYear + 1;
const years = Array.from({ length: numYear }, (_, i) => curYear - i).map(
    (y) => ({ id: y, label: String(y) })
);

const tabs: Tabs[] = [{ id: null, label: "Totale" }, ...years];

const NumeriPage: NextPage = () => {
    const [selYear, setSelYear] = useState<number | null>(null);
    return (
        <>
            <PageHead
                title="SEND - I numeri di SEND"
                description="In questa pagina trovi le statistiche relative a SEND, aggiornate quotidianamente"
            />

            <main>
                <div className="customFaqHero">
                    <Hero
                        title="I numeri di SEND"
                        type="text"
                        background={`${IMAGES_PATH}/hero-faq-background-2.png`}
                    />
                    <Container>
                        <DashboardIntro />
                        <section>
                            <Typography variant="h4">Volumi e andamento notifiche</Typography>
                            <TabsNav items={tabs} value={selYear} valueChange={setSelYear} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <KpiNotifications selYear={selYear} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Completion selYear={selYear} />
                                </Grid>
                                <Grid item xs={12}>
                                    <NotificationsTrend selYear={selYear} />
                                </Grid>
                            </Grid>
                        </section>
                        <section style={{ marginTop: '5rem' }}>
                            <Typography variant="h4" gutterBottom>Enti e Servizi</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <KpiAuthoritiesServices />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TopServices />
                                </Grid>
                            </Grid>
                        </section>
                    </Container>
                </div>
            </main>
        </>
    );

};

export default NumeriPage;
