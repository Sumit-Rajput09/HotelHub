import { Link } from 'react-router-dom'
import { useHostel } from '@context/HostelContext'
import styles from './HostelCard.module.css'
import type { Hostel } from '@/types/Hostel'


// 🔥 Props type
type Props = {
  hostel: Hostel
}

export default function HostelCard({ hostel }: Props): React.ReactElement {
  const { toggleWishlist, isWishlisted } = useHostel()
  const wished = isWishlisted(hostel.id)

  return (
    <article className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={hostel.thumbnail} alt={hostel.name} className={styles.img} />

        <button
          className={`${styles.wishBtn} ${wished ? styles.wished : ''}`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            toggleWishlist(hostel.id)
          }}
          aria-label="Toggle wishlist"
        >
          {wished ? '♥' : '♡'}
        </button>

        <span
          className={`badge ${
            hostel.type === 'premium'
              ? 'badge-accent'
              : 'badge-teal'
          } ${styles.typeBadge}`}
        >
          {hostel.type}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.city}>
            📍 {hostel.city}, {hostel.state}
          </span>
          <span className={styles.rating}>
            ★ {hostel.rating} <em>({hostel.reviewCount})</em>
          </span>
        </div>

        <h3 className={styles.name}>{hostel.name}</h3>
        <p className={styles.desc}>{hostel.description}</p>

        <div className={styles.amenities}>
          {hostel.amenities.slice(0, 3).map((a: string) => (
            <span key={a} className={styles.amenity}>
              {a}
            </span>
          ))}
          {hostel.amenities.length > 3 && (
            <span className={styles.amenity}>
              +{hostel.amenities.length - 3}
            </span>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.price}>
            <strong>₹{hostel.pricePerBed}</strong>
            <span>/ bed / night</span>
          </div>

          <Link
            to={`/hostel/${hostel.id}`}
            className="btn btn-primary"
          >
            View →
          </Link>
        </div>
      </div>
    </article>
  )
}