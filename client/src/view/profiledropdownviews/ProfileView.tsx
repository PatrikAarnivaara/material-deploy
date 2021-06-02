/** @format */

import styled from "styled-components";
import { ResetPasswordView } from "../ResetPasswordView";

export const ProfileViewWrapper = styled.div`
  max-width: 1124px;
  margin: auto;
  height: 100vh;
`;

export const ProfileView = () => {
  return (
    <ProfileViewWrapper>
      <ResetPasswordView/>
    </ProfileViewWrapper>
  );
};
