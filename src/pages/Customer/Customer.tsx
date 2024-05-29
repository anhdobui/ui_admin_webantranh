import * as yup from 'yup'
import { useContext, useEffect, useState } from 'react'
import Note from 'src/component/Note'
import { ButtonOpenPopup, Popup, PopupContent } from 'src/component/PopupForm'
import TableView from 'src/component/TableView'
import { HeadingContext } from 'src/contexts/heading.context'
import { DataTableType } from 'src/types/DataTable.type'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { getCustomers } from 'src/apis/customer.api'

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
  const queryCustomer = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers(),
    select: (data) =>
      data.data.map((item) => ({
        id: item.id,
        email: item.email,
        sdt: item.phone,
        grade: item.grade,
        fullname: item.fullname,
        address: 'Hà Đông,Hà Nội'
      }))
  })
  console.log(queryCustomer.data)
  const [showPopupNote, setshowPopupNote] = useState(false)
  // const data: DataTableType = {
  //   label: {
  //     fullname: 'Tên khách hàng',
  //     address: 'Địa chỉ',
  //     email: 'Email',
  //     sdt: 'Số điện thoại',
  //     grade: 'Điểm thành viên'
  //   },
  //   dataRow: [

  //   ]
  // }
  useEffect(() => {
    queryCustomer.data &&
      setDataTableInventory({
        dataRow: queryCustomer.data,
        label: {
          fullname: 'Tên khách hàng',
          address: 'Địa chỉ',
          email: 'Email',
          sdt: 'Số điện thoại',
          grade: 'Điểm thành viên'
        }
      })
  }, [queryCustomer.data, setDataTableInventory])
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
      <TableView data={dataTableInventory} childrenAdd={false} childrenDelete={false} />
    </div>
  )
}

export default Customer
