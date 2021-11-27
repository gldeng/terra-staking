// import { Tooltip, TooltipProps } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
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
