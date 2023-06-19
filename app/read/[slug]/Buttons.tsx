'use client'
import { deletePost } from '@/api-routes/posts'
import { useRouter } from 'next/navigation'

const DeleteButton = ({ id } : { id: string }) => {

    const router = useRouter()

    const handleDelete = async () => {
        const { error, status } = await deletePost(id)

        if (error) {
            return console.log({ error, status })
        }

        router.push('/')
    }

    return (
        <button
            className='button-small bg-opacity-0'
            onClick={handleDelete}
        >delete</button>
    )
}

const EditButton = ({ slug } : { slug: string }) => {
    const router = useRouter()

    return <button className='button-small' onClick={() => {
        // router.prefetch(`/write/${slug}/edit`)
        router.push(`/write/${slug}/edit`)
    }}>edit</button>
}

export { DeleteButton, EditButton }