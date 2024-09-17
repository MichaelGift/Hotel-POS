const MenuDish = ({dish, onClick}) => (
    <div className="col-md-3 p-1">
        <button className="btn text-light w-100 h-100 p-3 rounded"
                style={{backgroundColor: '#2d2d2d'}}
                onClick={onClick}
        >{dish.name}</button>
    </div>
)

export default MenuDish