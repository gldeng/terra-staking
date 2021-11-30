/**
 * @license MIT License Copyright (c) 2019 Ren Project
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import createPalette, { Palette } from '@mui/material/styles/createPalette';
import {
  blue,
  blueDark,
  blueLight,
  graphite,
  graphiteDark,
  graphiteLight,
  strokeDefault,
  textDark,
  textDisabled,
  textLighter,
  white,
} from './colors'

const basePalette = {
  primary: {
    light: blueLight,
    main: blue,
    dark: blueDark,
    contrastText: white,
  },
  secondary: {
    light: graphiteLight,
    main: graphite,
    dark: graphiteDark,
    contrastText: white,
  },
  text: {
    primary: textDark,
    secondary: textLighter,
    disabled: textDisabled,
    hint: textDisabled,
  },
  divider: strokeDefault,
  error: {
    light: "#e57373",
    main: "#f44336",
    dark: "#d32f2f",
    contrastText: "#fff",
  },
  warning: {
    light: "#ffb74d",
    main: "#ff9800",
    dark: "#f57c00",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  info: {
    light: "#64b5f6",
    main: "#2196f3",
    dark: "#1976d2",
    contrastText: "#fff",
  },
  success: {
    light: "#81c784",
    main: "#4caf50",
    dark: "#388e3c",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  grey: {
    // "300": grayLight,
    "600": "#737478",
    "700": "#61616A"
  },
};

export const lightPalette: Palette = createPalette({
  mode: "light",
  ...basePalette,
});

export const darkPalette: Palette = createPalette({
  mode: "dark",
  ...basePalette,
});
