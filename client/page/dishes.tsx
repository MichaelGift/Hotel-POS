import { BASE_URL, Ingredient } from "./Inventory.tsx";
import { useEffect, useState } from "react";

interface Dish {
  _id: string;
  name: string;
  price: number;
  ingredients: {
    ingredient: Ingredient;
    quantityRequired: number;
    _id: string;
  }[];
}

const Dishes = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [newDish, setNewDish] = useState({
    name: "",
    price: 0,
    ingredients: []
  });

  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);
  const [ingredientId, setIngredientId] = useState("");
  const [quantityRequired, setQuantityRequired] = useState(1);
  const [targetDish, setTargetDish] = useState<Dish | null>(null); // For update

  // Fetch Dishes and Available Ingredients
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response: Response = await fetch(`${BASE_URL}/dishes`);
        const dishes = await response.json();
        setDishes(dishes);
      } catch (error) {
        console.log(error.stack);
      }
    };

    const fetchIngredients = async () => {
      try {
        const response: Response = await fetch(`${BASE_URL}/ingredients`);
        const ingredients = await response.json();
        setAvailableIngredients(ingredients);
      } catch (error) {
        console.log(error.stack);
      }
    };

    fetchDishes();
    fetchIngredients();
  }, []);

  const handleDishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (targetDish) {
      setTargetDish({
        ...targetDish,
        [e.target.name]: e.target.value
      });
    } else {
      setNewDish({
        ...newDish,
        [e.target.name]: e.target.value
      });
    }
  };

  const addIngredientToDish = () => {
    if (ingredientId && quantityRequired > 0) {
      const ingredientToAdd = availableIngredients.find((ing) => ing._id === ingredientId);

      if (ingredientToAdd) {
        if (targetDish) {
          setTargetDish({
            ...targetDish,
            ingredients: [
              ...targetDish.ingredients,
              {
                ingredient: ingredientToAdd,
                quantityRequired: quantityRequired,
                _id: ingredientToAdd._id
              }
            ]
          });
        } else {
          setNewDish({
            ...newDish,
            ingredients: [
              ...newDish.ingredients,
              {
                ingredient: ingredientToAdd,
                quantityRequired: quantityRequired,
                _id: ingredientToAdd._id
              }
            ]
          });
        }
        setIngredientId("");
        setQuantityRequired(1);
      }
    }
  };

  const addNewDish = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: Response = await fetch(`${BASE_URL}/dishes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newDish)
      });

      const data = await response.json();

      if (response.ok) {
        alert("New Dish Added");
        setDishes([...dishes, data]);
        setNewDish({ name: "", price: 0, ingredients: [] }); // Reset form after adding
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  const deleteDish = async (id: string) => {
    try {
      const response: Response = await fetch(`${BASE_URL}/dishes/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        alert("Dish deleted successfully");
        setDishes(dishes.filter((dish) => dish._id !== id));
      } else {
        const errorData = await response.json();
        console.log(errorData);
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  const updateDish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetDish) return;

    try {
      const response: Response = await fetch(`${BASE_URL}/dishes/${targetDish._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(targetDish)
      });

      if (response.ok) {
        alert("Dish has been updated");
        const updatedDish = await response.json();
        setDishes(dishes.map((dish) => (dish._id === targetDish._id ? updatedDish : dish)));
        setTargetDish(null); // Reset update form
      } else {
        const errorData = await response.json();
        console.log(errorData);
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  // Load a dish's details into the form for updating
  const loadDishToUpdate = (dish: Dish) => {
    setTargetDish(dish);
  };

  return (
    <>
      <h2>Dishes</h2>
      <ul>
        {dishes.map((dish: Dish) => (
          <li key={dish._id}>
            Name: {dish.name}, Price: {dish.price}
            <button onClick={() => deleteDish(dish._id)}>Delete Dish</button>
            <button onClick={() => loadDishToUpdate(dish)}>Update</button>
            <ul>
              {dish.ingredients.map((ingredient) => (
                <li key={ingredient._id}>
                  Ingredient: {ingredient.ingredient.name}, Quantity Required: {ingredient.quantityRequired}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h2>Add New Dish</h2>
      <form onSubmit={addNewDish}>
        <input
          type="text"
          name="name"
          value={newDish.name}
          onChange={handleDishChange}
          placeholder="Dish Name"
          required
        />
        <input
          type="number"
          name="price"
          value={newDish.price}
          onChange={handleDishChange}
          placeholder="Dish Price"
          required
        />

        <h3>Add Ingredients</h3>
        <select value={ingredientId} onChange={(e) => setIngredientId(e.target.value)}>
          <option value="">Select Ingredient</option>
          {availableIngredients.map((ingredient) => (
            <option key={ingredient._id} value={ingredient._id}>
              {ingredient.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={quantityRequired}
          onChange={(e) => setQuantityRequired(Number(e.target.value))}
          placeholder="Quantity Required"
        />
        <button type="button" onClick={addIngredientToDish}>
          Add Ingredient
        </button>

        <h4>Selected Ingredients</h4>
        <ul>
          {newDish.ingredients.map((ingredient) => (
            <li key={ingredient._id}>
              {ingredient.ingredient.name}: {ingredient.quantityRequired}
            </li>
          ))}
        </ul>

        <button type="submit">Add New Dish</button>
      </form>

      {targetDish && (
        <>
          <h2>Update Dish</h2>
          <form onSubmit={updateDish}>
            <input
              type="text"
              name="name"
              value={targetDish.name}
              onChange={handleDishChange}
              placeholder="Dish Name"
              required
            />
            <input
              type="number"
              name="price"
              value={targetDish.price}
              onChange={handleDishChange}
              placeholder="Dish Price"
              required
            />

            <h3>Update Ingredients</h3>
            <select value={ingredientId} onChange={(e) => setIngredientId(e.target.value)}>
              <option value="">Select Ingredient</option>
              {availableIngredients.map((ingredient) => (
                <option key={ingredient._id} value={ingredient._id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={quantityRequired}
              onChange={(e) => setQuantityRequired(Number(e.target.value))}
              placeholder="Quantity Required"
            />
            <button type="button" onClick={addIngredientToDish}>
              Add Ingredient
            </button>

            <h4>Selected Ingredients</h4>
            <ul>
              {targetDish.ingredients.map((ingredient) => (
                <li key={ingredient._id}>
                  {ingredient.ingredient.name}: {ingredient.quantityRequired}
                </li>
              ))}
            </ul>

            <button type="submit">Update Dish</button>
          </form>
        </>
      )}
    </>
  );
};

export default Dishes;
