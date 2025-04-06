import { field } from "../entities/form/field";
import { fragmentField } from "../object/ObjectAliases";
type dependency = {
    identityObject: string;
    isHibernate: boolean;
    fieldsNotResolved: string[];
    isHibernateSnapshot?: boolean;
    fieldsNotResolvedSnapshot?: string[];
};
export declare class TableDependency {
    private dependencyesNotResolved;
    private REQUERID;
    private MAX_LENGHT;
    private MAX;
    private MIN;
    private REGEX;
    moveImbernateToNotResolved(identityObject: string): void;
    moveNotResolvedToImbernate(identityObject: string): void;
    createExpectedDependency(field: field, fragmentField: fragmentField): string;
    toApplyOrRemoveDependency(fragment: fragmentField, value: string | number | boolean): boolean;
    removeLastComa(value: string): string;
    private getValueInDependency;
    consistRequerid(value: string | number | boolean): boolean;
    consistMaxLen(dependencyExpected: string, value: string | number | boolean): boolean;
    consistMax(dependencyExpected: string, value: string | number): boolean;
    consistMin(dependencyExpected: string, value: string | number): boolean;
    consistRegex(dependencyExpected: string, value: string | number): boolean;
    addValueDefault(): {
        typeString: (value: any) => any;
        typeNumber: (value: any) => any;
    };
    removeExpectedDependency(identity: string): void;
    getDependenciesNotResolded(): dependency[];
    dependenciesCount(): number;
    snapshot(): void;
    revertToInit(): void;
}
export {};
