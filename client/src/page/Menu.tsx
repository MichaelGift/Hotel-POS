import {useEffect, useState} from "react";
import {MenuDish, OrderItem} from "../components";
import {BASE_URL} from "../App.tsx";
import {Dish} from "./dishes.tsx";
import {Table} from "./TablePage.tsx";

const Menu = () => {
    const [menu, setMenu] = useState<Dish[]>([])
    const [newOrder, setNewOrder] = useState({
        table: "",
        bill: 0,
        orderComplete: false,
        dishes: []
    })
    const [totalPrice, setTotalPrice] = useState(0);

    const [tables, setTables] = useState<Table[]>([]);
    const [tableId, setTableId] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Breakfast");
    const filteredMenu = menu.filter(dish => dish.category === selectedCategory);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
    }

    const calculateTotalPrice = () => {
        const total = newOrder.dishes.reduce((sum: number, item: { dish: Dish, quantityRequired: number }) => {
            return sum + item.dish.price * item.quantityRequired
        }, 0);
        setTotalPrice(total)
        setNewOrder((prevOrder) => ({
            ...prevOrder,
            bill: total
        }));
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
            } catch (error: any) {
                console.log(error.stack)
            }
        }

        const fetchTables = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tables`);
                const data = await response.json();

                if (response.ok) {
                    setTables(data);
                } else {
                    console.log(data);
                }
            } catch (error: any) {
                console.log(error.stack);
            }
        }

        fetchMenu();
        fetchTables();
    }, [])

    const addDishToOrder = (dish: Dish) => {
        setNewOrder((prevOrder) => {
            const dishExists: {
                dish: Dish,
                quantityRequired: number
            } = prevOrder.dishes.find(item => item.dish._id === dish._id);

            if (dishExists) {
                return {
                    ...prevOrder,
                    dishes: prevOrder.dishes.map(item =>
                        item.dish._id === dish._id
                            ? {...item, quantityRequired: item.quantityRequired + 1}
                            : item
                    )
                };
            } else {
                return {
                    ...prevOrder,
                    dishes: [
                        ...prevOrder.dishes,
                        {
                            dish: dish,
                            quantityRequired: 1
                        }
                    ]
                };
            }
        });
    };

    const removeDishFromOrder = (index: number) => {
        const updatedDishes = newOrder.dishes.filter((_, i) => i !== index);
        setNewOrder({...newOrder, dishes: updatedDishes});
    }

    const createNewOrder = async () => {
        try {
            const response = await fetch(`${BASE_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newOrder)
            });

            if (response.ok) {
                alert("Order placed successfully");
                setNewOrder({table: '',bill: 0, orderComplete: false, dishes: []});
                setTableId("");
            } else {
                alert("Something went wrong");
                console.log("Something went wrong");
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleUpdate = (e, index) => {
        const {name, value} = e.target;

        setNewOrder(prevOrder => {
            const updatedDishes = [...prevOrder.dishes];
            console.log(updatedDishes);
            updatedDishes[index] = {
                ...updatedDishes[index],
                [name]: value
            };
            return {...prevOrder, dishes: updatedDishes};
        });
    };

    return (
        <>
            <div className='row'>
                <div className="col-8 d-flex flex-column" style={{height: '100vh'}}>
                    <ul className="nav nav-pills mt-2 border-0 m-0">
                        <li className={'nav-item'}>
                            <a className={`nav-link btn ${selectedCategory === 'Breakfast' ? 'active' : ''} text-light`}
                               onClick={() => handleCategoryChange('Breakfast')}>
                                Breakfast
                            </a>
                        </li>
                        <li className={'nav-item'}>
                            <a className={`nav-link btn ${selectedCategory === 'Lunch' ? 'active' : ''} text-light`}
                               onClick={() => handleCategoryChange('Lunch')}>
                                Lunch
                            </a>
                        </li>
                        <li className={'nav-item'}>
                            <a className={`nav-link btn ${selectedCategory === 'Dinner' ? 'active' : ''} text-light`}
                               onClick={() => handleCategoryChange('Dinner')}>
                                Dinner
                            </a>
                        </li>
                        <li className={'nav-item'}>
                            <a className={`nav-link btn ${selectedCategory === 'Drinks' ? 'active' : ''} text-light`}
                               onClick={() => handleCategoryChange('Drinks')}>
                                Drinks
                            </a>
                        </li>
                    </ul>

                    <div className="row d-flex">
                        {filteredMenu.map((dish) => (
                            <MenuDish dish={dish} onClick={() => addDishToOrder(dish)} key={dish._id}/>
                        ))}
                    </div>
                </div>
                <div className="col-4 d-flex flex-column shadow-sm rounded w-auto" style={{height: '100vh'}}>
                    <div className="mb-2 mt-2">
                        <h5>New Order</h5>
                    </div>
                    <div className="container">
                        <div className={'mb-2'}>
                            <div className={'input-group'}>
                                <label className="text-secondary">Table</label>
                                <select
                                    className="form-select bg-dark border-0 text-light form-control w-100 rounded"
                                    value={tableId}
                                    onChange={(e) => {
                                        setNewOrder({...newOrder, table: e.target.value});
                                        setTableId(e.target.value)
                                    }}>
                                    <option value={""}>Select Table</option>
                                    {tables.map((table) => (
                                        <option key={table._id} value={table._id}>{table.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={'input-group'}>
                            <div className="mb-2">
                                <h6 className="text-secondary">Order</h6>
                            </div>
                            <div className="row overflow-auto" style={{maxHeight: '65vh', borderRadius: '4%'}}>
                                {newOrder.dishes.map((item, index) => (
                                    <OrderItem item={item}
                                               onClick={() => removeDishFromOrder(index)}
                                               key={item._id}
                                               handleUpdate={(e) => handleUpdate(e, index)}/>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="container mt-auto">
                        <div className="row d-flex justify-content-between">
                            <h6 className="text-secondary">Total</h6>
                            <h6>Ksh {totalPrice}</h6>
                        </div>
                        {/*<div className="mt-2">*/}
                        {/*    <h6 className="text-secondary">Payment Method</h6>*/}
                        {/*</div>*/}
                        {/*<div className="mt-2 row d-flex justify-content-around">*/}
                        {/*    <button className="btn text-light p-2 m-1 flex-fill rounded"*/}
                        {/*            style={{backgroundColor: '#2d2d2d'}}>Cash*/}
                        {/*    </button>*/}
                        {/*    <button className="btn text-light p-2 m-1 flex-fill rounded"*/}
                        {/*            style={{backgroundColor: '#2d2d2d'}}>Mobile*/}
                        {/*    </button>*/}
                        {/*    <button className="btn text-light p-2 m-1 flex-fill rounded"*/}
                        {/*            style={{backgroundColor: '#2d2d2d'}}>Card*/}
                        {/*    </button>*/}
                        {/*</div>*/}

                        <div className="mt-2 mb-3">
                            <button className="btn btn-success text-light p-2 m-1 w-100 rounded"
                                    onClick={createNewOrder}>Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu