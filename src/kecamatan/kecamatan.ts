import Vertices from "ocr-core/dist/vertices/vertices";
import LabelKecamatan from "ocr-document/dist/kecamatan/vertices/label";
import Location from "ocr-document/dist/location/vertices/value";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import ToString from "ocr-document/dist/value/to-string";
import Label from "ocr-document/dist/label/label";
import Vertex from "ocr-core/dist/vertex/vertex";
import StdVertices from "ocr-core/dist/vertices/standard";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";
import Flatten from "ocr-core/dist/vertices/flatten";

export default class extends ToString implements Label  {

    readonly label : Vertices<Vertex>;

    constructor(
        vertices: Vertices
    ) {

        super(new StdVertices());

        let divider = new LabelTrimDivider<LabelKecamatan>(vertices, (v:Vertices) => new LabelKecamatan(v));

        this.label = divider.label;

        if(divider.label) {

            vertices.remove(divider.label);
            //vertices.remove(Flattens(divider.removed));

            // for(let d of divider.removed) {
            //     console.log([... new Flatten(d)]);
            // }
            //
            // for(let d of divider) {
            //     console.log([... new Flatten(d)]);
            // }

            let flatten = Flattens(divider.slice(0, 1));

           // if(divider[0] !== undefined) {

                let value = new Location(flatten);
                vertices.remove(value);
                this.value = value;
           // }
        }

    }
}