import axios from 'axios'
import { useCallback, useState } from 'react'
import apiRoutes from '../api/apiRoutes'
import { useNavigate } from 'react-router'


const INITIAL_TEACHER_DATA = {
  name: '',
  subject: '',
  photo: '',
  isSelected: false,
  position: "",
  phone: "",
  email: "",
  classTeacherOf: "",
  cabinet: ""
}

const useTeachersApi = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [teacherData, setTeacherData] = useState(INITIAL_TEACHER_DATA);

  const navigate = useNavigate()
  
const apiWrapper = useCallback((callback) => {
    return (...args)=> {
    setIsLoading(true)
    setError(null)
    try {
      callback(...args);
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
      const {data} = await axios.get(apiRoutes.selectTeacherById(id));
      setTeacherData(data);
  }, [])

  const deleteTeacher = useCallback(async(id)=> {
      await axios.delete(apiRoutes.selectTeacherById(id));
      setData(teachers=> teachers.filter(t=> t.id!==id));
  }, [])
  
  const updateTeacher = useCallback(async(id, to)=> {
      await axios.put(apiRoutes.selectTeacherById(id), teacherData);
      navigate(to, {state: { message: `Вчитель ${teacherData.name}  оновлений успішно` } });
  }, [teacherData, navigate])
  
  const addNewTeacher = useCallback(async()=> {
      await axios.post(apiRoutes.addTeacher, teacherData);
      navigate("/teachers", {state: { message: `Вчитель ${teacherData.name} доданий успішно` } });
  }, [ teacherData, navigate])

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
    fetchTeacher: useCallback(apiWrapper(fetchTeacher), [apiWrapper, fetchTeacher]),
    deleteTeacher: useCallback(apiWrapper(deleteTeacher), [apiWrapper, deleteTeacher]),
    updateTeacher: useCallback(apiWrapper(updateTeacher), [apiWrapper, updateTeacher]),
    addNewTeacher: useCallback(apiWrapper(addNewTeacher), [apiWrapper, addNewTeacher]),
    handleTeacherChange,
    teacherData,
    setTeacherData
  }
}

export default useTeachersApi
