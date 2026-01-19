import { Outlet } from "react-router";
import Button from "../components/buttons/Button";
import frontRoutes from "../routes/frontRoutes";

function InfoLayout() {
  return (
    <div className="container">
      <div>
        <Outlet />
      </div>
      <Button to={frontRoutes.navigate.home}> На головну</Button>
    </div>
  );
}

export default InfoLayout;
