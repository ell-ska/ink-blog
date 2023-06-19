import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type ImageEditorProps = {
    image: File | string | undefined,
    handleImageChange: (image: File | undefined) => void,
    onReset: () => void
}

const ImageEditor = ({ image, handleImageChange, onReset } : ImageEditorProps) => {

    const [previewUrl, setPreviewUrl] = useState(() => {
        if (!image) return undefined
        if (typeof image === 'string') return image
        return URL.createObjectURL(image)
    })
    const hiddenInput = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (!image) return setPreviewUrl(undefined)

        if (typeof image === 'string') {
            setPreviewUrl(image)
        } else {
            setPreviewUrl(URL.createObjectURL(image))
        }
    }, [image])

    const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.[0]) return console.log('error')
        const file = event.target.files[0]
        setPreviewUrl(URL.createObjectURL(file))
        handleImageChange(file)
    }

    const handleResetImage = () => {
        setPreviewUrl(undefined)
        onReset()
    }

    return (
        <div>
            <label className='flex flex-col gap-4'>
                cover image
                {previewUrl ? (
                    <div className='group relative'>
                        <Image
                            className='border-1 border-dark-900'
                            src={previewUrl}
                            alt='preview'
                            width={600}
                            height={600}
                        />
                        <div className='opacity-0 group-hover:opacity-100 flex absolute inset-0 justify-center items-center gap-2 bg-dark-900 bg-opacity-25 transition-opacity'>
                            <button
                                className='button-small'
                                onClick={() => {
                                    if (hiddenInput.current) hiddenInput.current.click()
                                }}
                            >edit</button>
                            <button
                                className='button-small bg-light'
                                onClick={handleResetImage}
                            >delete</button>
                        </div>
                    </div>
                ) : (
                    <label htmlFor="image-upload" className='input flex justify-center items-center h-56 cursor-pointer'>
                        <button className='button-small pointer-events-none'>upload</button>
                        <input
                            id="image-upload"
                            className='hidden'
                            type='file'
                            accept="image/*"
                            onChange={(e) => handleSelectImage(e)}
                        />
                    </label>
                )}
                <input
                    ref={hiddenInput}
                    className='hidden'
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSelectImage(e)}
                />
            </label>
        </div>
    )
}

export default ImageEditor