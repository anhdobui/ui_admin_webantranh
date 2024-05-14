import { Control, FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Input from '../Input'
import Select from '../Select'
import InputFile from '../InputFile'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { editArtwork, getArtwork, getDetailArtwork, postArtwork } from 'src/apis/product/artwork.api'
import { useEffect, useState } from 'react'
import CheckboxList from '../CheckBoxList/CheckBoxList'
import Note from '../Note'
import Grid from '../Grid/Grid'
import { ButtonOpenPopup, Popup, PopupContent } from '../PopupForm/PopupForm'
import Editor from '../Editor'
import FormTopic from './FormTopic'
import { toast } from 'react-toastify'

// type DataType = {
// 	album: string[]
// 	categoryid: string
// 	height: string
// 	name: string
// 	price: string
// 	thumbnail: string
// 	width: string
// }
// const initialFormData: DataType = {
// 	album: [],
// 	categoryid: '',
// 	"length": '',
// 	name: '',
// 	price: '',
// 	thumbnail: '',
// 	width: ''
// }
type DataDetailArtwType = {
  name: string
  price: string
  categoryid: string
  width: string
  length: string
  thickness: string
}
const initDataDetailArtw: DataDetailArtwType = {
  name: '',
  price: '',
  categoryid: '',
  width: '',
  length: '',
  thickness: ''
}
const schema = yup
  .object({
    name: yup.string().required('Bạn cần nhập tên cho tranh!')
  })
  .required()
const dataTopics = [
  { id: 1, label: 'Chủ đề 1', isChecked: false },
  { id: 2, label: 'Chủ đề 2', isChecked: true },
  { id: 3, label: 'Chủ đề 3', isChecked: false },
  { id: 4, label: 'Chủ đề 4', isChecked: false },
  { id: 5, label: 'Chủ đề 5', isChecked: false },
  { id: 6, label: 'Chủ đề 6', isChecked: false }
]
function FormArtwork({ id }: { id?: number }) {
  const [showPopup, setShowPopup] = useState(false)
  const [dataCat, setDataCat] = useState([])
  const [dataDetailArtw, setDataDetailArtw] = useState<DataDetailArtwType>(initDataDetailArtw)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  const handleAddTopic = (data: { description?: string | undefined; title: string }) => {
    console.log(data)
    toast.success('Thêm mới chủ đề ' + data.title + ' thành công')
    setShowPopup(false)
  }
  return (
    <form>
      <Grid className='mb-6'>
        <Grid className='col-span-4'>
          <Input
            errorMessage={errors?.name?.message}
            label='Tên tranh'
            register={register}
            name='name'
            type='text'
            className='col-span-4'
            placeholder='Mona Lisa'
          />
          <Input
            label='Tồn kho'
            register={register}
            name='inventory'
            type='number'
            className='col-span-2'
            placeholder='tồn kho'
          />
          <Grid className='col-span-6' cols={4}>
            <Input label='Giá tiền' register={register} name='price' type='text' className='' placeholder='1000$' />
            <Input
              label='Chiều rộng (cm)'
              register={register}
              name='width'
              type='number'
              className=''
              placeholder='100'
            />
            <Input
              label='Chiều dài (cm)'
              register={register}
              name='length'
              type='number'
              className=''
              placeholder='200'
            />
            <Input
              label='Độ dày (cm)'
              register={register}
              name='thickness'
              type='number'
              className=''
              placeholder='5'
            />
          </Grid>

          <CheckboxList
            data={dataTopics}
            register={register}
            name='topics'
            label='Chọn chủ đề'
            className='col-span-6 row-span-3'
            maxCol={3}
          >
            <Popup
              title='Thêm mới chủ đề tranh'
              className='col-span-2 flex flex-wrap  items-center justify-end'
              showPopup={showPopup}
              setShowPopup={setShowPopup}
            >
              <ButtonOpenPopup
                className='mb-2 h-11  flex-shrink-0 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                labelBtn='Thêm chủ đề'
              />
              <PopupContent>
                <FormTopic onSubmit={handleAddTopic} />
              </PopupContent>
            </Popup>
          </CheckboxList>

          <InputFile
            setValue={setValue}
            multiple
            register={register}
            label='Album ảnh'
            name='album'
            className='col-span-6'
          />
        </Grid>
        <Grid className='grid-auto-rows col-span-2' gap={0} rowHeight='130px'>
          <InputFile
            setValue={setValue}
            register={register}
            label='Ảnh đại diện'
            name='thumbnail'
            className='col-span-6 row-span-2'
          />
          <Note
            label='Ghi chú'
            register={register}
            name='note'
            className='col-span-6 row-span-1'
            placeholder='Ghi chú'
          />
        </Grid>
      </Grid>
      <button
        onClick={onSubmit}
        type='submit'
        className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Submit
      </button>
    </form>
  )
}

export default FormArtwork
