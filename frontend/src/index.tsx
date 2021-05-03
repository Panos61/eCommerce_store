import ReactDOM from 'react-dom';
import App from './app/App';
import 'semantic-ui-css/semantic.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';

const client = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
);
