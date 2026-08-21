import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import AboutSection from './components/AboutSection';
import SpecialCreations from './components/SpecialCreations';
import MenuCarousel from './components/MenuCarousel';
import Gallery from './components/Gallery';
import Promotions from './components/Promotions';
import Franchise from './components/Franchise';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OrderForm from './components/OrderForm';

export default function App() {
  return (
    <CartProvider>
      <Header />
      <main>
        <HeroCarousel />
        <AboutSection />
        <SpecialCreations />
        <MenuCarousel />
        <Promotions />
        <Gallery />
        <Franchise />
        <Contact />
      </main>
      <Footer />
      <OrderForm />
    </CartProvider>
  );
}
