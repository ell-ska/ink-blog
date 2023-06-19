'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Send } from 'lucide-react'
import { addReply } from '@/api-routes/comments'
import type { Session } from '@supabase/supabase-js'

type CommentActionsType = {
    session: Session | null,
    comment_id: string
    authorEmail: string | undefined
}

const NewReply = ({ session, comment_id, authorEmail } : CommentActionsType ) => {

    const router = useRouter()
    const [comment, setComment] = useState('')

    const submitReply = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        if (!comment || !session) return

        const { error, status } = await addReply({ author_id: session.user.id, comment, comment_id })

        if (error) {
            return console.log(error, status)
        }

        setComment('')
        router.refresh()
    }

    if (!session) return null

    return (
        <form
            className='flex gap-2 w-full justify-between mt-4'
            onSubmit={(e) => submitReply(e)}
        >
            <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className='w-full outline-none'
                type="text"
                placeholder={`reply to ${authorEmail}`}
            />
            <button>
                <Send />
            </button>
        </form>
    )
}

export default NewReply