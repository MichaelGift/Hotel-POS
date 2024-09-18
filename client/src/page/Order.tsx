import {Dish} from "./dishes.tsx";
import {useEffect, useState} from "react";

import {BASE_URL} from "../App.tsx";

export interface Order {
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
    const [targetOrder, setTargetOrder] = useState<Order | null>({
        _id: '',
        bill: 0,
        orderComplete: false,
        dishes: []
    })

    const [newOrder, setNewOrder] = useState({
        bill: 0,
        orderComplete: false,
        dishes: []
    })

    const [availableDishes, setAvailableDishes] = useState<Dish[]>([])
    const [dishId, setDishId] = useState("")
    const [requiredQuantity, setRequiredQuantity] = useState(1)

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

        const fetchDish = async () => {
            try {
                const response = await fetch(`${BASE_URL}/dishes`)
                const dishes = await response.json()
                setAvailableDishes(dishes)
            } catch (error) {
                console.log(error.stack)
            }
        }
        fetchOrder();
        fetchDish();
    }, []);

    const deleteOrder = async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/orders/${id}`, {
                method: "DELETE"
            })

            if (response.ok) {
                alert("Order successfully deleted")
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

    const addDishToOrder = () => {
        if (dishId && requiredQuantity > 0) {
            const dishToAdd = availableDishes.find((dish) => dish._id === dishId)

            if (dishToAdd) {
                if (targetOrder) {
                    setTargetOrder({
                            ...targetOrder,
                            dishes: [
                                ...targetOrder.dishes,
                                {
                                    dish: dishToAdd,
                                    quantityRequired: requiredQuantity,
                                    orderComplete: false
                                }
                            ]
                        }
                    );
                } else {
                    setNewOrder({
                        ...newOrder,
                        dishes: [
                            ...newOrder.dishes,
                            {
                                dish: dishToAdd,
                                quantityRequired: requiredQuantity
                            }
                        ]
                    });
                }
                setDishId("");
                setRequiredQuantity(1);
            }
        }
    };

    const addNewOrder = async () => {
        try {
            const response = await fetch(`${BASE_URL}/orders`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newOrder)
                })
            ;

            const data = await response.json()

            if (response.ok) {
                alert("New order added");
                setOrders([...order, data]);
                setNewOrder({bill: 0, orderComplete: false, dishes: []})
            } else {
                const errorData = await response.json();
                console.log(errorData);
                alert("Something went wrong adding the new order");
            }
        } catch (error) {
            console.log(error.stack);
        }
    }

    const updateDishQuantity = (index: number, newQuantity: number) => {
        if(!targetOrder) return
        const updatedDishes = targetOrder.dishes.map((dish, i) =>
            i === index ? {...dish, quantityRequired: newQuantity} : dish
        );
        setTargetOrder({...targetOrder, dishes: updatedDishes});
    };

    const deleteDishFromOrder = (index: number) => {
        if(!targetOrder) return
        const updatedDishes = targetOrder.dishes.filter((_, i) => i !== index);
        setTargetOrder({...targetOrder, dishes: updatedDishes});
    };

    return (
        <>
            <h2>Orders</h2>
            <ul>
                {order.map((order) => {
                    return (
                        <li key={order._id}>
                            Name: {order._id}, Amount: {order.bill}, Complete: {order.orderComplete}
                            <button onClick={() => deleteOrder(order._id)}>Delete Order</button>
                            <button onClick={() => loadOrderToUpdate(order)}>Update Order</button>
                            <ul>
                                {order.dishes.map((dish) => (
                                    <li key={dish.dish._id}>
                                        Name: {dish.dish.name}: Quantity: {dish.quantityRequired}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )
                })}
            </ul>

            <h2>Compose Order</h2>
            <form onSubmit={addNewOrder}>
                <select value={dishId} onChange={(e) => setDishId(e.target.value)}>
                    <option value="">Select Dish</option>
                    {availableDishes.map((dish) => (
                        <option key={dish._id} value={dish._id}>
                            {dish.name}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    value={requiredQuantity}
                    onChange={(e) => setRequiredQuantity(Number(e.target.value))}
                    placeholder="Quantity Required"
                />
                <button type="button" onClick={addDishToOrder}>
                    Add Dish
                </button>
                <h4>Selected dishes</h4>
                <ul>
                    {newOrder.dishes.map((dish) => (
                        <li key={dish._id}>
                            {dish.dish.name}: {dish.quantityRequired}
                        </li>
                    ))}
                </ul>

                <button type="button" onClick={addNewOrder}>
                    Create Order
                </button>
            </form>

            {targetOrder && (
                <>
                    <h2>Update Order</h2>
                    <form onSubmit={updateOrder}>
                        <select value={dishId} onChange={(e) => setDishId(e.target.value)}>
                            <option value="">Select Dish</option>
                            {availableDishes.map((dish) => (
                                <option key={dish._id} value={dish._id}>
                                    {dish.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            value={requiredQuantity}
                            onChange={(e) => setRequiredQuantity(Number(e.target.value))}
                            placeholder="Quantity Required"
                        />
                        <button type="button" onClick={addDishToOrder}>
                            Add Dish
                        </button>
                        <h3>{targetOrder._id}</h3>
                        <ul>
                            {targetOrder.dishes.map((dish, index) => (
                                <li key={dish.dish._id}>
                                    Name: {dish.dish.name}, Quantity:
                                    <input
                                        value={dish.quantityRequired}
                                        onChange={(e) => updateDishQuantity(index, Number(e.target.value))}
                                    />
                                    <button type="button" onClick={() => deleteDishFromOrder(index)}>Remove Dish
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <button type="button" onClick={updateOrder}>Update Order</button>
                    </form>
                </>
            )}

        </>
    )
}


export default Order