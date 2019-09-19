import Vertices from "ocr-core/dist/vertices/vertices";
import LabelVillageKelurahan from "../village-kelurahan/label/vertices/label";
import Location from "ocr-document/dist/location/vertices/value";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import ToString from "ocr-document/dist/value/to-string";
import Vertex from "ocr-core/dist/vertex/vertex";
import Standard from "ocr-core/dist/vertices/standard";
import Label from "ocr-document/dist/label/label";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";


export default class extends ToString implements Label  {

    readonly label : Vertices<Vertex>;

    constructor(
        vertices: Vertices
    ) {

        super(new Standard());

        let divider = new LabelTrimDivider<LabelVillageKelurahan>(vertices, (v:Vertices) => new LabelVillageKelurahan(v));

        this.label = divider.label;

        if(divider.label.valid()) {

            let flatten = Flattens(divider.slice(0, 1));

            //if(divider[0] !== undefined) {

                let value = new Location(flatten);

                if(value.valid()) {

                    vertices.remove(value);
                }

                this.value = value;

           // }
        }

    }
}