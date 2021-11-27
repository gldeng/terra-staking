// import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
// import { Palette } from "@material-ui/core/styles/createPalette";
// import { Shadows } from "@material-ui/core/styles/shadows";
// import { Shadows } from "@material-ui/core/styles/shadows";
import { overrides } from "./overrides";
import { darkPalette, lightPalette } from "./palette";
import { props } from "./props";
import { shape, breakpoints } from "./other";
import { typography } from "./typography";
import * as customColors from "./colors";
import { createTheme } from "@mui/material/styles";
import { Palette } from "@mui/material/styles/createPalette";
import { Shadows } from "@mui/material/styles/shadows";
import { responsiveFontSizes } from "@mui/material/styles";
const baseTheme = (palette: Palette) => ({
  breakpoints,
  props,
  overrides: overrides(palette),
  typography,
  shape,
  shadows: Array(25).fill("none") as Shadows,
});

export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: lightPalette,
    ...baseTheme(lightPalette),
  })
);

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: darkPalette,
    ...baseTheme(darkPalette),
  })
);
