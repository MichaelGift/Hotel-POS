const MenuDish = ({dish, onClick}) => (
    <div className="col-md-3 p-1">
        <button
            className="btn text-light w-100 h-100 p-3 rounded"
            style={{backgroundColor: '#2d2d2d'}}
            onClick={onClick}>

            <h6 className={'m-0 p-0'}>{dish.name}</h6>
            <p className={'text-secondary m-0 p-0'}>Ksh {dish.price}</p>
        </button>
    </div>
)

export default MenuDish