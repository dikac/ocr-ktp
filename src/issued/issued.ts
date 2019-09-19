import Combine from "ocr-core/dist/vertex/combine";
import Vertices from "ocr-core/dist/vertices/vertices";
import LocationName from "ocr-document/dist/location/vertices/value";
import Date from "ocr-document/dist/date/vertices/value";
import Horizontal from "ocr-core/dist/vertex/validatable/horizontal-area";
import StdRange from "lits/dist/range/standard";
import Side from "ocr-core/dist/side/side";
import Validated from "ocr-core/dist/vertices/validated";
import ValidSequence from "ocr-core/dist/vertices/valid-sequence";
import Approximate from "ocr-core/dist/vertex/validatable/approximate";
import Vertex from "ocr-core/dist/vertex/vertex";
import Standard from "ocr-core/dist/vertex/standard";
import StdVertices from "ocr-core/dist/vertices/standard";
import ToString from "ocr-document/dist/value/to-string";
import SortedDividerPoint from "ocr-core/dist/vertices/array/sorted-divider-point";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";
import Text from "ocr-core/dist/vertex/validatable/text";

export default class extends ToString<Vertices<Vertex>>  {

    // readonly label : Vertices<Vertex> = new StdVertices();

    location : Vertices|null = null;
    date : Vertices|null = null;

    constructor(
        vertices: Vertices,
        side : Side
    ) {
        super(new StdVertices());

        // slash might remian from RT/RW or Tempat / Tgl Lahir
        let slash = ValidSequence<Text>(vertices, (v:Vertex) => new Text(v,  ['/']));

        if(slash.valid()) {

            vertices.remove(slash);
        }

        // TODO range need to exceed 100%
        let fetch = Validated(
            vertices,
            (v : Vertex) => new Horizontal(v, new StdRange(0.725,1.1), side)
        );

        //console.log(fetch);


        // KARTU is printed as watermark in card, sometime registered
        let noise = Validated(fetch, (v:Vertex) => new Approximate(v, 2, ['KARTU']));

        if(noise.valid()) {

            fetch.remove(noise);
        }

        let divider =  SortedDividerPoint(fetch);

        let flatten = Flattens(divider.splice(0, 3));

        this.location = new LocationName(flatten);

        if(this.location.valid()) {

            vertices.remove(this.location);
            flatten.remove(this.location);

        }

        this.date = new Date(flatten);

        if(this.date.valid()) {

            vertices.remove(this.date);

        }



        this.value = new StdVertices([], ', ');

        if(this.location && this.location.valid()) {

            this.value.append(new Combine(this.location));
            //vertices.remove(divider[0]);
        } else {

            this.value.append(new Standard());
        }


        if(this.date && this.date.valid()) {

            this.value.append(new Combine(this.date));
            //vertices.remove(divider[0]);
        }

    }

}