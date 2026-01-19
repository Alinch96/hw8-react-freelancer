import { useNavigate } from 'react-router'
import frontRoutes from '../../routes/frontRoutes'
import styles from './GoHomeButton.module.css'

function GoHomeButton() {
  const navigate = useNavigate()
  return (
    <button className={styles.button} onClick={() => navigate(frontRoutes.navigate.home)}>Go home</button>
  )
}

export default GoHomeButton
