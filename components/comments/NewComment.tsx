'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Send } from 'lucide-react'
import { addComment } from '@/api-routes/comments'

const NewComment = ({ post_id, current_user_id } : { post_id: string, current_user_id: string }) => {

    const router = useRouter()
    const [comment, setComment] = useState('')

    const handleAddComment = async () => {
        const { error, status } = await addComment({ post_id, author_id: current_user_id, comment })

        if (error) {
            return console.log({ error, status })
        }

        setComment('')
        router.refresh()
    }

    return (
        <form
            className="flex flex-col"
            onSubmit={handleAddComment}
        >
            <label htmlFor='comment' className="font-bold text-2xl leading-none mb-6">comment</label>
            <div className='input flex justify-between'>
                <input
                    id='comment'
                    className="outline-none w-full"
                    placeholder="be nice..."
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                />
                <button className="">
                    <Send />
                </button>
            </div>
        </form>
    )
}

export default NewComment