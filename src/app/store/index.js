import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import * as sagas from './sagas';
import * as mutations from './mutations'
import { rootReducer } from './reducers'

const sagaMiddleware = createSagaMiddleware();


export const store = createStore(
  rootReducer,
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

//burda applyMiddleware ve redux logger gorevi sadece bir console log gibi dir mevcut action gormek ve state deki degisikleri gorme
// tir nothing baska birsey degildir
