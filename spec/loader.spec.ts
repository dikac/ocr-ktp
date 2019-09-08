import * as Fs from 'fs';
import Entity from "../src/entity";
import Flatten from "ktp-entity/dist/flatten";
import property from "ktp-entity/dist/array/properties";
import Logged from "../src/logged";

let folder = __dirname + '/json';

it("force console log", () => {
    spyOn(console, 'log').and.callThrough();
});

//let files : string[] = Fs.readdirSync(folder);

export default function Loader (path : string) {

    describe("json test",   function() {

        it("exist",  function () {

            expect(Fs.existsSync(path)).toBe(true);

        });
    });

    describe(`file ${path}`,function() {

            let source = path.replace(/\.spec\.js$/g, '.json');
            let expected = path.replace(/\.spec\.js$/g, '.expect.json');

            console.log(source);
            console.log(expected);

            try {

                let ktp = Flatten(new Logged(JSON.parse(Fs.readFileSync(source).toString()).original[0]));
                let expectation = Flatten(JSON.parse(Fs.readFileSync(expected).toString()));

                console.log(ktp);

                for(let prop of property) {

                    it(prop, function () {
                        expect(expectation[prop]).toEqual(ktp[prop]);
                    });
                }

            } catch (e) {

                it(expected, function () {

                    fail(e);
                })

            }

    });
}