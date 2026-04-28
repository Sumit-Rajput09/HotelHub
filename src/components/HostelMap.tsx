import styles from './HostelMap.module.css'

// 🔥 Hostel type (move to /types later)
type Hostel = {
  lat: number
  lng: number
  name: string
  address: string
}

// 🔥 Props type
type Props = {
  hostel: Hostel
}

export default function HostelMap({ hostel }: Props): React.ReactElement {
  const { lat, lng, name, address } = hostel

  // OpenStreetMap embed — completely free, no API key
  const mapUrl: string = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.015}%2C${lat - 0.010}%2C${lng + 0.015}%2C${lat + 0.010}&layer=mapnik&marker=${lat}%2C${lng}`

  const linkUrl: string = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>📍 Location</h3>
          <p className={styles.address}>{address}</p>
        </div>

        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          Open in Maps ↗
        </a>
      </div>

      <div className={styles.mapContainer}>
        <iframe
          title={`Map showing location of ${name}`}
          src={mapUrl}
          className={styles.iframe}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <div className={styles.mapOverlay}>
          <div className={styles.pin}>
            <span>⌂</span>
            <div className={styles.pinLabel}>{name}</div>
          </div>
        </div>
      </div>

      <div className={styles.nearbyRow}>
        <span className={styles.nearbyItem}>
          🚌 Nearest Bus Stop: ~0.3 km
        </span>
        <span className={styles.nearbyItem}>
          🚉 Railway Station: ~2.1 km
        </span>
        <span className={styles.nearbyItem}>
          ✈️ Airport: ~12 km
        </span>
      </div>
    </div>
  )
}