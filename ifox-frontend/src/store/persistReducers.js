import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
    const persitedReducer = persistReducer({
        key: '@iFoxx',
        storage,
        whitelist: ['auth', 'user'],
    }, reducers)
    
    return persitedReducer;
}