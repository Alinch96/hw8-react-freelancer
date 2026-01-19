import { Route, Routes } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import frontRoutes from './frontRoutes'
import HomePage from '../pages/HomePage/HomePage'
import TeachersEdit from '../pages/TeachersEdit/TeachersEdit'
import TeachersDetail from '../pages/TeachersDetail/TeachersDetail'
import Meetings from '../pages/Meetings/Meetings'
import InfoLayout from '../layouts/InfoLayout'
import AboutApp from '../pages/AboutApp/AboutApp'
import AboutDev from '../pages/AboutDev/AboutDev'
import TeachersList from '../pages/TeachersList/TeachersList'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={frontRoutes.pages.home} element={<HomePage />} />
        <Route path={frontRoutes.pages.teachers.root}>
          <Route index element={<TeachersList />} />
          <Route
            path={frontRoutes.pages.teachers.add}
            element={<TeachersEdit />}
          />
          <Route
            path={frontRoutes.pages.teachers.edit}
            element={<TeachersEdit />}
          />
          <Route
            path={frontRoutes.pages.teachers.detail}
            element={<TeachersDetail />}
          />
        </Route>
        <Route path={frontRoutes.pages.meeting} element={<Meetings />} />
      </Route>
      <Route element={<InfoLayout />}>
        <Route path={frontRoutes.pages.aboutApp} element={<AboutApp />} />
        <Route path={frontRoutes.pages.aboutDev} element={<AboutDev />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
