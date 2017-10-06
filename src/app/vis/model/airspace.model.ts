import { Configuration } from "./configuration.model";

export class Airspace {


    constructor(
                public name?: string,
				public configurations?: Configuration[],
				public abbreviation?: string,
				public color?: string,
				public isSelected?: boolean,
				public confIndex?: string){}
}