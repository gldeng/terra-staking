/**
 * @license MIT License Copyright (c) 2019 Ren Project
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { makeStyles, styled } from "@mui/styles";
import classNames from "classnames";
import React, { FunctionComponent } from "react";

export const NarrowCenteredWrapper = styled("div")({
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: 400,
});

export const CenteringSpacedBox = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginBottom: 20,
});

export const SmallWrapper = styled("div")({
  marginBottom: 10,
});

export const MediumWrapper = styled("div")({
  marginBottom: 20,
});

export const BigWrapper = styled("div")({
  marginBottom: 40,
});

export const SmallTopWrapper = styled("div")({
  marginTop: 10,
});

export const MediumTopWrapper = styled("div")({
  marginTop: 20,
});

export const BigTopWrapper = styled("div")({
  marginTop: 40,
});

export const PaperSpacerWrapper = styled("div")({
  marginTop: 40,
  marginBottom: 40,
});

const useHideStyles = makeStyles({
  hidden: {
    display: "none",
  },
});

type HideProps = {
  when: boolean;
  className?: string;
};

export const Hide: FunctionComponent<HideProps> = ({
  when,
  className,
  children,
}) => {
  const styles = useHideStyles();
  const resolvedClassName = classNames(className, {
    [styles.hidden]: when,
  });
  return <div className={resolvedClassName}>{children}</div>;
};
