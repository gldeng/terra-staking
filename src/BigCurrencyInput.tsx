import { Typography, styled, Theme } from '@mui/material'
import * as customColors from './theme/colors'
import classNames from 'classnames'
import React, { FunctionComponent, ReactNode, useRef } from 'react'
import NumberFormat, { NumberFormatValues } from 'react-number-format'
import { createStyles, WithStyles, withStyles } from '@mui/styles'

const generatePlaceholderStyles = (color: string) => {
  const placeholder = {
    color,
  };

  return {
    "&::placeholder": placeholder,
    "&::-webkit-input-placeholder": placeholder,
    "&::-moz-placeholder": placeholder, // Firefox 19+
    "&:-ms-input-placeholder": placeholder, // IE 11
    "&::-ms-input-placeholder": placeholder, // Edge
  };
};
const toUsdFormat = (value: string | number) => value;

const numberFormatOptions = {
  thousandSeparator: true,
  allowLeadingZeros: false,
  allowNegative: false,
  allowedDecimalSeparators: [".", ","],
};

const styles = (theme: Theme) => createStyles({
  container: {
    width: "100%",
    textAlign: "center",
    "& input": {
      fontFamily: "inherit",
    },
  },
  large: {
    "& input": {
      fontSize: 52,
    },
  },
  medium: {
    "& input": {
      fontSize: 42,
    },
  },
  small: {
    "& input": {
      fontSize: 32,
    },
  },
  smallest: {
    "& input": {
      fontSize: 22,
    },
  },
  input: {
    fontSize: 52,
    width: "100%",
    outline: "none",
    textAlign: "center",
    border: "0px solid transparent",
    color: customColors.textDark,
    ...generatePlaceholderStyles(customColors.grayPlaceholder),
  },
  inputError: {
    color: theme.palette.error.main,
  },
  errorText: {
    marginTop: -8,
    marginBottom: 10,
  },
  equivalent: {
    marginTop: 0,
    color: "#3F3F48",
  },
});

type NumberChange = (values: NumberFormatValues) => void;

interface BigCurrencyInputProps {
  onChange: (value: any) => void;
  symbol: string;
  usdValue: string | number;
  value: string | number;
  placeholder?: string;
  errorText?: string | ReactNode;
};

export const BigCurrencyInputInner: FunctionComponent<BigCurrencyInputProps&WithStyles<typeof styles>> = ({
  classes,
  onChange,
  symbol,
  usdValue,
  value,
  errorText = "",
  placeholder = `0 ${symbol}`,
}) => {
  // const styles = useStyles();
  const ref = useRef(null);
  const inputRef = useRef(null);
  const val = value ? String(value) : "";
  const handleChange: NumberChange = (formatValues) => {
    onChange(formatValues.value);
  };

  const chars = val.replace(".", "") + " " + symbol;
  let size = "large";
  if (chars.length > 10 && chars.length <= 12) {
    size = "medium";
  } else if (chars.length > 12 && chars.length <= 14) {
    size = "small";
  } else if (chars.length > 14) {
    size = "smallest";
  }

  const rootClassName = classNames(classes.container, {
    [classes.large]: size === "large",
    [classes.medium]: size === "medium",
    [classes.small]: size === "small",
    [classes.smallest]: size === "smallest",
  });
  const inputClassName = classNames(classes.input, {
    [classes.inputError]: Boolean(errorText),
  });
  return (
    <div className={rootClassName}>
      <NumberFormat
        value={val}
        ref={ref}
        {...numberFormatOptions}
        suffix={" " + symbol}
        onValueChange={handleChange}
        getInputRef={(input: any) => {
          inputRef.current = input;
        }}
        autoFocus={true}
        className={inputClassName}
        placeholder={placeholder}
      />
      {errorText && (
        <Typography
          variant="body2"
          color="error"
          gutterBottom
          className={classes.errorText}
        >
          {errorText}
        </Typography>
      )}
    </div>
  );
};

export const BigCurrencyInput = withStyles(styles)(BigCurrencyInputInner);

export const BigCurrencyInputWrapper = styled("div")({
  marginTop: 40,
});
