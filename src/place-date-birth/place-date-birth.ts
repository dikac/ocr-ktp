import Vertices from "ocr-core/dist/vertices/vertices";
import StdVertices from "ocr-core/dist/vertices/standard";
import Location from "ocr-document/dist/location/vertices/value-comma-affixed";
import Date from "ocr-document/dist/date/vertices/value";
import LabelPlaceDateOfBirth from "../place-date-birth/label/vertices/label";
import Validated from "ocr-core/dist/vertices/validated";
import Vertex from "ocr-core/dist/vertex/vertex";
import StdVertex from "ocr-core/dist/vertex/standard";
import Horizontal from "ocr-core/dist/vertex/validatable/horizontal-area";
import Standard from "lits/dist/range/standard";
import Side from "ocr-core/dist/side/side";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import ToString from "ocr-document/dist/value/to-string";
import Label from "ocr-document/dist/label/label";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";
import Combine from "ocr-core/dist/vertex/combine";
import Find from "ocr-core/dist/vertex/find";
import Text from "ocr-core/dist/vertex/validatable/text";

export default class extends ToString<Vertices<Vertex>> implements Label {

    readonly label : Vertices<Vertex>;

    location : Vertices|null = null;
    date : Vertices|null = null;

    constructor(
        vertices: Vertices,
        edge : Side
    ) {
        super(new StdVertices());

        // blood type might be caught
        let vertical = Validated(
            vertices,
            (v: Vertex)=> new Horizontal(v, new Standard(0, 0.65), edge)
        );

        let divider = new LabelTrimDivider<LabelPlaceDateOfBirth>(
            vertical,
            (v:Vertices) => new LabelPlaceDateOfBirth(v)
        );


        // for(let d of divider) {
        //     console.log('|');
        // }

        this.label = divider.label;


        if(divider.label.valid()) {

            vertices.remove(divider.label);

            let flatten = Flattens(divider.splice(0,2));

            // slash might not captured in label
            let slash = new Find(flatten, (v : Vertex) => new Text(v, ['/']));
            flatten.remove(slash);



            if(flatten.length > 0) {

                this.location = new Location(flatten);

                // console.log('alias');
                // console.log(this.location.join('|'));

                if(this.location.valid()) {

                    vertices.remove(this.location);
                    flatten.remove(this.location);
                    //break;
                }

                // console.log([...[...divider]].join('|'));
                // console.log(flatten.join('|'));
                // console.log(divider.label.join('|'));

                this.date = new Date(flatten);

                if(this.date.valid()) {

                    vertices.remove(this.date);

                }

            }
        }


        this.value = new StdVertices([], ', ');


       // console.log('LOCATION');

        if(this.location && this.location.valid()) {

            // for (let v of this.location) {
            //
              //  console.log(new Combine(this.location).toString());
            // }

            this.value.append(new Combine(this.location));
            //vertices.remove(divider[0]);
        } else {


            this.value.append(new StdVertex());
        }

        //console.log('DATE');

        if(this.date && this.date.valid()) {

            // for (let v of this.date) {
            //
                // console.log(new Combine(this.date).toString());
                // console.log((this.date).toString());
            // }

            this.value.append(new Combine(this.date));
            //vertices.remove(divider[0]);
        }

    }

}