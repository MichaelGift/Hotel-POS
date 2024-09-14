import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import {Dishes, Home, Inventory, Order} from '../page';


const BASE_URL = "http://localhost:3000/api";


const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/inventory' element={<Inventory/>}/>
            <Route path='/dishes' element={<Dishes/>}/>
            <Route path='/orders' element={<Order/>}/>
        </Routes>
    </BrowserRouter>
)

export default App
