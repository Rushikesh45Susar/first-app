import './App.css';
import  footer from './components/footer.jsx';
import Homepage from './components/Homepage.jsx';
import navbar from './components/Navbar.jsx';
import {Route , Switch} from 'react-router-dom'
import About from './components/about';
import Login from './components/Signin';

function App() {
  return (
    <>
      {navbar}
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/about" component={About} />
        <Route path="/signin" component={Login} />
      </Switch>
      {footer}
    </>
  );      
}

export default App;
