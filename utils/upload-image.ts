import supabase from '@/lib/supabase-client'

const uploadImage = async (image: File) => {
    const fullImageName = image.name.split('.')
    const newImageName = `${fullImageName[0]}-${Math.random()}.${fullImageName[1]}`

    const { data, error } = await supabase
        .storage
        .from('images')
        .upload(newImageName, image, {
            cacheControl: '3600',
            upsert: false
        })

    if (error) return { error }

    const { data: { publicUrl } } = supabase
        .storage
        .from('images')
        .getPublicUrl(data.path)

    return { publicUrl, error: false }
}

export { uploadImage }