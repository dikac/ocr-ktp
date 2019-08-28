import Vertices from "ocr-core/dist/vertices/vertices";
import LabelReligion from "ocr-document/dist/vertices/religion/label";
import Value from "ocr-document/dist/vertices/religion/value";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import ToString from "ocr-document/dist/value/to-string";
import Vertex from "ocr-core/dist/vertex/vertex";
import Standard from "ocr-core/dist/vertices/standard";
import Label from "ocr-document/dist/label/label";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";

export default class extends ToString<Vertices<Vertex>> implements Label  {

    readonly label : Vertices<Vertex>;

    constructor(
        vertices: Vertices
    ) {

        super(new Standard());

        let divider = new LabelTrimDivider<LabelReligion>(vertices, (v:Vertices) => new LabelReligion(v));

        this.label = divider.label;

        // for(let d of divider) {
        //
        //     console.log(d.join('|'));
        // }

       // console.log(Flattens(divider.slice(0,1)).join('=='));
        // value are unique
        let value = new Value(Flattens(divider.slice(0,2)));

        vertices.remove(value);

        this.value = value;


        if(!this.value.valid()) {


        }



    }
}