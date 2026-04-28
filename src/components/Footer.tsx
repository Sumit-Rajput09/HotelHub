import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer(): React.ReactElement {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.brand}>
          <span className={styles.logo}>⌂ HotelHub</span>
          <p>Find your perfect hotel across India. Budget stays, premium vibes.</p>
        </div>

        <div className={styles.col}>
          <h4>Explore</h4>
          <Link to="/search">All Hotel</Link>
          <Link to="/search?type=budget">Budget Stays</Link>
          <Link to="/search?type=premium">Premium Hotel</Link>
        </div>

        <div className={styles.col}>
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        <div className={styles.col}>
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>
          © {new Date().getFullYear()} HotelHub. Made with ♥ in India.
        </span>
      </div>
    </footer>
  )
}