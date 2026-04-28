import { useState } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { useHostel } from '@context/HostelContext'
import { useAuth } from '@context/AuthContext'
import styles from './BookingPage.module.css'

// 🔥 Optional: import from /types instead
type Hostel = {
  id: string
  name: string
  city: string
  state: string
  pricePerBed: number
  rating: number
  reviewCount: number
  thumbnail: string
}

export default function BookingPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>()   // ✅ typed params
  const { hostels } = useHostel()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const hostel: Hostel | undefined = hostels.find((h) => h.id === id)

  const [beds, setBeds] = useState<number>(1)
  const [checkIn, setCheckIn] = useState<string>('')
  const [checkOut, setCheckOut] = useState<string>('')
  const [confirmed, setConfirmed] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  // 🔐 Auth guard
  if (!isLoggedIn) return <Navigate to="/login" replace />

  // ❌ Not found
  if (!hostel) {
    return (
      <div className={styles.notFound}>
        <p>
          Hostel not found. <Link to="/search">Go back</Link>
        </p>
      </div>
    )
  }

  // 🔥 Nights calculation (safe)
  const nights: number =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.round(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 1

  const total: number = hostel.pricePerBed * beds * nights

  const handleConfirm = async (): Promise<void> => {
    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates.')
      return
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out must be after check-in.')
      return
    }

    setError('')
    setLoading(true)

    await new Promise<void>((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
    setConfirmed(true)
  }

  // ✅ Success page
  if (confirmed) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <span className={styles.successIcon}>✅</span>
          <h2>Booking Confirmed!</h2>
          <p>
            Your stay at <strong>{hostel.name}</strong> in {hostel.city} is confirmed.
          </p>
          <p className={styles.successTotal}>
            Total Paid: <strong>₹{total.toLocaleString()}</strong>
          </p>

          <div className={styles.successActions}>
            <Link to="/dashboard" className="btn btn-primary">
              View Dashboard
            </Link>
            <Link to="/search" className="btn btn-outline">
              Explore More
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // 🧾 Main UI
  return (
    <div className={`${styles.page} container`}>
      <div className={styles.left}>
        <h1 className={styles.title}>Complete Your Booking</h1>
        <p className={styles.sub}>
          You're booking <strong>{hostel.name}</strong> in {hostel.city}.
        </p>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formSection}>
          <h3>Stay Details</h3>

          <div className={styles.dateRow}>
            <div className={styles.field}>
              <label>Check-in Date</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCheckIn(e.target.value)
                }
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className={styles.field}>
              <label>Check-out Date</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCheckOut(e.target.value)
                }
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Number of Beds</label>
            <div className={styles.bedsRow}>
              {[1, 2, 3, 4].map((n: number) => (
                <button
                  key={n}
                  type="button"
                  className={`${styles.bedBtn} ${
                    beds === n ? styles.active : ''
                  }`}
                  onClick={() => setBeds(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3>Guest Details</h3>
          <div className={styles.field}>
            <label>Full Name</label>
            <input type="text" placeholder="As per ID" />
          </div>
          <div className={styles.field}>
            <label>Phone Number</label>
            <input type="tel" placeholder="+91 XXXXX XXXXX" />
          </div>
          <div className={styles.field}>
            <label>Special Requests (optional)</label>
            <textarea
              placeholder="Any preferences or requirements…"
              rows={3}
            />
          </div>
        </div>
      </div>

      <aside className={styles.summary}>
        <img
          src={hostel.thumbnail}
          alt={hostel.name}
          className={styles.summaryImg}
        />

        <div className={styles.summaryBody}>
          <h3>{hostel.name}</h3>
          <p>📍 {hostel.city}, {hostel.state}</p>
          <p>★ {hostel.rating} ({hostel.reviewCount} reviews)</p>

          <div className={styles.breakdown}>
            <div className={styles.breakdownRow}>
              <span>
                ₹{hostel.pricePerBed} × {beds} bed{beds > 1 ? 's' : ''} × {nights} night{nights > 1 ? 's' : ''}
              </span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <div className={styles.breakdownRow}>
              <span>Service Fee</span>
              <span>₹0</span>
            </div>

            <div className={`${styles.breakdownRow} ${styles.total}`}>
              <strong>Total</strong>
              <strong>₹{total.toLocaleString()}</strong>
            </div>
          </div>

          <button
            className={`btn btn-primary ${styles.confirmBtn}`}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Processing…' : 'Confirm & Pay →'}
          </button>

          <p className={styles.safeNote}>
            🔒 Secure payment · Free cancellation within 24h
          </p>
        </div>
      </aside>
    </div>
  )
}