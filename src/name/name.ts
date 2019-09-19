import Vertices from "ocr-core/dist/vertices/vertices";
import LabelName from "ocr-document/dist/name/vertices/label";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import Finds    from "ocr-document/dist/name/vertices/finds";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";
import Standard from "ocr-core/dist/vertices/standard";
import ToString from "ocr-document/dist/value/to-string";
import Label from "ocr-document/dist/label/label";
import Vertex from "ocr-core/dist/vertex/vertex";
import LabelPlaceDateOfBirth from "../place-date-birth/label/vertices/label";
import Flatten from "ocr-core/dist/vertices/flatten";

export default class extends ToString<Vertices<Vertex>> implements Label  {

    readonly label : Vertices<Vertex>;

    constructor(
        vertices: Vertices
    ) {

        super(new Standard());

        let divider = new LabelTrimDivider(vertices, (v:Vertices) => new LabelName(v));

        // console.log('divider --------');
        // for (let v of divider) {
        //     console.log([...new Flatten(v)]);
        // }

        this.label = divider.label;

        if(divider.label.valid()) {

            vertices.remove(Flattens(divider.removed));

            let flatten = Flattens(divider.slice(0, 2));

            if(flatten.valid()) {

                let finds = new Finds(flatten);

                vertices.remove(finds);

                this.value = finds;

            }

        }


        // No label
        if(!this.value.valid()){

            let clone = vertices.clone();

            let divider = new LabelTrimDivider<LabelPlaceDateOfBirth>(clone, (v:Vertices) => new LabelPlaceDateOfBirth(v));

            let flatten = Flattens(divider.removed);
            this.value = new Finds(flatten);

        }





        //
        // for(let i = 0; divider[i] !== undefined; i++) {
        //
        //     let finds = new Finds(divider[i]);
        //
        //     if(finds.valid()) {
        //
        //         vertices.remove(finds);
        //
        //         if(divider[i + 1] !== undefined) {
        //
        //             let sequence = new Sequence(divider[i + 1]);
        //
        //             if(sequence.valid()) {
        //
        //                 vertices.remove(sequence);
        //
        //                 finds.push(...sequence);
        //             }
        //         }
        //
        //         this.push(new Combine(finds));
        //
        //         break;
        //     }
        // }

    }
}