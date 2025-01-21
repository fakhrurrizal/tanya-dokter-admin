import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { alpha, styled } from "@mui/material/styles";

export const HeaderIcon = styled(IconButton)<
  IconButtonProps & {
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  }
>(({ theme, color = "primary" }) => ({
  borderRadius: theme.shape.borderRadius + "px",
  backgroundColor: alpha(theme.palette[color].main, 0.08),

  [`& .${svgIconClasses.root}`]: {
    color: theme.palette[color].main,
  },
}));
