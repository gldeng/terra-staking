// import { Breakpoints } from "@mui/styles/createBreakpoints";
// import { Shape } from "@mui/styles/shape";
import { Breakpoints } from '@mui/material/styles';
import { getShadow } from './animationUtils'

export const shape = {
  borderRadius: 20,
};

export const breakpoints: Partial<Breakpoints> = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

export const defaultShadow = getShadow("#001B3A", 0.1, 0, 0, 3);
