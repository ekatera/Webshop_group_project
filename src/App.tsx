import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductsApp from './components/ProductsApp';
import DetailsApp from './components/DetailsApp';
const App = () => {
    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<ProductsApp />} />
                    <Route path="products/detail/:id" element={<DetailsApp />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    )
}

export default App