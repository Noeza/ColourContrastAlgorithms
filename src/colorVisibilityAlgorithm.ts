import { Color } from "./colorContrast";

const MAX_BRIGHTNESS_DIFFERENCE = 125;
const MAX_COLOR_DIFFERENCE = 500;

/* The Color Contrast Algorith Starts here:
  We calculate the color brightness and
  color difference
*/
function getBrightness(color: Color) {
  const sum = color.r * 299 + color.g * 587 + color.b * 114;
  return Math.round(sum / 1000);
}

const getColorDifference = (color1: Color, color2: Color) => {
  const brightness1 = getBrightness(color1);
  const brightness2 = getBrightness(color2);
  const brightnessDifference = Math.abs(brightness1 - brightness2);

  const colorDifference =
    Math.max(color1.r, color2.r) -
    Math.min(color1.r, color2.r) +
    (Math.max(color1.g, color2.g) - Math.min(color1.g, color2.g)) +
    (Math.max(color1.b, color2.b) - Math.min(color1.b, color2.b));

  return { brightnessDifference, colorDifference };
};

export const isColorContrastValid = (color1: Color, color2: Color) => {
  const { brightnessDifference, colorDifference } = getColorDifference(
    color1,
    color2
  );
  return (
    brightnessDifference >= MAX_BRIGHTNESS_DIFFERENCE &&
    colorDifference >= MAX_COLOR_DIFFERENCE
  );
};
