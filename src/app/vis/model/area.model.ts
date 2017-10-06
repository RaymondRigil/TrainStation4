import { Airspace } from "./airspace.model";

export class Area {

    constructor(
                public name?: string,
				public description?: string,
				public altitudeLow?: number,
				public altitudeHigh?: number,
                public airspaces?: Airspace[],
				public defaultVideoMap?: number,
				public isSelected?: boolean){}
				
}