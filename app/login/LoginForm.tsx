'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [view, setView] = useState('log-in') 

    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignUp = async () => {
        const {error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        console.log({error})
        setView('check-email')
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
            redirectTo: `${process.env.BASE_URL}/login/update-password`
        })
    }

    return (
        <div className='max-w-xl w-3/4 flex flex-col my-20'>
            {view === 'check-email' ? (
                <p className='text-center'>check <span className='font-bold'>{email}</span> to continue signing up</p>
            ) : (
                <form
                    className=''
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (view === 'log-in') {
                            handleLogIn()
                        } else if (view === 'sign-up') {
                            handleSignUp()
                        } else if (view === 'reset-password') {
                            handleResetPassword()
                        }
                    }}
                >
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
                        {view !== 'reset-password' && (
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
                    <div className='flex flex-col gap-4'>
                        {view === 'log-in' && (
                            <>
                                <button className='button-big mb-6'>log in</button>
                                <button className='text-dark-500 underline' onClick={() => setView('reset-password')}>forgot your password?</button>
                                <button className='text-dark-500 underline' onClick={() => setView('sign-up')}>don&apos;t have an account? sign up</button>
                            </>
                        )}
                        {view === 'sign-up' && (
                            <>
                                <button className='button-big mb-6'>sign up</button>
                                <button className='text-dark-500 underline' onClick={() => setView('log-in')}>already have an account? log in</button>
                            </>
                        )}
                        {view === 'reset-password' && (
                            <>
                                <button className='button-big mb-6'>reset password</button>
                                <button className='text-dark-500 underline' onClick={() => setView('log-in')}>already have an account? log in</button>
                            </>
                        )}
                    </div>
                </form>
            )}
        </div>
    )
}

export default LoginForm