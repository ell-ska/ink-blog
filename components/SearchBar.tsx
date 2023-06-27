'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import FocusTrap from 'focus-trap-react'
import useDebounce from '@/hooks/useDebounce'
import { getTitleSearch } from '@/api-routes/search'
import type { Post } from '@/lib/type-collection'

const SearchResults = ({ results } : { results: Post[] }) => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-16 p-8'>
            {results.map(({ id, cover_image, slug, title }) => (
                <Link key={id} href={`/read/${slug}`}>
                    {cover_image ? <Image
                        className='aspect-square object-cover border-1 border-dark-900'
                        src={cover_image}
                        alt=''
                        width={664}
                        height={664}
                    ></Image> : <div className='aspect-square w-full border-1 border-dark-900 bg-accent'></div>}
                    <h2 className='text-xl mt-2 line-clamp-2'>{title}</h2>
                </Link>
            ))}
        </div>
    )
}

const SearchBar = () => {

    const path = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 300)
    const [searchResults, setSearchResults] = useState<Post[]>([])

    useEffect(() => {
        if (!debouncedSearch) return (setSearchResults([]))
        const getSearch = async () => {
            const { data } = await getTitleSearch(debouncedSearch)
            setSearchResults(data || [])
        }
        getSearch()
    }, [debouncedSearch])

    useEffect(() => {
        setIsOpen(false)
        setSearch('')
    }, [path])

    return (
        <>
            <button onClick={() => setIsOpen(true)}>search</button>
            {isOpen && createPortal(
                <FocusTrap>
                    <div
                        className='fixed z-50 inset-0 flex justify-center items-center bg-dark-900 bg-opacity-25'
                        onClick={() => {
                            setIsOpen(false)
                            setSearch('')
                        }}
                    >
                            <div
                                className='flex flex-col items-center max-w-2xl m-8 w-full md:w-2/3 min-h-[50%] max-h-[calc(100svh-4rem)] overflow-y-scroll bg-light border-1 border-dark-900'
                                onClick={e => e.stopPropagation()}
                                onKeyDown={e => e.key === 'Escape' ? setIsOpen(false) : null}
                            >
                                <input
                                    type='text'
                                    className='w-full p-4 outline-none placeholder:text-dark-500 border-b-1 border-dark-900 rounded-none'
                                    placeholder='search'
                                    onChange={e => setSearch(e.target.value)}
                                />
                                {searchResults.length > 0 && <SearchResults results={searchResults} />}
                                {(searchResults.length === 0 && debouncedSearch) && (
                                    <div className='mt-4'>
                                        <span className='text-dark-700'>no results for </span>
                                        <span>{`"${debouncedSearch}"`}</span>
                                    </div>
                                )}
                            </div>
                    </div>
                </FocusTrap>,
                document.getElementById('module') as Element
            )}
        </>
    )
}

export default SearchBar