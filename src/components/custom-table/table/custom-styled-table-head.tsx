import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    className?: string
}

export const CustomStyledTableHead = ({ children, className }: Props) => {
    return (
        <>
            <th scope='row' className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-xs ${className}`}>
                {children}
            </th>
        </>
    )
}

export const CustomStyledTableData = ({ children, className }: Props) => {
    return (
        <>
            <th className={`px-6 py-4 text-xs font-medium ${className}`}>{children}</th>
        </>
    )
}
