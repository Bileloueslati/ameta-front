import { Link, LinkProps as RouterLinkProps } from "react-router-dom";
import { LinkProps } from "@mui/material/Link";
import { forwardRef } from "react";
import { PaletteMode, ThemeOptions } from "@mui/material";

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  return <Link ref={ref} to={href} {...other} />;
});

export const getTheme = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {
            default: "#eeeeee80",
            paper: "#fff",
          },
          primary: {
            main: "#d63031",
          },
          secondary: {
            main: "#1a1d21",
          },
        }
      : {
          background: {
            default: "#212428",
            paper: "#212428",
          },
          primary: {
            main: "#d63031",
          },
          secondary: {
            main: "#1a1d21",
          },
        }),
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1281,
      xxl: 1400,
    },
  },

  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "0.95rem",
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },

  typography: {
    fontFamily: "DM Sans",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.875rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    allVariants: {
      fontFamily: "DM Sans",
      fontWeight: 400,
    },
  },
});
