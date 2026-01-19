import { useEffect } from "react";
import useTeachersApi from "../../hooks/useTeachersApi";
import TeacherCard from "../../components/teachers/TeacherCard";
import frontRoutes from "../../routes/frontRoutes";
import Loader from "../../components/Loader/Loader";
import styles from "./TeachersList.module.css";
import Button from "../../components/buttons/Button";
import Title from "../../components/Title/Title";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useLocation } from "react-router";

function TeachersList() {
  const {
    data: teachersList,
    error,
    isLoading,
    fetchTeachers,
    selectTeacher,
    deleteTeacher
  } = useTeachersApi();

  console.log("TeachersList render");

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const location = useLocation();
  const message = location.state?.message;

  const selectedTeachers = teachersList.filter((teacher) => teacher.isSelected);

  return (
    <section>
      <div className="container">
        {message && <div className={styles.successMessage}>{message}</div>}
        <Title>Список вчителів</Title>
        {error && <ErrorMessage />}
        {isLoading && <Loader />}

        {teachersList.length > 0 && (
          <div className={styles.buttonContainer}>
            <Button to={frontRoutes.navigate.teachers.add}>Додати нового вчителя</Button>
            {selectedTeachers.length > 0 && (
              <Button color="blue" to={frontRoutes.navigate.meeting}>
                Викликати {selectedTeachers.length} вчителів на збори
              </Button>
            )}
          </div>
        )}
        <ul>
          {teachersList.map((teacher) => (
            <li key={teacher.id}>
              <TeacherCard teacher={teacher} onSelect={selectTeacher} />
              <div className={styles.buttonContainer}>
                <Button color="blue" to={frontRoutes.navigate.teachers.edit(teacher.id)}>Редагувати</Button>
                <Button color="red" onClick={() => deleteTeacher(teacher.id)}>Видалити</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TeachersList;
