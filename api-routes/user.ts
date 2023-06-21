import supabase from '@/lib/supabase-client'
import { uploadImage } from '@/utils/upload-image'

const getUser = async (id : string | undefined) => {

    if (!id) return

    const { data, error, status } = await supabase
        .from('users')
        .select()
        .eq('id', id)
        .single()
        
    return data
}

const editUser = async ({ id, username, image } : { id: string, username?: string, image?: File }) => {

    let profile_picture

    if (image) {
        const { publicUrl, error } = await uploadImage(image)
        if (!error) profile_picture = publicUrl
    }

    const { error, status } = await supabase
        .from('users')
        .update({ username, profile_picture })
        .eq('id', id)

    return { error, status }

}

export { getUser, editUser}