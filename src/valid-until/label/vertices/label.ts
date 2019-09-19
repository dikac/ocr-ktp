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

        list.set('Berlaku Hingga',  5);
        list.set('Berlaku',  4);
        list.set('Hingga', 4);

        let label = Validated<ApproximateList>
        (vertices, (v:Vertex) => new ApproximateList(v, list ));

        if(label.valid()) {

            this.append(label);
            return;
        }
    }
}
//
// let labels = vertices.exacts('Jenis', 'kelamin');
//
// if(!labels) {
//
//     return null;
// }
//
// if(labels.length === 2) {
//
//     return labels;
// }
//
// vertices.reset();
// labels = vertices.approximates(0.75, 'Jenis', 'kelamin');
//
// if(labels) {
//
//     return labels;
// }