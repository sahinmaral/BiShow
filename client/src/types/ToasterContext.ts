import ToasterType from "../enums/ToasterTypeEnum";

type ToasterContext = {
    message: string;
    toastType? : ToasterType;
    initialDuration : number;
}

export default ToasterContext;