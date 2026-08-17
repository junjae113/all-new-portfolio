import styled, { css } from "styled-components";
import { spacingProps } from "../../styles/spacingProps";
import fontWeightCSS from "./weight";

const Text = {};

// Headline
Text.H1 = styled.h1`
  font-size: ${({ theme }) => theme.FONT_SIZE.h1};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.h1};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
    color: ${({ color }) => {
    return color;
  }};
`;

Text.H2 = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZE.h2};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.h2};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
    color: ${({ color }) => {
    return color;
  }};
`;

Text.H3 = styled.h3`
  font-size: ${({ theme }) => theme.FONT_SIZE.h3};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.h3};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
    color: ${({ color }) => {
    return color;
  }};
`;

Text.H4 = styled.h4`
  font-size: ${({ theme }) => theme.FONT_SIZE.h4};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.h4};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
    color: ${({ color }) => {
    return color;
  }};
`;

Text.H5 = styled.h5`
  font-size: ${({ theme }) => theme.FONT_SIZE.h5};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.h5};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
    color: ${({ color }) => {
    return color;
  }};
`;

Text.H6 = styled.h6`
  font-size: ${({ theme }) => theme.FONT_SIZE.h6};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.h6};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
    color: ${({ color }) => {
    return color;
  }};
`;

// Body
Text.Body1 = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.body1};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.body1};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
    color: ${({ color }) => {
    return color;
  }};
`;

Text.Body2 = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.body2};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.body2};
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
  ${spacingProps}
  color: ${({ color }) => {
    return color;
  }};
`;

Text.Body3 = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.body3};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.body3};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
    color: ${({ color }) => {
    return color;
  }};
`;

// Caption
Text.Caption1 = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.caption1};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.caption1};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
    color: ${({ color }) => {
    return color;
  }};
`;

Text.Caption2 = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.caption2};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.caption2};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
    color: ${({ color }) => {
    return color;
  }};
`;

Text.Caption3 = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.caption3};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.caption3};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
    color: ${({ color }) => {
    return color;
  }};
`;

Text.Caption4 = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.caption4};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.caption4};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
    color: ${({ color }) => {
    return color;
  }};
`;

Text.Caption5 = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.caption5};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.caption5};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
    color: ${({ color }) => {
    return color;
  }};
`;

// Button
Text.Button1 = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.button1};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.button1};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
`;

Text.Button2 = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.button2};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.button2};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
`;

Text.Button3 = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.button3};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.button3};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
`;

Text.Button4 = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.button4};
  line-height: ${({ theme }) => theme.LINE_HEIGHT.button4};
  ${spacingProps}
  ${({ fontWeight = "regular", ...props }) =>
    fontWeightCSS[fontWeight]?.(props)}
`;

export default Text;
