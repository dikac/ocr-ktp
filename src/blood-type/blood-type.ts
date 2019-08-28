import Vertices from "ocr-core/dist/vertices/vertices";
import Value from "../blood-type/value/vertices/value";
import BloodLabel from "../blood-type/label/vertices/label";
import StdRange from "lits/dist/range/standard";
import Side from "ocr-core/dist/side/side";
import Validated from "ocr-core/dist/vertices/validated";
import Vertex from "ocr-core/dist/vertex/vertex";
import Horizontal from "ocr-core/dist/vertex/validatable/horizontal-area";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import Find from "ocr-core/dist/vertex/find";
import Text from "ocr-core/dist/vertex/validatable/text";
import ToString from "ocr-document/dist/value/to-string";
import Standard from "ocr-core/dist/vertices/standard";
import Label from "ocr-document/dist/label/label";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";

export default class extends ToString<Vertices<Vertex>> implements Label  {

    readonly label : Vertices<Vertex>;

    constructor(
        vertices: Vertices,
        side : Side
    ) {

        super(new Standard());

        let fetch = Validated(vertices, (v: Vertex)=> new Horizontal(v, new StdRange(0.5, 0.9), side));

        // remove dot from Blood Type
        let dot = new Find(fetch, (v : Vertex) => new Text(v, ['.']));

        if(dot.valid()) {

            fetch.remove(dot);
            vertices.remove(dot);
        }

        let divider = new LabelTrimDivider(fetch, (v:Vertices) => new BloodLabel(v));

        this.label = divider.label;

        if(divider.label.valid()) {

            vertices.remove(divider.label);

            let flatten = Flattens(divider.slice(0, 1));
           // if(divider[0] !== undefined) {

                this.value = new Value(flatten);
                vertices.remove(this.value);
           // }
        }

    }

}