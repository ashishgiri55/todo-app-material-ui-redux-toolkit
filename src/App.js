import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Notes from './pages/notes/Notes';
import Create from './pages/notes/createNote/Create';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import { createStore } from './store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
    secondary: purple,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const store = createStore();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Notes />
              </Route>
              <Route path="/create">
                <Create />
              </Route>

              <Route exact path="/update/:id">
                <Create />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
