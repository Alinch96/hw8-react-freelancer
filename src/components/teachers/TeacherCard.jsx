import clsx from "clsx";
import Button from "../buttons/Button";
import styles from "./TeacherCard.module.css";
import { memo } from "react";
import { useNavigate } from "react-router";
import frontRoutes from "../../routes/frontRoutes";

function TeacherCard({ teacher, onSelect }) {
  const navigate = useNavigate();
  return (
    <div
      className={clsx(
        styles.container,
        teacher.isSelected && onSelect && styles.selected,
      )}
    >
      <div className={styles.sectionOne}>
        <img src={teacher.photo} alt="teacher" />
        <div className={styles.info}>
          <div>{teacher.name}</div>
          <div>
            Предмет: <span>{teacher.subject}</span>
          </div>
        </div>
      </div>
        {onSelect && (
      <div className={styles.sectionTwo}>
          
            <Button
              color={teacher.isSelected ? "green" : "blue"}
              onClick={() => onSelect(teacher.id)}
            >
              {teacher.isSelected ? "Вибрано" : "Вибрати на збори"}
            </Button>
            <Button
              color="orange"
              onClick={() =>
                navigate(frontRoutes.navigate.teachers.detail(teacher.id))
              }
            >
             Переглянути профіль
            </Button>
    
      </div>
        )}
    </div>
  );
}

export default memo(TeacherCard);
