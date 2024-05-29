import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addPainting, getDetailPainting, updatePainting } from 'src/apis/product/painting.api'
import { addTopic, getTopics } from 'src/apis/topics/topic.api'
import { CheckboxData } from 'src/component/CheckBoxList/CheckBoxList'
import FormArtwork, { PaintingSubmitType } from 'src/component/FormProduct/FormArtwork'
import { ProductContext } from 'src/contexts/pageContexts/product.context'
import { TopicType } from 'src/types/Topic.type'

function FormProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dataTopics, setDataTopics] = useState<CheckboxData[]>([])
  const { setShowPopupForm } = useContext(ProductContext)
  const queryClient = useQueryClient()
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const mutationPainting = useMutation({
    mutationFn: (body: FormData) => {
      if (!id) {
        return addPainting(body, config)
      } else {
        return updatePainting({ body, id: Number(id) }, config)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paintings'] })
    }
  })
  const queryDetail = useQuery({
    queryKey: ['painting', id],
    queryFn: () => getDetailPainting(Number(id)),
    cacheTime: 0,
    staleTime: Infinity,
    select: (data) => ({
      id: data.data.id,
      name: data.data.name,
      length: data.data.length,
      width: data.data.width,
      thickness: data.data.thickness,
      inventory: data.data.inventory,
      price: data.data.price,
      thumbnailUrl: data.data.thumbnailUrl,
      albumUrl: data.data.albumUrl,
      topicIds: data.data.topics.map((item) => item.id)
    }),
    enabled: !!id
  })
  const queryTopics = useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
    cacheTime: 0,
    select: (data) => {
      return data.data.map((item) => ({
        id: item.id,
        label: item.title,
        isChecked: false
      }))
    }
  })
  useEffect(() => {
    if (queryTopics.data && queryDetail.data) {
      const updatedDataTopics = queryTopics.data.map((topic) => {
        const isChecked = queryDetail.data.topicIds.includes(topic.id)
        return { ...topic, isChecked }
      })
      setDataTopics(updatedDataTopics)
    } else if (queryTopics.data && !queryDetail.data) {
      setDataTopics(queryTopics.data)
    }
  }, [queryTopics.data, queryDetail.data, setDataTopics])
  const mutationTopic = useMutation({
    mutationFn: (body: Partial<TopicType>) => addTopic(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paintings'] })
    }
  })
  const handleAddTopic = (data: Partial<TopicType>) => {
    console.log(data)
    mutationTopic.mutate(data, {
      onSuccess: (data) => {
        toast.success('Thêm mới chủ đề ' + data.data.title + ' thành công')
        queryClient.invalidateQueries({ queryKey: ['topics'] })
      }
    })
    setShowPopupForm(false)
  }

  const onSubmit = (data: PaintingSubmitType) => {
    if (typeof data.topicIds === 'string') data.topicIds = [data.topicIds]
    console.log(data)
    const formData = new FormData()
    if (id) {
      formData.append('id', id)
    }
    // Thêm giá trị 'name'
    if (typeof data.name === 'string' && data.name) {
      formData.append('name', data.name)
    }

    // Thêm giá trị 'price'
    if (data.price) formData.append('price', data.price.toString())
    formData.append('inventory', (data.inventory ?? 0).toString())

    // Thêm giá trị 'length'
    if (data['length']) formData.append('length', data['length'].toString())

    // Thêm giá trị 'width'
    if (data.width) formData.append('width', data.width.toString())

    // Thêm giá trị 'thickness'
    if (data.thickness) formData.append('thickness', data.thickness.toString())

    // Thêm giá trị 'topicIds'
    if (Array.isArray(data.topicIds) && data.topicIds.length > 0) {
      const topicIdsString = data.topicIds.join(',')
      formData.append('topicIds', topicIdsString)
    }

    // Thêm giá trị 'thumbnail'
    if (data.thumbnail && Array.isArray(data.thumbnail) && data.thumbnail.length > 0) {
      formData.append('thumbnail', data.thumbnail[0])
    }

    if (data.album && Array.isArray(data.album) && data.album.length > 0) {
      data.album.forEach((file) => {
        if (file instanceof File) {
          formData.append(`album`, file)
        }
      })
    }

    mutationPainting.mutate(formData, {
      onSuccess: () => {
        if (!id) {
          toast.success('Thêm mới tranh thành công!')
        } else {
          toast.success('Cập nhật tranh thành công!')
        }
        queryClient.invalidateQueries(['paintings'])
        navigate('/product')
      }
    })
  }
  return (
    <FormArtwork
      dataTopics={dataTopics}
      defaultData={queryDetail.data}
      handleAddTopic={handleAddTopic}
      onSubmit={onSubmit}
    />
  )
}

export default FormProduct
