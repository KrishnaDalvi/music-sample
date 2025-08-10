import { useState, useEffect } from 'react'; // <-- Imported useEffect
import Navbar from './components/Navbar';
import Hero3DBox from './components/Hero3DBox';
import ProductGrid from './components/ProductGrid';
import CartPage from './components/CartPage';
import AllPacksPage from './components/AllPacksPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PaymentGateway from './components/PaymentGateway';
import ThankYouPage from './pages/ThankYouPage';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  // --- START: NEW CODE TO HANDLE PAYMENT REDIRECT ---
  // This effect runs once when the app loads to check the URL
  useEffect(() => {
    const path = window.location.pathname;
    
    // If the user is redirected from Cashfree, the path will be /payment/status
    if (path === '/payment/status') {
      const searchParams = new URLSearchParams(window.location.search);
      const orderId = searchParams.get('order_id');
      
      // Call your existing success handler to show the thank you page
      handlePaymentSuccess({ orderId });
      
      // Optional: It's good practice to clean up the URL after handling the redirect
      // This replaces the URL in the browser's history, so if the user refreshes,
      // they won't trigger the payment success logic again.
      window.history.replaceState(null, '', '/');
    }
  }, []); // The empty array [] ensures this effect runs only once on component mount
  // --- END: NEW CODE ---

  // Cart functions
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (index, quantity) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = quantity;
    setCartItems(newCartItems);
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const checkout = () => {
    setCurrentPage('payment');
  };

  const handlePaymentSuccess = (details) => {
    setOrderDetails(details);
    setCartItems([]); // Clear the cart
    setCurrentPage('thank-you');
  };

  const handlePaymentCancel = () => {
    setCurrentPage('cart');
  };

  const continueShopping = () => {
    setCurrentPage('home');
  };

  // User authentication functions
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser({
      name: userData.displayName || `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      uid: userData.uid
    });
    setCurrentPage('home');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleNavigateToLogin = () => {
    setCurrentPage('login');
  };

  const handleNavigateToSignup = () => {
    setCurrentPage('signup');
  };

  const handleSignup = (userData) => {
    setIsLoggedIn(true);
    setUser({
      name: userData.displayName || `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      uid: userData.uid
    });
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleCartClick = () => {
    setCurrentPage('cart');
  };

  const handleViewAllPacks = () => {
    setCurrentPage('all-packs');
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onNavigateToSignup={handleNavigateToSignup}
            onBackToHome={handleBackToHome}
          />
        );
      case 'signup':
        return (
          <SignupPage
            onSignup={handleSignup}
            onNavigateToLogin={handleNavigateToLogin}
            onBackToHome={handleBackToHome}
          />
        );
      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={checkout}
            onContinueShopping={continueShopping}
          />
        );
      case 'payment':
        return (
          <PaymentGateway
            cartItems={cartItems}
            totalAmount={cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentCancel={handlePaymentCancel}
            user={user}
          />
        );
      case 'thank-you':
        return (
          <ThankYouPage
            onBackToHome={handleBackToHome}
            orderDetails={orderDetails}
          />
        );
      case 'all-packs':
        return (
          <AllPacksPage
            onAddToCart={addToCart}
          />
        );
      default:
        return (
          <>
            <Hero3DBox />
            <ProductGrid onAddToCart={addToCart} />
          </>
        );
    }
  };

  return (
    <div className="App">
      <Navbar 
        cartItemCount={cartItemCount}
        onCartClick={handleCartClick}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onNavigateToLogin={handleNavigateToLogin}
        onNavigateToSignup={handleNavigateToSignup}
      />
      
      {renderCurrentPage()}
      
      {currentPage === 'home' && <Footer />}
    </div>
  );
}

export default App;
