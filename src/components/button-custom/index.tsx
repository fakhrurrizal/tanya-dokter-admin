import type { FunctionComponent } from 'react'

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'

export interface ButtonProps extends Partial<MuiButtonProps> {
    isLoading?: boolean
    loadingProps?: CircularProgressProps
}

type ButtonType = FunctionComponent<ButtonProps>

export const Button: ButtonType = ({ children, isLoading, loadingProps, ...buttonProps }) => {
    const content = isLoading ? (
        <CircularProgress size='22.5px' sx={{ color: 'inherit' }} {...loadingProps} />
    ) : (
        children
    )

    return <MuiButton {...buttonProps}>{content}</MuiButton>
}
