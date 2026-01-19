import { Outlet } from "react-router";
import Button from "../components/buttons/Button";
import frontRoutes from "../routes/frontRoutes";
import styles from "./InfoLayout.module.css";

function InfoLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
      <div className={styles.buttonContainer}>
        <Button to={frontRoutes.navigate.home}> На головну</Button>
      </div>
    </div>
  );
}

export default InfoLayout;
