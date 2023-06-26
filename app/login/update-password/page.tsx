'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const UpdatePassword = () => {

    const supabase = createClientComponentClient()
    const router = useRouter()

    const [newPassword, setNewPassword] = useState('')

    const handleUpdatePassword = async () => {
        await supabase.auth.updateUser({
            password: newPassword
        })
        router.refresh()
    }

    return (
        <form className='max-w-xl w-3/4 flex flex-col my-20'>
            <label className='flex flex-col gap-4 mb-8'>
                new password
                <input
                    type="password"
                    name="password"
                    onChange={e => setNewPassword(e.target.value)}
                    value={newPassword}
                    placeholder='your new password'
                    className='input'
                    style={{boxShadow: '0 0 0 30px white inset'}}
                />
            </label>
            <button onClick={handleUpdatePassword} className='button-big mb-6'>reset password</button>
        </form>
    )
}

export default UpdatePassword