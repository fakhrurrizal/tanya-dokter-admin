import { ReactElement } from 'react'
import { DefaultLayout } from '../layout'
import PrivateRoutes from '../private-routes'

export const getNavbarLayout = (page: ReactElement) => {
    return (
        <PrivateRoutes>
            <DefaultLayout>{page}</DefaultLayout>
        </PrivateRoutes>
    )
}
