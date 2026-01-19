import { NavLink } from "react-router";
import frontRoutes from "../../../routes/frontRoutes";
import styles from "./Header.module.css";
import clsx from "clsx";

function Header() {
  const buildLinkClass = ({ isActive }) =>
    clsx(styles.link, isActive && styles.active);
  return (
    <header className={styles.container}>
      <div className="container">
        <nav>
          <ul className={styles.linksList}>
            <li>
              <NavLink to={frontRoutes.pages.home} className={buildLinkClass}>
                Домашня
              </NavLink>
            </li>
            <li>
              <NavLink
                to={frontRoutes.pages.teachers.root}
                className={buildLinkClass}
              >
                Вчителі
              </NavLink>
            </li>
            <li>
              <NavLink
                to={frontRoutes.pages.meeting}
                className={buildLinkClass}
              >
               Збори
              </NavLink>
            </li>
            <li>
              <NavLink
                to={frontRoutes.pages.aboutApp}
                className={buildLinkClass}
              >
                Про додаток
              </NavLink>
            </li>
            <li>
              <NavLink
                to={frontRoutes.pages.aboutDev}
                className={buildLinkClass}
              >
                Про розробника
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
