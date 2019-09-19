import Vertices from "ocr-core/dist/vertices/vertices";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import AddressLabel from "ocr-document/dist/address/vertices/label";
import Label from "ocr-document/dist/label/label";
import Value from "ocr-document/dist/address/vertices/value";
import Vertex from "ocr-core/dist/vertex/vertex";
import Standard from "ocr-core/dist/vertices/standard";
import ToString from "ocr-document/dist/value/to-string";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";


export default class extends ToString implements Label  {

    readonly label : Vertices<Vertex>;

    constructor(
        vertices: Vertices
    ) {

        super(new Standard());

        let divider = new LabelTrimDivider<AddressLabel>(vertices, (v:Vertices) => new AddressLabel(v));
        this.label = divider.label;

        if(divider.label.valid()) {

            let flatten = Flattens(divider.slice(0, 1));

            //if(divider[0] !== undefined) {

                let value = new Value(flatten);
                vertices.remove(value);
                this.value = value;
           // }
        }
    }

}