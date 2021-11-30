/**
 * @license MIT License Copyright (c) 2019 Ren Project
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { alpha } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { black } from "./colors";

export const getShadow = (
  color = black,
  fadeLevel = 0.15,
  x = 1,
  y = 1,
  blur = 2,
  spread = 0
) => `${x}px ${y}px ${blur}px ${spread}px ${alpha(color, fadeLevel)}`;

export const getKeyframesName = (animationName: string) =>
  `@keyframes ${animationName}`;

export const getStandardAnimation = (animationName: string) =>
  `$${animationName} 2s infinite`;

export const createPulseAnimation = (
  color: string,
  spread = 5,
  animationName = "pulse"
) => {
  const initialShadow = getShadow(color, 0.5, 0, 0, 0, 0);
  const throughShadow = getShadow(color, 0, 0, 0, 0, spread);
  const toShadow = getShadow(color, 0, 0, 0, 0, 0);
  const keyframesName = getKeyframesName(animationName);
  const pulsingKeyframes = {
    [keyframesName]: {
      "0%": {
        boxShadow: initialShadow,
      },
      "70%": {
        boxShadow: throughShadow,
      },
      "100%": {
        boxShadow: toShadow,
      },
    },
  };
  const pulsingStyles = {
    boxShadow: initialShadow,
    animation: getStandardAnimation(animationName),
  };
  return { pulsingKeyframes, pulsingStyles, keyframesName };
};

export const createPulseOpacityAnimation = (animationName = "pulseOpacity") => {
  const keyframesName = getKeyframesName(animationName);
  const initialOpacity = 0.6;
  const pulsingKeyframes = {
    [keyframesName]: {
      "0%": {
        opacity: initialOpacity,
      },
      "70%": {
        opacity: 0.2,
      },
      "100%": {
        opacity: initialOpacity,
      },
    },
  };
  const pulsingStyles = {
    opacity: initialOpacity,
    animation: getStandardAnimation(animationName),
  };
  return { pulsingKeyframes, pulsingStyles, keyframesName };
};

export const getTranslate3dX = (pixels = 0) => {
  return `translate3d(${pixels}px, 0, 0)`;
};

export const getRotate = (degrees = 0) => {
  return `rotate(${degrees}deg)`;
};

export const createShakeAnimation = (
  magnitude = 1,
  animationName = "shake"
) => {
  const keyframesName = getKeyframesName(animationName);
  const shakeKeyframesStyles = {
    "0%": {
      transform: getRotate(),
    },
    "20%": {
      transform: getRotate(magnitude),
    },
    "40%": {
      transform: getRotate(-2 * magnitude),
    },
    "60%": {
      transform: getRotate(2 * magnitude),
    },
    "80%": {
      transform: getRotate(-magnitude),
    },
    "100": {
      transform: getRotate(),
    },
  };
  const shakeKeyframes = {
    [keyframesName]: shakeKeyframesStyles,
  };
  const shakeStyles = {
    animation: `$${animationName} 0.2s ease-in-out infinite`,
    transformOrigin: "50% 50%",
    transform: getRotate(0),
  };
  return {
    shakeKeyframes,
    shakeStyles,
    keyframesName,
    shakeKeyframesStyles,
  };
};

export const useShakingStyles = makeStyles(() => {
  const { shakeKeyframes, shakeStyles } = createShakeAnimation(1);
  return {
    ...shakeKeyframes,
    shaking: shakeStyles,
  };
});
