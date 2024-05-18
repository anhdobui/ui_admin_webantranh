import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { deletePainting, getAllPainting } from 'src/apis/product/painting.api'
import TableView from 'src/component/TableView'
import { DataTableType } from 'src/types/DataTable.type'

function ViewProduct() {
  const [dataTable, setDataTable] = useState<DataTableType>({
    label: {},
    dataRow: []
  })
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['paintings'],
    queryFn: () => getAllPainting(),
    cacheTime: 0
  })
  useEffect(() => {
    const dataTable: DataTableType = {
      label: {
        name: 'Tên tranh',
        thumbnail: 'Ảnh đại diện',
        topicName: 'Chủ đề',
        price: 'Giá',
        inventory: 'Tồn kho'
        // modifiedDate: 'Ngày cập nhật'
      },
      dataRow:
        data?.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            thumbnail: item.thumbnailUrl,
            topicName: item.topics.map((item) => item.title).join(','),
            price: item.price,
            inventory: item.inventory
            // modifiedDate:item.
          }
        }) || []
    }
    setDataTable(dataTable)
  }, [setDataTable, isLoading, data])
  const mutationDelete = useMutation({
    mutationFn: async (body: number[]) => await deletePainting(body),
    onSuccess: (num) => {
      queryClient.invalidateQueries(['paintings'])
      toast.success('Xóa thành công ' + num.data + ' sản phẩm')
    }
  })
  const onDelete = async (data: number[]): Promise<boolean> => {
    try {
      await mutationDelete.mutateAsync(data)
      return true
    } catch (error) {
      toast.error('Đã có lỗi xảy ra')
      return false
    }
  }
  return <TableView onDelete={onDelete} isLoading={isLoading} data={dataTable} buttonAdd='Thêm mới tranh' />
}

export default ViewProduct
