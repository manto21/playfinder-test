import { ISlots, ApiParams, ISlot } from "../models/search.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export default class SearchService {
    private endpoint: string;
    private results = new Subject<ISlots>();

    constructor(private http: HttpClient) {}

    public getSlots(): Observable<ISlots> {
        return this.results.asObservable();
    }

    public getResults(api_params: ApiParams): Observable<ISlot[]> 
    {
        this.endpoint =
            'https://api-v2.pfstaging.xyz/pitches/' +
            api_params.pitch_id +
            '/slots?filter%5Bstarts%5D=' +
            api_params.start_date +
            '&filter%5Bends%5D=' +
            api_params.end_date;

        return this.http.get<ISlots>(this.endpoint).pipe(
            map(response => response.data)
        );
    }
}
