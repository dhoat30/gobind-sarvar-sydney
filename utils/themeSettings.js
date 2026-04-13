import { createTheme } from "@mui/material/styles";
//export theme settings

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0050B3",
    },
    secondary: {
      main: "#F7CB15",
    },
    tertiary: {
      main: "#FAF2D6",
    },
    contrastThreshold: 4.5,
  },
  typography: {
    fontFamily: ["var(--font-work-sans)", "Segoe UI", "sans-serif"].join(","),

    h1: {
      fontSize: "4.5rem",
      fontWeight: 800,
      color: "var(--light-on-surface)",
      lineHeight: "110%",

      fontFamily: ["var(--font-prompt)", "Segoe UI", "sans-serif"].join(","),

      "@media (max-width:900px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: "110%",
      color: "var(--light-on-surface)",
      fontFamily: ["var(--font-prompt)", "Segoe UI", "sans-serif"].join(","),
      letterSpacing: "0.2rem",
      "@media (max-width:600px)": {
        fontSize: "2rem",
        lineHeight: "110%",
      },
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "0.05rem",
      color: "var(--light-on-surface)",
      fontFamily: ["var(--font-prompt)", "Segoe UI", "sans-serif"].join(","),

      "@media (max-width:600px)": {
        fontSize: "1.7rem",
        lineHeight: "2.2rem",
      },
    },
    h4: {
      fontFamily: ["var(--font-prompt)", "Segoe UI", "sans-serif"].join(","),
      fontWeight: 600,
      color: "var(--light-primary)",
    },
    h5: {
      fontFamily: ["var(--font-work-sans)", "Segoe UI", "sans-serif"].join(","),
lineHeight: "140%",
      fontWeight: 700,
      color: "var(--light-on-surface)",
      letterSpacing: "-0.03rem",
      "@media (max-width:600px)": {
        fontSize: "1.2rem",
      },
    },

    h6: {
      fontFamily: ["var(--font-work-sans)", "Segoe UI", "sans-serif"].join(","),
      fontWeight: 600,
      color: "var(--light-on-surface)",
      fontSize: "1.15rem",
    },
    body1: {
      fontFamily: ["var(--font-work-sans)", "Segoe UI", "sans-serif"].join(","),
      fontSize: "1rem",
      color: "var( --light-on-surface-variant)",
      lineHeight:"140%"
    },
    body2: {
      fontFamily: ["var(--font-work-sans)", "Segoe UI", "sans-serif"].join(","),
    },
    subtitle1: {
      fontFamily: ["var(--font-work-sans)", "Segoe UI", "sans-serif"].join(","),
      color: "var(--light-on-surface-variant)",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          color: "var(--light-on-primary)",
          paddingRight: "32px",
          paddingLeft: "32px",
          fontSize: "1.1rem",
          textTransform: "inherit",
          boxShadow: "none",
          fontWeight: "500",
        },
        contained: {
          background:
            "linear-gradient(94deg, #32B4D8 4.53%, #0018B3 95.52%)",
          color: "#ffffff",
        },
        outlined: {
          border: "1px solid var(--light-primary)",
          color: "var(--light-primary)",
        },
        text: {
          color: "var(--light-primary)",
          display: "inline-block",
          padding: "0 0",
          background: "none",
          fontSize: "1.1rem",
          letterSpacing: "0",
          ":hover": {
            background: "none",
            textDecoration: "underline",
          },
        },
      },
    },
  },
});
// mui theme settings
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0050B3",
    },
    secondary: {
      main: "#F7CB15",
    },
    tertiary: {
      main: "#FAF2D6",
    },
    contrastThreshold: 4.5,
  },
  typography: {
    fontFamily: ["var(--font-prompt)", "Segoe UI", "sans-serif"].join(","),
    h1: {
      fontFamily: ["var(--font-prompt)", "Segoe UI", "sans-serif"].join(","),

      fontSize: "5rem",
      fontWeight: 600,
      color: "var(--dark-on-surface)",
      "@media (max-width:900px)": {
        fontSize: "3rem",
      },
    },
    h2: {
      fontFamily: ["var(--font-prompt)", "Segoe UI", "sans-serif"].join(","),

      fontWeight: 600,
      color: "var(--dark-on-surface)",
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h3: {
      fontFamily: ["var(--font-prompt)", "Segoe UI", "sans-serif"].join(","),

      fontWeight: 600,
      letterSpacing: "0.05rem",
      color: "var(--dark-on-surface)",
    },
    h4: {
      fontFamily: ["var(--font-prompt)", "Segoe UI", "sans-serif"].join(","),
      fontWeight: 500,
      color: "var(--dark-on-surface)",

      "@media (max-width:900px)": {
        fontSize: "1.5rem",
      },
    },
    h5: {
      fontWeight: 400,
      letterSpacing: "0.02rem",

      color: "var(--dark-on-surface)",
    },

    h6: {
      fontWeight: 400,
      letterSpacing: "0.02rem",
      color: "var(--dark-on-surface)",
    },
    body1: {
      fontWeight: 350,
      letterSpacing: "0.02rem",
      color: "var( --dark-on-surface-variant)",
    },
    body2: {
      fontWeight: 300,
      letterSpacing: "0.05rem",
    },
    subtitle1: {
      color: "var(--dark-on-surface)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          textTransform: "none",
        },
      },
    },
  },
});
