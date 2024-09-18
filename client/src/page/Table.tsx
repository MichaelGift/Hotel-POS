import {useEffect, useState} from "react";

import {BASE_URL} from "../App.tsx";


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

const Table = () => {
    const [tables, setTables] = useState<Table[]>([])

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
    });

    return (
        <>
            <ul>
                {tables.map((table) => (
                    <li key={table._id}>
                        Name: {table.name},
                        Reserved: {table.reserved}
                        <ul>
                            {table.seats.map((seat) => (
                                <li key={seat._id}>
                                    Seat No: {seat.seat_number},
                                    Occupied: {seat.occupied}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    )

}

export default Table