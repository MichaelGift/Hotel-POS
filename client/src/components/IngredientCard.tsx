const IngredientCard = ({name, price, quantity, onClick}) => (
    <div className="col-md-3 p-1">
        <button className="btn text-light w-100 h-100 p-3 rounded"
                style={{backgroundColor: '#2d2d2d'}}
                onClick={onClick}>
            <h5 className='m-0 p-0'>{name}</h5>
            <p className="text-secondary m-0 p-0">x{quantity}</p>
        </button>
    </div>
)

export default IngredientCard