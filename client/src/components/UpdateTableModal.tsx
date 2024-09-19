const UpdateTableModal = ({name, seats, onClose, onDelete, onUpdate, handleUpdate, removeSeatFromTable}) => (
    <>
        <div className={`modal fade show`} style={{display: "block"}} tabIndex="-1" role="dialog">
            <div className={`modal-dialog fade show modal-dialog modal-dialog-centered rounded`} role="document">
                <div className={`modal-content`} style={{backgroundColor: '#2d2d2d', borderRadius: '4%'}}>
                    <div className={`modal-header`}>
                        <h5 className={`modal-title`}>{name}</h5>
                        <button type="button" className={`close btn-secondary btn text-light rounded-circle`}
                                onClick={onClose}>X
                        </button>
                    </div>

                    <div className={`modal-body`}>
                        <form>
                            <div className={`mb-3`}>
                                <label className={`form-label`}>Name</label>
                                <input name={`name`} type="text" placeholder={name} value={name} onChange={handleUpdate}
                                       className={`form-control`}/>
                            </div>

                            <div className={'mb-3'}>
                                <label className={'form-label m-0'}>Seats</label>
                                <div className={'row overflow-auto m-1'}
                                     style={{maxHeight: '50vh', borderRadius: '4%'}}>
                                    {seats.map((seat) => (
                                        <div key={seat.seat_number}
                                             className={'w-100 d-flex justify-content-between align-items-center p-1'}
                                             style={{backgroundColor: '#2d2d2d'}}>
                                            <p className={'form-control bg-dark border-0 text-light m-0 p-2 align-content-center'}>Seat {seat.seat_number}</p>
                                            <button type={'button'} className={'btn btn-danger rounded'}
                                                    onClick={() => removeSeatFromTable(seat.seat_number)}>X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`modal-footer`}>
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

export default UpdateTableModal;