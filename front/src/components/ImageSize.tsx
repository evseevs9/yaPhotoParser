import { FC, useEffect, useState } from 'react'

interface ImageSizeProps {
  url: string
}

interface ImageSizeData {
  w: number
  h: number
  correct?: boolean
}

const ImageSize: FC<ImageSizeProps> = ({ url }) => {
  const [imageSize, setImageSize] = useState<ImageSizeData>()

  useEffect(() => {
    const image = new Image()
    image.src = url

    image.onload = () => {
      const w = image.naturalWidth
      const h = image.naturalHeight
      const correct = w >= 600 && w <= 2000 && h >= 600 && h <= 2000

      setImageSize({ w, h, correct })
    }

    return () => {
      image.src = ''
    }
  }, [url])

  const className = `image-size ${!imageSize?.correct ? 'size-incorrect' : ''}`
  return (
    <h4 className={className}>
      {imageSize && `[${imageSize.w}x${imageSize.h}]`}
    </h4>
  )
}

export default ImageSize
