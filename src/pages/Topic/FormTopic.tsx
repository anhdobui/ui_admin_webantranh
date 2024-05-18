import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getDetailTopic, updateTopic } from 'src/apis/topics/topic.api'
import FormTopicCpn from 'src/component/FormProduct/FormTopic'
import { TopicType } from 'src/types/Topic.type'

const FormTopic = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutationUpdate = useMutation({
    mutationFn: (body: Partial<TopicType>) => updateTopic({ body, id: Number(id) }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['topics'])
      toast.success('Cập nhật chủ đề ' + data.data.title + ' thành công')
      navigate('/topic')
    }
  })
  const queryDetail = useQuery({
    queryKey: ['painting', id],
    queryFn: () => getDetailTopic(Number(id)),
    cacheTime: 0,
    select: (data) => {
      return data.data
    }
  })
  const onSubmit = (data: Partial<TopicType>) => {
    mutationUpdate.mutate(data)
  }
  return (
    <div className=''>
      <FormTopicCpn defaultData={queryDetail.data} onSubmit={onSubmit} />
    </div>
  )
}

export default FormTopic
