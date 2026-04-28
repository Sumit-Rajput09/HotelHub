import { Link } from 'react-router-dom'
import SearchBar from '@components/SearchBar'
import PopularCities from '@components/PopularCities'
import HostelCard from '@components/HostelCard'
import { useHostel } from '@context/HostelContext'
import styles from './HomePage.module.css'

import type { Hostel } from '@/types/Hostel'

// 🔥 Feature type
type Feature = {
  icon: string
  title: string
  desc: string
}

const FEATURES: Feature[] = [
  { icon: '🗺️', title: 'Pan-India Coverage', desc: 'Browse hotels across 100+ cities from Leh to Kanyakumari.' },
  { icon: '💸', title: 'Best Price Guarantee', desc: 'We match prices. No hidden fees, no nasty surprises.' },
  { icon: '⭐', title: 'Verified Reviews', desc: 'Real travellers, real reviews. Ratings you can trust.' },
  { icon: '🔒', title: 'Secure Booking', desc: 'SSL-encrypted payments and instant confirmation every time.' },
]

export default function HomePage(): React.ReactElement {
  const { hostels } = useHostel(); 

  const featured: Hostel[] = hostels.slice(0, 3);

  const topRated: Hostel[] = [...hostels]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <span className="badge badge-accent">🇮🇳 Explore India</span>
            <h1 className={styles.headline}>
              Find Your<br />
              <span className={styles.accent}>Perfect Hotel</span><br />
              Anywhere
            </h1>
            <p className={styles.sub}>
              Discover handpicked hotels across India — from Himalayan dorms to Goa beachfront pods.
              Your next adventure is one search away.
            </p>
            <Link to="/list-hostel" className={styles.hostLink}>
              🏠 Own a hotel? List it free →
            </Link>
          </div>

          <div className={styles.heroStats}>
            <Stat value="100+" label="Cities" />
            <Stat value="₹349" label="From / night" />
            <Stat value="4.7★" label="Avg. Rating" />
            <Stat value="50k+" label="Travellers" />
          </div>
        </div>

        <div className={styles.searchWrap}>
          <SearchBar />
        </div>
      </section>

      {/* Popular Cities */}
      <PopularCities />

      {/* Featured */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.sectionTag}>✨ Handpicked</span>
            <h2 className={styles.sectionTitle}>Featured Hotels</h2>
          </div>
          <Link to="/search" className="btn btn-outline">See All →</Link>
        </div>

        <div className={styles.grid}>
          {featured.map(h => (
            <HostelCard key={h.id} hostel={h} />
          ))}
        </div>
      </section>

      {/* Top Rated */}
      <section className={`${styles.section} ${styles.topRatedSection}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.sectionTag}>⭐ Best Reviewed</span>
              <h2 className={styles.sectionTitle}>Top Rated This Month</h2>
            </div>
            <Link to="/search" className="btn btn-outline">Explore All →</Link>
          </div>

          <div className={styles.grid}>
            {topRated.map(h => (
              <HostelCard key={h.id} hostel={h} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`${styles.section} ${styles.featuresSection}`}>
        <div className="container">
          <h2 className={`${styles.sectionTitle} ${styles.centered}`}>
            Why HotelHub?
          </h2>

          <div className={styles.featuresGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`${styles.cta} container`}>
        <h2>Ready to explore India?</h2>
        <p>Join thousands of travellers who book smarter with HotelHub.</p>
        <Link to="/register" className="btn btn-primary">
          Get Started Free →
        </Link>
      </section>
    </div>
  )
}

// 🔥 Typed Props
type StatProps = {
  value: string
  label: string
}

function Stat({ value, label }: StatProps): React.ReactElement {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.6rem',
        fontWeight: 800,
        color: 'var(--clr-accent)'
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '0.72rem',
        color: 'var(--clr-text-2)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginTop: '2px'
      }}>
        {label}
      </div>
    </div>
  )
}

type CtaStatProps = {
  value: string
  label: string
}

function CtaStat({ value, label }: CtaStatProps): React.ReactElement {
  return (
    <div className={styles.ctaStat}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}