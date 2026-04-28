import { useHostel } from '@context/HostelContext'
import { CITIES, HOSTEL_TYPES } from '@utils/mockData'
import HostelCard from '@components/HostelCard'
import styles from './SearchPage.module.css'
import { useEffect, useState } from "react";

// 🔥 Filter type (move to /types later)
type Filters = {
  city: string
  type: string
  maxPrice: number
  category: string   
}

export default function SearchPage(): React.ReactElement {

const [hotels, setHotels] = useState([]);
useEffect(() => {
  fetch("http://localhost:5000/api/hotels")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setHotels(data);
    })
    .catch((err) => console.error(err));
}, []);
{hotels.map((hotel: any) => (
  <div key={hotel.id}>
    <h2>{hotel.name}</h2>
    <p>{hotel.city}</p>
  </div>
))}

  const { filteredHostels, filters, setFilters } = useHostel()

  const update = (
    key: keyof Filters,
    value: string | number
  ): void => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }


  return (
    <div className={`${styles.page} container`}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Filters</h2>

        {/* City */}
        <div className={styles.filterGroup}>
          <label>City</label>
          <select
            value={filters.city}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              update('city', e.target.value)
            }
          >
            <option value="">All Cities</option>
          {CITIES.map((c) => (
  <option key={c.name} value={c.name}>
    {c.emoji} {c.name}
  </option>
))}
          </select>
        </div>

        {/* Type */}
        <div className={styles.filterGroup}>
          <label>Hotel Type</label>
          <div className={styles.typeOptions}>
            {['', ...HOSTEL_TYPES].map((t: string) => (
              <button
                key={t}
                type="button"
                className={`${styles.typeBtn} ${
                  filters.type === t ? styles.active : ''
                }`}
                onClick={() => update('type', t)}
              >
                {t === ''
                  ? 'All'
                  : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className={styles.filterGroup}>
          <label>
            Max Price:{' '}
            <strong>
              ₹{filters.maxPrice.toLocaleString()}
            </strong>
          </label>

          <input
            type="range"
            min={200}
            max={5000}
            step={100}
            value={filters.maxPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              update('maxPrice', Number(e.target.value))
            }
            className={styles.range}
          />

          <div className={styles.rangeLabels}>
            <span>₹200</span>
            <span>₹5,000</span>
          </div>
        </div>

        {/* Reset */}
        <button
          className={`btn btn-outline ${styles.resetBtn}`}
          onClick={() =>
            setFilters({
              city: '',
              type: '',
              maxPrice: 10000,
                category: '',
            })
          }
        >
          Reset Filters
        </button>
      </aside>

      {/* Results */}
      <section className={styles.results}>
        <div className={styles.resultsHeader}>
          <h1 className={styles.title}>
            {filteredHostels.length} Hostel
            {filteredHostels.length !== 1 ? 's' : ''} Found
          </h1>

          <select className={styles.sortSelect}>
            <option>Sort: Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating: Best First</option>
          </select>
        </div>

        {filteredHostels.length === 0 ? (
          <div className={styles.empty}>
            <span>🏚️</span>
            <p>
              No hotels match your filters. Try adjusting your search.
            </p>

            <button
              className="btn btn-primary"
              onClick={() =>
                setFilters({
                  city: '',
                  type: '',
                  maxPrice: 10000,
                    category: '',
                })
              }
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredHostels.map((h) => (
              <HostelCard key={h.id} hostel={h} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}