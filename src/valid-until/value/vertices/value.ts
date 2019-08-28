import Vertices from "ocr-core/dist/vertices/vertices";
import Validated from "ocr-core/dist/vertices/validated";
import Date from "ocr-document/dist/vertices/date/value";
import TextValue from "../vertex/text";
import Vertex from "ocr-core/dist/vertex/vertex";
import SortLeft from "ocr-core/dist/vertices/utility/sort-left";
import Wrapper from "ocr-core/dist/vertices/wrapper";
import Standard from "ocr-core/dist/vertices/standard";

export default class Value extends Wrapper {


    constructor(
        vertices : Vertices
    ) {
        super(new Standard());


        let date = new Date(vertices);

        if(date.valid()) {

            this.vertices = date;
        }

        if(!this.valid()) {

            let approximate = Validated<TextValue>(
                vertices,
                (v:Vertex) => new TextValue(v)
            );

            if(approximate.valid()) {

                SortLeft(approximate);

                this.append(approximate);
            }
        }


    }

    // toString(): string {
    //
    //     return super.toString().replace(/-+/g, '-').replace(/-+$/, '');
    // }
}
