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
  return <TableView data={dataTableInventory} buttonAdd='Thêm mới đơn' childrenDelete={false} />
}

export default ViewInventory
