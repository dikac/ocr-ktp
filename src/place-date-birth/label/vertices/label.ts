import Vertices from "ocr-core/dist/vertices/vertices";
import StandardConfidence from "ocr-core/dist/vertices/standard-confidence";
import Validated from "ocr-core/dist/vertices/validated";
import Vertex from "ocr-core/dist/vertex/vertex";
import ApproximateList from "ocr-core/dist/vertex/validatable/approximate-list";
import Find from "ocr-core/dist/vertex/find";
import Text from "ocr-core/dist/vertex/validatable/text";

export default class extends StandardConfidence {

    constructor(
        vertices : Vertices
    ) {
        super();

        let list = new Map<string, number>();
            list.set('Tgl',  1);
            list.set('Tempat/Tgl',  3);
            list.set('Tempat',  2);
            list.set('Lahir', 2);
            //list.set('Lahir', 2);

        let label = Validated<ApproximateList>(
            vertices,
            (v : Vertex)=> new ApproximateList(v, list)
        );

        if(label.valid) {

            this.append(label);
        }


        let find = new Find(vertices, (v:Vertex) => new Text(v, ['/']));

        console.log(vertices.join('|'));
        console.log(find);
        if(find.valid) {

            this.append(find);
        }
    }
}