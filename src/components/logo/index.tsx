import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

// interface LogoForAppBarProps {
//   trigger?: boolean
// }

export const LogoForAppBar = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                cursor: 'pointer',
                gap: 3,
                alignItems: 'center',
            }}
        >
            <Box>
                <Image
                    src='/logos.png'
                    width={70}
                    alt='Tanya Dokter App'
                    height={50}
                // style={{ filter: filterTrigger }}
                />
            </Box>

        </Box>
    )
}
