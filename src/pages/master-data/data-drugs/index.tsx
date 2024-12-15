import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/pages/_app'
import DataDrugsListPageViews from '@/views/master-data/data-drugs'
import Head from 'next/head'

const DataObatList: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Daftar Obat - Tanya Dokter</title>
            </Head>
            <DataDrugsListPageViews />
        </>
    )
}

DataObatList.getLayout = getNavbarLayout
export default DataObatList
