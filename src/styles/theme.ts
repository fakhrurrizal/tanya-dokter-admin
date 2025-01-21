import { useApplicationSettings } from "@/services";
import { colors } from "@/utils/constants";
import { alpha, createTheme } from "@mui/material/styles";
import { useMemo } from "react";

export const useIsDarkMode = () => {
  // const systemScreenMode = useMediaQuery('(prefers-color-scheme: dark)')

  const screenMode = useApplicationSettings((state) => state.value.screenMode);

  // if (screenMode === 'SYSTEM') return systemScreenMode

  return screenMode === "DARK";
};

export const useGetTheme = () => {
  const isDarkMode = useIsDarkMode();

  const primary = "#116487";

  const error = "#ff3a6e";

  const backgroundColor = isDarkMode ? "#121212" : "#FFFFFF";

  const borderRadius = 4;

  const fontColor = isDarkMode ? "#F4F5FA" : "#474955";

  const fontDark = isDarkMode ? "#474955" : primary;

  const useTheme = useMemo(
    () =>
      createTheme({
        isDarkMode,

        shape: {
          borderRadius,
        },

        palette: {
          mode: isDarkMode ? "dark" : "light",

          primary: {
            main: primary,
          },

          error: {
            main: error,
          },

          success: {
            main: "#6fd943",
          },

          secondary: {
            main: "#808080",
          },

          warning: {
            main: colors.yellow[400],
          },

          info: {
            main: colors.blue[300],
          },

          background: {
            default: backgroundColor,
            paper: backgroundColor,
          },

          mainColor: isDarkMode ? alpha(primary, 0.175) : colors.slate[100],

          fontColor,

          text: {
            primary: fontColor,
            secondary: fontDark,
          },
        },

        typography: {
          fontSize: 10.5,

          fontWeightRegular: 500,

          allVariants: {
            fontFamily: '"Montserrat", sans-serif',
            // fontFamily: '"Source Sans 3", sans-serif',
            color: fontColor,
          },
        },

        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                fontWeight: 500,
              },
            },
            defaultProps: {
              fullWidth: true,
            },
          },

          MuiInputAdornment: {
            styleOverrides: {
              root: {
                "& .MuiTypography-root": {
                  color: alpha("#000000", 0.87),
                },
              },
            },
          },

          MuiSelect: {
            defaultProps: {
              fullWidth: true,
              size: "small",
            },
          },

          MuiButton: {
            styleOverrides: {
              root: {
                boxShadow: "none",
                textTransform: "none",
                ":hover": {
                  boxShadow: "none",
                },
              },
            },
          },

          MuiListItemIcon: {
            styleOverrides: {
              root: {
                minWidth: "38px",
                color: "rgba(0, 0, 0, 0.54)",
              },
            },
          },

          MuiListItem: {
            styleOverrides: {
              root: {
                borderRadius: borderRadius + "px",
              },
            },
          },

          MuiListItemButton: {
            styleOverrides: {
              root: {
                borderRadius: borderRadius + "px",

                ":hover": {
                  boxShadow: "none",
                },

                "&.Mui-selected": {
                  backgroundColor: alpha(primary, 0.1),

                  "& .MuiButtonBase-root": {
                    color: primary,
                  },

                  "& .MuiTypography-root": {
                    color: primary,
                    fontWeight: 500,
                  },

                  "& .MuiSvgIcon-root": {
                    color: primary,
                  },
                },
              },
            },
          },

          MuiStepLabel: {
            styleOverrides: {
              root: {
                "& .MuiSvgIcon-root": {
                  width: "1.25em",
                  height: "1.25em",
                },
              },
              label: {
                fontSize: "0.85rem",
              },
            },
          },

          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: "none",
                backgroundImage: "none",
              },
            },
          },

          MuiTableCell: {
            styleOverrides: {
              head: {
                fontWeight: 600,
              },
            },
          },

          MuiTooltip: {
            defaultProps: {
              placement: "bottom",
              sx: {
                fontSize: "13px",
              },
            },
          },

          MuiButtonGroup: {
            styleOverrides: {
              root: {
                boxShadow: "none",
              },
            },
          },

          MuiCardContent: {
            styleOverrides: {
              root: {
                ":last-child": {
                  paddingBottom: "16px",
                },
              },
            },
          },

          MuiAutocomplete: {
            styleOverrides: {
              tag: ({ ownerState }) => ({
                ...(ownerState.size === "small" && {
                  height: "22px",
                }),
              }),
            },
          },
        },
      }),

    [isDarkMode, backgroundColor, fontColor, fontDark, primary],
  );

  return useTheme;
};
