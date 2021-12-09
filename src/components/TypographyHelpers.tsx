/**
 * @license MIT License Copyright (c) 2019 Ren Project
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { Divider, Typography, Theme } from "@mui/material";
import { createStyles, styled, WithStyles, withStyles } from "@mui/styles";
import classNames from "classnames";
import React, { FunctionComponent, ReactNode } from "react";
import { TooltipWithIcon } from "./TooltipWithIcon";
import MiddleEllipsis from "react-middle-ellipsis";
import * as customColors from '../theme/colors';

type LabelWithValueProps = {
  label: string;
  labelTooltip?: string;
  value: string | number | ReactNode;
  valueEquivalent?: string | number | ReactNode;
};

const labelWithValueStyles = (theme:Theme) => createStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
    marginBottom: 8,
  },
  labelWrapper: {
    flexShrink: 0,
    minWidth: '80px',
    maxWidth: "50%",
    color: theme.palette.grey[600],
  },
  labelTooltip: {
    marginLeft: 4,
    color: theme.palette.grey[600],
  },
  labelTooltipIcon: {
    fontSize: 12,
    verticalAlign: "middle",
  },
  valueWrapper: {
    flexGrow: 1,
    overflow: "hidden",
    textAlign: "right",
    color: theme.palette.common.black,
  },
  value: {
    whiteSpace: "nowrap",
  },
  valueEquivalent: {
    color: theme.palette.grey[600],
    marginLeft: 4,
  },
});

const LabelWithValueWithStyles: FunctionComponent<LabelWithValueProps & WithStyles<typeof labelWithValueStyles>> = ({
  classes,
  label,
  labelTooltip,
  value,
  valueEquivalent,
  ...rest
}) => {
  const styles = classes;
  return (
    <div className={styles.root} {...rest}>
      <div className={styles.labelWrapper}>
        {label}
        {labelTooltip && (
          <span className={styles.labelTooltip}>
            <TooltipWithIcon title={labelTooltip} />
          </span>
        )}
      </div>
      <div className={styles.valueWrapper}>
        <span className={styles.value}>{value}</span>
        {valueEquivalent && (
          <span className={styles.valueEquivalent}>({valueEquivalent})</span>
        )}
      </div>
    </div>
  );
};

export const LabelWithValue = withStyles(labelWithValueStyles)(LabelWithValueWithStyles);

const receivingAssetInfoStyles = (theme:Theme) => createStyles({
  root: {
    // border: `1px solid ${theme.palette.divider}`,
    borderRadius: 20,
    padding: "10px 20px",
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    width: "35%",
    fontSize: 12,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 20,
    display: "flex",
    alignItems: "center",
    fontSize: 33,
  },
  valueWrapper: {
    flexGrow: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    textAlign: "right",
  },
  value: {
    fontSize: 14,
  },
  valueEquivalent: {
    fontSize: 13,
    color: theme.palette.grey[600],
  },
});

type AssetInfoProps = LabelWithValueProps & {
  Icon: ReactNode;
};

const AssetInfoWithStyles: FunctionComponent<AssetInfoProps & WithStyles<typeof receivingAssetInfoStyles>> = ({
  classes,
  label,
  value,
  valueEquivalent,
  Icon,
}) => {
  const styles = classes;
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Typography variant="body2" className={styles.label} component="span">
          {label}
        </Typography>
        <span className={styles.icon}>{Icon}</span>
        <span className={styles.valueWrapper}>
          <span className={styles.value}>{value}</span>
          <span className={styles.valueEquivalent}>{valueEquivalent}</span>
        </span>
      </div>
    </div>
  );
};
export const AssetInfo = withStyles(receivingAssetInfoStyles)(AssetInfoWithStyles);


export const UnstyledList = styled("ul")({
  padding: 0,
  margin: 0,
  listStyleType: "none",
});

export const SmallSpacedDivider = styled(Divider)({
  marginTop: 10,
  marginBottom: 10,
});

export const SpacedDivider = styled(Divider)({
  marginTop: 20,
  marginBottom: 20,
});

export const BigAssetAmountWrapper = styled("div")({
  marginBottom: 40,
});

const bigAssetAmountStyles = ()=>createStyles({
  root: {
    fontSize: 32,
  },
});

type BigAssetAmountProps = {
  value: number | string | ReactNode;
};

const BigAssetAmountWithStyles: FunctionComponent<BigAssetAmountProps & WithStyles<typeof bigAssetAmountStyles>> = ({
  classes,
  value,
}) => {
  const styles = classes;
  return (
    <Typography className={styles.root} variant="h2" align="center">
      {value}
    </Typography>
  );
};

export const BigAssetAmount = withStyles(bigAssetAmountStyles)(BigAssetAmountWithStyles);

const markTextStyles = (theme: Theme) => createStyles({
  blue: {
    color: theme.palette.primary.main,
  },
  orange: {
    color: customColors.orangeDark,
  },
  grey: {
    color: theme.palette.grey[600],
  },
});

type MarkTextProps = {
  color?: "orange" | "blue" | "grey";
};

const MarkTextWithStyles: FunctionComponent<MarkTextProps & WithStyles<typeof markTextStyles>> = ({
  classes,
  color = "blue",
  children,
}) => {
  const styles = classes;
  const className = classNames({
    [styles.blue]: color === "blue",
    [styles.orange]: color === "orange",
    [styles.grey]: color === "grey",
  });
  return <span className={className}>{children}</span>;
};

export const MarkText = withStyles(markTextStyles)(MarkTextWithStyles);

const middleEllipsisTextStyles = ()=>createStyles({
  root: {
    useSelect: "none",
    // width: "100%",
    "&:hover $hideForHover": {
      display: "none",
    },
    "&:hover $showForHover": {
      display: "block",
    },
  },
  hideForHover: {
    maxWidth: "100%",
    display: "block",
    userSelect: "none",
  },
  showForHover: {
    userSelect: "all",
    display: "none",
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingLeft: 15,
  },
});

const MiddleEllipsisWrapper = styled("div")({
  maxWidth: "100%",
  display: "block",
});

type MiddleEllipsisTextProps = {
  hoverable?: boolean;
};

const MiddleEllipsisTextWithStyles: FunctionComponent<MiddleEllipsisTextProps & WithStyles<typeof middleEllipsisTextStyles>> = ({
  classes,
  hoverable,
  children,
}) => {
  const styles = classes;

  return (
    <MiddleEllipsisWrapper>
      {!hoverable && (
        <MiddleEllipsis>
          <span>{children}</span>
        </MiddleEllipsis>
      )}
      {hoverable && (
        <div className={styles.root}>
          <div className={styles.showForHover}>{children}</div>
          <div className={styles.hideForHover}>
            {" "}
            <MiddleEllipsis>
              <span>{children}</span>
            </MiddleEllipsis>
          </div>
        </div>
      )}
    </MiddleEllipsisWrapper>
  );
};

export const MiddleEllipsisText = withStyles(middleEllipsisTextStyles)(MiddleEllipsisTextWithStyles);

export const SpacedTypography = styled(Typography)({
  marginBottom: "1.4em",
});

export const UnderlinedSpan = styled("span")({
  textDecoration: "underline",
});

