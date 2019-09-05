import * as fs from 'fs';
import Entity from "../src/entity";


export default function(testFolder : string) {

    fs.readdir(testFolder, (err, files) => {

        files.forEach(file => {

            let sources = testFolder + '/' + file;
            let expect : string;

            if(fs.existsSync(sources) && fs.lstatSync(sources).isFile() && sources.match(/(^expect)\.json$/)) {

                console.log(sources);
            }
        });
    });
}