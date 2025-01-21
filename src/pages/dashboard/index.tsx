import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/utils/helpers/getLayout'
import DashboardViews from '@/views/dashboard'
import Head from 'next/head'

const DashboardPage: NextPageWithLayout = () => {
    return (
        <div>
            <Head>
                <title>Dashboard - Tanya Dokter</title>
            </Head>
            <DashboardViews />
        </div>
    )
}

DashboardPage.getLayout = getNavbarLayout
export default DashboardPage
