import { Injectable, Inject, OpaqueToken } from "@angular/core";
import { Http, Request, RequestMethod, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
//don't need a type, just getting an object for now
//import { Product } from "./product.model";
import { Facility } from "../model/facility.model";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Subject } from "rxjs/Subject";

export const REST_URL = new OpaqueToken("rest_url");

@Injectable()
export class RestDataSource {

    constructor(private http: Http,
        @Inject(REST_URL) private url: string) { }
		
	getData(): Observable<any> {        
		return this.http.get(this.url)
		//.map(response => response.json());    
		.map(function(response) {
            //console.log("+++++++++++ " + JSON.stringify(response.json()));            
            return <any>response.json();
        });
	}

    getData2(): Observable<Object> {
        return this.sendRequest(RequestMethod.Get, this.url);
    }
	
	/*
	getData(): Observable<Product[]> {
        return this.sendRequest(RequestMethod.Get, this.url);
    }

    saveProduct(product: Product): Observable<Product> {
        return this.sendRequest(RequestMethod.Post, this.url, product);
    }

    updateProduct(product: Product): Observable<Product> {
        return this.sendRequest(RequestMethod.Put,
            `${this.url}/${product.id}`, product);
    }

    deleteProduct(id: number): Observable<Product> {
        return this.sendRequest(RequestMethod.Delete, `${this.url}/${id}`);
    }
	
	*/

    private sendRequest(verb: RequestMethod,
        url: string, body?: Facility): Observable<Facility> {

        let headers = new Headers();
        headers.set("Access-Key", "<secret>");
        headers.set("Application-Names", ["vis"]);

        return this.http.request(new Request({
            method: verb,
            url: url,
            body: body,
            headers: headers
        }))
        
        .map(function(response) {
            console.log("+++++++++++ " + response);            
            return response.json();
        })
        .catch(function(error) {
            return Promise.reject(`Network Error: ${error.statusText} (${error.status})`);
        })
    }
}
