import Button from '../../components/buttons/Button'
import frontRoutes from '../../routes/frontRoutes'
import styles from './Page404.module.css'

function Page404() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Сторінка не знайдена</h2>
      <div className={styles.buttonContainer}>
        <Button to={frontRoutes.navigate.home}> На головну</Button>
      </div>
    </div>
  )
}

export default Page404
