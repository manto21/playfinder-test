import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSlots from '../reducers/search-slot.reducer';

export const selectSlotState = createFeatureSelector<fromSlots.ISlotsState>(
    fromSlots.slotsFeatureKey,
);

export const selectSlotsLoading = createSelector(
    selectSlotState,
    fromSlots.getSlotsLoading,
);

export const selectSlotsEntities = createSelector(
    selectSlotState,
    fromSlots.getSlotsEntities,
);

export const selectSlotsErrors = createSelector(
    selectSlotState,
    fromSlots.getSlotsErrors,
);