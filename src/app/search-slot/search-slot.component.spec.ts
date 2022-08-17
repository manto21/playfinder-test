import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchSlotComponent } from "./search-slot.component";

describe("SearchSlotComponent", () => {
    let component: SearchSlotComponent;
    let fixture: ComponentFixture<SearchSlotComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchSlotComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchSlotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
