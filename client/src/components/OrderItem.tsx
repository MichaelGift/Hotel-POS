const OrderItem = ({item, onClick}) => (
    <button
        className="btn w-100 d-flex text-light justify-content-between align-items-center p-2 rounded m-1"
        style={{backgroundColor: '#2d2d2d'}}
        onClick={onClick}>
        <div className="d-flex">
            <h6 className="mb-0">{item.dish.name}</h6>
            <h6 className="mb-0 text-secondary ms-3">x{item.quantityRequired}</h6>
        </div>
        <h6 className="mb-0">Ksh {item.dish.price}</h6>
    </button>
)

export default OrderItem