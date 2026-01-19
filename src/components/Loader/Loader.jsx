import { InfinitySpin } from 'react-loader-spinner'
import styles from './Loader.module.css'

const Loader = () => {
    return (
      <div className={styles.loaderContainer}>
        <InfinitySpin
          width="200"
          color="var(--color-primary)"
        />
      </div>
    )
}

export default Loader