/**
 * @license MIT License Copyright (c) 2019 Ren Project
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { Theme, Tooltip, TooltipProps } from "@mui/material";
import { createStyles, WithStyles, withStyles } from "@mui/styles";
import classNames from "classnames";
import React, { FunctionComponent } from "react";
// import { TooltipIcon } from "../icons/RenIcons";

const styles = (theme: Theme) => createStyles({
  root: {
    display: "inline-flex",
    fontSize: 13,
    color: theme.palette.grey[600],
    verticalAlign: "middle",
    marginTop: -2,
  },
});

type TooltipWithIconProps = Omit<TooltipProps, "children"> & {
  title: TooltipProps["title"] | any;
};

const TooltipWithIconWithStyles: FunctionComponent<TooltipWithIconProps & WithStyles<typeof styles>> = ({
  classes,
  title,
  placement = "top-end",
  className,
  ...rest
}) => {
  const styles = classes;
  const resolvedClassName = classNames(styles.root, className);
  return (
    <Tooltip
      title={title}
      className={resolvedClassName}
      placement={placement}
      {...rest}
    ><p></p></Tooltip>
  );
};

export const TooltipWithIcon = withStyles(styles)(TooltipWithIconWithStyles);
