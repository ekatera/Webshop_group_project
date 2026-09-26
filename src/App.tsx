import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './components/Products';
import Details from './components/Details';
import Order from './components/Order';
const App = () => {
    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/detail/:id" element={<Details />} />
                    <Route path="/order" element={<Order />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    )
}

export default App