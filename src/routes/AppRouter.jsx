import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Home } from '../page/Home'
import {IsArchived} from '../page/IsArchived'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/archived" element={<IsArchived />} />
                <Route path="/" element={<Home />} />
            </Routes>    
        </BrowserRouter>
    )
}