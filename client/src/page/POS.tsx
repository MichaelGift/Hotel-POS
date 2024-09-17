import {SideNavButton} from "../components";

import {Outlet} from "react-router-dom";

const PoS = () => {
    return (
        <>
            <div className="container text-light mh-100 mw-100" style={{backgroundColor: '#111315'}}>
                <div className="row">
                    <div className="col-2 d-flex flex-column shadow-lg nav" style={{height: '100vh'}}>
                        <div className="mb-5 mt-2">
                            <h2>Hotel POS</h2></div>
                        <SideNavButton text="Menu" route='menu'/>
                        <SideNavButton text="Reservations" route='reservations'/>
                        <SideNavButton text="Tables" route='tables'/>
                        <SideNavButton text="Ingredients" route='ingredients'/>
                        <SideNavButton text="Dishes" route='dishes'/>
                    </div>
                    <main className="col-10">
                        <Outlet/>
                    </main>

                </div>
            </div>
        </>
    )
}

export default PoS