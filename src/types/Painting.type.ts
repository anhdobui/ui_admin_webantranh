export type Painting = {
  id: number
  name: string
  thumbnail: Blob
  thumbnailUrl: string
  album: Blob[]
  albumUrl: string[]
  price: number
  artist: string
  width: number
  length: number
  inventory: number
  thickness: number
  topicIds: number[]
  topics: {
    id: number
    title: string
    description: string
  }[]
}
