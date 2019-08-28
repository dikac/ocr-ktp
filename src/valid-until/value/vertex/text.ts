import AbstractFilter from "ocr-core/dist/vertex/validatable";
import Match from "ocr-core/dist/vertex/validatable/match";
import Vertex from "ocr-core/dist/vertex/vertex";
import Standard from "ocr-core/dist/vertex/standard";
import ApproximateList from "ocr-core/dist/vertex/validatable/approximate-list";

export default class extends AbstractFilter {

    constructor(
        vertex : Vertex
    ) {
        super(new Standard());

        let list = new Map<string, number>();
        list.set('SEUMUR HIDUP', 4);
        list.set('SEUMUR', 3);
        list.set('HIDUP', 2);

        let approximate = new ApproximateList(vertex, list);

        if(approximate.valid()) {

            vertex.text = <string> approximate.match;

            this.setVertex(vertex);
            this.setValid(true);
        }



        if(!this.valid()) {

            let match = new Match(vertex, [/^SEUMUR/, /^HIDUP/, /SEUMUR$/, /HIDUP$/]);

            if(match.valid()) {

                vertex.text = <string>(match).match;

                this.setVertex(vertex);
                this.setValid(true);
            }
        }

    }
}
