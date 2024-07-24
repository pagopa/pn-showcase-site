// pages/documenti.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Documenti = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace('pubbliche-amministrazioni/documenti');
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
