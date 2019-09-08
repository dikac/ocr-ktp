import Vertices from "ocr-core/dist/vertices/vertices";
import LabelNationality from "ocr-document/dist/nationality/vertices/label";
import Value from "ocr-document/dist/nationality/vertices/value";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import ToString from "ocr-document/dist/value/to-string";
import Label from "ocr-document/dist/label/label";
import Vertex from "ocr-core/dist/vertex/vertex";
import Standard from "ocr-core/dist/vertices/standard";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";


export default class extends ToString implements Label {

    readonly label : Vertices<Vertex>;

    constructor(
        vertices: Vertices
    ) {

        super(new Standard());

        //console.log('KUMAHA CARITANA');
        let divider = new LabelTrimDivider<LabelNationality>(vertices, (v:Vertices) => new LabelNationality(v));

        this.label = divider.label;

        // if(divider.label.valid) {
        //
        //     let center = new Center(new Edge(vertices));
        //
        //     let deg = FindDegree(divider.label.get(0), center);
        //     console.log(deg);
        //
        //     let copt = Flattens(divider);
        //
        //     Rotate(copt, center, 1.8);
        //
        //     console.log([...new Flatten(copt)]);
        // }


        // console.log('-----------');
        // console.log(divider.label.toString());
        // console.log('--');
        // for (let v of divider) {
        //
        //     console.log(v.toString());
        // }
        // for(let d of divider.removed) {
        //
        //     console.log(d.join('='));
        // }
        //
        // for(let d of divider) {
        //
        //     console.log(d.join('|'));
        // }

        if(divider.label.valid) {

            let flatten = Flattens(divider.slice(0, 1));

           // if(divider[0] !== undefined) {

                let value = new Value(flatten);

                vertices.remove(value);

                this.value = value;
           // }
        }

    }
}