/**
 * @license MIT License Copyright (c) 2019 Ren Project
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { Palette } from "@mui/material/styles/createPalette";
import { alpha } from "@mui/system";
import { getShadow } from "./animationUtils";
import {
  alertError,
  alertErrorBackground,
  alertInfo,
  alertInfoBackground,
  alertSuccess,
  alertSuccessBackground,
  alertWarning,
  alertWarningBackground,
  textDark,
  textDisabled,
  textLighter,
} from "./colors";

export const overrides = (palette: Palette) => {
  return {
    MuiAlert: {
      action: {
        alignItems: "flex-start",
        paddingTop: 4,
      },
      standardSuccess: {
        color: alertSuccess,
        backgroundColor: alertSuccessBackground,
        boxShadow: getShadow(alertSuccess),
        "& $icon": {
          color: alertSuccess,
        },
      },
      standardInfo: {
        color: alertInfo,
        backgroundColor: alertInfoBackground,
        boxShadow: getShadow(alertInfo),
        "& $icon": {
          color: alertInfo,
        },
      },
      standardWarning: {
        color: alertWarning,
        backgroundColor: alertWarningBackground,
        boxShadow: getShadow(alertWarning),
        "& $icon": {
          color: alertWarning,
        },
      },
      standardError: {
        color: alertError,
        backgroundColor: alertErrorBackground,
        boxShadow: getShadow(alertError),
        "& $icon": {
          color: alertError,
        },
      },
    },
    MuiButton: {
      root: {
        fontSize: 16,
      },
      containedSizeLarge: {
        padding: "13px 22px",
        fontSize: 16,
      },
    },
    MuiChip: {
      root: {
        paddingTop: 3, // TODO: fix after investigation font hoisting issue
        backgroundColor: "#F1F1F6",
        borderRadius: 4,
        height: 22,
      },
      sizeSmall: {
        height: 16,
        fontSize: 12,
      },
    },
    MuiDialog: {
      paper: {
        minWidth: 320,
      },
      paperWidthSm: {
        maxWidth: 680,
      },
    },
    MuiDialogActions: {
      root: {
        padding: `40px`,
      },
    },
    MuiDialogTitle: {
      root: {
        paddingTop: 16,
        paddingBottom: 12,
      },
    },
    MuiDialogContent: {
      root: {
        padding: `36px 40px`,
      },
    },
    MuiDrawer: {
      paper: {
        padding: 20,
      },
      paperAnchorRight: {
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
      },
    },
    MuiFormControlLabel: {
      root: {
        marginRight: 0,
      },
    },
    MuiFilledInput: {
      root: {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      },
    },
    MuiInputBase: {
      // input: { ...generatePlaceholderStyles("ff0000") },
    },
    MuiInputLabel: {
      outlined: {
        fontSize: 14,
        "&$shrink": {
          color: palette.primary.main,
          transform: "translate(20px, 11px) scale(0.75)",
        },
      },
    },
    MuiOutlinedInput: {
      input: {
        paddingRight: 20,
        paddingLeft: 20,
      },
    },
    MuiLink: {
      root: {
        cursor: "pointer",
      },
    },
    MuiMobileStepper: {
      root: {
        background: "none",
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: "0px 1px 20px rgba(0, 27, 58, 0.05)",
      },
      elevation8: {
        boxShadow: "0px 1px 20px rgba(0, 27, 58, 0.05)",
      },
    },
    MuiSelect: {
      root: {
        padding: `13px 20px`,
      },
      select: {
        "&:focus": {
          backgroundColor: "initial",
        },
      },
      outlined: {
        background: "white",
        boxShadow: `0 0 3px 0 rgba(0,27,58,0.10)`,
      },
    },
    MuiSkeleton: {
      text: {
        borderRadius: 4,
      },
      rect: {
        borderRadius: 20,
      },
    },
    MuiSnackbar: {
      anchorOriginTopCenter: {
        top: "-64px!important",
      },
    },
    SnackbarItem: {
      collapseWrapper: {
        border: "1px solid blue",
      },
    },
    MuiSvgIcon: {
      root: {
        pointerEvents: "none",
      },
    },
    MuiTabs: {
      indicator: {
        display: "none",
      },
    },
    MuiTab: {
      root: {
        fontSize: 16,
      },
      textColorInherit: {
        color: textLighter,
        opacity: 1,
        "&$selected": {
          color: textDark,
          fontWeight: 500,
        },
        "&$disabled": {
          color: textDisabled,
        },
      },
    },
    MuiToggleButtonGroup: {
      root: {
        boxShadow: `0px 0px 4px rgba(0, 27, 58, 0.1)`,
        borderRadius: "50%",
      },
    },
    MuiToggleButton: {
      root: {
        borderRadius: 30,
        borderColor: palette.grey[300],
        "&$selected": {
          backgroundColor: alpha(palette.grey[300], 0.6),
          "&:hover": {
            backgroundColor: alpha(palette.grey[300], 0.6),
          },
        },
        "&:hover": {
          backgroundColor: alpha(palette.grey[300], 0.4),
        },
      },
    },
    MuiTooltip: {
      arrow: {
        color: palette.common.black,
      },
      tooltip: {
        borderRadius: 4,
        textAlign: "center",
        backgroundColor: palette.common.black,
        fontSize: 11,
      },
    },
  };
};
