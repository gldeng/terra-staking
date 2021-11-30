/**
 * @license MIT License Copyright (c) 2019 Ren Project
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
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
