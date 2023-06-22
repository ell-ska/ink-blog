'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { addPost, editPost } from '@/api-routes/posts'
import createSlug from '@/utils/create-slug'
import ImageEditor from './ImageEditor'
import ContentEditor from './ContentEditor'

type BlogEditorProps = {
    postId?: string,
    defaultTitle?: string | null,
    defaultBody?: string | null,
    defaultImage?: File | string | undefined,
    buttons: string[]
}

const BlogEditor = ({ postId, defaultTitle, defaultBody, defaultImage, buttons } : BlogEditorProps) => {

    const router = useRouter()
    const supabase = createClientComponentClient()

    const [title, setTitle] = useState(defaultTitle || '')
    const [image, setImage] = useState(defaultImage || undefined)
    const [body, setBody] = useState(defaultBody || '')

    const handleBodyChange = (content: string) => {
        setBody(content)
    }

    const handleImageChange = (image: File | undefined) => {
        setImage(image)
    }

    const createPost = async (type: string) => {
        const { data: { session} } = await supabase.auth.getSession()
        if (!session) return console.log({ error: 'no session' })

        const slug = createSlug(title)
        const published = type === 'publish'
        const newImage = typeof image === 'object' ? image : undefined

        const { error, status } = await addPost({ title, slug, body, user_id: session.user.id, published, image: newImage })

        if (error) {
            return console.log({ error, status })
        }

        router.prefetch('/read')
        router.push(`/read/${slug}`)
    }

    const updatePost = async () => {
        const slug = createSlug(title)

        if (!postId) return console.log({ error: 'no post found with that id' })
        const newImage = typeof image === 'object' ? image : undefined

        const { error, status } = await editPost({ id: postId, title, slug, body, image: newImage })

        if (error) {
            return console.log({ error, status })
        }

        router.prefetch(`/read/${slug}`)
        router.prefetch('/read')
        router.push(`/read/${slug}`)
    }

    return (
        <section className='flex flex-col gap-8 my-20 max-w-xl w-3/4'>
            <label htmlFor='title' className='flex flex-col gap-4'>
                <span>title</span>
                <input
                    id='title'
                    className='input'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label className='flex flex-col gap-4'>
                <span>cover image</span>
                <ImageEditor
                    image={image}
                    handleImageChange={handleImageChange}
                    onReset={() => setImage(undefined)}
                />
            </label>
            <ContentEditor
                body={body}
                handleBodyChange={handleBodyChange}
            />
            <div className='flex flex-col gap-4'>
                {buttons.map(type => {

                    const styles = type === 'save' ? 'button-big bg-opacity-0' : 'button-big'

                    return (
                        <button
                            key={type}
                            className={styles}
                            onClick={() => type === 'update' ? updatePost() : createPost(type)}
                        >{type}</button>
                    )
                })}
            </div>
        </section>
    )
}

export default BlogEditor