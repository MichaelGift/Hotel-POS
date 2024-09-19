const UpdateDishModal = ({name, price, ingredients, onClose, onDelete, onUpdate, handleUpdate}) => (
    <>
        <div className={`modal fade show`} style={{display: "block"}} tabIndex="-1" role="dialog">
            <div className={`modal-dialog fade show modal-dialog modal-dialog-centered rounded`} role="document">
                <div className={`modal-content`} style={{backgroundColor: '#2d2d2d', borderRadius: '4%'}}>
                    <div className={`modal-header border-0`}>
                        <h5 className={`modal-title`}>{name}</h5>
                        <button type="button" className={`close btn-secondary btn text-light`}
                                style={{borderRadius: '25%'}}
                                onClick={onClose}>&times;
                        </button>
                    </div>

                    <div className={`modal-body`}>
                        <form>
                            <div className={`mb-3`}>
                                <label className={`form-label`}>Name</label>
                                <input name={`name`} type="text" placeholder={name} value={name} onChange={handleUpdate}
                                       className={`form-control`}/>
                            </div>

                            <div className={`mb-3`}>
                                <label className={`form-label`}>Price</label>
                                <input name={`price`} type={`number`} placeholder={price} value={price}
                                       onChange={handleUpdate}
                                       className={`form-control`}/>
                            </div>

                            <div className={`container mb-3`}>
                                <label className={`form-label`}>Ingredients</label>
                                <div className={'row overflow-auto m-1'}
                                     style={{maxHeight: '40vh', borderRadius: '4%'}}>
                                    {ingredients.map((ingredient, index) => (
                                        <button key={index}
                                                className={`btn btn-secondary w-100 d-flex text-light 
                                                justify-content-between align-items-center p-2 rounded m-1`}
                                                type={'button'}>
                                            {ingredient.ingredient.name}: x{ingredient.quantityRequired}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={`modal-footer border-0`}>
                                <button type="button" className={`btn btn-secondary rounded`} onClick={onClose}>
                                    Close
                                </button>
                                <button type="button" className={`btn btn-danger rounded`} onClick={onDelete}>Delete
                                </button>
                                <button type="button" className={`btn btn-success rounded`} onClick={onUpdate}>
                                    Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
)

export default UpdateDishModal