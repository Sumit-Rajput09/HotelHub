import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage(): React.ReactElement {
  return (
    <div className={styles.page}>
      <div className={styles.code}>404</div>

      <h1 className={styles.title}>Page Not Found</h1>

      <p className={styles.sub}>
        Looks like this page went on an unplanned adventure. 
        Let's get you back on track.
      </p>

      <div className={styles.actions}>
        <Link to="/" className="btn btn-primary">
          Go Home →
        </Link>

        <Link to="/search" className="btn btn-outline">
          Explore Hotels
        </Link>
      </div>

      <div className={styles.orb} aria-hidden="true" />
    </div>
  )
}