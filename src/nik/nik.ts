import Vertices from "ocr-core/dist/vertices/vertices";
import Value from "ocr-document/dist/vertices/nik/value";
import LabelNik from "../nik/label/vertices/label";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import ToString from "ocr-document/dist/value/to-string";
import Label from "ocr-document/dist/label/label";
import Vertex from "ocr-core/dist/vertex/vertex";
import Standard from "ocr-core/dist/vertices/standard";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";

export default class extends ToString implements Label  {

    readonly label : Vertices<Vertex>;

    constructor(
        vertices: Vertices
    ) {

        super(new Standard());

        let divider = new LabelTrimDivider<LabelNik>(vertices, (v:Vertices) => new LabelNik(v));

        this.label = divider.label;

        let flatten = Flattens(divider.splice(0, 2));

        let value = new Value(flatten);

        vertices.remove(value);

        this.value = value;


    }
}