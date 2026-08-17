import { css } from "styled-components";

export const spacingProps = (props) => css`
  ${props.m && `margin: ${getSpacing(props, props.m)};`}
  ${props.mt && `margin-top: ${getSpacing(props, props.mt)};`}
  ${props.mr && `margin-right: ${getSpacing(props, props.mr)};`}
  ${props.mb && `margin-bottom: ${getSpacing(props, props.mb)};`}
  ${props.ml && `margin-left: ${getSpacing(props, props.ml)};`}

  ${props.mx &&
  css`
    margin-left: ${getSpacing(props, props.mx)};
    margin-right: ${getSpacing(props, props.mx)};
  `}

  ${props.my &&
  css`
    margin-top: ${getSpacing(props, props.my)};
    margin-bottom: ${getSpacing(props, props.my)};
  `}

  ${props.p && `padding: ${getSpacing(props, props.p)};`}
  ${props.pt && `padding-top: ${getSpacing(props, props.pt)};`}
  ${props.pr && `padding-right: ${getSpacing(props, props.pr)};`}
  ${props.pb && `padding-bottom: ${getSpacing(props, props.pb)};`}
  ${props.pl && `padding-left: ${getSpacing(props, props.pl)};`}

  ${props.px &&
  css`
    padding-left: ${getSpacing(props, props.px)};
    padding-right: ${getSpacing(props, props.px)};
  `}

  ${props.py &&
  css`
    padding-top: ${getSpacing(props, props.py)};
    padding-bottom: ${getSpacing(props, props.py)};
  `}
`;

const getSpacing = (props, val) => {
  // theme.SPACING[10] 있으면 그 값 쓰고, 없으면 그냥 숫자 px 처리
  return props.theme?.SPACING?.[val] || `${val}px`;
};
