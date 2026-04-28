import { useNavigate } from 'react-router-dom'
import { useHostel } from '@context/HostelContext'
import { CITIES } from '@utils/mockData'
import styles from './PopularCities.module.css'

// 🔥 City type (move to /types later)
type City = {
  name: string
  state: string
  image: string
  emoji: string
  hostels: number
}

// 🔥 Filters type (should match HostelContext)
type Filters = {
  city: string
  type: string
  maxPrice: number
   category: string 
}

export default function PopularCities(): React.ReactElement{
  const { setFilters } = useHostel()
  const navigate = useNavigate()

  const handleCityClick = (cityName: string): void => {
    setFilters((prev: Filters) => ({
      ...prev,
      city: cityName,
    }))
    navigate('/search')
  }

  return (
    <section className={styles.section}>
      <div className={`${styles.inner} container`}>
        <div className={styles.head}>
          <div>
            <span className={styles.label}>🗺️ Destinations</span>
            <h2 className={styles.title}>Popular Cities</h2>
          </div>
          <p className={styles.sub}>
            Handpicked destinations where every backpacker finds their story.
          </p>
        </div>

        <div className={styles.grid}>
          {CITIES.map((city: City, i: number) => (
            <button
              key={city.name}
              type="button"
              className={`${styles.card} ${
                i === 0 ? styles.featured : ''
              }`}
              onClick={() => handleCityClick(city.name)}
            >
              <img
                src={city.image}
                alt={city.name}
                className={styles.img}
              />

              <div className={styles.overlay} />

              <div className={styles.content}>
                <span className={styles.emoji}>{city.emoji}</span>

                <div>
                  <h3 className={styles.cityName}>{city.name}</h3>
                  <p className={styles.state}>{city.state}</p>
                </div>

                <span className={styles.count}>
                  {city.hostels} hostels
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}