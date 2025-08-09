import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './styles/Sidebar.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <div className="content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
