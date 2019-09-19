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
        list.set('Status', 2);
        list.set('Perkawinan', 4);

         let label = Validated<ApproximateList>(
             vertices,
             (v:Vertex) => new ApproximateList(v, list)
         );

        if(label.valid()) {

            this.append(label);
            return;
        }
    }
}
