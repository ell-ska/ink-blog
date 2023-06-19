import Image from 'next/image'
import { DeleteButton } from './Buttons'
import { getUser } from '@/api-routes/user'
import { createTimestamp } from '@/utils/create-timestamp'
import image from 'public/profile-placeholder.svg'
import type { Reply as ReplyType } from '@/lib/type-collection'

interface ReplyProps extends ReplyType {
    post_author_id: string,
    current_user_id: string | undefined
}

const Reply = async ({ comment, created_at, author_id: reply_author_id, id: reply_id, post_author_id, current_user_id } : ReplyProps) => {

    const author = await getUser(reply_author_id)
    const timestamp = createTimestamp(created_at)

    return (
        <div className='flex flex-col mx-8'>
            <div className='flex gap-2 items-center mb-4'>
                <Image src={image} alt='profile picture' height={32}></Image>
                <span>{author?.email}</span>
                {post_author_id === reply_author_id && <span className='button-small text-xs leading-none py-1 px-2'>author</span>}
                <span className='text-xs leading-none text-dark-500'>{timestamp}</span>
            </div>
            <div className='flex justify-between'>
                <p className='leading-normal'>{comment}</p>
                {(reply_author_id === current_user_id || post_author_id === current_user_id) && <DeleteButton id={reply_id} type={'replies'} />}
            </div>
        </div>
    )
}

export default Reply