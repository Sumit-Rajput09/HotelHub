import { Link, Navigate } from 'react-router-dom'
import { useHostel } from '@context/HostelContext'
import { useAuth } from '@context/AuthContext'
import HostelCard from '@components/HostelCard'
import styles from './WishlistPage.module.css'
import type { Hostel } from '@/types/Hostel'


export default function WishlistPage(): React.ReactElement {
  const { isLoggedIn } = useAuth()
  const { hostels, wishlist } = useHostel()

  // 🔥 Protect route
  if (!isLoggedIn) return <Navigate to="/login" replace />

  // 🔥 Derived data with type
  const wishlisted: Hostel[] = hostels.filter((h) =>
    wishlist.includes(h.id)
  )

  return (
    <div className={`${styles.page} container`}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Wishlist ♥</h1>
        <p className={styles.sub}>
          {wishlisted.length} hostel
          {wishlisted.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {wishlisted.length === 0 ? (
        <div className={styles.empty}>
          <span>♡</span>
          <h2>Nothing saved yet</h2>
          <p>
            Browse hostels and tap the heart icon to save
            your favourites here.
          </p>

          <Link to="/search" className="btn btn-primary">
            Explore Hotels →
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {wishlisted.map((h) => (
            <HostelCard key={h.id} hostel={h} />
          ))}
        </div>
      )}
    </div>
  )
}