import React, { FC, useState } from "react";
import { SketchPicker } from "react-color";
import styled from "styled-components";
import "./styles.css";

const Container = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

const BackgroundContainer = styled.div<{ color: string }>(
  props => `
  background-color: ${props.color};
  height: 56px;
  color: #FFFFFF;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`
);

type Color = { r: number; g: number; b: number };

const MAX_BRIGHTNESS_DIFFERENCE = 125;
const MAX_COLOR_DIFFERENCE = 500;

export function hexToRGBObject(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error("Invalid color");

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return { r, g, b };
}
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

export const ColorContrast: FC = () => {
  const [color, setColor] = useState<string>("#101010");

  const valid = isColorContrastValid(
    hexToRGBObject("#FFFFFF"),
    hexToRGBObject(color)
  );

  return (
    <Container>
      <h1>Colour Visibility Algorithm</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SketchPicker
          color={color}
          onChangeComplete={color => setColor(color.hex)}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <BackgroundContainer color={color}>
            Hi I am the foreground text.
          </BackgroundContainer>
          <p>
            {valid ? "Great" : "Poor"} visibility between text and background
            colors.
          </p>
        </div>
      </div>
    </Container>
  );
};
