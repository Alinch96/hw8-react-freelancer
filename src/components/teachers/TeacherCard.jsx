import clsx from "clsx";
import Button from "../buttons/Button";
import styles from "./TeacherCard.module.css";
import { memo } from "react";
function TeacherCard({ teacher, onSelect }) {
  return (
    <div className={clsx(styles.container, teacher.isSelected && onSelect && styles.selected)}>
      <div className={styles.sectionOne}>
        <img src={teacher.photo} alt="teacher" />
        <div className={styles.info}>
          <div>{teacher.name}</div>
          <div>
            Предмет: <span>{teacher.subject}</span>
          </div>
        </div>
      </div>
      <div className={styles.sectionTwo}>
        {onSelect && (
          <Button
            color={teacher.isSelected  ? "green" : "blue"}
            onClick={() => onSelect(teacher.id)}
          >
            {teacher.isSelected? "Вибрано" : "Вибрати на збори"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default memo(TeacherCard);
