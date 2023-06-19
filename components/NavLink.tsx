'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type NavLinkProps = {
    path: string,
    name?: string,
    image?: any,
    styles?: string
}

const NavLink = ({ path, name, image, styles }: NavLinkProps) => {

    let currentPath = usePathname() || '/'
    if (currentPath.includes('/read')) currentPath = '/read'

    if (image) {
        return (
            <Link href={path}>
                <Image src={image} alt='profile picture' height={32}></Image>
            </Link>
        )
    }
    
    if (path === currentPath && path !== '/login') {
        return (
            <Link href={path} className='relative isolate font-bold'>{name}
                <span className='font-marker text-xl text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10'>{name}</span>
            </Link>
        )
    }

    return <Link href={path} className={styles}>{name}</Link>
}

export default NavLink