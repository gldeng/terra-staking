/**
 * @license MIT License Copyright (c) 2019 Ren Project
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { ComponentsProps } from "@mui/material/styles/props";
import React from "react";
import {CheckBoxOutlineBlank, CheckBox} from '@mui/icons-material';

export const props: ComponentsProps = {
  MuiCheckbox: {
    icon: <CheckBoxOutlineBlank fontSize="small" />,
    checkedIcon: <CheckBox fontSize="small" />,
  },
  MuiInput: {
    disableUnderline: true,
  },
  MuiButtonBase: {
    // The properties to apply
    disableRipple: true, // No more ripple, on the whole application 💣!
  },
  MuiIconButton: {
    size: "small",
  },
  MuiInputLabel: {
    shrink: true,
  },
  MuiTextField: {
    autoComplete: "off",
    fullWidth: true,
  },
  MuiTooltip: {
    arrow: true,
    placement: "top-start",
  },
  MuiLink: {
    color: "inherit",
    underline: "always",
  },
} as ComponentsProps;
