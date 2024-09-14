import {Dish} from "./dishes.tsx";
import {useEffect, useState} from "react";
import {BASE_URL} from "./Inventory.tsx";

interface Order {
    _id: string,
    bill: number,
    orderComplete: boolean,
    dishes: {
        dish: Dish,
        quantityRequired: number,
        orderComplete: boolean
    }[]
}

const Order = () => {
    const [order, setOrders] = useState<Order[]>([])

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`${BASE_URL}/orders`)
                const orders = await response.json()
                setOrders(orders)
            } catch (error) {
                console.log(error.stack)
            }
        }
        fetchOrder();
    }, []);

    return (
        <>
            <ul>
                {order.map((order) => {
                    return (
                        <li key={order._id}>
                            Name: {order._id}, Amount: {order.bill}, Complete: {order.orderComplete}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}


export default Order