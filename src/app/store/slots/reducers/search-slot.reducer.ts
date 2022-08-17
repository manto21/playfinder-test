import { createReducer, on } from "@ngrx/store";
import {
    getSlots,
    getSlotsSuccess,
} from "../actions/search-slot.actions";
import { ISlot } from "../../../models/search.model";

export const slotsFeatureKey = 'slots';

export class ISlotsState {
    entities: { [id: string]: ISlot };
    loading: boolean;
    errors: any;
}

export const initialState: ISlotsState = {
    entities: {},
    loading: false,
    errors: null
}

export const searchSlotReducer = createReducer(
    initialState,
    on(getSlots, (state) => ({
        ...state,
        loading: true,
        entities: {},
    })),

    on(getSlotsSuccess, (state, action) => {
        const slots: ISlot[] = action.payload;
        const entities: { [id: string]: ISlot } = slots.reduce(
            (acc, curr) => ({ ...acc, [curr.id]: curr }),
            {},
        );

        return {
            ...state,
            entities,
            loading: false
        };
    }),
);

export const getSlotsLoading = (state: ISlotsState) => state.loading;
export const getSlotsErrors = (state: ISlotsState) => state.errors;
export const getSlotsEntities = (state: ISlotsState) => {
    return state && state.entities ? Object.keys(state.entities).map(k => state.entities[k]) : [];
};