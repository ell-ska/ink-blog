'use client'
import { useRouter } from 'next/navigation'
import { deleteComment } from '@/api-routes/comments'

const DeleteButton = ({ id, type } : { id: string, type: string }) => {

    const router = useRouter()

    const handleDelete = async () => {
        await deleteComment({ id, type })
        router.refresh()
    }

    return (
        <button
            className="text-xs underline"
            onClick={handleDelete}
        >delete</button>
    )
}

export { DeleteButton }