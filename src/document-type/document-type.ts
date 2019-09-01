import Vertices from "ocr-core/dist/vertices/vertices";
import UpperCase from "ocr-document/dist/vertices/upper-case";
import LabelVertices from "../document-type/label/vertices/label";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import ToString from "ocr-document/dist/value/to-string";
import Label from "ocr-document/dist/label/label";
import Vertex from "ocr-core/dist/vertex/vertex";
import StdVertices from "ocr-core/dist/vertices/standard";
import Flatten from "ocr-core/dist/vertices/flatten";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";

export default class extends ToString implements Label  {

    readonly label : Vertices<Vertex>;

    constructor(
        vertices: Vertices
    ) {
        super(new StdVertices());


        let divider = new LabelTrimDivider<LabelVertices>(vertices, (v:Vertices) => new LabelVertices(v));

        this.label = divider.label;

        // console.log('>>>>>>>>>>>>>>>>>>');
        // for (let d of divider) {
        //
        //     console.log([...new Flatten(d)]);
        // }


        if(divider.label.valid) {

            let flatten = Flattens(divider.slice(0, 1));

           // if(divider[0] !== undefined) {



                let value = new UpperCase(flatten);

                if(value.valid) {


                    if(divider.label.valid) {

                        value.prepend(divider.label)
                    }

                    vertices.remove(value);
                    //value.append(value);

                    this.value = value;

                }
           // }
        }

    }
}