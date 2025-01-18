import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/pages/_app'
import UserListPageViews from '@/views/master-data/users-dokter'
import Head from 'next/head'

const UserList: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Daftar Dokter - Tanya Dokter</title>
            </Head>
            <UserListPageViews />
        </>
    )
}

UserList.getLayout = getNavbarLayout
export default UserList
