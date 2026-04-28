import { useAuth } from '@context/AuthContext'
import { useHostel } from '@context/HostelContext'
import { Link, Navigate } from 'react-router-dom'
import styles from './DashboardPage.module.css'

// 🔥 Types (move to /types later)
type Booking = {
  id: string
  hostelName: string
  city: string
  checkIn: string
  checkOut: string
  status: 'confirmed' | 'pending'
  amount: number
}

type Hostel = {
  id: string
  name: string
  city: string
  thumbnail: string
  pricePerBed: number
}

// 🔥 Mock data
const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    hostelName: 'Backpackers Den',
    city: 'Manali',
    checkIn: '2025-06-10',
    checkOut: '2025-06-13',
    status: 'confirmed',
    amount: 1497
  },
  {
    id: 'b2',
    hostelName: 'The Goa Groove',
    city: 'Panjim',
    checkIn: '2025-07-01',
    checkOut: '2025-07-04',
    status: 'pending',
    amount: 2097
  },
]

// 🔥 StatCard props
type StatCardProps = {
  value: number | string
  label: string
  icon: string
}

export default function DashboardPage(): React.ReactElement {
  const { user, isLoggedIn } = useAuth()
  const { wishlist, hostels } = useHostel()

  if (!isLoggedIn) return <Navigate to="/login" replace />

  const wishlisted: Hostel[] = hostels.filter((h) =>
    wishlist.includes(h.id)
  )

  return (
    <div className={`${styles.page} container`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.avatar}>
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <h1 className={styles.name}>{user?.name}</h1>
          <p className={styles.email}>{user?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        <StatCard value={MOCK_BOOKINGS.length} label="Total Bookings" icon="🗓️" />
        <StatCard value={wishlisted.length} label="Saved Hostels" icon="♥" />
        <StatCard value="₹3,594" label="Total Spent" icon="💸" />
        <StatCard value="2" label="Cities Visited" icon="🗺️" />
      </div>

      {/* Bookings */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>My Bookings</h2>

        {MOCK_BOOKINGS.length === 0 ? (
          <div className={styles.empty}>
            <p>
              No bookings yet. <Link to="/search">Find a hotel →</Link>
            </p>
          </div>
        ) : (
          <div className={styles.bookingsList}>
            {MOCK_BOOKINGS.map((b: Booking) => (
              <div key={b.id} className={styles.bookingCard}>
                <div className={styles.bookingInfo}>
                  <h3>{b.hostelName}</h3>
                  <p>📍 {b.city}</p>
                  <p className={styles.dates}>
                    {new Date(b.checkIn).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short'
                    })}
                    {' → '}
                    {new Date(b.checkOut).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                <div className={styles.bookingRight}>
                  <span
                    className={`badge ${
                      b.status === 'confirmed'
                        ? 'badge-teal'
                        : 'badge-accent'
                    }`}
                  >
                    {b.status}
                  </span>

                  <strong className={styles.amount}>
                    ₹{b.amount.toLocaleString()}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Wishlist Preview */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Saved Hostels</h2>
          <Link to="/wishlist" className="btn btn-ghost">
            View All →
          </Link>
        </div>

        {wishlisted.length === 0 ? (
          <div className={styles.empty}>
            <p>
              Nothing saved yet. <Link to="/search">Explore hotels →</Link>
            </p>
          </div>
        ) : (
          <div className={styles.wishGrid}>
            {wishlisted.slice(0, 3).map((h: Hostel) => (
              <Link
                to={`/hostel/${h.id}`}
                key={h.id}
                className={styles.miniCard}
              >
                <img src={h.thumbnail} alt={h.name} />
                <div>
                  <strong>{h.name}</strong>
                  <span>📍 {h.city}</span>
                  <span className={styles.miniPrice}>
                    ₹{h.pricePerBed}/bed
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

// 🔥 Reusable component (typed)
function StatCard({ value, label, icon }: StatCardProps): React.ReactElement{
  return (
    <div className={styles.statCard}>
      <span className={styles.statIcon}>{icon}</span>
      <strong className={styles.statValue}>{value}</strong>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}