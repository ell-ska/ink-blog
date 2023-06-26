'use client'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import FocusTrap from 'focus-trap-react'
import placeholder from 'public/profile-placeholder.svg'
import type { User } from '@/lib/type-collection'
import { editUser } from '@/api-routes/user'
import ImageEditor from '@/components/editor/ImageEditor'

const ProfileDetails = ({ username: currentUsername, profile_picture, id } : User ) => {

    const router = useRouter()
    const supabase = createClientComponentClient()

    const [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState(currentUsername || '')
    const [image, setImage] = useState<File | undefined>(undefined)

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
        router.push('/')
    }

    const handleSubmitChanges = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await editUser({ id, image, username })
        setIsOpen(false)
        router.refresh()
    }

    return (
        <section className='flex gap-8 items-center max-w-2xl w-3/4 mt-20'>
            <div className='overflow-hidden rounded-full aspect-square'>
                <Image src={profile_picture || placeholder} alt='profile picture' height={80} width={80}></Image>
            </div>
            <h3 className='text-xl flex-auto'>{currentUsername}</h3>
            <div className='justify-self-end flex gap-2'>
                <button className='button-small' onClick={() => setIsOpen(true)}>edit profile</button>
                <button className='button-small bg-opacity-0' onClick={handleSignOut}>log out</button>
            </div>
            {isOpen && createPortal(
                <FocusTrap>
                    <div
                        className='fixed inset-0 flex justify-center items-center bg-dark-900 bg-opacity-25'
                        onClick={() => setIsOpen(false)}
                    >
                        <form
                            className='flex flex-col gap-8 max-w-md w-2/3 p-8 bg-light border-1 border-dark-900'
                            onSubmit={e => handleSubmitChanges(e)}
                            onClick={e => e.stopPropagation()}
                            onKeyDown={e => e.key === 'Escape' ? setIsOpen(false) : null}
                            autoComplete='off'
                        >
                            <label className='flex flex-col gap-4'>
                                <span>new username</span>
                                <input
                                    className='input'
                                    type="text" 
                                    placeholder={currentUsername}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </label>
                            <label className='flex flex-col gap-4'>
                                <span>new profile picture</span>
                                <ImageEditor
                                    handleImageChange={image => setImage(image)}
                                    image={profile_picture || undefined}
                                    onReset={() => setImage(undefined)}
                                ></ImageEditor>
                            </label>
                            <button type='submit' className='button-small self-end'>save changes</button>
                        </form>
                    </div>
                </FocusTrap>,
                document.getElementById('module') as Element

            )}
        </section>
    )
}

export default ProfileDetails