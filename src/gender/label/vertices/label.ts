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

        // let text = new Finds<Text>
        // (vertices, (v:Vertex) => new Text(v,  ['kelamin', 'Jenis']));
        //
        // if(text.valid) {
        //
        //     console.log('text');
        //     console.log(text);
        //     this.push(...text);
        //     return;
        // }

        let approximate = Validated<Approximate>
        (vertices, (v:Vertex) => new Approximate(v, 2, ['kelamin', 'Jenis']));

        if(approximate.valid) {
            //console.log('approximate');
            //console.log(approximate);
            this.append(approximate);
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