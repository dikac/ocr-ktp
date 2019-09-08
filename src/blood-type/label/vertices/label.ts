import Vertices from "ocr-core/dist/vertices/vertices";
import StandardConfidence from "ocr-core/dist/vertices/standard-confidence";
import Validated from "ocr-core/dist/vertices/validated";
import Approximate from "ocr-core/dist/vertex/validatable/approximate";
import Vertex from "ocr-core/dist/vertex/vertex";
import Find from "ocr-core/dist/vertex/find";

export default class extends StandardConfidence {

    constructor(
        vertices : Vertices
    ) {
        super();


        let approximate = new Find(vertices, (v:Vertex) => new Approximate(v, 3, ['Gol Darah']));
        if(approximate.valid) {

            this.append(approximate);
            return;
        }

        let label = Validated<Approximate>(
            vertices,
            (v : Vertex) => new Approximate(v, 1, ['Gol','Darah'])
        );

        if(label.valid) {

            this.append(label);
            return;
        }
    }
}
