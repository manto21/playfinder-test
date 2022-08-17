import { createAction, props, union } from '@ngrx/store';
import { ApiParams, ResultData } from './models/search.model';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

export const getSlots = createAction(
    '[Slots] Get Slots',
    props<{ api_params: ApiParams }>(),
);

export const returnSlots = createAction(
    '[Slots] Return Slots',
    props<{ payload: ResultData[] }>()
);

export const getOneSlot = createAction(
    '[Slots] Get One Slot',
    props<{ result_id: number }>(),
);

export const returnOneSlot = createAction(
    '[Slots] Return One Slot',
    props<{ payload: ResultData }>()
);

const all = union({
    getSlots,
    returnSlots,
    getOneSlot,
    returnOneSlot
});

export type CoreActionsUnion = typeof all;
