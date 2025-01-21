import Typography from "@mui/material/Typography";
import { PropsWithChildren } from "react";

export const Title = ({
  children,
  firstPage = false,
}: PropsWithChildren & { firstPage?: boolean }) => {
  return (
    <Typography
      variant="h3"
      sx={({ breakpoints, palette, isDarkMode }) => ({
        fontWeight: 800,
        textAlign: "center",
        color: isDarkMode ? palette.primary.main : "white",

        [breakpoints.up("md")]: {
          textAlign: !firstPage ? "center" : "start",
        },
      })}
    >
      {children}
    </Typography>
  );
};

export const SubTitle = ({
  children,
  firstPage = false,
}: PropsWithChildren & { firstPage?: boolean }) => {
  return (
    <Typography
      variant="h4"
      sx={({ breakpoints, palette, isDarkMode }) => ({
        textAlign: "center",
        marginBottom: 2,
        color: isDarkMode ? palette.primary.main : "white",

        [breakpoints.up("md")]: {
          textAlign: !firstPage ? "center" : "start",
        },
      })}
    >
      {children}
    </Typography>
  );
};
