import Vertices from "ocr-core/dist/vertices/vertices";
import Validated from "ocr-core/dist/vertices/validated";
import Vertex from "ocr-core/dist/vertex/vertex";
import Horizontal from "ocr-core/dist/vertex/validatable/horizontal-area";
import StdRange from "lits/dist/range/standard";
import Side from "ocr-core/dist/side/side";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import LabelRtRw from "ocr-document/dist/rt-rw/vertices/label";
import Value from "ocr-document/dist/rt-rw/vertices/value";
import Find from "ocr-core/dist/vertex/find";
import Text from "ocr-core/dist/vertex/validatable/text";
import ToString from "ocr-document/dist/value/to-string";
import StdVertices from "ocr-core/dist/vertices/standard";
import Label from "ocr-document/dist/label/label";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";
import LabelVillageKelurahan from "../village-kelurahan/label/vertices/label";

export default class extends ToString<Vertices<Vertex>> implements Label  {

    readonly label : Vertices<Vertex> = new StdVertices();

    location : Vertices|null = null;
    date : Vertices|null = null;

    constructor(
        vertices: Vertices,
        side : Side
    ) {
        super(new StdVertices());

        let finds = Validated(
            vertices,
            (v : Vertex) => new Horizontal(v, new StdRange(0, 0.75), side)
        );

        // remove dash from LAKI-LAKI
        let dot = new Find(finds, (v : Vertex) => new Text(v, ['-']));

        if(dot.valid) {

            finds.remove(dot);
            vertices.remove(dot);
        }

        let divider = new LabelTrimDivider<LabelRtRw>(finds, (v:Vertices) => new LabelRtRw(v));

        this.label = divider.label;

        if(divider.label.valid) {

            vertices.remove(divider.label);

            let flatten = Flattens(divider.slice(0, 1));

           // console.log(...flatten);
            let value = new Value(flatten);
           // console.log(...Flattens([value]));
            vertices.remove(value);
            this.value = value;
        }


        if(!this.value.valid) {

            let divider = new LabelTrimDivider<LabelRtRw>(finds, (v:Vertices) => new LabelVillageKelurahan(v));

            if(divider.label.valid) {

                // fetch 1 line from the last
                let line = Flattens(divider.removed.slice(divider.removed.length - 1));
                if(line.valid) {

                    let value = new Value(line);
                    if(value.valid) {
                        // remove entire line
                        vertices.remove(line);
                        this.value = value;
                    }

                }

            }

        }



    }


}