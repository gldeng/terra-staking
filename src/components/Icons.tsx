/**
 * @license MIT License Copyright (c) 2019 Ren Project
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as LunaGrey } from "./../assets/luna-icon-grey.svg";
import { ReactComponent as Luna } from "./../assets/luna-icon-nocolour.svg";
import { ReactComponent as LunaDashed } from "./../assets/luna-dashed-icon.svg";
import { ReactComponent as LunaFull } from "./../assets/luna-icon.svg";
import { FC } from "react";

export const getScalingProps = (width: number, height = width) => {
    const viewBox = `0 0 ${width} ${height}`;
    const ratio = width / height;
    if (ratio !== 1) {
      const widthRatioEm = `${width / height}em`;
      const style = { width: widthRatioEm };
      return { viewBox, style };
    }
    return { viewBox };
  };
  
export const LunaIcon: FC<SvgIconProps> = (props) => (
    <SvgIcon component={Luna} {...props} />
  );
  
  export const LunaDashedIcon: FC<SvgIconProps> = (props) => (
    <SvgIcon component={LunaDashed} {...getScalingProps(256)} {...props} />
  );
  
  export const LunaFullIcon: FC<SvgIconProps> = (props) => (
    <SvgIcon component={LunaFull} {...props} />
  );
  
  export const LunaGreyIcon: FC<SvgIconProps> = (props) => (
    <SvgIcon component={LunaGrey} {...props} />
  );
  