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

export default class Entity extends Abstract implements Ktp {

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

    protected setProvince(vertices: Vertices, texts: string[], edge : Side) {

        this.province = new DocumentTypeProvince(vertices);
    }

    protected setRegencyCity(vertices: Vertices, texts: string[], edge : Side) {

        this.regencyCity          = new HeaderCity(vertices, this.edge);
    }

    protected setNik(vertices: Vertices, texts: string[], edge : Side) {

        this.nik                 = new Nik(vertices);

    }


    protected setName(vertices: Vertices, texts: string[], edge : Side) {

        this.name                = new Name(vertices);
    }

    protected setPlaceAndDateOfBirth(vertices: Vertices, texts: string[], edge : Side) {

        this.placeAndDateOfBirth = new PlaceDateBirth(vertices, this.edge);
    }

    protected setBloodType(vertices: Vertices, texts: string[], edge : Side) {

        this.bloodType           = new BloodType(vertices, edge);
    }

    protected setIssued(vertices: Vertices, texts: string[], edge : Side) {

        this.issued              = new Issued(vertices, edge);
    }

    protected setGender(vertices: Vertices, texts: string[], edge : Side) {

        this.gender              = new Gender(vertices, edge);
    }

    protected setAddress(vertices: Vertices, texts: string[], edge : Side) {

        this.address             = new Address(vertices);
    }

    protected setRtRw(vertices: Vertices, texts: string[], edge : Side) {

        this.rtRw                = new RtRw(vertices, this.edge);
    }

    protected setVillage(vertices: Vertices, texts: string[], edge : Side) {

        this.village       = new VillageKelurahan(vertices);
    }

    protected setDistrict(vertices: Vertices, texts: string[], edge : Side) {

        this.district           = new Kecamatan(vertices);
    }

    protected setReligion(vertices: Vertices, texts: string[], edge : Side) {

        this.religion            = new Religion (vertices);
    }
    protected setMarital(vertices: Vertices, texts: string[], edge : Side) {

        this.marital             = new Marital(vertices);

    }
    protected setNationality(vertices: Vertices, texts: string[], edge : Side) {

        this.nationality         = new Nationality(vertices);
    }
    protected setJob(vertices: Vertices, texts: string[], edge : Side) {

        this.job                 = new Job(vertices, edge);
    }
    protected setValidUntil(vertices: Vertices, texts: string[], edge : Side) {

        this.validUntil          = new ValidUntil(vertices, this.edge);
    }

    protected setEntity(vertices: Vertices, texts: string[], edge : Side) {

        this.setProvince(vertices, texts, edge);
        this.setRegencyCity(vertices, texts, edge);
        this.setNik(vertices, texts, edge);
        this.setName(vertices, texts, edge);
        this.setPlaceAndDateOfBirth(vertices, texts, edge);
        this.setBloodType(vertices, texts, edge);
        this.setIssued(vertices, texts, edge);
        this.setGender(vertices, texts, edge);
        this.setRtRw(vertices, texts, edge);
        this.setAddress(vertices, texts, edge);
        this.setVillage(vertices, texts, edge);
        this.setDistrict(vertices, texts, edge);
        this.setReligion(vertices, texts, edge);
        this.setMarital(vertices, texts, edge);
        this.setNationality(vertices, texts, edge);
        this.setJob(vertices, texts, edge);
        this.setValidUntil(vertices, texts, edge);
    }

    protected getAnchorPoint(vertices : Vertices, texts: string[]): Vertex {

        let approximate = new Find(vertices, (v:Vertex) => new Approximate(v, 3, ['PROVINSI']));

        if(!approximate.valid()) {

            approximate = new Find(vertices, (v:Vertex) => new Approximate(v, 2, ['PROV','INSI']));
        }

        return approximate;
    }
}