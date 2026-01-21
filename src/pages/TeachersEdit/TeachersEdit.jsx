import { useEffect, useId } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import useTeachersApi from "../../hooks/useTeachersApi";
import Title from "../../components/Title/Title";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Button from "../../components/buttons/Button";
import styles from "./TeachersEdit.module.css";

function TeachersEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const location = useLocation();

  const nameId = useId();
  const subjectId = useId();
  const photoId = useId();
  const positionId = useId();
  const phoneId = useId();
  const emailId = useId();
  const classTeacherOfId = useId();
  const cabinetId = useId();

  const {
    isLoading,
    error,
    teacherData,
    setTeacherData,
    fetchTeacher,
    handleTeacherChange,
    updateTeacher,
    addNewTeacher,
  } = useTeachersApi();

  useEffect(() => {
    if (!isEdit) return;
    fetchTeacher(id);
  }, [isEdit, fetchTeacher, id]);

  const submitBtnText = isEdit
    ? isLoading
      ? "Оновлення..."
      : "Оновити вчителя"
    : isLoading
      ? "Додавання..."
      : "Додати вчителя";

  const cancelBtnText = isLoading ? "Скасування..." : "Скасувати";

  const isBtnDisabled =
    isLoading ||
    !teacherData.name.trim().length ||
    !teacherData.subject.trim().length ||
    !teacherData.position.trim().length ||
    !teacherData.phone.trim().length ||
    !teacherData.email.trim().length;

  const handleCancel = () => {
    if (isEdit) {
      fetchTeacher(id);
    } else {
      setTeacherData({
        name: "",
        subject: "",
        photo: '',
        position: "",
        phone: "",
        email: "",
        classTeacherOf: "",
        cabinet: "",
      });
    }
  };

  const handleBack = () => {
    navigate(location.state?.from || "/teachers");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isBtnDisabled) return;
    if (isEdit) {
      updateTeacher(id, location.state?.from);
      return;
    } 
    addNewTeacher();
  };
  
  console.log(location.state?.from);
  return (
    <section>
      <div className={styles.container}>
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}

        <div className={styles.header}>
          <Button
            onClick={handleBack}
            className={styles.backButton}
          >
            ← Повернутися назад
          </Button>
          <Title>
            {isEdit ? "Редагувати вчителя" : "Додати нового вчителя"}
          </Title>
        </div>

        {teacherData && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Основна інформація</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor={nameId}>Повне ім'я:*</label>
                  <input
                    id={nameId}
                    name="name"
                    value={teacherData.name}
                    onChange={handleTeacherChange}
                    placeholder="Введіть ПІБ вчителя"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={subjectId}>Предмет:*</label>
                  <input
                    id={subjectId}
                    name="subject"
                    value={teacherData.subject}
                    onChange={handleTeacherChange}
                    placeholder="Наприклад: Математика"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={positionId}>Посада:*</label>
                  <select
                    id={positionId}
                    name="position"
                    value={teacherData.position}
                    onChange={handleTeacherChange}
                    className={styles.select}
                  >
                    <option value="">Оберіть посаду</option>
                    <option value="Вчитель">Вчитель</option>
                    <option value="Вчитель другої категорії">
                      Вчитель другої категорії
                    </option>
                    <option value="Вчитель першої категорії">
                      Вчитель першої категорії
                    </option>
                    <option value="Вчитель вищої категорії">
                      Вчитель вищої категорії
                    </option>
                    <option value="Вчитель-методист">Вчитель-методист</option>
                    <option value="Старший вчитель">Старший вчитель</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Контактна інформація</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor={phoneId}>Телефон:*</label>
                  <input
                    id={phoneId}
                    name="phone"
                    type="tel"
                    value={teacherData.phone}
                    onChange={handleTeacherChange}
                    placeholder="+380XXXXXXXXX"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={emailId}>Електронна пошта:*</label>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    value={teacherData.email}
                    onChange={handleTeacherChange}
                    placeholder="email@school.edu.ua"
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Додаткова інформація</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor={classTeacherOfId}>Класне керівництво:</label>
                  <input
                    id={classTeacherOfId}
                    name="classTeacherOf"
                    value={teacherData.classTeacherOf|| ""}
                    onChange={handleTeacherChange}
                    placeholder="Наприклад: 11-А (залиште пустим, якщо немає)"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={cabinetId}>Кабінет:</label>
                  <input
                    id={cabinetId}
                    name="cabinet"
                    value={teacherData.cabinet || ""}
                    onChange={handleTeacherChange}
                    placeholder="Наприклад: Каб. 215"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor={photoId}>Посилання на фото:</label>
                  <input
                    id={photoId}
                    name="photo"
                    value={teacherData.photo}
                    onChange={handleTeacherChange}
                    placeholder="https://example.com/photo.jpg"
                  />
                  {teacherData.photo && (
                    <div className={styles.photoPreview}>
                      <img
                        src={teacherData.photo}
                        alt="Попередній перегляд"
                        className={styles.previewImage}
                      />
                      <span className={styles.previewText}>
                        Попередній перегляд
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <Button
                type="submit"
                disabled={isBtnDisabled}
                className={styles.submitButton}
              >
                {submitBtnText}
              </Button>
              <Button
                type="button"
                color="gray"
                onClick={handleCancel}
                disabled={isLoading}
              >
                {cancelBtnText}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default TeachersEdit;
