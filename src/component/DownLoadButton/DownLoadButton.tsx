import axios from 'axios'
import { toast } from 'react-toastify'

function DownloadButton() {
  const handleDownload = () => {
    axios
      .create({
        baseURL: 'http://localhost:3007/',
        responseType: 'blob' // Đảm bảo phản hồi được trả về dưới dạng blob
      })
      .get('download')
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'updated_excel_file.xlsx') // Tên tệp muốn tải xuống
        document.body.appendChild(link)
        link.click()
        link && link.parentNode && link.parentNode.removeChild(link)

        toast.info('Đang tải')
      })
      .catch((err) => {
        console.error(err)
        toast.error('Lỗi')
      })
  }

  return (
    <button
      onClick={handleDownload}
      className='inline-flex items-center rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400'
    >
      <svg className='mr-2 h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
        <path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z' />
      </svg>
      <span>Download</span>
    </button>
  )
}

export default DownloadButton
