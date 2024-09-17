import {MenuDish, OrderItem, SideNavButton} from "../components";
import {useEffect, useState} from "react";
import {Dish} from "./dishes.tsx";
import {BASE_URL} from "./Inventory.tsx";

const PoS = () => {

    const [menu, setMenu] = useState<Dish[]>([])
    const [newOrder, setNewOrder] = useState({
        bill: 0,
        orderComplete: false,
        dishes: []
    })
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = () => {
        const total = newOrder.dishes.reduce((sum, item) => {
            return sum + item.dish.price * item.quantityRequired
        }, 0);
        setTotalPrice(total)
    }

    useEffect(() => {
        calculateTotalPrice();
    }, [newOrder.dishes]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch(`${BASE_URL}/dishes`);
                const data = await response.json();

                if (response.ok) {
                    setMenu(data)
                } else {
                    console.log(data)
                }
            } catch (error) {
                console.log(error.stack)
            }
        }

        fetchMenu();
    }, [])

    const addDishToOrder = (dish) => {
        setNewOrder({
                bill: totalPrice,
                ...newOrder,
                dishes: [
                    ...newOrder.dishes, {
                        dish: dish,
                        quantityRequired: 1
                    }
                ]
            }
        )
    }
    const removeDishFromOrder = (index: number) => {
        const updatedDishes = newOrder.dishes.filter((_, i) => i !== index);
        setNewOrder({...newOrder, dishes: updatedDishes});
    }

    const createNewOrder = async () => {
        try {
            const response = await fetch(`${BASE_URL}/orders`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newOrder)
            });

            if (response.ok) {
                setNewOrder({bill: 0, orderComplete: false, dishes: []});
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="container text-light mh-100 mw-100" style={{backgroundColor: '#111315'}}>
                <div className="row">
                    <div className="col-2 d-flex flex-column shadow-lg" style={{height: '100vh'}}>
                        <div className="mb-5 mt-2 navbar">
                            <h2>Hotel POS</h2></div>
                        <SideNavButton text="Menu"/>
                        <SideNavButton text="Reservations"/>
                        <SideNavButton text="Tables"/>
                        <SideNavButton text="Ingredients"/>
                        <SideNavButton text="Dishes"/>
                    </div>

                    <div className="col-7 d-flex flex-column" style={{height: '100vh'}}>
                        <div className="row d-flex">
                            {menu.map((dish) => (<MenuDish dish={dish} onClick={() => addDishToOrder(dish)}/>))}
                        </div>
                    </div>
                    <div className="col-3 d-flex flex-column shadow-sm rounded" style={{height: '100vh'}}>
                        <div className="mb-2 mt-2">
                            <h5>Table 4</h5>
                        </div>
                        <div className="container">
                            <div className="row overflow-auto" style={{maxHeight: '65vh', borderRadius: '4%'}}>
                                {newOrder.dishes.map((item, index) => (
                                    <OrderItem item={item} onClick={() => removeDishFromOrder(index)}/>
                                ))}
                            </div>
                        </div>


                        <div className="container mt-auto">
                            <div className="row d-flex justify-content-between">
                                <h6 className="text-secondary">Total</h6>
                                <h6>Ksh {totalPrice}</h6>
                            </div>
                            <div className="mt-2">
                                <h6 className="text-secondary">Payment Method</h6>
                            </div>
                            <div className="mt-2 row d-flex justify-content-around">
                                <button className="btn text-light p-2 m-1 flex-fill rounded"
                                        style={{backgroundColor: '#2d2d2d'}}>Cash
                                </button>
                                <button className="btn text-light p-2 m-1 flex-fill rounded"
                                        style={{backgroundColor: '#2d2d2d'}}>Mobile
                                </button>
                                <button className="btn text-light p-2 m-1 flex-fill rounded"
                                        style={{backgroundColor: '#2d2d2d'}}>Card
                                </button>
                            </div>

                            <div className="mt-2 mb-3">
                                <button className="btn btn-success text-light p-2 m-1 w-100 rounded"
                                        onClick={createNewOrder}>Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PoS