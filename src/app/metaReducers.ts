import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { Cypher } from 'src/app/services/encrypt.service';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    let cry = new Cypher();

    return localStorageSync({
        keys: [
            {
                tiendasReducer: {
                    encrypt: (state: string) => cry.encrypt(state),
                    decrypt: (state: any) => cry.decryptStorage(state)
                }
            },
        ],
        rehydrate: true,
    })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
