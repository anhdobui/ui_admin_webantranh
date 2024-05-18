import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../Input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Editor from '../Editor/Editor'
import { toast } from 'react-toastify'
import { TopicType } from 'src/types/Topic.type'
const schema = yup.object().shape({
  title: yup.string().required('Bạn cần nhập tên chủ đề'),
  description: yup.string()
})

function FormTopic({
  onSubmit,
  defaultData = { title: '', description: '' }
}: {
  onSubmit: (data: Partial<TopicType>) => void
  defaultData?: { title: string; description: string }
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmitForm = handleSubmit((data) => {
    onSubmit(data)
  })
  return (
    <form onSubmit={onSubmitForm}>
      <div className='mb-6 grid md:grid-cols-6'>
        <Input
          errorMessage={errors?.title?.message}
          label='Tên chủ đề'
          register={register}
          name='title'
          type='text'
          className='col-span-6'
          placeholder='Paintings'
          setValue={setValue}
          defaultValue={defaultData.title}
        />
        <Editor
          errorMessage={errors?.description?.message}
          label='Nội dung'
          register={register}
          name='description'
          rows={6}
          className='col-span-6'
          placeholder='Mô tả'
          value={defaultData.description}
        />
      </div>
      <button
        type='submit'
        className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Submit
      </button>
    </form>
  )
}

export default FormTopic
