import {Dish} from "./dishes.tsx";
import {useEffect, useState} from "react";

import {BASE_URL} from "../App.tsx";
import Table from "./Table.tsx";

export interface Order {
    _id: string,
    bill: number,
    orderComplete: boolean,
    table: Table,
    dishes: {
        dish: Dish,
        quantityRequired: number,
        orderComplete: boolean
    }[]
}

const Order = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [targetOrder, setTargetOrder] = useState<Order>(null)

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

    const deleteOrder = async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/orders/${id}`, {
                method: "DELETE"
            })

            if (response.ok) {
                alert("Order successfully deleted")
                setOrders(orders.filter(order => order._id !== id))
                setTargetOrder(null)
            } else {
                const errorData = await response.json()
                console.log(errorData)
                alert("Something went wrong try again")
            }
        } catch (error) {
            console.log(error.stack)
        }
    }

    const updateOrder = async () => {
        if (!targetOrder) return
        try {
            const response = await fetch(`${BASE_URL}/orders/${targetOrder._id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify(targetOrder)
            })

            if (response.ok) {
                alert("Order updated successfully")
            } else {
                const errorData = await response.json()
                console.log(errorData)
                alert("Something went wrong with the update")
            }
        } catch (error) {
            console.log(error.stack);
        }
    }

    const loadOrderToUpdate = (order: Order) => setTargetOrder(order)


    return (
        <>
            <div className={'row'}>
                <div className={'col-8 d-flex flex-column'}>
                    <div className={'row d-flex'}>
                        {orders.map((dish) => (
                            <div className={'col-md-4 p-1'}>
                                <button
                                    className={'btn text-light w-100 h-100 p-2 rounded'}
                                    style={{backgroundColor: '#2d2d2d'}}
                                    onClick={() => loadOrderToUpdate(dish)}>
                                    <h3 className={'m-0 p-0'}>{dish.table.name}</h3>
                                    <p className={'text-secondary m-0 p-0'}>Ksh {dish.bill}</p>
                                    {dish.dishes.map((item) => (
                                        <p className={'text-light m-0 p-0'}>{item.dish.name} x{item.quantityRequired}</p>))}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={'col-4 d-flex flex-column shadow-sm rounded w-auto'}>
                    <div className={'mb-2 mt-2'}>
                        {!targetOrder && (
                            <>
                                <h5>Order</h5>
                                <p className={"text-muted"}>Click on an order to update it</p>
                            </>
                        )}
                        {targetOrder && (
                            <>
                                <div className={'d-flex justify-content-between'}>
                                    <div><h5>{targetOrder.table.name} Order</h5>
                                        <p className={"text-muted"}>Update order</p>
                                    </div>
                                    <button className={'btn btn-danger'} onClick={() => deleteOrder(targetOrder._id)}>
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {targetOrder && (
                        <>
                            <div>
                                <form>
                                    <div className={'mb-3'}>
                                        <label className={'form-label'}>Pending</label>
                                        <div className={'row overflow-auto m-1'}
                                             style={{maxHeight: '30vh', borderRadius: '4%'}}>
                                            {targetOrder?.dishes.map((item, index) => (
                                                <div className={'col-12 p-1'} key={index}>
                                                    <div className={'input-group'}>
                                                        <input type={'text'}
                                                               className={'form-control bg-dark border-0 text-light'}
                                                               value={item.dish.name} disabled/>
                                                        <input type={'number'}
                                                               className={'form-control bg-dark border-0 text-light'}
                                                               value={item.quantityRequired} disabled/>
                                                        <button className={'btn btn-primary'} type={'button'}>Complete
                                                        </button>
                                                    </div>
                                                </div>))}
                                        </div>
                                    </div>
                                    <div className={'mb-3'}>
                                        <label className={'form-label'}>Completed</label>
                                    </div>

                                    <button className={'btn btn-success rounded w-100 mt-auto'} type={'button'}
                                            onClick={updateOrder}>Update Order
                                    </button>
                                </form>
                            </div>
                        </>
                    )}

                </div>

            </div>
        </>
    )
}


export default Order