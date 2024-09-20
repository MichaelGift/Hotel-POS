import {useEffect, useState} from "react";

import {BASE_URL} from "../App.tsx";
import UpdateTableModal from "../components/UpdateTableModal.tsx";


export interface Table {
    _id: string,
    name: string,
    reserved: boolean,
    seats: {
        seat_number: number,
        occupied: boolean,
        _id: string
    }[]
}

const TablePage = () => {
    const [tables, setTables] = useState<Table[]>([]);
    const [targetTable, setTargetTable] = useState<Table>(null);
    const [newTable, setNewTable] = useState({
        name: "",
        reserved: false,
        seats: []
    });

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setTargetTable(null);
        setShowModal(false);
    }

    const handleShow = (table) => {
        setTargetTable(table);
        setShowModal(true);
    }
    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tables`);
                const data = await response.json();

                if (response.ok) {
                    setTables(data);
                } else {
                    alert("Something went wrong");
                    console.log(data)
                }

            } catch (error) {
                console.log(error.stack)
            }
        }

        fetchTables()
    } , []);

    const updateTable = async () => {
        try {
            const response = await fetch(`${BASE_URL}/tables/${targetTable._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(targetTable)
            })

            const data = await response.json();
            if (response.ok) {
                setTables(tables.map((table) => table._id === targetTable._id ? targetTable : table))
            } else {
                alert("Something went wrong")
                console.log(data)
            }
        } catch (error) {
            console.log(error.stack)
        }
    }

    const deleteTable = async () => {
        try {
            const response = await fetch(`${BASE_URL}/tables/${targetTable._id}`, {
                method: "DELETE"
            })

            const data = await response.json();
            if (response.ok) {
                setTables(tables.filter((table) => table._id !== targetTable._id))
            } else {
                alert("Something went wrong")
                console.log(data)
            }
        } catch (error) {
            console.log(error.stack)
        }
    }

    const createTable = async () => {
        try {
            const response = await fetch(`${BASE_URL}/tables`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTable)
            });

            const data = await response.json();
            if (response.ok) {
                setTables([...tables, data])
                setNewTable({
                    name: "",
                    reserved: false,
                    seats: []
                })
            } else {
                alert("Something went wrong")
                console.log(data)
            }
        } catch (error) {
            console.log(error.stack)
        }
    }

    const handleTableCreation = (e) => {
        setNewTable({...newTable, [e.target.name]: e.target.value})
    }

    const addSeatToTable = () => {
        setNewTable({
            ...newTable,
            seats: [...newTable.seats, {seat_number: newTable.seats.length + 1, occupied: false}]
        })
    }

    const removeSeatFromTable = (seat_number) => {
        setNewTable({
            ...newTable,
            seats: newTable.seats.filter((seat) => seat.seat_number !== seat_number)
        })
    }

    const removeSeatFromTargetTable = (seat_number) => {
        setTargetTable({
            ...targetTable,
            seats: targetTable.seats.filter((seat) => seat.seat_number !== seat_number)
        })
    }
    return (
        <>
            {showModal && (
                <UpdateTableModal {...targetTable} onClose={handleClose}
                                  onUpdate={() => {
                                      updateTable()
                                      handleClose()
                                  }}
                                  removeSeatFromTable={removeSeatFromTargetTable}
                                  onDelete={() => {
                                      deleteTable()
                                      handleClose()
                                  }}
                                  handleUpdate={(e) => setTargetTable({
                                      ...targetTable,
                                      [e.target.name]: e.target.value
                                  })}
                />)}
            {showModal && <div className="modal-backdrop fade show"></div>}

            <div className={'row'}>
                <div className={'col-8 d-flex flex-column'}>
                    <div className={'row d-flex overflow-auto'} style={{maxHeight:'99vh'}}>
                        {tables.map((table) => (
                                <div className={'col-md-3 p-1'}key={table._id}>
                                    <button className={'btn text-light w-100 h-100 p-3 rounded'}
                                            style={{backgroundColor: "#2d2d2d"}}
                                            onClick={() => handleShow(table)}>
                                        <h5 className={'m-0 p-0'}>{table.name}</h5>
                                        <p className={'text-secondary m-0 p-0'}>Seats: {table.seats.length}</p>
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className={'col-4 d-flex flex-column shadow-sm rounded w-auto'}>
                    <div className={'mb-2 mt-2'}>
                        <h5>New Table</h5>
                    </div>

                    <form>
                        <div className={'mb-3'}>
                            <label className={'form-label'}>Name</label>
                            <input name={'name'} type={'text'} value={newTable.name} onChange={handleTableCreation}
                                   className={'form-control'}/>
                        </div>

                        <div className={'mb-3'}>
                            <label className={'form-label'}>Seats</label>
                            <button className={'btn btn-primary w-100 mt-2'} type={'button'}
                                    onClick={addSeatToTable}>Add Seat
                            </button>
                            <div className={'container'}>
                                <div className={'row overflow-auto m-1'}
                                     style={{maxHeight: '50vh', borderRadius: '4%'}}>
                                    {newTable.seats.map((seat) => (
                                        <div className={'col-12 p-1'} key={seat.seat_number}>
                                            <div className={'input-group'}>
                                                <input type={'number'} className={'form-control bg-dark border-0 text-light'}
                                                       value={seat.seat_number} disabled/>
                                                <button className={'btn btn-danger'} type={'button'}
                                                        onClick={() => removeSeatFromTable(seat.seat_number)}>Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button className={'btn btn-success rounded w-100 mt-auto'} type={'button'}
                                onClick={createTable}>Create Table
                        </button>
                    </form>
                </div>
            </div>
        </>
    )

}

export default TablePage