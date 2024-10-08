import {ChangeEvent, useEffect, useState} from "react";
import {BASE_URL} from "../App.tsx";
import {Ingredient} from "./Inventory.tsx";
import UpdateDishModal from "../components/UpdateDishModal.tsx";

export interface Dish {
    _id: string;
    name: string;
    price: number;
    category: string;
    ingredients: {
        ingredient: Ingredient;
        quantityRequired: number;
        _id: string;
    }[];
}

const Dishes = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [newDish, setNewDish] = useState<{
        name: string,
        price: number,
        category: string,
        ingredients: {
            ingredient: Ingredient,
            quantityRequired: number,
            _id: string
        }[]
    }>({
        name: '',
        price: 0,
        category: '',
        ingredients: []
    });
    const [availableIngredients, setIngredients] = useState<Ingredient[]>([]);
    const [ingredientId, setIngredientId] = useState("");
    const [requiredQuantity, setRequiredQuantity] = useState(1);

    const [targetDish, setTargetDish] = useState<Dish | null>(null);
    const [showModal, setShowModal] = useState(false);

    const [category, setCategory] = useState("");

    const handleClose = () => {
        setTargetDish(null);
        setShowModal(false);
    }
    const handleShow = (dish: Dish) => {
        setTargetDish(dish);
        setShowModal(true);
    }

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch(`${BASE_URL}/dishes`);
                const data = await response.json();

                if (response.ok) {
                    console.log("Success");
                    setDishes(data)
                } else {
                    console.log(data);
                }
            } catch (error: any) {
                console.log(error.stack)
            }
        }
        const fetchIngredients = async () => {
            try {
                const response = await fetch(`${BASE_URL}/ingredients`);
                const data = await response.json();

                if (response.ok) {
                    console.log("Successful ingredients");
                    setIngredients(data)
                } else {
                    console.log(data)
                }
            } catch (error: any) {
                console.log(error.stack)
            }
        }
        fetchDishes();
        fetchIngredients();
    }, []);

    const handleDishCreation = (e: ChangeEvent<HTMLInputElement>) => {
        setNewDish({...newDish, [e.target.name]: e.target.value})
    }

    const addIngredientToDish = () => {
        if (ingredientId && requiredQuantity > 0) {
            const ingredientToAdd = availableIngredients.find((ing) => ing._id === ingredientId);

            if (ingredientToAdd) {
                setNewDish({
                    ...newDish,
                    ingredients: [
                        ...newDish.ingredients,
                        {
                            ingredient: ingredientToAdd,
                            quantityRequired: requiredQuantity,
                            _id: ingredientToAdd._id
                        }
                    ]
                });
            }
            setIngredientId("");
            setRequiredQuantity(1);
        }
    }

    const createNewDish = async () => {
        try {
            const response = await fetch(`${BASE_URL}/dishes/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(newDish)
            })

            const data = await response.json();

            if (response.ok) {
                alert("Success creating new dish");
                setDishes([...dishes, data]);
                setNewDish({name: '', price: 0, category: '', ingredients: []})
                setIngredientId("");
                setCategory("");
            } else {
                console.log(`Something went wrong: ${data}`)
            }
        } catch (e: any) {
            console.log(e.stack)
        }
    }

    const updateDish = async () => {
        try {
            const response = await fetch(`${BASE_URL}/dishes/${targetDish?._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify(targetDish)
                })

            const data = await response.json();

            if (response.ok) {
                console.log("Success updating");
            } else {
                console.log(data);
            }
        } catch (error: any) {
            console.log(error.stack);
        }
    }

    const deleteDish = async () => {
        try {
            const response = await fetch(`${BASE_URL}/dishes/${targetDish?._id}`, {method: "DELETE",})

            const data = await response.json()

            if (response.ok) {
                alert("Dish deleted successfully");
                setDishes(dishes.filter((dish) => dish._id !== targetDish?._id));
            } else console.log(data);
        } catch (error: any) {
            console.log(error.stack)
        }
    }

    const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
        if (!targetDish) return;
        setTargetDish({...targetDish, [e.target.name]: e.target.value});
    }

    const removeIngredientFromDish = (index: number) => {
        const updatedIngredients = newDish.ingredients.filter((_, i) => i !== index);
        setNewDish({...newDish, ingredients: updatedIngredients});
    }

    return (
        <>
            {showModal && (
                <UpdateDishModal name={targetDish?.name as string}
                                 price={targetDish?.price as number}
                                 ingredients={targetDish?.ingredients as {
                                     ingredient: { name: string },
                                     quantityRequired: number
                                 }[]}
                                 onClose={handleClose}
                                 onDelete={deleteDish}
                                 onUpdate={updateDish}
                                 handleUpdate={handleUpdate}
                />
            )}

            {showModal && <div className="modal-backdrop fade show"></div>}
            <div className='row'>
                <div className='col-8 d-flex flex-column'>
                    <div className='row d-flex overflow-auto' style={{maxHeight: '99vh'}}>
                        {dishes.map((dish) => (
                            <div className='col-md-3 p-1' key={dish._id}>
                                <button className='btn text-light w-100 h-100 p-3 rounded'
                                        style={{backgroundColor: "#2d2d2d"}}
                                        onClick={() => handleShow(dish)}>
                                    <h5 className='m-0 p-0'>{dish.name}</h5>
                                    <p className='text-secondary m-0 p-0'>Ksh {dish.price}</p>
                                </button>
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className='col-4 d-flex flex-column shadow-sm rounded w-auto'>
                    <div className="mb-2 mt-2">
                        <h5>New Dish</h5>
                    </div>
                    <form>
                        <div className='mb-3'>
                            <label className='form-label'>Name</label>
                            <input name='name' type='text' value={newDish.name} onChange={handleDishCreation}
                                   className={'form-control'}/>
                        </div>

                        <div className={'mb-3'}>
                            <label className={'form-label'}>Category</label>
                            <select className={'form-select form-control'}
                                    onChange={(e) => {
                                        setNewDish({...newDish, category: e.target.value});
                                        setCategory(e.target.value)
                                    }}
                                    value={category}
                                    required>
                                <option value={''}>Select Category</option>
                                <option value={'Breakfast'}>Breakfast</option>
                                <option value={'Lunch'}>Lunch</option>
                                <option value={'Dinner'}>Dinner</option>
                                <option value={'Drinks'}>Drink</option>
                            </select>
                        </div>
                        <div className={'mb-3'}>
                            <label className={'form-label'}>Price</label>
                            <input name={'price'} type={'number'} value={newDish.price} onChange={handleDishCreation}
                                   className={'form-control'}/>
                        </div>
                        <div className={'mb-3'}>
                            <label className={'form-label'}>Ingredients</label>
                            <select className={'form-select form-control'} value={ingredientId}
                                    onChange={(e) => setIngredientId(e.target.value)}>
                                <option value={''}>Select Ingredient</option>
                                {availableIngredients.map((ingr) => (
                                    <option key={ingr._id} value={ingr._id}>{ingr.name}</option>
                                ))}
                            </select>
                            <input className={'form-control mt-2'} value={requiredQuantity}
                                   placeholder={'Ingredient quantity'}
                                   onChange={(e) => setRequiredQuantity(Number(e.target.value))}/>
                            <button className={'btn btn-primary w-100 mt-2'} type={'button'}
                                    onClick={addIngredientToDish}>Add Ingredient
                            </button>

                            <div content={'container'}>
                                <div className={'row overflow-auto m-1'}
                                     style={{maxHeight: '40vh', borderRadius: '4%'}}>
                                    {newDish.ingredients.map((ingredient, index) => (
                                        <button
                                            className={'btn w-100 d-flex text-light justify-content-between align-items-center p-2 rounded m-1'}
                                            style={{backgroundColor: '#2d2d2d'}}
                                            key={index}
                                            type={'button'}
                                            onClick={() => removeIngredientFromDish(index)}>
                                            <div className="d-flex">
                                                <h6 className={'mb-0'}>{ingredient.ingredient.name}</h6>
                                                <h6 className={'mb-0 text-secondary ms-3'}> x{ingredient.quantityRequired}</h6>
                                            </div>
                                            <h6 className={'mb-0'}>Ksh {ingredient.ingredient.price}</h6>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className={'btn btn-success rounded w-100 mt-auto'} type={'button'}
                                onClick={createNewDish}>Add New Dish
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Dishes