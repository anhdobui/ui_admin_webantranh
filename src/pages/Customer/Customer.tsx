import * as yup from 'yup'
import { useContext, useEffect, useState } from 'react'
import Note from 'src/component/Note'
import { ButtonOpenPopup, Popup, PopupContent } from 'src/component/PopupForm'
import TableView from 'src/component/TableView'
import { HeadingContext } from 'src/contexts/heading.context'
import { DataTableType } from 'src/types/DataTable.type'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  note: yup.string()
})
function Customer() {
  const { setHeading } = useContext(HeadingContext)
  useEffect(() => {
    setHeading('Khách hàng')
  }, [setHeading])
  const [dataTableInventory, setDataTableInventory] = useState<DataTableType>({
    label: {},
    dataRow: []
  })
  const [showPopupNote, setshowPopupNote] = useState(false)
  const data: DataTableType = {
    label: {
      fullname: 'Tên khách hàng',
      address: 'Địa chỉ',
      email: 'Email',
      sdt: 'Số điện thoại',
      grade: 'Điểm thành viên'
    },
    dataRow: [
      {
        fullname: 'Bui Anh Do',
        address: 'Thai Binh',
        email: 'anhdobui@gmail.com',
        sdt: '012345687',
        grade: '1524978',
        id: 1
      }
    ]
  }
  useEffect(() => {
    setDataTableInventory(data)
  }, [setDataTableInventory])
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  return (
    <div className='mt-5 rounded-lg border-2 border-dashed p-4 '>
      <TableView
        data={dataTableInventory}
        childrenAdd={false}
        childrenDelete={false}
        childrenEdit={
          <Popup
            title='Ghi chú'
            className='col-span-2 flex flex-wrap  items-center justify-start'
            showPopup={showPopupNote}
            setShowPopup={setshowPopupNote}
          >
            <ButtonOpenPopup
              className='mb-2 h-5 w-auto'
              labelBtn={
                <div className='flex items-center justify-center'>
                  <span className='ml-2 text-base text-blue-700 hover:underline'>Note</span>
                </div>
              }
            />
            <PopupContent>
              <Note register={register} name='note' />
              <button
                type='submit'
                className='mt-5 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                OK
              </button>
            </PopupContent>
          </Popup>
        }
      />
    </div>
  )
}

export default Customer
