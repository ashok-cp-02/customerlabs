// *******~ Import ~******** //
//? React
import React from "react";
//? Assets

//? Components

//? CSS

//? Images

//? JSON File
//? Icons
// import { GrDocumentUser } from "react-icons/gr";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { SiStackblitz } from "react-icons/si";
import { FaStackOverflow } from "react-icons/fa";

// *******~ Import ~******** //

const Social = () => {
  return (
    <>
      <ul>
        <li>
          <a
            className="git"
            href="https://github.com/ashok-cp-02"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </li>
        <li>
          <a
            className="linkedin"
            href="https://www.linkedin.com/in/ashokchinnaiyan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </li>
        <li>
          <a
            className="mail"
            href="mailto:ashokashok7117@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoMdMail />
          </a>
        </li>
        <li>
          <a
            className="stack"
            href="https://stackblitz.com/@ashok-cp-02"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiStackblitz />
          </a>
        </li>
        <li>
          <a
            className="stackover"
            href="/customerlabs"
            rel="noopener noreferrer"
          >
            <FaStackOverflow />
          </a>
        </li>
        {/* <li>
          <a className="profile" href="#" rel="noopener noreferrer">
            <GrDocumentUser />
          </a>
        </li> */}
      </ul>
    </>
  );
};
export default Social;
