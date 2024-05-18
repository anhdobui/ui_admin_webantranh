import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { addTopic, deleteTopics, getTopics } from 'src/apis/topics/topic.api'
import FormTopic from 'src/component/FormProduct/FormTopic'
import { ButtonOpenPopup, Popup, PopupContent } from 'src/component/PopupForm'
import TableView from 'src/component/TableView'
import { DataTableType } from 'src/types/DataTable.type'
import { TopicType } from 'src/types/Topic.type'

function ViewCategory() {
  const [dataTableTopic, setDataTableTopic] = useState<DataTableType>({
    label: {
      title: 'Tên chủ đề',
      countPainting: 'Số tranh',
      createdDate: 'Ngày tạo',
      modifiedDate: 'Ngày sửa'
    },
    dataRow: []
  })

  const [showPopupAdd, setShowPopupAdd] = useState(false)
  const [showPopupEdit, setShowPopupEdit] = useState(false)
  const queryTopics = useQuery({
    queryKey: ['topics'],
    queryFn: () => getTopics(),
    cacheTime: 0,
    select: (data) => {
      return data.data.map((item) => ({
        id: item.id,
        title: item.title,
        countPainting: item.paintingIds.length,
        createdDate: '5/18/2024',
        modifiedDate: '5/18/2024'
      }))
    }
  })
  useEffect(() => {
    if (!queryTopics.isLoading) {
      setDataTableTopic((prev) => {
        const dataRow = queryTopics.data ?? []
        return { ...prev, dataRow: dataRow }
      })
    }
  }, [queryTopics.isLoading, setDataTableTopic, queryTopics.data])
  const mutationAdd = useMutation({
    mutationFn: async (body: Partial<TopicType>) => await addTopic(body),
    onSuccess: (num) => {
      queryClient.invalidateQueries(['topics'])
      toast.success('Thêm mới chủ đề ' + num.data.title + ' thành công')
    }
  })
  const handleAddTopic = (data: Partial<TopicType>) => {
    mutationAdd.mutate(data)
    setShowPopupAdd(false)
  }
  const queryClient = useQueryClient()
  const mutationDelete = useMutation({
    mutationFn: async (body: number[]) => await deleteTopics(body),
    onSuccess: (num) => {
      queryClient.invalidateQueries(['topics'])
      toast.success('Xóa thành công ' + num.data + ' chủ đề')
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
  return (
    <TableView
      isLoading={queryTopics.isLoading}
      data={dataTableTopic}
      buttonAdd='Thêm mới chủ đề'
      onDelete={onDelete}
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
    ></TableView>
  )
}

export default ViewCategory
