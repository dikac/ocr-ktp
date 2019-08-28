import Vertices from "ocr-core/dist/vertices/vertices";
import UpperCase from "ocr-document/dist/vertices/upper-case";
import CityLabel from "../city/label/vertices/label";
import Validated from "ocr-core/dist/vertices/validated";
import StdVertices from "ocr-core/dist/vertices/standard";
import Vertex from "ocr-core/dist/vertex/vertex";
import VerticalArea from "ocr-core/dist/vertex/validatable/vertical-area";
import Standard from "lits/dist/range/standard";
import Side from "ocr-core/dist/side/side";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import ToString from "ocr-document/dist/value/to-string";
import Label from "ocr-document/dist/label/label";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";

export default class extends ToString implements Label  {

    readonly label : Vertices<Vertex>;

    constructor(
        vertices: Vertices,
        edge : Side
    ) {
        super(new StdVertices());

        let header = Validated(vertices, (v:Vertex) => new VerticalArea(v, new Standard(0.7,1.1), edge));

        let divider = new LabelTrimDivider<CityLabel>(header, (v:Vertices) => new CityLabel(v));

        this.label = divider.label;

        if(divider.label.valid()) {


            //if(divider[0] !== undefined) {

            let flatten = Flattens(divider.slice(0, 1));
                let value = new UpperCase(flatten);

                if(value.valid()) {

                    if(divider.label && divider.label.valid()) {

                        value.prepend(divider.label)
                    }

                    vertices.remove(value);
                    this.value = value;//push(new Combine(value));

                }
          //  }
        }
    }
}