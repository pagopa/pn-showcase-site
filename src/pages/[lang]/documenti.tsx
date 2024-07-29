// pages/documenti.js
import { getInitialLocale } from '@utils/i18n';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Documenti = () => {
    const router = useRouter();

    useEffect(() => {
        const detectedLng = getInitialLocale();
        router.replace(`/${detectedLng}/pubbliche-amministrazioni/documenti`);
    }, [])

    return (
        <>
            <Head>
                <meta key="robots" name="robots" content="noindex, nofollow" />
            </Head>
        </>
    );
};

export default Documenti;
