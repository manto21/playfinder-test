import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class ApiParams {
    pitch_id: number;
    start_date: string;
    end_date: string;
}

export class FormInputs {
    pitch_id: number;
    start_date_object: NgbDateStruct;
    end_date_object: NgbDateStruct;
}

export class ISlots {
    meta: ISlotsMeta;
    data: ISlot[];
}

export class ISlotsMeta {
    total_items: number;
    filter: ISlotsMetaFilter;
}

export class ISlotsMetaFilter {
    starts: string;
    ends: string;
    fromTime: string;
    toTime: string;
}

export class ISlot {
    type: string;
    id: string;
    attributes: ISlotAttributes;
}

export class ISlotAttributes {
    starts: string;
    ends: string;
    price: string;
    admin_fee: string;
    currency: string;
    availabilities: number;
}
