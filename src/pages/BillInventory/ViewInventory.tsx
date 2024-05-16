import { useEffect, useState } from 'react'
import { ButtonOpenPopup, Popup, PopupContent } from 'src/component/PopupForm'
import TableView from 'src/component/TableView'
import { DataTableType } from 'src/types/DataTable.type'

function ViewInventory() {
  const [dataTableInventory, setdataTableInventory] = useState<DataTableType>({
    label: {},
    dataRow: []
  })
  const data: DataTableType = {
    label: {
      code: 'Mã đơn nhập',
      dateAdded: 'Ngày nhập'
    },
    dataRow: [
      {
        code: 'abc',
        dateAdded: '5/13/2024',
        id: 5
      }
    ]
  }
  const [showPopupDetail, setShowPopupDetail] = useState(false)
  useEffect(() => {
    setdataTableInventory(data)
  }, [setdataTableInventory])
  return (
    <TableView
      data={dataTableInventory}
      buttonAdd='Thêm mới đơn'
      childrenDelete={false}
      childrenEdit={
        <Popup
          title='Chi tiết đơn nhập'
          className='col-span-2 flex flex-wrap  items-center justify-start'
          showPopup={showPopupDetail}
          setShowPopup={setShowPopupDetail}
        >
          <ButtonOpenPopup
            className='mb-2 h-5 w-auto'
            labelBtn={
              <div className='flex items-center justify-center'>
                <span className='ml-2 text-base text-blue-700 hover:underline'>Detail</span>
              </div>
            }
          />
          <PopupContent>
            <h1>s</h1>
          </PopupContent>
        </Popup>
      }
    />
  )
}

export default ViewInventory
