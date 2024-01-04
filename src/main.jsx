// *******~ Import ~******** //
//? React
import React, { useContext, useEffect } from "react";
//? Assets
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//? Components
import ThemeContext from "./common/theme/components/contexts/themecontexts";
import Routing from "./router/router";
import GoTop from "./common/gototop/gototop";
import ScrollToTop from "./common/scrolltop/scrolltop";
import Header from "./common/header/header";
import Footer from "./common/footer/footer";
import ColorSwitch from "./common/color-switch/color-switch";
//? CSS

//? Images

//? JSON File

//? Icons

// *******~ Import ~******** //

const Main = () => {
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#0d0620";
    } else {
      document.body.style.backgroundColor = "#fff";
    }

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [theme]);

  return (
    <>
      <Router basename="/customerlabs">
        <GoTop />
        <ScrollToTop />
        <ColorSwitch />
        <Header />
        <main className="ashok-base-template">
          <Routing />
        </main>
        <Footer />
      </Router>
    </>
  );
};
export default Main;
