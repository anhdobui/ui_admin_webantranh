import { AxiosRequestConfig } from 'axios'
import { Painting } from 'src/types/Painting.type'
import http from 'src/utils/http'

export type PaintingReqType = Partial<Omit<Painting, 'thumbnailUrl' | 'albumUrl' | 'topics'>>
export type PaintingResType = Omit<Painting, 'thumbnail' | 'album' | 'topicIds'>
export const addPainting = (body: FormData, config?: AxiosRequestConfig) =>
  http.post<PaintingResType>('/painting', body, config)
export const updatePainting = ({ body, id }: { body: FormData; id: number }, config?: AxiosRequestConfig) =>
  http.put<PaintingResType>(`/painting/${id}`, body, config)
export const getAllPainting = () => http.get<PaintingResType[]>('/painting')
export const deleteAllPainting = (body: number[]) =>
  http.delete<number>('/painting', {
    data: body
  })
export const getDetailPainting = (id: number) => http.get<PaintingResType>(`/painting/${id}`)
