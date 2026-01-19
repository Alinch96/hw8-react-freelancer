import styles from "./HomePage.module.css";
import Title from "../../components/Title/Title";
import frontRoutes from "../../routes/frontRoutes";
import Button from "../../components/buttons/Button";
import clsx from "clsx";
function HomePage() {
  return (
    <section>
      <div className={clsx("container", styles.container)}>
        <Title>Ласкаво просимо до Додатку "Вчителі"!</Title>
        <p>
          Цей додаток допомагає керувати інформацією про вчителів, викликати їх
          на збори та дізнаватися розробника
        </p>
        <div className={styles.buttonContainer}>
          <Button to={frontRoutes.navigate.teachers.root}>
            Переглянути вчителів
          </Button>
          <Button to={frontRoutes.navigate.meeting}>
            Переглянути список для зборів
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
