/** @format */

import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../shared/provider/UserProvider";
import logotype from "../../../shared/images/logotype.svg";
import RoutingPath from "../../../routes/RoutingPath";
import LocalStorage from "../../../shared/cache/LocalStorage";
import { StyledDesktop } from "./StyledDesktop.styles";
import { Profile } from "../../profile/Profile";
import UserAPIService from "../../../shared/api/service/UserAPIService";
import { PulsatingCircle } from "../../spinner/PulsatingCircle";

export const Desktop = () => {
  const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const history = useHistory();
  const { authenticated } = authenticatedUser;

  const displaySignedInUser = () => {
    if (!isLoading) {
      return authenticated ? (
        <Profile />
      ) : (
        <span onClick={() => history.push(RoutingPath.signInView)}>
          sign in
        </span>
      );
    } else {
      return <PulsatingCircle/>;
    }
  };

  const validateToken = (tokenExp: number) => {
    const currentTime = Math.floor(Date.now() / 1000);
    return tokenExp >= currentTime;
  };

  useEffect(() => {
    const parseJWT = async () => {
      const token = localStorage.getItem(LocalStorage.authenticationToken);
      if (!token) {
        return;
      }
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const JWT = JSON.parse(window.atob(base64));

      if (validateToken(JWT.exp)) {
        const response = await UserAPIService.getUser(JWT.id);
        console.log(response.data);
        setAuthenticatedUser({
          id: JWT.id,
          authenticated: true,
          username: response.data.username,
        });
        setIsLoading(false);
      } else {
        setAuthenticatedUser({
          id: undefined,
          authenticated: false,
          username: undefined,
        });
        setIsLoading(false);
        localStorage.removeItem(LocalStorage.authenticationToken);
      }
    };
    parseJWT();
  }, [setAuthenticatedUser]);

  return (
    <StyledDesktop>
      <header>
        <img
          onClick={() => history.push(RoutingPath.homeView)}
          src={logotype}
          alt='material'
        />
        <nav>
          <ul>
            <li onClick={() => history.push(RoutingPath.equipmentView)}>
              equipment
            </li>
            <li onClick={() => history.push(RoutingPath.myLoanView)}>
              my loans
            </li>
          </ul>
        </nav>
        <span>{displaySignedInUser()}</span>
      </header>
    </StyledDesktop>
  );
};
