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

    const completedDishes = targetOrder?.dishes.filter(item => item.orderComplete)
    const pendingDishes = targetOrder?.dishes.filter(item => !item.orderComplete) || []

    const [selectedCategory, setSelectedCategory] = useState<boolean>(false)
    const filteredOrders = orders.filter(order => order.orderComplete === selectedCategory)

    const handleCategoryChange = (showCompleteOrders: boolean) => setSelectedCategory(showCompleteOrders)


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

    const checkCompletion = () => {
        if (pendingDishes.length === 0 && targetOrder && !targetOrder.orderComplete) {
            setTargetOrder({
                ...targetOrder,
                orderComplete: true
            })
        } else if (pendingDishes.length > 0 && targetOrder && targetOrder.orderComplete) {
            setTargetOrder({
                ...targetOrder,
                orderComplete: false
            })
        }
    }

    useEffect(() => {
        checkCompletion();
    }, [pendingDishes])


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
                alert("Order updated successfully");
                setOrders(orders.map(order => {
                    if (order._id === targetOrder._id) {
                        return targetOrder
                    }
                    return order
                }))
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
                    <ul className={'nav nav-pills mt-2 border-0 m-0'}>
                        <li className={'nav-item'}>
                            <a className={`nav-link ${!selectedCategory ? 'active' : ''} text-light`}
                               onClick={() => handleCategoryChange(false)}>
                                Pending
                            </a>
                        </li>
                        <li className={'nav-item'}>
                            <a className={`nav-link ${selectedCategory ? 'active' : ''} text-light`}
                               onClick={() => handleCategoryChange(true)}>
                                Completed
                            </a>
                        </li>

                    </ul>
                    <div className={'row d-flex'}>
                        {filteredOrders.map((order) => (
                            <div className={'col-md-3 p-1'}>
                                <button
                                    className={'btn text-light w-100 h-100 p-2 rounded'}
                                    style={{backgroundColor: '#2d2d2d'}}
                                    onClick={() => loadOrderToUpdate(order)}>
                                    <h5 className={'m-0 p-0'}>{order?.table?.name}</h5>
                                    <p className={'text-secondary m-0 mb-2 p-0'}>Ksh {order.bill}</p>
                                    {order.dishes.map((item) => (
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
                                    <div><h5>{targetOrder.table?.name} Order</h5>
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
                                    <div className={'mb-3 overflow-auto'}
                                         style={{maxHeight: '30vh', borderRadius: '4%'}}>
                                        <label className={'form-label m-0'}>Pending</label>

                                        {pendingDishes.map((item, index) => (
                                            <div className={'col-12 p-1'} key={index}>
                                                <div className={'input-group'}>
                                                    <input type={'text'}
                                                           className={'form-control bg-dark border-0 text-light'}
                                                           value={item.dish.name} disabled/>
                                                    <input type={'number'}
                                                           className={'form-control bg-dark border-0 text-light'}
                                                           value={item.quantityRequired} disabled/>
                                                    <button className={'btn btn-primary'}
                                                            type={'button'}
                                                            onClick={() => {
                                                                setTargetOrder({
                                                                    ...targetOrder,
                                                                    dishes: targetOrder.dishes.map(dish => {
                                                                        if (dish.dish._id === item.dish._id) {
                                                                            dish.orderComplete = !dish.orderComplete
                                                                        }
                                                                        return dish
                                                                    })
                                                                })
                                                            }}>
                                                        Complete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={'mb-3 overflow-auto'}
                                         style={{maxHeight: '30vh', borderRadius: '4%'}}>
                                        <label className={'form-label m-0'}>Completed</label>
                                        {completedDishes.map((item, index) => (
                                            <div className={'col-12 p-1'} key={index}>
                                                <div className={'input-group'}>
                                                    <input type={'text'}
                                                           className={'form-control bg-dark border-0 text-light'}
                                                           value={item.dish.name} disabled/>
                                                    <input type={'number'}
                                                           className={'form-control bg-dark border-0 text-light'}
                                                           value={item.quantityRequired} disabled/>
                                                    <button className={'btn btn-danger'}
                                                            type={'button'}
                                                            onClick={() => {
                                                                setTargetOrder({
                                                                    ...targetOrder,
                                                                    dishes: targetOrder.dishes.map(dish => {
                                                                        if (dish.dish._id === item.dish._id) {
                                                                            dish.orderComplete = !dish.orderComplete
                                                                        }
                                                                        return dish
                                                                    })
                                                                })
                                                            }}>
                                                        Incomplete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
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