import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Dishes, Home, Inventory, Menu, Order, PoS, Table} from './page';


const BASE_URL = "http://localhost:3000/api";


const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/inventory' element={<Inventory/>}/>
            <Route path='/dishes' element={<Dishes/>}/>
            <Route path='/orders' element={<Order/>}/>
            <Route path='/tables' element={<Table/>}/>
            <Route path='/pos' element={<PoS/>}>
                <Route index element={<Menu/>}/>
                <Route path='menu' element={<Menu/>}/>
                <Route path='reservations'/>
                <Route path='tables'/>
                <Route path='ingredients'/>
                <Route path='dishes'/>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default App
