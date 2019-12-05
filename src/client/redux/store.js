import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

let middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middlewares.push(logger);
}
const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middlewares),
    )
);

export default store;