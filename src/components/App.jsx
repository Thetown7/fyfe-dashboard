import React, { useState } from 'react';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProductsPage from './ProductsPage';
import DashboardPage from './DashboardPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedCategory, setSelectedCategory] = useState('');

  

  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={(admin) => {
          setIsAuthenticated(true);
          setIsAdmin(admin);
          setCurrentPage(admin ? 'dashboard' : 'home');
        }}
      />
    );
  }

  if (isAdmin && currentPage === 'dashboard') {
    return <DashboardPage onLogout={() => setIsAuthenticated(false)} />;
  }

  if (currentPage === 'home') {
    return (
      <HomePage
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setCurrentPage('products');
        }}
        onLogout={() => setIsAuthenticated(false)}
      />
    );
  }

  if (currentPage === 'products') {
    return (
      <ProductsPage
        category={selectedCategory}
        onBack={() => setCurrentPage('home')}
      />
    );
  }

  return <div>Errore: Pagina non trovata!</div>;
}
