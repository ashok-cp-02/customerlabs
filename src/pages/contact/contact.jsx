// *******~ Import ~******** //
//? React
import { useContext } from "react";
//? Assets
// import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";
//? Components
import Social from "../home/components/social";
import ThemeContext from "../../common/theme/components/contexts/themecontexts";
import myResumePDF from "../../common/assets/Ashok-UI-Developer.pdf";
//? CSS
import "./contact.scss";
//? Images
// import Photo from "./img/Ashok.jpg";
import Photo from "./img/ashok1.jpg";
import BGImg from "./img/bg1.jpg";

//? JSON File

//? Icons
import { FaChevronLeft } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { VscCallIncoming } from "react-icons/vsc";
import { CiCalendar } from "react-icons/ci";
import { SlGraduation } from "react-icons/sl";
import { IoLocationSharp } from "react-icons/io5";
import { PiToolboxLight } from "react-icons/pi";
import { LuDownload } from "react-icons/lu";
// *******~ Import ~******** //

function Contact({ Contactshow, setContactshow }) {
  const handleClose = () => setContactshow(false);
  const { theme } = useContext(ThemeContext);
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = myResumePDF;
    link.download = "Ashok UI Developer.pdf"; // Change the filename as needed
    link.click();
  };
  return (
    <>
      <Offcanvas
        show={Contactshow}
        onHide={handleClose}
        placement="end"
        className={`contact-canva ${theme === "dark" && "dark-theme"}`}
      >
        <Offcanvas.Body>
          <div className="content">
            <div className="header-img">
              <div className="overlay"></div>
              <Image src={BGImg} fluid />
              <span className="back-btn" onClick={handleClose}>
                <FaChevronLeft />
              </span>
            </div>
            <div className="heading">
              {/* <Image src={BGImg} fluid className="bg-img" /> */}

              <Image src={Photo} fluid className="profile" />
              <h3>Ashok C</h3>
              <p>Sr. UI Developer</p>
              <span className="location">
                <IoLocationSharp /> Chennai, India
              </span>
              <Social />
            </div>
            <div className="details">
              <ul>
                <li>
                  <span>
                    <PiToolboxLight />
                  </span>
                  5+ Years of Experience
                </li>
                <li>
                  <span>
                    <IoMailOutline />
                  </span>
                  <a href="mailto:ashokashok7117@gmail.com">
                    ashokashok7117@gmail.com
                  </a>
                </li>
                <li>
                  <span>
                    <VscCallIncoming />
                  </span>
                  <a href="tel:8754711743">+91 87547 11743</a>
                </li>
                <li>
                  <span>
                    <CiCalendar />
                  </span>
                  10 June 1997
                </li>
                <li>
                  <span>
                    <SlGraduation />
                  </span>
                  B.Sc.Computer Science
                </li>
              </ul>
            </div>
            <div className="download-cv">
              <button onClick={handleDownload}>
                <LuDownload />
                Download CV
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Contact;
