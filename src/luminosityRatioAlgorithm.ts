import { Color } from "./colorContrast";

const FS = 255;
const offset = 0.05;
export const MIN_RATIO = 4.5;

const linearisedValue = (color: number) => {
  return parseFloat(Math.pow(color / FS, 2.2).toFixed(5));
};

const luminosity = (color: Color) => {
  return (
    linearisedValue(color.r) * 0.2126 +
    linearisedValue(color.g) * 0.7152 +
    linearisedValue(color.b) * 0.0722
  );
};

export const luminosityContrastRatio = (color1: Color, color2: Color) => {
  const L1 = luminosity(color1);
  const L2 = luminosity(color2);

  if (L1 > L2) return (L1 + offset) / (L2 + offset);
  return (L2 + offset) / (L1 + offset);
};

export const isColorContrastValid = (color1: Color, color2: Color) => {
  return luminosityContrastRatio(color1, color2) >= MIN_RATIO;
};
