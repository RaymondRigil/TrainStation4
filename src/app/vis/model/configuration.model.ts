import { Segment } from "./segment.model";

export class Configuration {

    constructor(
                public name?: string,
				public segments?: Segment[],
				public isSelected?: boolean){}
}