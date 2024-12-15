import { getNavbarLayout } from '@/components'
import { NextPageWithLayout } from '@/pages/_app'
import CategoryListPageViews from '@/views/master-data/category'
import Head from 'next/head'

const CategoryList: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>Daftar Categori - Tanya Dokter</title>
            </Head>
            <CategoryListPageViews />
        </>
    )
}

CategoryList.getLayout = getNavbarLayout
export default CategoryList
