import { Inter } from 'next/font/google'
import { FormEvent, useContext, useState } from 'react'
import styles from '../../styles/home.module.scss'
import Head from 'next/head'
import Image from 'next/image'
import logo from '../../public/logo.svg'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import Link from 'next/link'
import { AuthContext } from '../contexts/AuthContext'
import { toast } from 'react-toastify'
import { canSSRGuest } from '../utils/canSSRGuest'

export default function Home() {
  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent){
    event.preventDefault()

    if(email === '' || password === ''){
      toast.warn("Preencha todos os campos")
      return
    }

    setLoading(true)

    let data= {
      email,
      password
    }

    await signIn(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Sujeito Pizza - login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt='Logo'/>
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder='Digite seu email' type='text' value={email} onChange={(e:any)=>setEmail(e.target.value)}/>
            <Input placeholder='Sua senha' type='password' value={password} onChange={(e:any)=>setPassword(e.target.value)}/>
            <Button loading={loading}>
              Acessar
            </Button>
          </form>
          
          <Link href="/signup">
            <p className={styles.text}>Não possui cadastro? Cadastre-se</p>
          </Link>
        
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return{
    props:{}
  }
})