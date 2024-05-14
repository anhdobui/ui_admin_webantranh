import Grid from '../Grid/Grid'
interface MaskInputFileInf {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  multiple: boolean
}
function MaskInputFile({ images, setImages, multiple }: MaskInputFileInf) {
  const renderImage = () => {
    return (
      <>
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Uploaded ${index}`}
            className='h-auto max-h-[200px] w-auto object-cover'
          />
        ))}
      </>
    )
  }
  const renderMultiImage = () => {
    return (
      <Grid className='p-5'>
        {images.map((imageUrl, index) => (
          <div key={index} className='col-span-2 flex items-center justify-center'>
            <img src={imageUrl} alt={`Uploaded ${index}`} className='h-auto max-h-[200px] w-auto object-cover' />
          </div>
        ))}
      </Grid>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center pb-6 pt-5'>
      {images.length > 0 ? (
        multiple ? (
          renderMultiImage()
        ) : (
          renderImage()
        )
      ) : (
        <>
          <svg
            aria-hidden='true'
            className='mb-3 h-10 w-10 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
            />
          </svg>
          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
            <span className='font-semibold'>Click to upload</span> or drag and drop
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </>
      )}
    </div>
  )
}

export default MaskInputFile
