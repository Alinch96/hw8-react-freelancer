import {useEffect } from "react";
import TeacherCard from "../../components/teachers/TeacherCard";
import useTeachersApi from "../../hooks/useTeachersApi";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import Title from "../../components/Title/Title";
import frontRoutes from "../../routes/frontRoutes";
import Button from "../../components/buttons/Button";

function Meetings() {
  const { data: selectedTeachers, isLoading, error, fetchSelectedTeachers } = useTeachersApi();
  useEffect(() => {
    fetchSelectedTeachers();
  }, [fetchSelectedTeachers]);

  return (
    <section>
      <div className="container">
        <Title>Учасники зборів</Title>
        {isLoading && <Loader/>}
        {error && <ErrorMessage/>}
        {selectedTeachers.length ? (
          <div>
          <p> {`Список вчителів (${selectedTeachers.length}) для виклику на збори`}</p>
          <ul>
            {selectedTeachers.map((teacher) => (
              <li key={teacher.id}><TeacherCard teacher={teacher} /></li>
            ))}
          </ul>
          </div>
        ) : (
          <p>Вчителів не задано</p>
        )}
        <Button to={frontRoutes.navigate.teachers.root}>Повернутися до списку вчителів</Button>
      </div>
    </section>
  );
}

export default Meetings;
