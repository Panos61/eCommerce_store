import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import { MainPage, Login, Register } from './pages/index';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <Router>
      <MenuBar />
      <Route exact path='/' component={MainPage} />
      <Container>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Container>
    </Router>
  );
}

export default App;
