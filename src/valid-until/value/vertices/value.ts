import Vertices from "ocr-core/dist/vertices/vertices";
import Validated from "ocr-core/dist/vertices/validated";
import TextValue from "../vertex/text";
import Vertex from "ocr-core/dist/vertex/vertex";
import SortLeft from "ocr-core/dist/vertices/utility/sort-left";
import Wrapper from "ocr-core/dist/vertices/wrapper";
import Standard from "ocr-core/dist/vertices/standard";
import Date from "ocr-document/dist/date/vertices/value";

export default class Value extends Wrapper {

    constructor(
        vertices : Vertices
    ) {
        super(new Standard());

        // date
        let date = new Date(vertices);
        if(date.valid()) {

            this.vertices = date;
        }

        // text SEUMUR HIDUP
        if(!this.valid()) {

            let approximate = Validated<TextValue>(vertices, (v:Vertex) => new TextValue(v));

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
