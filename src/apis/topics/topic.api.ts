import { TopicType } from 'src/types/Topic.type'
import http from 'src/utils/http'

export const getAllTopic = () => http.get<TopicType[]>('/topic')
export const addTopic = (body: Partial<TopicType>) => http.post<TopicType>('/topic', body)
