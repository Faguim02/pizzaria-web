import Head from "next/head"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { Header } from "../../components/Header"
import styles from './style.module.scss'

import Modal from 'react-modal'

import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from "../../services/api"
import { useState } from "react"
import { ModalOrder } from "../../components/ModalOrder"

type OrderProps = {
    id: string,
    table: string | number
    status: boolean
    draft: boolean
    name: string | null
}

interface HomeProps{
    orders: OrderProps[]
}

export type OrderItemProps = {
    id: string
    amount: number
    order_id: string
    product_id: string
    product:{
        id: string
        name: string
        description: string
        price: string
        banner: string
    }
    order:{
        id: string
        table: string | number
        status: boolean
        name: string | null
    }
}

export default function DashBoard({orders}: HomeProps){

    const[orderList, setOrderList] = useState(orders || [])

    const[modalItem, setModalItem] = useState<OrderItemProps[]>()
    const[modalVisible, setModalVisible] = useState(false)

    function handleCloseModal(){
        setModalVisible(false)
    }

    async function handleOpenModalView(id: string){
        
        const apiClient = setupAPIClient()

        const response = await apiClient.get('/order/detail', {
            params:{
                order_id : id
            }
        })

        setModalItem(response.data)
        setModalVisible(true)

    }

    async function handleFinishItem(id: string){
        const apiClient = setupAPIClient()
        await apiClient.put('/order/finish', {
            order_id: id,
        })

        const response = await apiClient.get('/orders')

        setOrderList(response.data)
        setModalVisible(false)
    }

    async function handleRefreshOrder() {
        const apiClient = setupAPIClient()
        const response = await apiClient.get('/orders')
        setOrderList(response.data)
    }

    Modal.setAppElement('#__next')

    return(
        <>
            <Head>
                <title>Painel - SujeitoPizza</title>
            </Head>
            <div>
                <Header/>
                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Ultimos pedidos</h1>
                        <button onClick={handleRefreshOrder}>
                            <FiRefreshCcw size={25} color="#3fffa3"/>
                        </button>
                    </div>

                    <article className={ styles.listOrders }>

                        {orderList.length === 0 && (
                            <span className={styles.empytList}>Você não tem nenhum pedido</span>
                        )}

                        {orderList.map(item =>{
                            return(
                                <section className={styles.ordersItem} key={item.id}>
                                    <button onClick={()=> handleOpenModalView(item.id)}>
                                        <div className={styles.tag}></div>
                                        <span>Mesa {item.table}</span>
                                    </button>
                                </section>
                            )
                        })}
                        
                    </article>
                </main>

                {modalVisible && (
                    <ModalOrder
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        order={modalItem}
                        handleFinishOrder={handleFinishItem}
                    />
                )}

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/orders')

    return{
        props:{
            orders : response.data
        }
    }
})