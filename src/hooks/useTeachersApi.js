import axios from 'axios'
import { useCallback, useState } from 'react'
import apiRoutes from '../api/apiRoutes'
import { useNavigate } from 'react-router'
import frontRoutes from '../routes/frontRoutes'

const useTeachersApi = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [teacherData, setTeacherData] = useState({name: '', subject: '', photo: ''});
  const navigate = useNavigate();
  
const apiWrapper = useCallback((callback) => {
    return (id)=> {
    setIsLoading(true)
    setError(null)
    try {
      callback(id);
    }catch (e) {
      setError(e.response?.data?.message || e.message)
    }finally {
      setIsLoading(false)
    }
  }
}, []);

  const fetchTeachers = useCallback(async () => {
      const res = await axios.get(apiRoutes.getAllTeachers)
      setData(res.data)
  }, [])

  const selectTeacher = useCallback(async(id)=> {
      const {data} = await axios.patch(apiRoutes.selectTeacherById(id));
      setData((prevData) => prevData.map((teacher) => (teacher.id === id ? data : teacher)));
  }, [])
 
  const fetchSelectedTeachers = useCallback(async()=> {
      const {data} = await axios.get(apiRoutes.getSelectedTeachers);
      setData(data);
  }, [])

  const fetchTeacher = useCallback(async(id)=> {
    setIsLoading(true);
    setError(null);
    try {
      const {data} = await axios.get(apiRoutes.selectTeacherById(id));
      setTeacherData(data);
    }catch(e) {
      setTeacherData(null);
      setError(e.message);
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteTeacher = useCallback(async(id)=> {
      await axios.delete(apiRoutes.selectTeacherById(id));
      setData(teachers=> teachers.filter(t=> t.id!==id));
  }, [])
  
  const updateTeacher = useCallback(async(id)=> {
      await axios.put(apiRoutes.selectTeacherById(id), teacherData);
      navigate(frontRoutes.navigate.teachers.root, { replace: true, state: { message: `Вчитель ${teacherData.name} оновлений успішно` } });
  }, [navigate, teacherData])
  
  const addNewTeacher = useCallback(async()=> {
      await axios.post(apiRoutes.addTeacher, teacherData);
      navigate(frontRoutes.navigate.teachers.root, { replace: true, state: { message: `Вчитель ${teacherData.name} доданий успішно` } });
  }, [navigate, teacherData])

  const handleTeacherChange = useCallback(e => {
    const {name, value} = e.target;
    setTeacherData(teacher=> ({...teacher, [name]: value}))
  }, [])

  return {
    data,
    isLoading,
    error,
    fetchTeachers: useCallback(apiWrapper(fetchTeachers), [apiWrapper, fetchTeachers]),
    selectTeacher: useCallback(apiWrapper(selectTeacher), [apiWrapper, selectTeacher]),
    fetchSelectedTeachers: useCallback(apiWrapper(fetchSelectedTeachers), [apiWrapper, fetchSelectedTeachers]),
    fetchTeacher,
    deleteTeacher: useCallback(apiWrapper(deleteTeacher), [apiWrapper, deleteTeacher]),
    updateTeacher: useCallback(apiWrapper(updateTeacher), [apiWrapper, updateTeacher]),
    addNewTeacher: useCallback(apiWrapper(addNewTeacher), [apiWrapper, addNewTeacher]),
    handleTeacherChange,
    teacherData,
    setTeacherData
  }
}

export default useTeachersApi
