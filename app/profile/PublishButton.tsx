'use client'
import { editPost } from '@/api-routes/posts'

const PublishButton = ({ id } : { id: string }) => {

    const publishPost = async () => {
        await editPost({ id, published: true })
    }

    return (
        <button
            className='grid place-items-center absolute inset-0 bg-dark-900 bg-opacity-75'
            onClick={publishPost}
        >
            <span className="button-small text-light border-light bg-opacity-0">publish</span>
        </button>
    )
}

export default PublishButton