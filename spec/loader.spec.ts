import * as Fs from 'fs';
import Entity from "../src/entity";

let folder = __dirname + '/json';

it("force console log", () => {
    spyOn(console, 'log').and.callThrough();
});

describe("json test",   function() {

    it("upload",  function () {

        Fs.readdir(folder, (err, files) => {

        files.forEach(file => {

            let sources = folder + '/' + file;
            let expect : string;

            if(sources.match(/\.expect\.json$/)) {

                let ktp = new Entity(Fs.readFileSync(sources));
                console.log(sources.replace(/\.expect\.json$/, '.json'));
                console.log(sources);
            }
        });
    });
        expect(true).toBe(true);

    });




});