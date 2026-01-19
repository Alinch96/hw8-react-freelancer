import { useEffect, useId } from "react";
import { useParams } from "react-router";
import useTeachersApi from "../../hooks/useTeachersApi";
import Title from "../../components/Title/Title";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Button from "../../components/buttons/Button";

function TeachersEdit() {
  const { id } = useParams();
  const isEdit = !!id;
  const nameId = useId();
  const subjId =useId();
  const photoId =useId();

 
  const { isLoading, error, teacherData, setTeacherData, fetchTeacher, handleTeacherChange, updateTeacher, addNewTeacher } =
    useTeachersApi();

  useEffect(() => {
    if (!isEdit) return;
    fetchTeacher(id);
  }, [isEdit, fetchTeacher, id]);

  const submitBtnText = isEdit ? (isLoading ? 'Оновлення...' : 'Оновити вчителя') : (isLoading ? 'Додавання...' : 'Додати вчителя');
  const cancelBtnText = isLoading ? 'Скасування...' : 'Скасувати';

  const isBtnDisabled = isLoading || !teacherData.name.trim().length|| !teacherData.subject.trim().length;

  const handleSubmit=(e)=> {
    e.preventDefault();
    console.log('handleSubmit');
    if(isBtnDisabled) return;
    if(isEdit) {updateTeacher(id);
      
      console.log('update');
      return;
    } addNewTeacher();
  }

  return <section>
    <div className="container">
      <Title>{isEdit ? 'Редагувати вчителя' : 'Додати нового вчителя'}</Title>
      {isLoading && <Loader/>}
      {error && <ErrorMessage message={error}/>}
      {teacherData && <form onSubmit={handleSubmit}>
        <div><label htmlFor={nameId}>Ім'я:</label>
        <input id={nameId} name="name" value={teacherData.name} onChange={handleTeacherChange} /></div>
        <div><label htmlFor={subjId}>Предмет:</label>
        <input id={subjId} name="subject" value={teacherData.subject} onChange={handleTeacherChange} /></div>
        <div><label htmlFor={photoId}>Фото: </label>
        <input id={photoId} name="photo" value={teacherData.photo} onChange={handleTeacherChange} /></div>
        <div className="buttonContainer">
          <Button type="submit" disabled={isBtnDisabled}>{submitBtnText}</Button>
          <Button color="gray" onClick={isEdit ? () => fetchTeacher(id) : () => setTeacherData({name: '', subject: '', photo: ''})}>{cancelBtnText}</Button>
        </div>
        </form>}
    </div>
  </section>;
}

export default TeachersEdit;
