import { useEffect } from "react";
import TeacherCard from "../../components/teachers/TeacherCard";
import useTeachersApi from "../../hooks/useTeachersApi";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import Title from "../../components/Title/Title";
import frontRoutes from "../../routes/frontRoutes";
import Button from "../../components/buttons/Button";
import styles from "./Meetings.module.css";
import clsx from "clsx";

function Meetings() {
  const { data: selectedTeachers, isLoading, error, fetchSelectedTeachers } = useTeachersApi();
  useEffect(() => {
    fetchSelectedTeachers();
  }, [fetchSelectedTeachers]);

  return (
    <section>
      <div className={clsx('container', styles.container)}>
        <Title>Учасники зборів</Title>
        {isLoading && <Loader/>}
        {error && <ErrorMessage message={error}/>}
        {selectedTeachers.length ? (
          <div>
          <p> {`Список вчителів (${selectedTeachers.length}) для виклику на збори`}</p>
          <ul className={styles.teachersList}>
            {selectedTeachers.map((teacher) => (
              <li key={teacher.id} className={styles.teachersListItem}><TeacherCard teacher={teacher} /></li>
            ))}
          </ul>
          </div>
        ) : (
          <p className={styles.emptyMessage}>Вчителів не задано</p>
        )}
        <div className={styles.buttonContainer}>
          <Button to={frontRoutes.navigate.teachers.root}>Повернутися до списку вчителів</Button>
        </div>
      </div>
    </section>
  );
}

export default Meetings;
