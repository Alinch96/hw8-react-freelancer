import styles from "./TeachersDetail.module.css";
import Loader from "../../components/Loader/Loader";
import useTeachersApi from "../../hooks/useTeachersApi";
import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import frontRoutes from "../../routes/frontRoutes";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Button from "../../components/buttons/Button";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function TeachersDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const {
    teacherData: teacher,
    setTeacherData,
    isLoading,
    error,
    fetchTeacher,
  } = useTeachersApi();

  useEffect(() => {
    setTeacherData(null);
    fetchTeacher(id);
  }, [fetchTeacher, setTeacherData, id]);

  return (
    <section>
      {" "}
      <div className="container">
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {message && <div className={styles.successMessage}>{message}</div>}
        {teacher && (
          <div className={styles.container}>
            <div className={styles.sectionOne}>
              <img
                src={teacher.photo||"https://cdn-icons-png.flaticon.com/512/168/168726.png"}
                alt={teacher.name}
                className={styles.photo}
              />
              <div className={styles.info}>
                <h3 className={styles.name}>{teacher.name}</h3>
                <div className={styles.subject}>
                  Предмет:{" "}
                  <span className={styles.value}>{teacher.subject}</span>
                </div>
                <div className={styles.position}>
                  Посада:{" "}
                  <span className={styles.value}>{teacher.position}</span>
                </div>
                <div className={styles.classTeacher}>
                  Класне керівництво:
                  <span className={styles.value}>
                    {teacher.classTeacherOf ? teacher.classTeacherOf : "Немає"}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.sectionTwo}>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <FaPhone className={styles.icon} />
                  <span className={styles.contactText}>{teacher.phone}</span>
                </div>
                <div className={styles.contactItem}>
                  <FaEnvelope className={styles.icon} />
                  <span className={styles.contactText}>{teacher.email}</span>
                </div>
                <div className={styles.contactItem}>
                  <FaMapMarkerAlt className={styles.icon} />
                  <span className={styles.contactText}>{teacher.cabinet}</span>
                </div>
              </div>

              <div className={styles.actions}>
                <Button
                  color="blue"
                  onClick={() => navigate(frontRoutes.navigate.teachers.edit(teacher.id), { replace: true, state: { from: location.pathname } })}
                >
                  Редагувати
                </Button>
              </div>
            </div>
          </div>
        )}
      <div className={styles.buttonContainer}>
          <Button to={frontRoutes.navigate.teachers.root}>Повернутися до списку вчителів</Button>
        </div>
      </div>{" "}
    </section>
  );
}

export default TeachersDetail;
