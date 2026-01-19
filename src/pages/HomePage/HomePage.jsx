import styles from "./HomePage.module.css";
import Title from "../../components/Title/Title";
function HomePage() {
  return (
    <section>
      <div className={styles.container}>
        <Title>Ласкаво просимо до Додатку "Вчителі"!</Title>
        <p>
          Цей додаток допомагає керувати інформацією про вчителів та їхні збори.
        </p>
      </div>
    </section>
  );
}

export default HomePage;
