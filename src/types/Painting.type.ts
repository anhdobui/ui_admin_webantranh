export type Painting = {
  id: number
  name: string
  thumbnail: File
  thumbnailUrl: string
  album: File[]
  albumUrl: string[]
  price: number
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
