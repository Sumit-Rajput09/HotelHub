import { useState, useRef, useEffect } from 'react'
import type { KeyboardEvent, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHostel } from '@context/HostelContext'
import { MOCK_HOSTELS } from '@utils/mockData'
import styles from './SearchBar.module.css'

// 🔥 Types
type Props = {
  compact?: boolean
}

type Category = {
  value: string
  label: string
  icon: string
}

// Build unique city list
const ALL_CITIES: string[] = [...new Set(MOCK_HOSTELS.map(h => h.city))].sort()

const HOSTEL_TYPES: string[] = ['budget', 'mixed', 'premium']

const CATEGORIES: Category[] = [
  { value: '',         label: 'All Guests',   icon: '👥' },
  { value: 'mens',     label: "Men's Only",   icon: '🧔' },
  { value: 'womens',   label: "Women's Only", icon: '👩' },
  { value: 'couple',   label: 'Couple Rooms', icon: '💑' },
  { value: 'family',   label: 'Family Rooms', icon: '👨‍👩‍👧' },
]

export default function SearchBar({ compact = false }: Props): React.ReactElement {
  const { setFilters } = useHostel()
  const navigate = useNavigate()

  const [cityInput, setCityInput] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [type, setType] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<number>(5000)
  const [focusedSugg, setFocusedSugg] = useState<number>(-1)

  const cityRef = useRef<HTMLInputElement | null>(null)
  const dropRef = useRef<HTMLUListElement | null>(null)

  // 🔥 Suggestions filter
  useEffect(() => {
    if (cityInput.trim().length < 1) {
      setSuggestions([])
      return
    }
    const q = cityInput.toLowerCase()
    const matches = ALL_CITIES.filter(c =>
      c.toLowerCase().startsWith(q) || c.toLowerCase().includes(q)
    )
    setSuggestions(matches.slice(0, 6))
  }, [cityInput])

  // 🔥 Outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        dropRef.current &&
        !dropRef.current.contains(target) &&
        cityRef.current &&
        !cityRef.current.contains(target)
      ) {
        setShowDropdown(false)
        setFocusedSugg(-1)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const pickCity = (city: string): void => {
    setCityInput(city)
    setSuggestions([])
    setShowDropdown(false)
    setFocusedSugg(-1)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (!showDropdown || suggestions.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedSugg(i => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedSugg(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && focusedSugg >= 0) {
      e.preventDefault()
      pickCity(suggestions[focusedSugg])
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setFilters({ city: cityInput.trim(), type, maxPrice, category })
    navigate('/search')
    setShowDropdown(false)
  }

  return (
    <form
      className={`${styles.bar} ${compact ? styles.compact : ''}`}
      onSubmit={handleSearch}
      role="search"
      aria-label="Search hostels"
    >
      {/* City */}
      <div className={styles.fieldWrap} style={{ position: 'relative', flex: 2 }}>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>
            <span className={styles.fieldIcon}>📍</span> Where
          </label>
          <input
            ref={cityRef}
            type="text"
            className={styles.cityInput}
            placeholder="Search city..."
            value={cityInput}
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCityInput(e.target.value)
              setShowDropdown(true)
              setFocusedSugg(-1)
            }}
            onFocus={() => {
              if (suggestions.length > 0) setShowDropdown(true)
              if (cityInput === '') {
                setSuggestions(ALL_CITIES.slice(0, 6))
                setShowDropdown(true)
              }
            }}
            onKeyDown={handleKeyDown}
          />
        </div>

        {showDropdown && suggestions.length > 0 && (
          <ul className={styles.dropdown} ref={dropRef}>
            {suggestions.map((city, i) => (
              <li
                key={city}
                className={`${styles.suggestion} ${i === focusedSugg ? styles.focused : ''}`}
                onMouseDown={() => pickCity(city)}
              >
                {highlightMatch(city, cityInput)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Category */}
     <select
  className={styles.select}
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
        {CATEGORIES.map(c => (
          <option key={c.value} value={c.value}>
            {c.icon} {c.label}
          </option>
        ))}
      </select>

      {/* Type */}
     <select
  className={styles.select}
  value={type}
  onChange={(e) => setType(e.target.value)}
>
        <option value="">Any Type</option>
        {HOSTEL_TYPES.map(t => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* Price */}
   <input
  className={styles.range}
  type="range"
  min={200}
  max={5000}
  step={100}
  value={maxPrice}
  onChange={(e) => setMaxPrice(Number(e.target.value))}
/>
<button className={styles.searchBtn} type="submit">
  🔍 Search
</button>
    </form>
  )
}

// 🔥 Highlight function
function highlightMatch(city: string, query: string): React.ReactNode {
  if (!query) return city

  const idx = city.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return city

  return (
    <>
      {city.slice(0, idx)}
      <mark>
        {city.slice(idx, idx + query.length)}
      </mark>
      {city.slice(idx + query.length)}
    </>
  )
}