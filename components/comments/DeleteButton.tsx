'use client'
import { useRouter } from 'next/navigation'
import { deleteComment } from '@/api-routes/comments'

const DeleteButton = ({ id } : { id: string }) => {

    const router = useRouter()

    const handleDelete = async () => {
        await deleteComment(id)
        router.refresh()
    }

    return (
        <button
            className="text-xs underline self-end"
            onClick={handleDelete}
        >delete</button>
    )
}

export default DeleteButton