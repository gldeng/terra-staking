/**
 * @license MIT License Copyright (c) 2019 Ren Project
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {
  // makeStyles,
  Paper,
  PaperProps,
  // styled,
  Theme
} from "@mui/material";
import { createStyles, styled, WithStyles, withStyles } from "@mui/styles";
import classNames from "classnames";
import React, { FunctionComponent, FC } from "react";
// import { useShakingStyles } from "../../theme/animationUtils";
import * as customColors from '../theme/colors';

export const depositNavigationBreakpoint = "md";

const bridgePaperStyles = (theme: Theme) => createStyles({
  root: {
    maxWidth: 400,
    margin: "70px auto 0",
    position: "relative",
    transition: "margin 1s ease-out",
    // [theme.breakpoints.up(depositNavigationBreakpoint)]: {
    //   marginTop: 0,
    // },
  },
});

type BridgePurePaperProps = PaperProps & {
  shaking?: boolean;
};

const BridgePurePaperWithStyles: FunctionComponent<BridgePurePaperProps & WithStyles<typeof bridgePaperStyles>> = ({
  classes,
  shaking,
  className,
  ...props
}) => {
  // const classes = classes;
  // const shakingStyles = useShakingStyles();
  // const resolvedClassName = classNames(className, {
  //   [shakingStyles.shaking]: shaking,
  // });
  return <Paper classes={classes} {...props} />;
};

export const BridgePurePaper = withStyles(bridgePaperStyles)(BridgePurePaperWithStyles);


type BridgePaperProps = PaperContentProps & BridgePurePaperProps;

// deprecated - used only in catalog - remove gradually
export const BridgePaper: FunctionComponent<BridgePaperProps> = ({
  topPadding,
  bottomPadding = true,
  children,
  ...rest
}) => {
  return (
    <BridgePurePaper {...rest}>
      <PaperContent topPadding={topPadding} bottomPadding={bottomPadding}>
        {children}
      </PaperContent>
    </BridgePurePaper>
  );
};

export const BridgePaperWrapper = styled("div")({
  marginTop: 40,
});

const SMALL_PADDING = 10;
const MEDIUM_PADDING = 20;
const BIG_PADDING = 40;

const getPadding = (variant: PaddingVariant = "big") => {
  switch (variant) {
    case "small":
      return SMALL_PADDING;
    case "medium":
      return MEDIUM_PADDING;
    case "big":
    default:
      return BIG_PADDING;
  }
};

const paperPadding = getPadding('medium');

const paperContentStyles = (theme: Theme) => {
  return createStyles({
    root: {
      paddingLeft: paperPadding,
      paddingRight: paperPadding,
    },
    top: {
      paddingTop: paperPadding,
    },
    bottom: {
      paddingBottom: paperPadding,
    },
    darker: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      backgroundColor: customColors.whiteDarker,
    },
  })
};

type PaddingVariant = "big" | "medium" | "small";

export type PaperContentProps = {
  darker?: boolean;
  topPadding?: boolean;
  bottomPadding?: boolean;
  paddingVariant?: PaddingVariant;
  className?: string;
};


  const PaperContentWithStyles: FC<Omit<PaperContentProps, 'paddingVariant'> & WithStyles<typeof paperContentStyles>> = ({
    classes,
    topPadding,
    bottomPadding,
    darker,
    className,
    children,
  }) => {
    const styles = classes;
    const resolvedClassName = classNames(styles.root, className, {
      [styles.top]: topPadding,
      [styles.bottom]: bottomPadding,
      [styles.darker]: darker,
    });
    return <div className={resolvedClassName}>{children}</div>;
  };
  
export const PaperContent = withStyles(paperContentStyles)(PaperContentWithStyles);

export const PaperHeader = styled("header")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: SMALL_PADDING,
  paddingBottom: SMALL_PADDING,
  paddingLeft: SMALL_PADDING,
  paddingRight: SMALL_PADDING,
});

export const PaperNav = styled("div")({
  justifySelf: "flex-start",
  minWidth: 72,
});

export const PaperActions = styled("div")({
  justifySelf: "flex-end",
  minWidth: 72,
  "& > *": {
    margin: "0 4px",
    "&:first-child": {
      marginLeft: 0,
    },
    "&:last-child": {
      marginRight: 0,
    },
  },
});

export const PaperTitle = styled("div")({
  justifySelf: "center",
  textAlign: "center",
  width: "100%",
});

const spacedContentStyles = createStyles({
  root: {
    minHeight: 200, // this causes shifting
  },
  rootSmaller: {
    minHeight: 130,
  },
  rootFixedHeight: {
    height: 392 - 2 * 40,
  },
  autoOverflow: {
    overflowY: "auto",
  },
});

type SpacedPaperContentProps = PaperContentProps & {
  smaller?: boolean;
  fixedHeight?: boolean;
  autoOverflow?: boolean;
};

const SpacedPaperContentWithStyles: FunctionComponent<SpacedPaperContentProps & WithStyles<typeof spacedContentStyles>> = ({
  classes,
  smaller,
  fixedHeight,
  autoOverflow,
  ...rest
}) => {
  const styles = classes;
  const className = classNames(styles.root, {
    [styles.rootSmaller]: smaller,
    [styles.rootFixedHeight]: fixedHeight,
    [styles.autoOverflow]: autoOverflow,
  });
  return <PaperContent className={className} {...rest} />;
};

export const SpacedPaperContent = withStyles(spacedContentStyles)(SpacedPaperContentWithStyles);
