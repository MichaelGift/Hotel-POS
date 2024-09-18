import {useEffect, useState} from "react";
import {Dish} from "./dishes.tsx";
import {BASE_URL} from "../App.tsx";
import {Ingredient} from "./Inventory.tsx";

const DishesV2 = () => {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [newDish, setNewDish] = useState({
        name: '',
        price: '',
        ingredients: []
    });
    const [availableIngredients, setIngredients] = useState<Ingredient[]>([]);
    const [ingredientId, setIngredientId] = useState("");
    const [requiredQuantity, setRequiredQuantity] = useState(1);

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
            } catch (error) {
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
            } catch (error) {
                console.log(error.stack)
            }
        }
        fetchDishes();
        fetchIngredients();
    }, []);

    const handleDishCreation = (e) => {
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
    return (
        <>
            <div className='row'>
                <div className='col-8 d-flex flex-column'>
                    <div className='row d-flex'>
                        {dishes.map((dish) => (
                            <div className='col-md-3 p-1' key={dish._id}>
                                <button className='btn text-light w-100 h-100 p-3 rounded'
                                        style={{backgroundColor: "#2d2d2d"}}>
                                    <h4 className='m-0 p-0'>{dish.name}</h4>
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
                            <label className={'form-label'}>Price</label>
                            <input name={'price'} type={'number'} value={newDish.price} onChange={handleDishCreation}
                                   className={'form-control'}/>
                        </div>
                        <div className={'mb-3'}>
                            <label className={'form-label'}>Ingredients</label>
                            <select className={'form-select form-control'} value={ingredientId}
                                    onChange={(e) => setIngredientId(e.target.value)}>
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
                                <div className={'row overflow-auto m-1'} style={{maxHeight: '40vh', borderRadius: '4%'}}>
                                    {newDish.ingredients.map((ingredient, index) => (
                                        <button
                                            className={'btn w-100 d-flex text-light justify-content-between align-items-center p-2 rounded m-1'}
                                            style={{backgroundColor: '#2d2d2d'}}
                                            key={index}
                                            type={'button'}>
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
                        <button className={'btn btn-success rounded w-100 mt-auto'} type={'button'}>Add New Dish</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default DishesV2