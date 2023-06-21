import Image from 'next/image'
import Link from 'next/link'
import PublishButton from '@/app/profile/PublishButton'
import { getUser } from '@/api-routes/user'
import type { Post } from '@/lib/type-collection'

interface GalleryItemProps extends Post { isProfile: boolean }

const GalleryItem = async ({ title, cover_image, slug, user_id, published, isProfile, id } : GalleryItemProps ) => {

    const user = await getUser(user_id)

    return (
        <Link href={`/read/${slug}`}>
            {cover_image ? (
                <div className='relative'>
                    <Image
                        className='aspect-square object-cover border-1 border-dark-900'
                        src={cover_image}
                        alt=''
                        width={664}
                        height={664}
                    ></Image>
                    {(isProfile && !published) && <PublishButton id={id}/>
                    }
                </div>
            ) : (
                <div className='aspect-square w-full border-1 border-dark-900 bg-accent'></div>
            )}
            {!isProfile && <h3 className='text-xs font-bold mt-5'>{user?.email}</h3>}
            <h2 className={`text-xl ${isProfile ? 'mt-8' : 'mt-1'}`}>{title}</h2>
        </Link>
    )
}

export default GalleryItem