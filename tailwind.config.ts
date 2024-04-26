import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
import { ButtonConfig, HeadingConfig, LinkConfig } from "./tailwind";
import { styleguidePlugin } from "./tailwindPlugin";

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@yext/search-ui-react/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: "'Helvetica','Arial','sans-serif','system'",
        secondary: "'Helvetica','Arial','sans-serif','system'",
        heading: "Baskerville,'Times New Roman','Arial','sans-serif','system'",
      },
      fontSize: {
        sm: ["14px", "22px"],
        base: ["16px", "24px"],
        lg: ["18px", "24px"],
      },
      colors: {
        text: "black",
        "brand-primary": "#000000",
        "brand-secondary": "#C6AB76",
        "brand-dark-gold": "#8E723A",
        "brand-blue": "#2E66FF",
        "brand-white": "#FFFFFF",
        "brand-gray": {
          100: "#F2F2F2",
          200: "#EDEDED",
          300: "#C7CACC",
          400: "#767676",
          500: "#7C7773",
        },
      },
      buttons: (theme: PluginAPI["theme"]): ButtonConfig => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: `${theme("spacing.2")} ${theme("spacing.6")}`,
        fontWeight: theme("fontWeight.bold"),
        borderRadius: "50px",
        variants: {
          primary: {
            backgroundColor: theme("colors.brand-primary"),
            color: "white",
            border: "none",
          },
          secondary: {
            backgroundColor: "white",
            color: theme("colors.brand-secondary"),
            border: `2px solid ${theme("colors.brand-primary")}`,
            "&:hover": {
              backgroundColor: theme("colors.brand-secondary"),
              color: "white",
              border: `2px solid ${theme("colors.brand-primary")}`,
            },
          },
        },
      }),
      headings: (theme: PluginAPI["theme"]): HeadingConfig => ({
        fontFamily: theme("fontFamily.primary"),
        fontWeight: theme("fontWeight.bold"),
        variants: {
          sub: {
            fontSize: "1.25rem",
            lineHeight: "1.4",
            "@screen sm": {
              fontSize: "1.5rem",
              lineHeight: "1.25",
            },
          },
          head: {
            fontFamily: theme("fontFamily.heading"),
            fontSize: "1.5rem",
            lineHeight: "1.33",
            "@screen sm": {
              fontSize: "2.125rem",
              lineHeight: "1.18",
            },
          },
          lead: {
            fontSize: "1.75rem",
            lineHeight: "1.14",
            "@screen sm": {
              fontSize: "3rem",
              lineHeight: "1.33",
            },
          },
          footerTitle: {
            fontSize: "1rem",
            textDecoration: "none",
            color: theme("colors.brand-gray.300"),
          },
          teaser: {
            fontSize: "26px",
            fontFamily: theme("fontFamily.heading"),
            lineHeight: "1.14",
            "@screen sm": {
              fontSize: "2.25rem",
            },
          },
          locatorTitle: {
            fontSize: "26px",
            fontFamily: theme("fontFamily.heading"),
            lineHeight: "29px",
            "@screen sm": {
              fontSize: "36px",
              lineHeight: "41px",
            },
          },
        },
      }),
      links: (theme: PluginAPI["theme"]): LinkConfig => ({
        variants: {
          primary: {
            color: theme("colors.brand-primary"),
            "&:hover": {
              color: theme("colors.brand-secondary"),
            },
          },
          secondary: {
            color: theme("colors.brand-secondary"),
            "&:hover": {
              color: theme("colors.brand-primary"),
            },
          },
          breadcrumbs: {
            color: theme("colors.brand-primary"),
            textDecoration: "underline",
            "&:hover": {
              textDecoration: "none",
            },
          },
          directory: {
            fontSize: "18px",
            "&:hover": {
              textDecoration: "none",
            },
          },
          underline: {
            textDecoration: "underline",
            "&:hover": {
              textDecoration: "none",
            },
          },
          underlineInverse: {
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          },
          footer: {
            textDecoration: "none",
            color: theme("colors.brand-white"),
          },
        },
      }),
      container: {
        center: true,
        screens: {
          sm: "768px",
          md: "992px",
          lg: "1024px",
          xl: "1240px",
        },
        width: {
          DEFAULT: "100%",
          sm: "768px",
          md: "992px",
          lg: "1024px",
          xl: "1240px",
        },
        padding: "1rem",
      },
      boxShadow: {
        "brand-shadow": "0 -1px 0 0 #CCC inset",
      },
    },
  },
  plugins: [styleguidePlugin()],
} as Config;
