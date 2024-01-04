import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import NotFound from "../pages/error/404";

const Routing = (params) => {
  return (
    <Routes>
      <Route exact path={"/"} element={<Home />} />
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
};
export default Routing;
