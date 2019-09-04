import * as fs from 'fs';

export default function(testFolder : string) {

    fs.readdir(testFolder, (err, files) => {

        files.forEach(file => {

            let sources = testFolder + '/' + file;
            let expect : string;

            if(fs.existsSync(path) && fs.lstatSync(path).isFile() && path.match(/\.test\.js$/)) {

                expect = path;
            }
        });
    });
}