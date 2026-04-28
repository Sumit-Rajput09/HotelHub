import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { MOCK_HOSTELS } from '@utils/mockData'
import type { Hostel } from '@/types/Hostel'

// 🔥 Types
export type Filters = {
  city: string
  type: string
  maxPrice: number
  category: string
}

type HostelContextType = {
  hostels: Hostel[]
  filteredHostels: Hostel[]
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  wishlist: string[]
  toggleWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
}

// ❗ createContext with proper type
const HostelContext = createContext<HostelContextType | null>(null)

// 🔥 Provider Props Type
type HostelProviderProps = {
  children: ReactNode
}

export function HostelProvider({ children }: HostelProviderProps) {
  const [hostels] = useState<Hostel[]>(MOCK_HOSTELS)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [filters, setFilters] = useState<Filters>({
    city: '',
    type: '',
    maxPrice: 10000,
    category: '',
  })

  const toggleWishlist = (id: string): void => {
    setWishlist(prev =>
      prev.includes(id)
        ? prev.filter(w => w !== id)
        : [...prev, id]
    )
  }

  const isWishlisted = (id: string): boolean => {
    return wishlist.includes(id)
  }

  const filteredHostels = hostels.filter(h => {
    const cityMatch =
      !filters.city ||
      h.city.toLowerCase().includes(filters.city.toLowerCase())

    const typeMatch =
      !filters.type || h.type === filters.type

    const priceMatch =
      h.pricePerBed <= filters.maxPrice

    let catMatch = true

    if (filters.category === 'womens')
      catMatch = h.dormTypes?.some(d =>
        d.toLowerCase().includes('female')
      ) ?? false

    if (filters.category === 'mens')
      catMatch = !(h.dormTypes?.some(d =>
        d.toLowerCase().includes('female')
      ) ?? false)

    if (filters.category === 'couple' || filters.category === 'family')
      catMatch = h.dormTypes?.some(d =>
        d.toLowerCase().includes('private')
      ) ?? false

    return cityMatch && typeMatch && priceMatch && catMatch
  })

  return (
    <HostelContext.Provider
      value={{
        hostels,
        filteredHostels,
        filters,
        setFilters,
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </HostelContext.Provider>
  )
}

// 🔥 Custom Hook
export function useHostel(): HostelContextType {
  const ctx = useContext(HostelContext)
  if (!ctx) throw new Error('useHostel must be used inside HostelProvider')
  return ctx
}