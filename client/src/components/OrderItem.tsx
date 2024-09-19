const OrderItem = ({item, onClick, handleUpdate}) => (
    <div
        className="col-12 p-1">
        <div className="input-group">
            <input
                className="form-control bg-dark border-0 text-light"
                type={'text'}
                value={item.dish.name}
                disabled/>
            <input className="form-control bg-dark border-0 text-light"
                   name='quantityRequired'
                   type={'number'}
                   value={item.quantityRequired}
                   onChange={handleUpdate}
            />
            <button className="btn btn-danger" type={'button'} onClick={onClick}>Remove</button>
        </div>
    </div>
)

export default OrderItem