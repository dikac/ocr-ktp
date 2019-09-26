import LabelName from "ocr-document/dist/name/vertices/label";
import Vertices from "ocr-core/dist/vertices/vertices";
import Vertex from "ocr-core/dist/vertex/vertex";
import Match from "ocr-core/dist/vertex/validatable/match";
import Validated from "ocr-core/dist/vertices/validated";


export default function Name(vertices : Vertices) {

    let label = new LabelName(vertices);

    if(label.valid()) {

        // agama smilliar to nama
        let matches = Validated(label, (v : Vertex) => new Match(v, [/^Ag/]));
        label.remove(matches);

    }

    return label;
}