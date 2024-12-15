import { useApplicationSettings, useAuth } from '@/services'
import { MenuOutlined } from '@mui/icons-material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect, useState } from 'react'
import { appBarHeight } from '..'
import ExpandedDrawer from './drawer'
import { GenerateMiniListItem } from './mini-navbar'
import { localKey, menu_static, pathnames } from '@/utils/constants'
import { LogoForAppBar } from '@/components/logo'
import { UserMenu } from '../user-menu'

interface NavbarProps extends PropsWithChildren<{}> {
    drawerWidth?: number
}

const Navbar: React.FC<NavbarProps> = (Props: NavbarProps) => {
    const {
        drawerWidth,
    } = Props

    const [currentTime, setCurrentTime] = useState<string>(dayjs().format('DD MMMM YYYY HH:mm:ss'))

    const router = useRouter()

    const { push } = useRouter()

    const user = useAuth().value.user

    const logout = useAuth(state => state.logout)

    const [mobileOpen, setMobileOpen] = useState<boolean>(false)

    const list_menu = menu_static

    const isExpandDrawer = useApplicationSettings(state => state.value.expandSidebar)

    const toggleExpandDrawer = useApplicationSettings(state => state.toggleExpandSidebar)

    const handleDrawerToggle = () => {
        setMobileOpen(prevState => !prevState)
    }

    const handleLogout = async () => {
        logout()

        push(pathnames.login)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(dayjs().format('DD MMMM YYYY HH:mm:ss'))
        }, 1000)

        return () => clearInterval(interval)
    }, [])


    return (
        <>
            <Box
                sx={({ palette }) => ({
                    backgroundColor: palette.background.default,
                })}
            >
                <AppBar
                    position='fixed'
                    sx={{
                        backgroundColor: theme => theme.palette.background.default,
                        backgroundImage: 'none',
                        boxShadow: 'none',
                        zIndex: theme => theme.zIndex.drawer + 1,
                        // borderBottom: '1px solid #dedede'
                    }}
                    className='!shadow-sm border-b-2'
                >
                    <Toolbar
                        sx={() => ({
                            minHeight: appBarHeight + 'px !important',
                        })}
                        className='flex justify-between gap-5'
                    >
                        <Box className='page-header flex gap-5 shrink-0'>
                            <div className='flex-shrink-0 hidden md:block'>
                                <LogoForAppBar />
                            </div>

                            <Box
                                sx={({ breakpoints }) => ({
                                    width: `${30}px`,
                                    ml: 12,
                                    [breakpoints.down('md')]: {
                                        display: 'none',
                                    },
                                })}
                                className='flex items-center'
                            >
                                <IconButton onClick={toggleExpandDrawer}>
                                    <MenuOutlined color='primary' />
                                </IconButton>
                            </Box>

                            <Box
                                sx={({ breakpoints }) => ({
                                    [breakpoints.up('md')]: {
                                        display: 'none',
                                    },
                                })}
                                className='flex items-center'
                            >
                                <IconButton onClick={handleDrawerToggle}>
                                    <MenuOutlined color='primary' />
                                </IconButton>
                            </Box>
                        </Box>

                        <div className='flex flex-0 gap-[10px] items-center'>
                            <Typography fontWeight={600} color='primary' fontSize={13} className='text-pr-8 '>{currentTime}</Typography>
                        </div>

                        <Box className='flex justify-end'>


                            <div className='sm:flex items-center hidden h-full'>
                                <div className='flex items-center flex-col w-max justify-center gap-0 mr-[15px]'>
                                    <p className='text-primary text-[13px] font-bold'>{user?.fullname}</p>
                                    <p className='text-primary text-[12px] leading-none font-normal'>
                                        {user?.role?.name}
                                    </p>
                                </div>

                                <UserMenu
                                    handleLogout={handleLogout}
                                />
                            </div>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* DRAWER FOR DESKTOP */}
                <Drawer
                    variant='permanent'
                    transitionDuration={300}
                    sx={({ breakpoints, palette }) => ({
                        width: drawerWidth,
                        position: 'relative',
                        flexShrink: 0,
                        transition: 'all .5s',
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: palette.background.default,
                            // borderRight: 'none'
                            pt: '3px',
                            pr: '3px',
                        },
                        [breakpoints.down('md')]: {
                            display: 'none',
                        },
                    })}
                    className='shadow-md'
                >
                    {isExpandDrawer ? (
                        <>
                            {
                                <ExpandedDrawer
                                    items={list_menu}
                                    appBarHeight={appBarHeight}
                                    handleLogout={handleLogout}
                                    open={isExpandDrawer}
                                />
                            }
                        </>
                    ) : (
                        <GenerateMiniListItem items={list_menu} />
                    )}

                </Drawer>

                {/* DRAWER FOR MOBILE */}
                <Drawer
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: '80%',
                            paddingTop: appBarHeight + 'px',
                            borderRight: 'none',
                        },
                    }}
                >
                    <>
                        {
                            <ExpandedDrawer
                                items={list_menu}
                                appBarHeight={appBarHeight}
                                handleLogout={handleLogout}
                                open={isExpandDrawer}
                            />
                        }
                    </>
                </Drawer>
            </Box>
        </>
    )
}

export default Navbar

const findItemByPath = (items: any, path: any) => {
    for (const item of items) {
        if (item.path === path) {
            return item
        } else if (item.children && item.children.length > 0) {
            const childItem = item.children.find((child: any) => child.path === path)
            if (childItem) {
                return childItem
            }
        }
    }

    return null
}
