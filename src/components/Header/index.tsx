import Link from 'next/link'
import styles from './style.module.scss'

import { FiLogOut } from 'react-icons/fi'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export function Header(){

    const { signOut } = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href={'/'}>
                    <img src="/logo.svg" width={190} height={60}/>
                </Link>

                <nav className={styles.headerNavigation}>
                    <Link href="/category">
                        <p>Categoria</p>
                    </Link>

                    <Link href="/product">
                        <p>Cardapio</p>
                    </Link>
                    
                    <button onClick={signOut}>
                        <FiLogOut color='#FFF' size={24}/>
                    </button>
                </nav>
            </div>

        </header>
    )
}