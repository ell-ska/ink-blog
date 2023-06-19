import Image from 'next/image'
import image from 'public/profile-placeholder.svg'
import { getUser } from '@/api-routes/user'
import { createTimestamp } from '@/utils/create-timestamp'
import DeleteButton from './DeleteButton'
import type { Comment as CommentType } from '@/lib/type-collection'
import type { Session } from '@supabase/supabase-js'

interface CommentProps extends CommentType { session: Session | null, postAuthorId: string }

const Comment = async ({ author_id, comment, created_at, id, session, postAuthorId } : CommentProps) => {

    const user = await getUser(author_id)
    const timestamp = createTimestamp(created_at)

    return (
        <div className='flex flex-col border-1 border-dark-900 p-8'>
            <div className='flex gap-2 items-center mb-4'>
                <Image src={image} alt='profile picture' height={32}></Image>
                <span>{user?.email}</span>
                {postAuthorId === author_id && <span className='button-small text-xs leading-none'>author</span>}
                <span className='text-xs leading-none text-dark-500'>{timestamp}</span>
            </div>
            <p className='text-xl leading-relaxed'>{comment}</p>
            {(author_id === session?.user.id || postAuthorId === session?.user.id) && <DeleteButton id={id}/>}
        </div>
    )
}

export default Comment