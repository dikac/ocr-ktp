import  Ktp from '../../../../src/ocr/entity/ktp/filter';
import * as Chai from 'chai';
import * as Fs from 'fs';


export default function(entity, filename) {

    console.log(filename + '========================================================================');

    let json = JSON.parse(Fs.readFileSync(filename.replace('test.js', 'json')).toString());
    let result = new Ktp(json.original[0]);
   // object.raw = json.original;

    console.log(`corrected degree : ${result.degree}`);

   // let result = object.result;
    // result.flatten();
    //
    //
    // entity.flatten();


    for(let property in entity) {

        try {
            Chai.assert.equal(result[property], entity[property]);

        } catch (e){

            console.log(`[Expect] ${property} ${entity[property]}`);
            console.log(`[Actual] ${property} ${result[property]}`);
        }
    }

    return {result:result, original:json.original};


};

