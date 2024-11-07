import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './store/reducers/filterReducer';
import userReducer from './store/reducers/userReducer';
import modalReducer from './store/reducers/modalReducer';

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        user: userReducer,
        modal: modalReducer,
    },
});
