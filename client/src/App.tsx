import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {DishesV2, Home, Menu, Order, PoS, Table, Inventory} from './page';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/pos' element={<PoS/>}>
                <Route index element={<Menu/>}/>
                <Route path='order' element={<Order/>}/>
                <Route path='menu' element={<Menu/>}/>
                <Route path='tables' element={<Table/>}/>
                <Route path='inventory' element={<Inventory/>}/>
                <Route path='dishes' element={<DishesV2/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default App
export const BASE_URL = "http://localhost:3000/api";