import React from "react";
import { css } from "@emotion/react";
import RiseLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: yellow;
  text-align: center;
  justify-content: center;
`;

const LoadingComponent = () => {
  return <RiseLoader color="black" loading={true} css={override} />;
};

export default LoadingComponent;
