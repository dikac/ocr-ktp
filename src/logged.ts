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
import Entity from "./entity";

export default class Logged extends Entity  {


    protected setProvince(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[text]');
        console.log(texts.join('|'));

        console.log('[vertices]');
        console.log(vertices.toString());

        console.log('[header province]');
        console.log(vertices.toString());

        super.setProvince(vertices, texts, edge);
    }

    protected setRegencyCity(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[regency city]');
        console.log(vertices.toString());
        super.setRegencyCity(vertices, texts, edge);
    }

    protected setNik(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[nik]');
        console.log(vertices.toString());
        super.setNik(vertices, texts, edge);
    }

    protected setName(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[name]');
        console.log(vertices.toString());
        super.setName(vertices, texts, edge);
    }

    protected setPlaceAndDateOfBirth(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[place and date of birth]');
        console.log(vertices.toString());
        super.setPlaceAndDateOfBirth(vertices, texts, edge);
    }

    protected setBloodType(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[blood type]');
        console.log(vertices.toString());
        super.setBloodType(vertices, texts, edge);
    }

    protected setIssued(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[issued]');
        console.log(vertices.toString());
        super.setIssued(vertices, texts, edge);
    }

    protected setGender(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[gender]');
        console.log(vertices.toString());
        super.setGender(vertices, texts, edge);
    }

    protected setAddress(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[address]');
        console.log(vertices.toString());
        super.setAddress(vertices, texts, edge);
    }

    protected setRtRw(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[rt rw]');
        console.log(vertices.toString());
        super.setRtRw(vertices, texts, edge);
    }

    protected setVillage(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[village]');
        console.log(vertices.toString());
        super.setVillage(vertices, texts, edge);
    }

    protected setDistrict(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[district]');
        console.log(vertices.toString());
        super.setDistrict(vertices, texts, edge);
    }

    protected setReligion(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[religion]');
        console.log(vertices.toString());
        super.setReligion(vertices, texts, edge);
    }

    protected setMarital(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[marital]');
        console.log(vertices.toString());
        super.setMarital(vertices, texts, edge);
    }

    protected setNationality(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[nationality]');
        console.log(vertices.toString());
        super.setNationality(vertices, texts, edge);
    }

    protected setJob(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[job]');
        console.log(vertices.toString());
        super.setJob(vertices, texts, edge);
    }

    protected setValidUntil(vertices: Vertices, texts: string[], edge : Side) {

        console.log('[valid until]');
        console.log(vertices.toString());
        super.setValidUntil(vertices, texts, edge);
    }

}