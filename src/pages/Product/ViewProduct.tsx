import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import TableView from 'src/component/TableView'
import { DataTableType } from 'src/types/DataTable.type'

function ViewProduct() {
  const [dataTable, setDataTable] = useState<DataTableType>({
    label: {},
    dataRow: []
  })

  useEffect(() => {
    const dataTable: DataTableType = {
      label: {
        name: 'Tên tranh',
        thumbnail: 'Ảnh đại diện',
        topicName: 'Chủ đề',
        price: 'Giá',
        inventory: 'Tồn kho',
        createdDate: 'Ngày tạo',
        modifiedDate: 'Ngày sửa'
      },
      dataRow: [
        {
          id: 1,
          name: 'Tên tranh',
          thumbnail: 'Ảnh đại diện',
          topicName: 'Chủ đề',
          price: 'Giá',
          inventory: 'Tồn kho',
          createdDate: 'Ngày tạo',
          modifiedDate: 'Ngày sửa'
        }
      ]
    }
    setDataTable(dataTable)
  }, [])
  return <TableView data={dataTable} buttonAdd='Thêm mới tranh' />
}

export default ViewProduct
