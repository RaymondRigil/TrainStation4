import { Area }  from "./area.model";
import { Node }  from "./node.model";
import { Videomap }  from "./videomap.model";


export class Facility {

    constructor(public id?: string,
                public name?: string,
				public textId?: string,
				public altitudeZeroDisplay?: string,
				public areas?: Area[],
                public nodes?: Node[],
				public center?: any,
                public videoMaps?: Videomap[]) {}
}
