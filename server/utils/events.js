class Events{
    constructor(){
        this.OrderCreated = 'OrderCreated';
        this.OrderUpdated = 'OrderUpdated';
        this.OrderDeleted = 'OrderDeleted';

        this.DishCreated = 'DishCreated';
        this.DishUpdated = 'DishUpdated';
        this.DishDeleted = 'DishDeleted';

        this.TableCreated = 'TableCreated';
        this.TableUpdated = 'TableUpdated';
        this.TableDeleted = 'TableDeleted';

        this.IngredientCreated = 'IngredientCreated';
        this.IngredientUpdated = 'IngredientUpdated';
        this.IngredientDeleted = 'IngredientDeleted';
    }
}

module.exports = Events;