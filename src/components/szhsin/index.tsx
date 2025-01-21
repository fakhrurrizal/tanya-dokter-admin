import { styled } from "@mui/material/styles";

import {
  ControlledMenu,
  ControlledMenuProps as SzhsinMenuProps,
} from "@szhsin/react-menu";
import { menuSelector } from "@szhsin/react-menu/style-utils";

export const SzhsinMenu = styled(ControlledMenu)<SzhsinMenuProps>(
  ({ theme: { palette, shape, isDarkMode } }) => ({
    [menuSelector.name]: {
      borderRadius: `${shape.borderRadius}px`,
      padding: "8px",
      color: palette.fontColor,
      backgroundColor: palette.background.paper,
      backgroundImage: isDarkMode
        ? "linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))"
        : "none",
    },
  }),
);
