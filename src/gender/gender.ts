import Vertices from "ocr-core/dist/vertices/vertices";
import Value from "ocr-document/dist/gender/vertices/value";
import GenderLabel from "../gender/label/vertices/label";
import Horizontal from "ocr-core/dist/vertex/validatable/horizontal-area";
import StdRange from "lits/dist/range/standard";
import Side from "ocr-core/dist/side/side";
import StdVertices from "ocr-core/dist/vertices/standard";
import Validated from "ocr-core/dist/vertices/validated";
import Vertex from "ocr-core/dist/vertex/vertex";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import ToString from "ocr-document/dist/value/to-string";
import Label from "ocr-document/dist/label/label";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";

export default class  extends ToString implements Label  {

    readonly label : Vertices<Vertex>;

    constructor(
        vertices: Vertices,
        side : Side
    ) {
        super(new StdVertices());

        let fetch = Validated(vertices, (v:Vertex) => new Horizontal(v, new StdRange(0,0.5), side));

        let divider = new LabelTrimDivider<GenderLabel>(fetch, (v:Vertices) => new GenderLabel(v));

       // let divider = new LabelTrimDivider<Label>(vertices, (v:Vertices) => new Label(v));

        //console.log('-----------');
        //console.log(divider.label.toString());

        // for (let v of divider) {
        //
        //     console.log(v.toString());
        // }

        this.label = divider.label;

        if(divider.label) {

            vertices.remove(divider.label);

            let flatten = Flattens(divider.slice(0, 1));

           // if(divider[0] !== undefined) {

                let value = new Value(flatten);

                if(value.valid()) {

                    vertices.remove(value);
                    //value.append(new Combine(value));
                    //break;
                }

                this.value = value;
           // }
        }
        //
        // for (let v of divider) {
        //
        //
        // }


    }
}