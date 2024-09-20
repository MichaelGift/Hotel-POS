import {Link, Outlet} from "react-router-dom";
import {useState} from "react";

const PoS = () => {
    const [selection, setSelection] = useState('menu');

    return (
        <>
            <div className="container text-light mh-100 mw-100" style={{backgroundColor: '#111315'}}>
                <div className="row">
                    <div className="col-2 d-flex flex-column shadow-lg nav" style={{height: '100vh'}}>
                        <div className="mb-5 m-2">
                            <h2>&#127858; Serine POS</h2>
                        </div>
                        <ul className={'nav nav-pills flex-column'}>
                            <li className={'nav-item'}>
                                <Link to={'menu'}
                                      className={`nav-link btn text-light mb-1 p-2 ${selection === 'menu' ? 'active' : ''} rounded w-100`}
                                      onClick={() => setSelection('menu')}>Menu</Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link to={'order'}
                                      className={`nav-link btn text-light mb-1 p-2 ${selection === 'orders' ? 'active' : ''} rounded w-100`}
                                      onClick={() => setSelection('orders')}>Orders</Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link to={'tables'}
                                      className={`nav-link btn text-light mb-1 p-2 ${selection === 'tables' ? 'active' : ''} rounded w-100`}
                                      onClick={() => setSelection('tables')}>Tables</Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link to={'dishes'}
                                      className={`nav-link btn text-light mb-1 p-2 ${selection === 'dishes' ? 'active' : ''} rounded w-100`}
                                      onClick={() => setSelection('dishes')}>Dishes</Link>
                            </li>
                            <li className={'nav-item'}>
                                <Link to={'inventory'}
                                      className={`nav-link btn text-light mb-1 p-2 ${selection === 'inventory' ? 'active' : ''} rounded w-100`}
                                      onClick={() => setSelection('inventory')}>Inventory</Link>
                            </li>
                        </ul>

                        <div className={'mt-auto w-100'}>
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p className={'small text-muted'}>Do hard things.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    With <span style={{color: "red"}}>♥</span> from Antares
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <main className="col-10" style={{height: '100vh'}}>
                        <Outlet/>
                    </main>

                </div>
            </div>
        </>
    )
}

export default PoS