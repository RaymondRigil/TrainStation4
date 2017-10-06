import { Injectable } from "@angular/core";
//import { Product } from "./product.model";
//can probably get away with just including Facility model
import { Facility } from "./facility.model";
import { Area } from "./area.model";
import { Airspace } from "./airspace.model";
import { Configuration } from "./configuration.model";
import { Segment } from "./segment.model";
import { Videomap } from "./videomap.model";
import { Observable } from "rxjs/Observable";
import { RestDataSource } from "../service/rest.datasource";

@Injectable()
export class Model {
    //public facility: Facility = new Facility();
	public facility: Facility = { name: 'test' };
    //private locator = (p: Product, id: number) => p.id == id;
    private loaded: boolean = false;
	
    constructor(private dataSource: RestDataSource) {
		
       this.dataSource.getData().subscribe(data => { this.facility = data; alert('constructor'+this.facility.id); });
		
    }

   // getFacility(): Facility {
   //     return this.facility;
  //  }
	
	    loadFacility() {
        this.loaded = true;
        this.dataSource.getData().subscribe(data => { this.facility = data; alert('facility repo'+JSON.stringify(this.facility));});
		
    }

    getFacility(): Facility {
        if (!this.loaded) {
            this.loadFacility();
			alert('getfac'+this.facility.id);
        }
      
	    return this.facility;
	}

	/*
	
	getProducts(): Product[] {
        return this.products;
    }

    getProduct(id: number): Product {
        return this.products.find(p => this.locator(p, id));
    }

    saveProduct(product: Product) {
        if (product.id == 0 || product.id == null) {
            this.dataSource.saveProduct(product)
                .subscribe(p => this.products.push(p));
        } else {
            this.dataSource.updateProduct(product).subscribe(p => {
                let index = this.products
                    .findIndex(item => this.locator(item, p.id));
                this.products.splice(index, 1, p);
            });
        }
    }

    deleteProduct(id: number) {
        this.dataSource.deleteProduct(id).subscribe(() => {
            let index = this.products.findIndex(p => this.locator(p, id));
            if (index > -1) {
                this.products.splice(index, 1);
            }
        });
    }
	*/
}
