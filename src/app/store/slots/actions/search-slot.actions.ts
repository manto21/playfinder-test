import { createAction, props, union } from "@ngrx/store";
import { ApiParams, ISlot } from "../../../models/search.model";

export const ACTION_PREFIX = '[Slots]';

export const GET_SLOTS = `${ACTION_PREFIX} Get All Slots`;
export const GET_SLOTS_SUCCESS = `${ACTION_PREFIX} Get All Slots Success`;
export const GET_SLOTS_FAIL = `${ACTION_PREFIX} Get Slots Failure`;

export const getSlots = createAction(
    GET_SLOTS,
    props<{ payload: ApiParams }>()
);

export const getSlotsSuccess = createAction(
    GET_SLOTS_SUCCESS,
    props<{ payload: ISlot[] }>()
);

const all = union({
    getSlots,
    getSlotsSuccess
});

export type CoreActionsUnion = typeof all;
