import 'semantic-ui-css/semantic.min.css';
import { Route } from 'react-router-dom';
import { Router } from 'react-router';
import { MainPage, Login, Register } from '../pages/index';
import { Container } from 'semantic-ui-react';
import history from '../common/utils/history';

function App() {
  return (
    <Router history={history}>
      <Route exact path='/' component={MainPage} />
      <Container>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Container>
    </Router>
  );
}

export default App;
