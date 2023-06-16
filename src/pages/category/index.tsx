import Head from 'next/head'
import styles from './style.module.scss'
import { Header } from '../../components/Header'
import { FormEvent, useState } from 'react'
import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'
import { canSSRAuth } from '../../utils/canSSRAuth'

export default function Category(){

    const [name, setName] = useState('')

    function handleRegister(event: FormEvent){
        event.preventDefault()
        
        if(name === ''){
            return
        }
        const apiClient = setupAPIClient()
        apiClient.post('/category', { name: name })

        toast.success("Categoria Cadastrada com sucesso!")
        setName("")
    }

    return(
        <>
            <Head>
                <title>Nova Categoria - Sujeito Pizza</title>
            </Head>
            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Cadastrar Categoria</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input 
                        type='text'
                        placeholder='Digite o nome da categoria'
                        className={styles.input}
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />

                        <button type='submit' className={styles.buttonAdd}>Cadastrar</button>
                    </form>
                </main>

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx)=>{
    return {
        props: {}
    }
})