'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addComment } from '@/api-routes/comments'

const NewComment = ({ post_id, author_id } : { post_id: string, author_id: string }) => {

    const router = useRouter()
    const [comment, setComment] = useState('')

    const handleAddComment = async () => {
        const { error, status } = await addComment({ post_id, author_id, comment })

        if (error) {
            return console.log({ error, status })
        }

        setComment('')
        router.refresh()
    }

    return (
        <div className="flex flex-col">
            <h3 className="font-bold text-2xl leading-none mb-6">comment</h3>
            <textarea
                className="input min-h-[12.5rem] text-xl leading-8 resize-none mb-8 placeholder:text-dark-500"
                placeholder="be nice..."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
            />
            <button
                className="button-big"
                onClick={handleAddComment}
            >submit</button>
        </div>
    )
}

export default NewComment