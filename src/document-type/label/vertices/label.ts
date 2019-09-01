import Vertices from "ocr-core/dist/vertices/vertices";
import StandardConfidence from "ocr-core/dist/vertices/standard-confidence";
import Validated from "ocr-core/dist/vertices/validated";
import Approximate from "ocr-core/dist/vertex/validatable/approximate";
import Vertex from "ocr-core/dist/vertex/vertex";


export default class extends StandardConfidence {

    constructor(
        vertices : Vertices
    ) {
        super();

        let label = Validated<Approximate>(
            vertices,
            (v : Vertex) => new Approximate(v, 2, ['PROVINSI'])
        );

        if(label.valid) {

            this.append(label);
        }
    }
}