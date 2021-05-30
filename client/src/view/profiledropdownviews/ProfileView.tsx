/** @format */

import styled from "styled-components";
import { RegisterUserFormikView } from "../navigationtabviews/RegisterUserView/RegisterUserFormikView";

export const ProfileViewWrapper = styled.div`
  max-width: 1124px;
  margin: auto;
  height: 100vh;
`;

export const ProfileView = () => {
  return (
    <ProfileViewWrapper>
      <RegisterUserFormikView />
    </ProfileViewWrapper>
  );
};
