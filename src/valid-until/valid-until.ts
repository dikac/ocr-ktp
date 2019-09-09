import Vertices from "ocr-core/dist/vertices/vertices";
import Value from "../valid-until/value/vertices/value";
import LabelValidUntil from "../valid-until/label/vertices/label";
import Vertex from "ocr-core/dist/vertex/vertex";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import Validated from "ocr-core/dist/vertices/validated";
import Horizontal from "ocr-core/dist/vertex/validatable/horizontal-area";
import StdRange from "lits/dist/range/standard";
import Side from "ocr-core/dist/side/side";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";
import ToString from "ocr-document/dist/value/to-string";
import StdVertices from "ocr-core/dist/vertices/standard";
import Label from "ocr-document/dist/label/label";

export default class extends ToString implements Label  {

    readonly label : Vertices<Vertex> = new StdVertices();

    location : Vertices|null = null;
    date : Vertices|null = null;

    constructor(
        vertices: Vertices,
        side : Side
    ) {
        super(new StdVertices());

        let fetch = Validated(
            vertices,
            (v : Vertex) => new Horizontal(v, new StdRange(0,0.7), side)
        );

        //console.log(fetch);

        let divider = new LabelTrimDivider<LabelValidUntil>(fetch, (v:Vertices) => new LabelValidUntil(v));

        vertices.remove(divider.label);

            let flatten = Flattens(divider.slice(0, 2));
        //console.log(flatten.join('='));
            let value = new Value(flatten);
        //console.log(value.join('='));
        vertices.remove(value);



        this.value = value;

    }

    // toString(): string {
    //
    //     if(this.date) {
    //
    //         return DateValue.joiner(this);
    //
    //     } else {
    //
    //         return super.toString();
    //     }
    // }
}