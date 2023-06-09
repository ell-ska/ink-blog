'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Session } from '@supabase/auth-helpers-nextjs'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const LoginForm = ({ session } : { session: Session | null }) => {

    // [] error handling
    // [] message for reset password

    // const supabase = createClientComponentClient()

    // if (!session) return (
    //     <div className='max-w-xl w-3/4 my-20'>
    //         <Auth
    //             supabaseClient={supabase}
    //             redirectTo="http://localhost:3000/"
    //             providers={[]}
    //             socialLayout="horizontal"
    //             appearance={{
    //                 extend: false,
    //                 className: {
    //                     container: 'flex flex-col first-of-type:gap-8',
    //                     input: 'w-full border-1 py-4 px-6 mt-4 outline-none',
    //                     button: 'button-big mb-6 mt-20',
    //                     anchor: 'text-dark-500 underline text-center mb-4 last-of-type:mb-0',
    //                     message: 'text-center',
    //                 },
    //                 style: {
    //                     input: { boxShadow: '0 0 0 30px white inset' }
    //                 }
    //             }}
    //         />
    //     </div>
    // )


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('log in') 

    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignUp = async () => {
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        router.refresh()
        router.push('/')
    }

    const handleLogIn = async () => {
        await supabase.auth.signInWithPassword({
            email,
            password,
        })
        router.refresh()
        router.push('/')
    }

    const handleResetPassword = async () => {
        await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `http://localhost:8080/login/update-password`
        })
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        
        switch (type) {
            case 'log in':
                handleLogIn()
                break
            case 'sign up':
                handleSignUp()
                break
            case 'reset password':
                handleResetPassword()
                break
            default:
                console.log('not a valid auth type')
        }
    }

    return (
        <form className='max-w-xl w-3/4 flex flex-col my-20'>
            <label className='flex flex-col gap-4 mb-8'>
                email address
                <input
                    type="email"
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    placeholder='your email address'
                    className='input'
                    style={{boxShadow: '0 0 0 30px white inset'}}
                />
            </label>
            {type !== 'reset password' && (
                <label className='flex flex-col gap-4 mb-20'>
                    password
                    <input
                        type="password"
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder='your password'
                        className='input'
                        style={{boxShadow: '0 0 0 30px white inset'}}
                    />
                </label>
            )}
            <button onClick={(e) => handleSubmit(e)} className='button-big mb-6'>{type}</button>
            <div className='flex flex-col gap-4'>
                {type === 'log in' && (
                    <>
                        <button onClick={() => setType('reset password')} className='text-dark-500 underline'>forgot your password?</button>
                        <button onClick={() => setType('sign up')} className='text-dark-500 underline'>don&apos;t have an account? sign up</button>
                    </>
                )}
                {type === ('sign up' || 'reset password') && <button onClick={() => setType('log in')} className='text-dark-500 underline'>already have an account? log in</button>}
            </div>
        </form>
    )
}

export default LoginForm