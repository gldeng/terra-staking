import {
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { createStyles, styled, WithStyles, withStyles } from "@mui/styles";
import { FC } from "react";
import { Delegation } from "../types/bank";
import { MiddleEllipsisText } from "./TypographyHelpers";
import { blue } from "../theme/colors";

const dropdownStyles = createStyles({
  root: {
    width: "100%",
    // borderRadius: theme.shape.borderRadius,
    // border: `1px solid ${theme.palette.divider}`,
    padding: 0,
  },
  inputRoot: {
    width: "100%",
  },
  label: {
    fontSize: 14,
  },
  address: {
    fontSize: 14,
  },
  listSubheader: {
    pointerEvents: "none",
    fontSize: 10,
    lineHeight: 1,
  },
  listSubheaderLabel: {
    fontSize: 10,
  },
});

type DelegationDropdownProps = SelectProps & {
  delegations: Delegation[];
}

const MiddleEllipsisWrapper = styled('div')({
  maxWidth: 265,
  flexGrow: 2,
  fontSize: 13,
  color: blue,
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
});

const DelegationDropdownWithStyles: FC<DelegationDropdownProps & WithStyles<typeof dropdownStyles>> = ({ classes, delegations, ...props }) => {
  const styles = classes;
  return (
    <Select
      variant="standard"
      className={styles.root}
      displayEmpty
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      }}
      {...props}
      sx={{ select: { padding: 0 } }}
    >
      {delegations.map(delegation => (
        <MenuItem key={delegation.validator_address} value={delegation.validator_address}>
          <MiddleEllipsisWrapper>
            <MiddleEllipsisText><span>{delegation.validator_address}</span></MiddleEllipsisText>
          </MiddleEllipsisWrapper>
        </MenuItem>
      ))}

    </Select>
  );
};

export const DelegationDropdown = withStyles(dropdownStyles)(DelegationDropdownWithStyles);

export const DelegationDropdownWrapper = styled("div")({
  display: "flex",
  borderRadius: 20,
  // padding: "10px 20px",
});
