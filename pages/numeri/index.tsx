import type { NextPage } from "next";

import PageHead from "../../src/components/PageHead";
import Completion from "src/components/Numeri/components/Completion";
import DashboardIntro from "src/components/Numeri/components/DashboardIntro";
import KpiAuthoritiesServices from "src/components/Numeri/components/KpiAuthoritiesServices";
import KpiNotifications from "src/components/Numeri/components/KpiNotifications";
import NotificationsTrend from "src/components/Numeri/components/NotificationsTrend";
import TopServices from "src/components/Numeri/components/TopServices";
import { curYear, firstYear } from "src/components/Numeri/shared/constants";
import { useState } from "react";
import { Typography, Box, Stack } from "@mui/material";
import Tabs from "src/components/Tabs";
import { DataSectionWrapper } from "src/components/Numeri/components/DataSectionWrapper";
import HeadingTitle from "src/components/HeadingTitle";

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

    const handleTabChange = (tab: number) => {
        if (tab === tabs[tab].id) {
            return;
        }
        setSelYear(tabs[tab].id);
    };

    return (
        <>
            <PageHead
                title="SEND - I numeri di SEND"
                description="In questa pagina trovi le statistiche relative a SEND, aggiornate quotidianamente"
            />
            <Box mt={10}>
                <HeadingTitle title="I numeri di SEND" subtitle={<Stack>
                    <Typography>Scopri i numeri di Piattaforma Notifiche ......</Typography> <DashboardIntro />

                </Stack>} />
            </Box>


            {/* <Hero
                title="I numeri di SEND"
                type="text"
                background={`${IMAGES_PATH}/hero-faq-background-2.png`}
                subtitle={
                    <Stack>
                        <Typography color="#fff">Scopri i numeri di Piattaforma Notifiche ......</Typography> <DashboardIntro />

                    </Stack>
                } /> */}
            <Tabs tabs={tabs.map(tab => tab.label)} onTabChange={handleTabChange} />
            <Box sx={{ overflowX: 'hidden' }}>

                <DataSectionWrapper title="Volumi e andamento notifiche" description="Le notifiche vengono inviate dagli enti mittenti">
                    <Box mb={2}>
                        <KpiNotifications selYear={selYear} />

                        <Completion selYear={selYear} />
                        <NotificationsTrend selYear={selYear} />
                    </Box>
                </DataSectionWrapper>

                <DataSectionWrapper title="Enti e Servizi" description="Scopri quanti enti stanno usando SEND e per quali servizi" background="grey">
                    <Box mb={2}>
                        <KpiAuthoritiesServices />

                        <TopServices />
                    </Box>
                </DataSectionWrapper>

            </Box>
        </>
    );

};

export default NumeriPage;
