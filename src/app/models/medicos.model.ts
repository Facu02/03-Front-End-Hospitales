import { HospitalModal } from "./hospitales.model";

interface _MedicoUser{
    nombre:string;
    img? : string;
    _id:string;
}

export class Medico{

    constructor(
        public nombre : string,
        public _id : string,
        public img? : string,
        public usuario? : _MedicoUser,
        public hospital? : HospitalModal,
    ){}

}