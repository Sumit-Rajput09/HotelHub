import { useParams, Link, useNavigate } from 'react-router-dom'
import { useHostel } from '@context/HostelContext'
import type { Hostel } from '@/types/Hostel'
import { useAuth } from '@context/AuthContext'
import HostelMap from '@components/HostelMap'
import styles from './HostelDetailPage.module.css'

export default function HostelDetailPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>()   // 🔥 typed params
  const { hostels, toggleWishlist, isWishlisted } = useHostel()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const hostel: Hostel | undefined = hostels.find(h => h.id === id)

  if (!hostel) {
    return (
      <div className={styles.notFound}>
        <h2>Hotel not found 😕</h2>
        <Link to="/search" className="btn btn-primary">Back to Search</Link>
      </div>
    )
  }

  const handleBook = (): void => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    navigate(`/book/${hostel.id}`)
  }

  const wished: boolean = isWishlisted(hostel.id)

  return (
    <div className={`${styles.page} container`}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to="/">Home</Link> › <Link to="/search">Explore</Link> › <span>{hostel.name}</span>
      </nav>

      {/* Hero Image */}
      <div className={styles.heroImg}>
        <img
          src={hostel.images?.[0] || hostel.thumbnail}   // 🔥 SAFE
          alt={hostel.name}
        />
        <div className={styles.imgOverlay}>
          <span className={`badge ${hostel.type === 'premium' ? 'badge-accent' : 'badge-teal'}`}>
            {hostel.type}
          </span>
        </div>
      </div>

      <div className={styles.content}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.header}>
            <div>
              <p className={styles.location}>📍 {hostel.city}, {hostel.state}</p>
              <h1 className={styles.name}>{hostel.name}</h1>

              {hostel.established && (
                <p className={styles.estd}>
                  Est. {hostel.established} · {hostel.phone ?? 'N/A'}
                </p>
              )}
            </div>

            <button
              className={`${styles.wishBtn} ${wished ? styles.wished : ''}`}
              onClick={() => toggleWishlist(hostel.id)}
            >
              {wished ? '♥ Saved' : '♡ Save'}
            </button>
          </div>

          <div className={styles.ratingRow}>
            <span className={styles.stars}>★ {hostel.rating}</span>
            <span className={styles.reviews}>{hostel.reviewCount} reviews</span>
            <span className={styles.beds}>🛏 {hostel.availableBeds ?? 0} beds available</span>

            {(hostel.availableBeds ?? 0) <= 5 && (
              <span className="badge badge-red">
                Only {hostel.availableBeds} left!
              </span>
            )}
          </div>

          <p className={styles.desc}>{hostel.description}</p>

          <div className={styles.tags}>
            {hostel.tags?.map(t => (
              <span key={t} className={styles.tag}>#{t}</span>
            ))}
          </div>

          {/* Dorm Types */}
          {hostel.dormTypes && (
            <div className={styles.section}>
              <h3 className={styles.sectionLabel}>🛏 Room Options</h3>
              <div className={styles.dormList}>
                {hostel.dormTypes.map((d, i) => (
                  <div key={i} className={styles.dormItem}>
                    <span>{d}</span>
                    <span className={styles.dormAvail}>Available</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          <div className={styles.section}>
            <h3 className={styles.sectionLabel}>🏠 Amenities</h3>
            <div className={styles.amenitiesGrid}>
              {hostel.amenities.map(a => (
                <div key={a} className={styles.amenityItem}>
                  <span>✓</span> {a}
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className={styles.section}>
            <HostelMap hostel={hostel} />
          </div>

          {/* Policies */}
          <div className={styles.section}>
            <h3 className={styles.sectionLabel}>📋 Policies</h3>
            <ul className={styles.policies}>
              <li>✅ Free cancellation up to 24 hours before check-in</li>
              <li>
                🕐 Check-in: {hostel.checkIn ?? '12:00 PM'} ·
                Check-out: {hostel.checkOut ?? '11:00 AM'}
              </li>
              <li>🔞 18+ only</li>
              <li>🚭 Non-smoking property</li>
              <li>📧 Contact: {hostel.email ?? 'N/A'}</li>
            </ul>
          </div>
        </div>

        {/* RIGHT */}
        <aside className={styles.bookCard}>
          <div className={styles.priceRow}>
            <span className={styles.price}>₹{hostel.pricePerBed}</span>
            <span className={styles.priceNote}>per bed / night</span>
          </div>

          {(hostel.availableBeds ?? 0) <= 5 && (
            <div className={styles.urgency}>
              🔥 Only {hostel.availableBeds} beds left — book soon!
            </div>
          )}

          <div className={styles.dateInputs}>
            <div className={styles.dateField}>
              <label>Check-in</label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className={styles.dateField}>
              <label>Check-out</label>
              <input type="date" />
            </div>
          </div>

          <div className={styles.bedsSelect}>
            <label>Beds</label>
            <select>
              {[1,2,3,4].map(n => (
                <option key={n} value={n}>
                  {n} bed{n>1?'s':''}
                </option>
              ))}
            </select>
          </div>

          {hostel.dormTypes && (
            <div className={styles.bedsSelect}>
              <label>Room Type</label>
              <select>
                {hostel.dormTypes.map((d, i) => (
                  <option key={i}>{d}</option>
                ))}
              </select>
            </div>
          )}

          <div className={styles.totalRow}>
            <span>Estimate (1 night)</span>
            <strong>₹{hostel.pricePerBed}</strong>
          </div>

          <button
            className={`btn btn-primary ${styles.bookBtn}`}
            onClick={handleBook}
          >
            {isLoggedIn ? 'Book Now' : 'Login to Book'}
          </button>

          <p className={styles.noCharge}>You won't be charged yet</p>

          {/* Contact */}
          <div className={styles.contactRow}>
            {hostel.phone && (
              <a href={`tel:${hostel.phone}`} className={styles.contactBtn}>
                📞 Call
              </a>
            )}
            {hostel.email && (
              <a href={`mailto:${hostel.email}`} className={styles.contactBtn}>
                ✉️ Email
              </a>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}