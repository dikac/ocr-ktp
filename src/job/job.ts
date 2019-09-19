import Vertices from "ocr-core/dist/vertices/vertices";
import Approximate from "ocr-core/dist/vertex/validatable/approximate";
import Text from "ocr-core/dist/vertex/validatable/text";
import Job from "ocr-document/dist/vertices/activity";
import Side from "ocr-core/dist/side/side";
import HorizontalScale from "ocr-core/dist/vertex/validatable/horizontal-area";
import StdRange from "lits/dist/range/standard";
import Vertex from "ocr-core/dist/vertex/vertex";
import ApproximateList from "ocr-core/dist/vertex/validatable/approximate-list";
import Validated from "ocr-core/dist/vertices/validated";
import LabelTrimDivider from "ocr-core/dist/vertices/array/label-trim-divider";
import JobLabel from "ocr-document/dist/job/vertices/label";
import ToString from "ocr-document/dist/value/to-string";
import Label from "ocr-document/dist/label/label";
import StdVertices from "ocr-core/dist/vertices/standard";
import Flattens from "ocr-core/dist/vertices/iterable/flattens";

export default class extends ToString<Vertices<Vertex>> implements Label  {

    readonly label : Vertices<Vertex> = new StdVertices();

    location : Vertices|null = null;
    date : Vertices|null = null;

    constructor(
        vertices: Vertices,
        side : Side
    ) {
        super(new StdVertices());


        let fetch = Validated(vertices, (v:Vertex) => new HorizontalScale(v, new StdRange(0, 0.75), side));

        // KARTU is printed as watermark in card, sometime registered
        let noise = Validated(fetch, (v:Vertex) => new Approximate(v, 2, ['KARTU']));

        if(noise.valid()) {

            vertices.remove(noise);
            fetch.remove(noise);
        }


        let divider = new LabelTrimDivider<JobLabel>(fetch, (v:Vertices) => new JobLabel(v));

        if(divider.label && divider.label.valid()) {

            vertices.remove(divider.label);

            let flatten = Flattens(divider.slice(0, 1));

           // if(divider[0] !== undefined) {

               // let flatten = new Flatten(divider.splice(0, 3));

                let job = new Job(flatten);

                if(job.valid()) {

                    vertices.remove(job);

                    //this.append(job);
                    //  break;
                }

                this.value = job;
            //}
        }

      //  do {




       // } while (divider.length > 0);
        //
        //
        // for (let v of divider.splice(0, 3)) {
        //
        //     let job = new Job(new Flatten(v)/*vertices.clone*/);
        //
        //     if(job.valid()) {
        //
        //         vertices.remove(job);
        //         this.push(...job);
        //         break;
        //     }
        // }

        //console.log(vertices);
        //console.log(new Flatten([divider[0]]));


        //console.log(vertices);

        if(this.value.valid()) {
            //
            // vertices.remove(<Vertices>job.llv.label);
            // vertices.remove(fetch);

            let list = new Map<string, number>();
            list.set('PENDUDUK', 2);
            list.set('PEND', 2);
            list.set('UDUK', 2);
            list.set('KARTU', 3);

            // ktp have KARTU PENDUDUK printed as background watermark
            let approximates = Validated(
                this.value,
                (v: Vertex) => new ApproximateList(v, list)
            );
           // console.log(approximates);
           // console.log(job.llv.label);
            if(approximates.valid()) {

                this.value.remove(approximates);
            }

            // special case
            let texts = Validated(
                this.value,
                (v: Vertex) => new Text(v, ['NOUBUK', 'K','KAR','ATU', 'OENDUP'])
            );

            if(texts.valid()) {

                this.value.remove(texts);
            }

            //this.push(...fetch);

            return ;
        }


        // let line = new PointHorizontal(vertices);
        // let job2  = new Activity(line);
        //
        // if(job2.valid()) {
        //
        //     vertices.remove(job2);
        //     this.push(...job2);
        //     return ;
        // }
    }
}