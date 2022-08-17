import { TestBed, async } from "@angular/core/testing";
import SearchService from "./search.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from '@ngrx/store';


describe("SearchService", () => {
    let service: SearchService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [SearchService],
            imports: [HttpClientTestingModule, RouterTestingModule, StoreModule.forRoot({})],
        });
        service = TestBed.inject(SearchService);
    }));

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

});
