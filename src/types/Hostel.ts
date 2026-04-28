export interface Hostel {
  id: string
  name: string
  city: string
  state: string
  type: 'budget' | 'mixed' | 'premium'

  pricePerBed: number
  rating: number
  reviewCount: number

  amenities: string[]
  images: string[]
  thumbnail: string
  description: string

  availableBeds: number
  tags: string[]

  address: string
  lat: number
  lng: number

  dormTypes?: string[]

  checkIn?: string
  checkOut?: string

  established?: number

  phone: string
  email: string
}
