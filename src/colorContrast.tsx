import React, { FC, useState } from "react";
import { SketchPicker } from "react-color";
import styled from "styled-components";
import { isColorContrastValid } from "./colorVisibilityAlgorithm";
import {
  luminosityContrastRatio,
  isColorContrastValid as isLuminosityColorContrastValid
} from "./luminosityRatioAlgorithm";
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

const RightContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Header = styled.h3`
  text-decoration: underline;
`;

const Paragraph = styled.p<{ valid: boolean }>`
  color: ${({ valid }) => (valid ? "#101010" : "#FF0000")};
`;

export type Color = { r: number; g: number; b: number };

export function hexToRGBObject(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error("Invalid color");

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return { r, g, b };
}

export const ColorContrast: FC = () => {
  const [color, setColor] = useState<string>("#101010");
  const whiteText = hexToRGBObject("#FFFFFF");
  const backgroundColor = hexToRGBObject(color);
  const valid = isColorContrastValid(whiteText, backgroundColor);
  const validRatio = isLuminosityColorContrastValid(whiteText, backgroundColor);
  const ratio = luminosityContrastRatio(whiteText, backgroundColor).toFixed(2);

  return (
    <Container>
      <h1>Colour Contrast Algorithms</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SketchPicker
          color={color}
          onChangeComplete={color => setColor(color.hex)}
        />
        <RightContainer>
          <Header>Color Visibility Algorithm</Header>
          <BackgroundContainer color={color}>
            Hi I am the foreground text.
          </BackgroundContainer>
          <Paragraph valid={valid}>
            {valid ? "Great" : "Poor"} visibility between text and background
            colors.
          </Paragraph>
          <Header>Luminosity Contrast Ratio Algorithm</Header>
          <BackgroundContainer color={color}>
            Hi I am the foreground text.
          </BackgroundContainer>
          <Paragraph valid={validRatio}>
            {validRatio ? "Great" : "Poor"} visibility between text and
            background colors.
          </Paragraph>
          <p>Contrast Ratio - {ratio}: 1</p>
        </RightContainer>
      </div>
    </Container>
  );
};
