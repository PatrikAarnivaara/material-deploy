/** @format */

import { Routes } from "./routes/Routes";
import { Navigation } from "./components/navigation/Navigation";
import { UserProvider } from "./shared/provider/UserProvider";
import { EquipmentProvider } from "./shared/provider/EquipmentProvider";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { myTheme } from "./shared/Global/my-theme";

const GlobalStyle = createGlobalStyle`
  * {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
}

body {
	background-color: #ffffff;
	font-family: 'Roboto', sans-serif;
	color: #4e4646;
}
`;

export const App = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <EquipmentProvider>
        <GlobalStyle />
        <UserProvider>
          <Routes>
            <Navigation />
          </Routes>
        </UserProvider>
      </EquipmentProvider>
    </ThemeProvider>
  );
};
