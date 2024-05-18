import FormTopic from 'src/component/FormProduct/FormTopic'
import { TopicType } from 'src/types/Topic.type'

const FormCategory = () => {
  // const { register, handleSubmit, watch, setValue } = useForm<FormValues>()
  // const onSubmit = (data: any) => {
  // 	data.code = data.name.split(' ').join('-')
  // 	console.log(data.code)
  // }
  const onSubmit = (data: Partial<TopicType>) => {
    console.log(data)
  }
  return (
    <div className=''>
      <FormTopic onSubmit={onSubmit} />
    </div>
  )
}

export default FormCategory
