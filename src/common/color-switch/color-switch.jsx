// *******~ Import ~******** //
//? React
import { useState, useEffect, useContext } from "react";
//? Assets
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import ThemeContext from "../theme/components/contexts/themecontexts";
//? CSS
import "./color-switch.scss";
//? Images

//? JSON File

//? Icons
import { IoMdColorPalette } from "react-icons/io";

import { MdOutlineDone } from "react-icons/md";
// *******~ Import ~******** //

const ColorSwitch = () => {
  const { theme } = useContext(ThemeContext);
  const storedThemeColor = sessionStorage.getItem("themeColor");
  const defaultThemeColor = storedThemeColor || "#1AB394";

  const [themeColor, setThemeColor] = useState(defaultThemeColor);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const handleThemeChange = (newColor) => {
    setThemeColor(newColor);
    document.documentElement.style.setProperty("--themecolor", newColor);
    setOverlayVisible(false);
    // Store the selected theme color in sessionStorage
    sessionStorage.setItem("themeColor", newColor);
  };
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  useEffect(() => {
    // Retrieve the theme color from sessionStorage
    const storedThemeColor = sessionStorage.getItem("themeColor");

    // Set the theme color if it exists in sessionStorage
    if (storedThemeColor) {
      setThemeColor(storedThemeColor);
      document.documentElement.style.setProperty(
        "--themecolor",
        storedThemeColor
      );
    }
    // Add scroll event listener to close the overlay on scroll
    const handleScroll = () => {
      setOverlayVisible(false);
    };

    window.addEventListener("scroll", handleScroll);

    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to run the effect only once
  const themes = ["#1AB394", "#6366f1", "#015fe0", "#d74996", "#30a499"];
  return (
    <>
      <style type="text/css">{`
        :root {
            --themecolor:${themeColor}; 
          }
    `}</style>
      <section className="color-switch">
        <OverlayTrigger
          trigger="click"
          placement="top-start"
          rootClose
          show={overlayVisible}
          onHide={() => setOverlayVisible(false)}
          overlay={
            <Popover
              id="popover-theme-color"
              className={theme === "dark" && "dark-theme"}
            >
              <Popover.Body>
                <p>Select your favourite color</p>
                <div className="color-btn-group">
                  {themes.map((color, index) => (
                    <button
                      key={index}
                      style={{ backgroundColor: color }}
                      onClick={() => handleThemeChange(color)}
                    >
                      {themeColor === color && <MdOutlineDone />}
                    </button>
                  ))}
                </div>
              </Popover.Body>
            </Popover>
          }
        >
          <button className="color-switch-btn" onClick={toggleOverlay}>
            <IoMdColorPalette />
          </button>
        </OverlayTrigger>
      </section>
    </>
  );
};
export default ColorSwitch;
