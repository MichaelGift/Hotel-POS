const UpdateIngredientModal = ({name, price, quantity, onClose, onDelete, onUpdate, handleUpdate}: {
    name: string,
    price: number,
    quantity: number,
    onClose: () => void,
    onDelete: () => void,
    onUpdate: () => void,
    handleUpdate: (event: any) => void
}) => (
    <>
        <div className="modal fade show" style={{display: "block"}} tabIndex={-1} role="dialog">
            <div className="model fade show modal-dialog modal-dialog-centered rounded" role="document">
                <div className="modal-content" style={{backgroundColor: '#2d2d2d', borderRadius: '4%'}}>
                    <div className="modal-header border-0">
                        <h5 className="modal-title">{name}</h5>
                        <button type="button" className={`close btn-secondary btn text-light`}
                                style={{borderRadius: '25%'}}
                                onClick={onClose}>&times;
                        </button>
                    </div>

                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className='form-label'>Name</label>
                                <input name='name' type="text" placeholder={name} value={name} onChange={handleUpdate}
                                       className='form-control'/>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Price</label>
                                <input name='price' type='number' placeholder={`${price}`} value={price}
                                       onChange={handleUpdate}
                                       className='form-control'/>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Quantity</label>
                                <input name='quantity' type='number' placeholder={`${quantity}`} value={quantity}
                                       onChange={handleUpdate}
                                       className='form-control'/>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer border-0">
                        <button type="button" className="btn btn-secondary rounded" onClick={onClose}>
                            Close
                        </button>
                        <button type="button" className="btn btn-danger rounded" onClick={onDelete}>Delete</button>

                        <button type="button" className="btn btn-success rounded" onClick={onUpdate}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
)

export default UpdateIngredientModal