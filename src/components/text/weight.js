import styled, { css } from "styled-components";

const fontWeightCSS = {
  100: (props) => css`
    font-weight: ${props.theme.FONT_WEIGHT.thin};
  `,
  200: (props) => css`
    font-weight: ${props.theme.FONT_WEIGHT.extraLight};
  `,
  300: (props) => css`
    font-weight: ${props.theme.FONT_WEIGHT.light};
  `,
  400: (props) => css`
    font-weight: ${props.theme.FONT_WEIGHT.regular};
  `,
  500: (props) => css`
    font-weight: ${props.theme.FONT_WEIGHT.medium};
  `,
  600: (props) => css`
    font-weight: ${props.theme.FONT_WEIGHT.semiBold};
  `,
  700: (props) => css`
    font-weight: ${props.theme.FONT_WEIGHT.bold};
  `,
  800: (props) => css`
    font-weight: ${props.theme.FONT_WEIGHT.extraBold};
  `,
  900: (props) => css`
    font-weight: ${props.theme.FONT_WEIGHT.heavy};
  `,
};

export default fontWeightCSS;
