/** @format */

import styled from "styled-components";

type StyledSpinnerProps = {
  left: number;
  top: number;
};

const StyledSpinner = styled.svg<StyledSpinnerProps>`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  z-index: 1;
  position: absolute;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export const Spinner = (props: { left: number; top: number }) => (
  <StyledSpinner viewBox='0 0 50 50' left={props.left} top={props.top}>
    <circle
      className='path'
      cx='25'
      cy='25'
      r='20'
      fill='none'
      strokeWidth='4'
    />
  </StyledSpinner>
);
