import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import FormTopic from 'src/component/FormProduct/FormTopic'
import { ButtonOpenPopup, Popup, PopupContent } from 'src/component/PopupForm'
import TableView from 'src/component/TableView'
import { DataTableType } from 'src/types/DataTable.type'
import { TopicInf } from 'src/types/Topic.type'

function ViewCategory() {
  const [dataTableCategory, setDataTableCategory] = useState<DataTableType>({
    label: {},
    dataRow: []
  })
  const data: DataTableType = {
    label: {
      name: 'Tên tập tranh',
      countArtworks: 'Số tranh',
      createdDate: 'Ngày tạo',
      modifiedDate: 'Ngày sửa'
    },
    dataRow: [
      {
        name: 'abc',
        countArtworks: '5',
        createdDate: '5/13/2024',
        modifiedDate: '5/13/2024'
      }
    ]
  }
  const [showPopupAdd, setShowPopupAdd] = useState(false)
  const [showPopupEdit, setShowPopupEdit] = useState(false)
  useEffect(() => {
    setDataTableCategory(data)
  }, [])
  const handleAddTopic = (data: TopicInf) => {
    console.log(data)
    toast.success('Thêm mới chủ đề ' + data.title + ' thành công')
    setShowPopupAdd(false)
  }
  const handleEditTopic = (data: TopicInf) => {
    console.log(data)
    toast.success('Sửa chủ đề ' + data.title + ' thành công')
    setShowPopupEdit(false)
  }
  return (
    <TableView
      data={dataTableCategory}
      buttonAdd='Thêm mới chủ đề'
      childrenAdd={
        <Popup
          title='Thêm mới chủ đề'
          className='col-span-2 flex flex-wrap  items-center justify-end'
          showPopup={showPopupAdd}
          setShowPopup={setShowPopupAdd}
        >
          <ButtonOpenPopup
            className='mb-2 h-11  flex-shrink-0 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
            labelBtn='Thêm mới chủ đề'
          />
          <PopupContent>
            <FormTopic onSubmit={handleAddTopic} />
          </PopupContent>
        </Popup>
      }
      childrenEdit={
        <Popup
          title='Sửa chủ đề'
          className='col-span-2 flex flex-wrap  items-center '
          showPopup={showPopupEdit}
          setShowPopup={setShowPopupEdit}
        >
          <ButtonOpenPopup
            className='justify-items-start font-medium text-blue-600 hover:underline dark:text-blue-500'
            labelBtn='Edit'
          />
          <PopupContent>
            <FormTopic defaultData={{ title: 'chu de 1', description: 'day la mo ta' }} onSubmit={handleEditTopic} />
          </PopupContent>
        </Popup>
      }
    ></TableView>
  )
}

export default ViewCategory
