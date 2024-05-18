import { TopicType } from 'src/types/Topic.type'
import http from 'src/utils/http'

export const getTopics = () => http.get<TopicType[]>('/topic')
export const addTopic = (body: Partial<TopicType>) => http.post<TopicType>('/topic', body)
export const deleteTopics = (body: number[]) =>
  http.delete<number>('/topic', {
    data: body
  })
export const updateTopic = ({ body, id }: { body: Partial<TopicType>; id: number }) =>
  http.put<TopicType>(`/topic/${id}`, body)
export const getDetailTopic = (id: number) => http.get<TopicType>(`/topic/${id}`)
