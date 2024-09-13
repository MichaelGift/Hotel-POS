import * as React from "react";
import {useEffect, useState} from "react";

const BASE_URL = "http://localhost:3000/api";

interface Ingredient {
    _id: string;
    name: string;
    quantity: number;
    price: number;
}

const Inventory = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [newIngredient, setNewIngredient] = useState({
        name: "",
        price: 0,
        quantity: 0,
    });
    const [targetIngredient, setTargetIngredient] = useState({
        _id: "",
        name: "",
        price: 0,
        quantity: 0
    })

    // Fetch ingredients on component load
    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response: Response = await fetch(`${BASE_URL}/ingredients`);
                const ingredients: Ingredient[] = await response.json();
                setIngredients(ingredients);
            } catch (error) {
                console.log(error.stack);
            }
        };
        fetchIngredients();
    }, []);

    // Handle input changes in the form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewIngredient({
            ...newIngredient,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTargetIngredient({
            ...targetIngredient,
            [e.target.name]: e.target.value
        })
    }

    // Add a new ingredient via the form
    const addIngredient = async () => {
        try {
            const response: Response = await fetch(`${BASE_URL}/ingredients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newIngredient), // Dynamically send the user input
            });

            const data = await response.json();

            if (response.ok) {
                alert("New Ingredient added");
                setIngredients([...ingredients, data]); // Update ingredient list with the new one
            } else {
                console.log(data);
            }
        } catch (error) {
            console.log(error.stack);
        }
    };

    const deleteIngredient = async (id: string) => {
        try {
            const response: Response = await fetch(`${BASE_URL}/ingredients/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Deleted successfully");
            } else {
                const errorData = await response.json();
                console.log(errorData);
                alert("Something went wrong");
            }
        } catch (error) {
            console.log(error.stack);
        }
    };


    const updateIngredient = async () => {
        try {
            const response: Response = await fetch(`${BASE_URL}/ingredients/${targetIngredient._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(targetIngredient),
            });

            if (response.ok) {
                alert("Updated Successfully");
            } else {
                const errorData = await response.json();
                console.log(errorData);
                alert("Something went wrong");
            }
        } catch (error) {
            console.log(error.stack)
        }
    }
    return (
        <>
            <div>
                <h2>Ingredients</h2>
                <ul>
                    {ingredients.map((ingredient: Ingredient) => {
                        return (
                            <li key={ingredient._id}>
                                Name: {ingredient.name}, Price: {ingredient.price}, Quantity: {ingredient.quantity}
                                <button onClick={() => deleteIngredient(ingredient._id)}>Delete Ingredient</button>
                                <button onClick={() => setTargetIngredient(ingredient)}>Update Ingredient</button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div>
                <h2>Add New Ingredient</h2>
                <form
                    onSubmit={() => {
                        addIngredient();
                    }}
                >
                    <input
                        type="text"
                        name="name"
                        value={newIngredient.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={newIngredient.price}
                        onChange={handleChange}
                        placeholder="Price"
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        value={newIngredient.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        required
                    />
                    <button type="submit">Add Ingredient</button>
                </form>
            </div>

            <div>
                <h2>Update Ingredient</h2>
                <form
                    onSubmit={() => {
                        updateIngredient();
                    }}
                >
                    <input
                        type="text"
                        name="name"
                        value={targetIngredient.name}
                        onChange={handleUpdate}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={targetIngredient.price}
                        onChange={handleUpdate}
                        placeholder="Price"
                        required
                    />
                    <input
                        type="number"
                        name="quantity"
                        value={targetIngredient.quantity}
                        onChange={handleUpdate}
                        placeholder="Quantity"
                        required
                    />
                    <button type="submit">Update Ingredient</button>
                </form>
            </div>
        </>
    );
};

export default Inventory;
