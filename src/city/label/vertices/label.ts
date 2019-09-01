import Vertices from "ocr-core/dist/vertices/vertices";
import StandardConfidence from "ocr-core/dist/vertices/standard-confidence";
import Validated from "ocr-core/dist/vertices/validated";
import Vertex from "ocr-core/dist/vertex/vertex";
import ApproximateList from "ocr-core/dist/vertex/validatable/approximate-list";

export default class extends StandardConfidence {

    constructor(
        vertices : Vertices
    ) {
        super();

        let list = new Map<string, number>();
        list.set('KOTA', 1);
        list.set('KABUPATEN', 4);
        list.set('JAKARTA', 3);

        let label = Validated<ApproximateList>
        (vertices, (v : Vertex) => new ApproximateList(v, list));

        if(label.valid) {

            this.append(label);
        }


       // console.log('value.toString()');
       // console.log(this[0]);
        //console.log(this[1]);
    }
}