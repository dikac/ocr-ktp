import Abstract from 'ocr-document/dist/abstract';
import Ktp from 'ktp-entity/dist/ktp';
import Vertex from "ocr-core/dist/vertex/vertex";
import Approximate from "ocr-core/dist/vertex/validatable/approximate";
import Vertices from "ocr-core/dist/vertices/vertices";
import DocumentTypeProvince from "./document-type/document-type";
import HeaderCity from "./city/city";
import Name from "./name/name";
import Address from "./address/address";
import RtRw from "./rt-rw/rt-rw";
import VillageKelurahan from "./village-kelurahan/village-kelurahan";
import Religion from "./religion/religion";
import Job from "./job/job";
import Issued from "./issued/issued";
import BloodType from "./blood-type/blood-type";
import Kecamatan from "./kecamatan/kecamatan";
import Nationality from "./nationality/nationality";
import Marital from "./marital/marital";
import ValidUntil from "./valid-until/valid-until";
import Nik from "./nik/nik";
import Gender from "./gender/gender";
import PlaceDateBirth from "./place-date-birth/place-date-birth";
import Side from "ocr-core/dist/side/side";
import Find from "ocr-core/dist/vertex/find";

export default class extends Abstract implements Ktp {

    province            !: null|{toString:()=>string};
    regencyCity         !: null|{toString:()=>string};
    issued              !: null|{toString:()=>string};
    nik                 !: null|{toString:()=>string};
    name                !: null|{toString:()=>string};
    gender              !: null|{toString:()=>string};
    placeAndDateOfBirth !: null|{toString:()=>string};
    bloodType           !: null|{toString:()=>string};
    rtRw                !: null|{toString:()=>string};
    address             !: null|{toString:()=>string};
    village             !: null|{toString:()=>string};
    district            !: null|{toString:()=>string};
    religion            !: null|{toString:()=>string};
    marital             !: null|{toString:()=>string};
    nationality         !: null|{toString:()=>string};
    job                 !: null|{toString:()=>string};
    validUntil          !: null|{toString:()=>string};

    toJson(): string {

        return JSON.stringify({
            province           : this.province + '',
            regencyCity        : this.regencyCity + '',
            issued             : this.issued + '',
            nik                : this.nik + '',
            name               : this.name + '',
            gender             : this.gender + '',
            placeAndDateOfBirth: this.placeAndDateOfBirth + '',
            bloodType          : this.bloodType + '',
            rtRw               : this.rtRw + '',
            address            : this.address + '',
            village            : this.village + '',
            district           : this.district + '',
            religion           : this.religion + '',
            marital            : this.marital + '',
            nationality        : this.nationality + '',
            job                : this.job + '',
            validUntil         : this.validUntil + '',
        });
    }

    protected setEntity(vertices: Vertices, texts: string[], edge : Side) {

        //console.log(vertices.join('|'));

        //console.log('headerProvince>>>>>>>>>>>>>>>>'+ vertices.toString());
        this.province      = new DocumentTypeProvince(vertices);
        //console.log('headerCity>>>>>>>>>>>>>>>>>>>>'+ vertices.toString());
        this.regencyCity          = new HeaderCity(vertices, this.edge);
        //console.log('nik>>>>>>>>>>>>>>>>>>>>>>>>>>>' + vertices.toString());
        this.nik                 = new Nik(vertices);
        //console.log('name>>>>>>>>>>>>>>>>>>>>>>>>>>' + vertices.toString());
        this.name                = new Name(vertices);
        //console.log('placeAndDateOfBirth>>>>>>>>>>>' + vertices.toString());
        this.placeAndDateOfBirth = new PlaceDateBirth(vertices, this.edge);
        //console.log('bloodType>>>>>>>>>>>>>>>>>>>>>' + vertices.toString());
        this.bloodType           = new BloodType(vertices, edge);
        //console.log('issued>>>>>>>>>>>>>>>>>>>>>>>>' + vertices.toString());
        this.issued              = new Issued(vertices, edge);
        //console.log('gender>>>>>>>>>>>>>>>>>>>>>>>>' + vertices.toString());
        this.gender              = new Gender(vertices, edge);
        //console.log('RT RW>>>>>>>>>>>>>>>>>>>>>>>>>' + vertices.toString());
        this.rtRw                = new RtRw(vertices, this.edge);
        //console.log('address>>>>>>>>>>>>>>>>>>>>>>>' + vertices.toString());
         this.address             = new Address(vertices);
        //console.log('kelurahanDesa>>>>>>>>>>>>>>>>>' + vertices.toString());
         this.village       = new VillageKelurahan(vertices);
        //console.log('kecamatan>>>>>>>>>>>>>>>>>>>>>' + vertices.toString());
         this.district           = new Kecamatan(vertices);
        //console.log('religion>>>>>>>>>>>>>>>>>>>>>>' + vertices.toString());
        this.religion            = new Religion (vertices);
        //console.log('marital>>>>>>>>>>>>>>>>>>>>>>>' + vertices.toString());
         this.marital             = new Marital(vertices);
        //console.log('nationality>>>>>>>>>>>>>>>>>>>' + vertices.toString());
         this.nationality         = new Nationality(vertices);
        //console.log('job>>>>>>>>>>>>>>>>>>>>>>>>>>>' + vertices.toString());
         this.job                 = new Job(vertices, edge);
        //console.log('validUntil>>>>>>>>>>>>>>>>>>>>' + vertices.toString());
        this.validUntil          = new ValidUntil(vertices, this.edge);
    }

    protected getAnchorPoint(vertices : Vertices, texts: string[]): Vertex {

        let approximate = new Find(vertices, (v:Vertex) => new Approximate(v, 3, ['PROVINSI']));

        if(!approximate.valid()) {

            approximate = new Find(vertices, (v:Vertex) => new Approximate(v, 2, ['PROV','INSI']));
        }

        return approximate;
    }
}