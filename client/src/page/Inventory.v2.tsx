import {useEffect, useState} from "react";
import {BASE_URL, Ingredient} from "./Inventory.tsx";
import {IngredientCard} from "../components";

const InventoryV2 = () => {
    const [ingredients, setIngredient] = useState<Ingredient[]>([])
    const [newIngredient, setNewIngredient] = useState({
        name: "",
        price: 0,
        quantity: 0,
    })

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch(`${BASE_URL}/ingredients`);
                const data = await response.json();

                if (response.ok) {
                    setIngredient(data);
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.log(error.stack);
            }
        }
        fetchIngredients()
    }, []);

    const handleChange = (e) => {
        setNewIngredient({
            ...newIngredient, [e.target.name]: e.target.value
        })
    }

    const createNewIngredient = async () => {
        try {
            const response = await fetch(`${BASE_URL}/ingredients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newIngredient)
            });

            const data = await response.json();

            if (response.ok) {
                setIngredient([...ingredients, data]);
                console.log("Success");
                setNewIngredient({name: "", price: 0, quantity: 0,})
            } else {
                console.log(data);
            }
        } catch (error) {
            console.log(error.stack);
        }
    }
    return (
        <>
            <div className='row'>
                <div className='col-8 d-flex flex-column'>
                    <div className='row d-flex'>
                        {ingredients.map((ingr) => (
                            <IngredientCard {...ingr} key={ingr._id}/>
                        ))}
                    </div>
                </div>
                <div className='col-4 d-flex flex-column shadow-sm rounded w-auto'>
                    <div className="mb-2 mt-2">
                        <h5>New Ingredient</h5>
                    </div>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input className="form-control rounded" type="text" name="name" value={newIngredient.name}
                                   onChange={handleChange} required/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Price per Unit</label>
                            <input className="form-control rounded" type="number" name="price"
                                   value={newIngredient.price}
                                   onChange={handleChange} required/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Quantity</label>
                            <input className="form-control rounded" type="number" name="quantity"
                                   value={newIngredient.quantity} onChange={handleChange}/>
                        </div>

                        <button className="btn btn-success rounded" onClick={createNewIngredient} type="button">Add to Inventory</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default InventoryV2