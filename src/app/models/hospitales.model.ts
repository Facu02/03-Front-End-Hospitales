
interface _HospitalUser{
    nombre:string;
    img? : string;
    _id:string;
}

export class HospitalModal{

    constructor(
        public nombre : string,
        public _id : string,
        public usuario? : _HospitalUser,
        public img? : string,
    ){}

}