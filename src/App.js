import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// components
import ContactViewModal from './components/contactViewModal';

// views
import HomeView from './views/home';

// redux
import store from './redux/store';
import { Provider } from 'react-redux';
import { CONTACT_TYPES } from './constants/contactTypes.js';

// css
import './assets/scss/index.scss';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/all-contacts'>
              <ContactViewModal type={CONTACT_TYPES.TYPE_A} />
            </Route>
            <Route path='/us-contacts'>
              <ContactViewModal type={CONTACT_TYPES.TYPE_B} />
            </Route>
            <Route path='/'>
              <HomeView />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
