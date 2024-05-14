import { nanoid } from 'nanoid'
import React, { useState, useEffect } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import Grid from '../Grid/Grid'
import MaskInputFile from './MaskInputFile'

interface InputFileInfer {
  className?: string
  label: string
  name: string
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
  multiple?: boolean
}

function InputFile({ className, label, register, setValue, name, multiple = false }: InputFileInfer) {
  const id = nanoid()
  const [images, setImages] = useState<string[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages: string[] = []
      const newSelectedFiles: File[] = Array.from(files)

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader()

        reader.onloadend = () => {
          newImages.push(reader.result as string)
          if (newImages.length === files.length) {
            setImages((prevImages) => [...prevImages, ...newImages])
            setSelectedFiles((prevFiles) => [...prevFiles, ...newSelectedFiles])
          }
        }

        reader.readAsDataURL(files[i])
      }
    }
  }

  // Sử dụng useEffect để cập nhật giá trị của field trong form
  useEffect(() => {
    setValue(name, selectedFiles)
  }, [selectedFiles, setValue, name])

  return (
    <div className={className}>
      <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white' htmlFor={id}>
        {label}
      </label>
      <div className='flex w-full items-center justify-center'>
        <label
          htmlFor={id}
          className={`${
            images.length > 0 ? 'justify-left' : 'justify-center'
          } dark:hover:bg-bray-800 flex h-auto min-h-64 w-full cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
        >
          <MaskInputFile images={images} multiple={multiple} setImages={setImages} />
          <input
            id={id}
            {...register(name)}
            type='file'
            multiple={multiple}
            onChange={handleImageChange}
            className='hidden'
          />
        </label>
      </div>
    </div>
  )
}

export default InputFile
