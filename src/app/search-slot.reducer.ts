import { createReducer, on, Action, createFeatureSelector } from '@ngrx/store';
import { getSlots, returnSlots, getOneSlot, returnOneSlot } from './search-slot.actions';

import { ResultData } from './models/search.model';

// export default class ResultDataState {
//     results: ResultData[];
//     oneSlot: ResultData;
// }

export const initialState: ResultData[] = [];

const reducer1 = createReducer(
    initialState,
    on(getSlots, state => state),
    on(returnSlots, (state, { payload }) => (
        payload
    ))
);

// const reducer2 = createReducer(
//     initialState,
//     on(getOneSlot, state => state),
//     on(returnOneSlot, (state, { payload }) => (
//         {oneSlot: payload}
//     )),
// );

export function searchSlotReducer(state, action: Action) {
    return reducer1(state, action);
}

// export function searchOneSlotReducer(state, action: Action) {
//     return reducer2(state, action);
// }
