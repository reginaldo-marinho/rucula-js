import { ManagmentObject } from "../object/ObjectManagment";
export declare class RuculaLogs {
    private managmentObject;
    constructor(managmentObject: ManagmentObject);
    dependencies(): {
        identityObject: string;
        isHibernate: boolean;
        fieldsNotResolved: string[];
        isHibernateSnapshot?: boolean;
        fieldsNotResolvedSnapshot?: string[];
    }[];
    object(): any;
}
