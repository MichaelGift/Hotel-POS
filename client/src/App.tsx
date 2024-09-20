import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Dishes, Menu, Order, PoS, TablePage, Inventory} from './page';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<PoS/>}>
                <Route index element={<Menu/>}/>
                <Route path='order' element={<Order/>}/>
                <Route path='menu' element={<Menu/>}/>
                <Route path='tables' element={<TablePage/>}/>
                <Route path='inventory' element={<Inventory/>}/>
                <Route path='dishes' element={<Dishes/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default App
export const BASE_URL = "https://hotel-pos-api.vercel.app/api";