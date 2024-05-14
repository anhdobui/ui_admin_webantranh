import { useLocation, useParams } from 'react-router-dom'
import FormArtwork from 'src/component/FormProduct/FormArtwork'

function FormProduct() {
  const { id } = useParams()
  return (
    <>
      <FormArtwork id={Number(id)} />
    </>
  )
}

export default FormProduct
