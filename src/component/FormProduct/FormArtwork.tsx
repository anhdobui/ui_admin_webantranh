import { SubmitHandler, useForm } from 'react-hook-form'
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
  name: yup.string().required('Bạn cần nhập tên cho tranh!'),
  inventory: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? 0 : value))
    .typeError('Tồn kho phải là 1 số'),
  price: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .typeError('Giá phải là 1 số'),
  length: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .typeError('Chiều dài phải là 1 số'),
  width: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .typeError('Chiều rộng phải là 1 số'),
  thickness: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .typeError('Độ dày phải là 1 số')
})
export type PaintingSubmitType = {
  [K in keyof PaintingReqType]: PaintingReqType[K] | null
}
interface FormArtworkInf {
  onSubmit: (data: PaintingSubmitType) => void
  handleAddTopic: (data: Partial<TopicType>) => void
  defaultData?: Partial<Painting>
  dataTopics?: CheckboxData[]
  isSubmitting?: boolean
}
function FormArtwork({ onSubmit, handleAddTopic, defaultData, dataTopics = [], isSubmitting = false }: FormArtworkInf) {
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
            type='text'
            className='col-span-2'
            placeholder='tồn kho'
            setValue={setValue}
            defaultValue={dataDetailPainting.inventory}
            errorMessage={errors?.inventory?.message}
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
              errorMessage={errors?.price?.message}
            />
            <Input
              label='Chiều rộng (cm)'
              register={register}
              name='width'
              type='text'
              className=''
              placeholder='100'
              setValue={setValue}
              defaultValue={dataDetailPainting.width}
              errorMessage={errors?.width?.message}
            />
            <Input
              label='Chiều dài (cm)'
              register={register}
              name='length'
              type='text'
              className=''
              placeholder='200'
              setValue={setValue}
              defaultValue={dataDetailPainting.length}
              errorMessage={errors?.length?.message}
            />
            <Input
              label='Độ dày (cm)'
              register={register}
              name='thickness'
              type='text'
              className=''
              placeholder='5'
              setValue={setValue}
              defaultValue={dataDetailPainting.thickness}
              errorMessage={errors?.thickness?.message}
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
              propsButton={{
                className:
                  'mb-2 h-11  flex-shrink-0 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
                labelBtn: 'Thêm chủ đề'
              }}
              childrenContent={
                <PopupContent>
                  <FormTopic onSubmit={handleAddTopic} />
                </PopupContent>
              }
            ></Popup>
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
        disabled={isSubmitting}
        className={`w-full rounded-lg ${
          isSubmitting
            ? 'bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
            : 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        }   px-5 py-2.5 text-center text-sm font-medium text-white  focus:outline-none focus:ring-4  sm:w-auto  `}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}

export default FormArtwork
