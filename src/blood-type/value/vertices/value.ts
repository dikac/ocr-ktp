import Vertices from "ocr-core/dist/vertices/vertices";
import StandardConfidence from "ocr-core/dist/vertices/standard-confidence";
import Match from "ocr-core/dist/vertex/validatable/match";
import Find from "ocr-core/dist/vertex/find";
import Vertex from "ocr-core/dist/vertex/vertex";

export default class extends StandardConfidence {

    constructor(
        vertices : Vertices
    ) {
        super();

        let blood = new Find(vertices, (v : Vertex) => new Match(v, [/^[AOB0+\-]{1,2}$/]));

        if(blood.valid) {

            vertices.remove(blood);

            blood.text = blood.text.replace('0', 'O');

            this.append(blood);
            return ;
        }
    }
}
