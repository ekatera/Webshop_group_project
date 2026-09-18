import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './components/Products';
import Details from './components/Details';
const App = () => {
    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="products/detail/:id" element={<Details />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    )
}

export default App