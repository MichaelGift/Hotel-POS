import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import {Home, Inventory} from '../page';


const BASE_URL = "http://localhost:3000/api";


const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/inventory' element={<Inventory/>}/>
        </Routes>
    </BrowserRouter>
)

export default App
