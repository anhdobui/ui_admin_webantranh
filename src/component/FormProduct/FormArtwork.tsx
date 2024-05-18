import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Input from '../Input'
import InputFile from '../InputFile'
import { useContext, useEffect, useState } from 'react'
import CheckboxList, { CheckboxData } from '../CheckBoxList/CheckBoxList'
import Note from '../Note'
import Grid from '../Grid/Grid'
import { ButtonOpenPopup, Popup, PopupContent } from '../PopupForm/PopupForm'
import FormTopic from './FormTopic'
import { PaintingReqType } from 'src/apis/product/painting.api'
import { ProductContext } from 'src/contexts/pageContexts/product.context'
import { Painting } from 'src/types/Painting.type'
import { TopicType } from 'src/types/Topic.type'

const initDataDetailPainting: Partial<Painting> = {}
const paintingBaseSchema = yup.object().shape({
  name: yup.string().required('Bạn cần nhập tên cho tranh!')
})

const dataTopics = [
  { id: 1, label: 'Chủ đề 1', isChecked: false },
  { id: 2, label: 'Chủ đề 2', isChecked: true },
  { id: 3, label: 'Chủ đề 3', isChecked: false },
  { id: 4, label: 'Chủ đề 4', isChecked: false },
  { id: 5, label: 'Chủ đề 5', isChecked: false },
  { id: 6, label: 'Chủ đề 6', isChecked: false }
]

interface FormArtworkInf {
  onSubmit: (data: PaintingReqType) => void
  handleAddTopic: (data: Partial<TopicType>) => void
  defaultData?: Partial<Painting>
  dataTopics?: CheckboxData[]
}
function FormArtwork({ onSubmit, handleAddTopic, defaultData, dataTopics = [] }: FormArtworkInf) {
  const { showPopupForm, setShowPopupForm } = useContext(ProductContext)
  const [dataDetailPainting, setDataDetailPainting] = useState<Partial<Painting>>(initDataDetailPainting)
  useEffect(() => {
    if (defaultData) {
      setDataDetailPainting(defaultData)
    }
  }, [setDataDetailPainting, defaultData])
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(paintingBaseSchema)
  })

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
            setValue={setValue}
            defaultValue={dataDetailPainting.name}
          />
          <Input
            label='Tồn kho'
            register={register}
            name='inventory'
            type='number'
            className='col-span-2'
            placeholder='tồn kho'
            setValue={setValue}
            defaultValue={dataDetailPainting.inventory}
          />
          <Grid className='col-span-6' cols={4}>
            <Input
              label='Giá tiền'
              register={register}
              name='price'
              type='text'
              className=''
              placeholder='1000$'
              setValue={setValue}
              defaultValue={dataDetailPainting.price}
            />
            <Input
              label='Chiều rộng (cm)'
              register={register}
              name='width'
              type='number'
              className=''
              placeholder='100'
              setValue={setValue}
              defaultValue={dataDetailPainting.width}
            />
            <Input
              label='Chiều dài (cm)'
              register={register}
              name='length'
              type='number'
              className=''
              placeholder='200'
              setValue={setValue}
              defaultValue={dataDetailPainting.length}
            />
            <Input
              label='Độ dày (cm)'
              register={register}
              name='thickness'
              type='number'
              className=''
              placeholder='5'
              setValue={setValue}
              defaultValue={dataDetailPainting.thickness}
            />
          </Grid>

          <CheckboxList
            data={dataTopics}
            register={register}
            name='topicIds'
            label='Chọn chủ đề'
            className='col-span-6 row-span-3'
            maxCol={3}
          >
            <Popup
              title='Thêm mới chủ đề tranh'
              className='col-span-2 flex flex-wrap  items-center justify-end'
              showPopup={showPopupForm}
              setShowPopup={setShowPopupForm}
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
            defaultImages={dataDetailPainting.albumUrl}
          />
        </Grid>
        <Grid className='grid-auto-rows col-span-2' gap={0} rowHeight='130px'>
          <InputFile
            setValue={setValue}
            register={register}
            label='Ảnh đại diện'
            name='thumbnail'
            className='col-span-6 row-span-2'
            defaultImages={dataDetailPainting.thumbnailUrl ? [dataDetailPainting.thumbnailUrl] : undefined}
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
        onClick={handleSubmit(onSubmit)}
        type='submit'
        className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Submit
      </button>
    </form>
  )
}

export default FormArtwork
