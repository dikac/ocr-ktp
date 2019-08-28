import Vertices from "ocr-core/dist/vertices/vertices";
import Value from "ocr-document/dist/vertices/marital/value";
import LabelMarital from "../marital/label/vertices/label";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import ToString from "ocr-document/dist/value/to-string";
import Vertex from "ocr-core/dist/vertex/vertex";
import StdVertices from "ocr-core/dist/vertices/standard";
import Label from "ocr-document/dist/label/label";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";

export default class extends ToString implements Label  {

    readonly label : Vertices<Vertex>;

    constructor(
        vertices: Vertices
    ) {

        super(new StdVertices());

        let divider = new LabelTrimDivider<LabelMarital>(vertices, (v:Vertices) => new LabelMarital(v));

        this.label = divider.label;

        if(divider.label.valid()) {

            if(divider.label.valid()) {

                let flatten = Flattens(divider.slice(0, 1));

               // if(divider[0] !== undefined) {

                    let value = new Value(flatten);

                    if(value.valid()) {

                        vertices.remove(value);
                    }

                    this.value = value;
              //  }
            }

        }

        // for(let removed of divider.removed.reverse()) {
        //
        //     let approximate = new Approximate(removed);
        //
        //     if(approximate.valid()) {
        //
        //         divider.unshift(removed);
        //     }
        // }
        //
        // for (let v of divider/*.slice(0, )*/) {
        //
        //     //console.log(v.toString());
        //
        //     let value = new Value(v);
        //     //console.log(value.toString());
        //
        //     if(value.valid()) {
        //
        //         vertices.remove(value);
        //
        //         this.push(new Combine(value));
        //         break;
        //     }
        // }

    }
}