import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar';
//import { Dashboard, Login, Register, Welcome } from './pages/index';
import { Container } from 'semantic-ui-react';
import MainPage from './pages/MainPage';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <MenuBar />
      <Route exact path='/' component={MainPage} />
      <Container>
        <Route exact path='/login' component={Login} />
      </Container>
    </Router>
  );
}

export default App;
