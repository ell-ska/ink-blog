'use client'
import { useState } from 'react'
import Editor from '@/components/editor/Editor'
import createSlug from '@/utils/create-slug'

const Write = () => {

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        const slug = createSlug(title)
        console.log(slug)
    }

    return (
        <section className='flex flex-col gap-8 my-20 max-w-xl w-3/4'>
            <label className='flex flex-col gap-4'>
                title
                <input
                    className='input'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label className='flex flex-col gap-4'>
                cover image
                <input
                    className='input'
                />
            </label>
            <Editor/>
            <button
                className='button-big'
                onClick={(e) => handleSubmit(e)}
            >Upload</button>
        </section>
    )
}

export default Write