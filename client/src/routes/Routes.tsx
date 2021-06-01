/** @format */

import React, { useContext } from "react";
import { UserContext } from "../shared/provider/UserProvider";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MyLoanView } from "../view/navigationtabviews/MyLoanView";
import { EquipmentView } from "../view/navigationtabviews/EquipmentView";
import { EquipmentAdminView } from "../view/profiledropdownviews/EquipmentAdminView";
import { SignInView } from "../view/navigationtabviews/SignInView/SignInView";
import { RegisterUserView } from "../view/navigationtabviews/RegisterUserView/RegisterUserView";
import { HomeView } from "../view/navigationtabviews/HomeView";
import { ProfileView } from "../view/profiledropdownviews/ProfileView";
import { ItemDetailView } from "../view/navigationtabviews/ItemDetailView";
import { UserAdminView } from "../view/profiledropdownviews/UserAdminView";
import RoutingPath from "./RoutingPath";

export const Routes = (props: { children?: React.ReactChild }) => {
  const [authenticatedUser] = useContext(UserContext);

  const blockRouteIfUserIsSignedIn = (
    navigateToViewIfAuthenticated: React.FC
  ) => {
    return authenticatedUser.authenticated
      ? HomeView
      : navigateToViewIfAuthenticated;
  };

  const authenticated = (navigateToViewIfAuthenticated: React.FC) => {
    return authenticatedUser.authenticated
      ? navigateToViewIfAuthenticated
      : SignInView;
  };

  return (
    <BrowserRouter>
      {props.children}
      <Switch>
        <Route
          exact
          path={RoutingPath.myLoanView}
          component={authenticated(MyLoanView)}
        />
        <Route
          exact
          path={RoutingPath.equipmentView}
          component={authenticated(EquipmentView)}
        />
        <Route
          exact
          path={RoutingPath.signInView}
          component={blockRouteIfUserIsSignedIn(SignInView)}
        />
        <Route
          exact
          path={RoutingPath.registerUserView}
          component={blockRouteIfUserIsSignedIn(RegisterUserView)}
        />
        <Route
          exact
          path={RoutingPath.profileView}
          component={authenticated(ProfileView)}
        />
        <Route
          exact
          path={RoutingPath.itemDetailView}
          component={authenticated(ItemDetailView)}
        />
        <Route
          exact
          path={RoutingPath.userAdminView}
          component={authenticated(UserAdminView)}
        />
        <Route
          exact
          path={RoutingPath.equipmentAdminView}
          component={authenticated(EquipmentAdminView)}
        />
        <Route component={HomeView} />
      </Switch>
    </BrowserRouter>
  );
};
