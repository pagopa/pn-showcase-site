import type { NextPage } from "next";

import PageHead from "../../src/components/PageHead";
import { Hero } from "@pagopa/mui-italia";
import { IMAGES_PATH } from "@utils/constants";


const NumeriPage: NextPage = () => (
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
            </div>
        </main>
    </>
);

export default NumeriPage;
