
import Vertices from "ocr-core/dist/vertices/vertices";
import StandardConfidence from "ocr-core/dist/vertices/standard-confidence";
import Text from "ocr-core/dist/vertex/validatable/text";
import Validated from "ocr-core/dist/vertices/validated";
import Vertex from "ocr-core/dist/vertex/vertex";
import ApproximateList from "ocr-core/dist/vertex/validatable/approximate-list";
import Approximate from "ocr-core/dist/vertex/validatable/approximate";
import Find from "ocr-core/dist/vertex/find";

export default class extends StandardConfidence {

    constructor(
        vertices : Vertices
    ) {
        super();

        let full = Validated<Approximate>(
            vertices,
            (v : Vertex) => new Approximate(v, 3,['Kel/Desa'])
        );

        if(full.valid()) {

            this.append(full);

        }

        if(!this.valid()) {

            let list = new Map<string, number>();

            list.set('Kel', 1);
            list.set('Desa', 1);

            let segmented = Validated<ApproximateList>(
                vertices,
                (v : Vertex) => new ApproximateList(v, list)
            );


            if(segmented.valid()) {


                //
                // SortLeft(vertices);
                //
                // let offset = new Offset(vertices, full);

                this.append(segmented);
                this.confidence = 0.75;

                let slash = new Find<Text>(
                    vertices,
                    (v : Vertex) => new Text(v, ['/'])
                );

                if(slash.valid()) {

                    this.append(slash);
                }

            }

        }


        //
        // let list2 = new Map<string, number>();
        // list2.set('Kelur', 2);
        // list2.set('rahan', 2);
        // list2.set('Kel', 1);
        //
        // let segments = new Finds<ApproximateList>(vertices, (v : Vertex) => new ApproximateList(v, list2));
        //
        // if(segments.valid()) {
        //
        //     SortLeft(vertices);
        //
        //     this.confidence = 0.5;
        //
        //     let offset = new Offset(vertices, segments);
        //
        //     this.push(...offset);
        //     return;
        //
        // }

    }

};



