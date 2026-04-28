import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import styles from "./ListHostelPage.module.css";

export default function Navbar(): React.ReactElement {
  const { isLoggedIn, logout, user } = useAuth()
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const handleLogout = (): void => {
    logout()
    navigate('/')
  }

  const close = (): void => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to="/" className={styles.logo} onClick={close}>
          <span className={styles.logoIcon}>⌂</span>
          HostelHub
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((o: boolean) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? styles.active : ''
              }
              onClick={close}
            >
              Explore
            </NavLink>
          </li>

          {isLoggedIn && (
            <>
              <li>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }: { isActive: boolean }) =>
                    isActive ? styles.active : ''
                  }
                  onClick={close}
                >
                  Wishlist
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }: { isActive: boolean }) =>
                    isActive ? styles.active : ''
                  }
                  onClick={close}
                >
                  Dashboard
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className={styles.actions}>
          <Link to="/list-hostel" className={styles.listBtn}>
            + List Your Hotel
          </Link>

          {isLoggedIn ? (
            <>
              <span className={styles.userGreet}>
                Hi, {user?.name?.split(' ')[0]}
              </span>
              <button
                className="btn btn-outline"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}