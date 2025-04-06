import { frame } from '../entities/form/frame';
import { Fragment } from '../fragment/fragment';
import { TableDependency } from '../table-dependency/TableDependency';
import { entityConfiguration, fragmentField } from './ObjectAliases';
export declare class ManagmentObject {
    fragment: Fragment;
    tableDependency: TableDependency;
    constructor(fragment: Fragment, tableDependency: TableDependency, frames: frame[]);
    pathObjectBase: {
        parent: string;
        alias: string;
        configFrame: string;
    }[];
    /**
     * @description Creates an array of fragments of type object
     * @param {frame[]} frames
     */
    private initObjects;
    /**
    * @description Creates an array of fragments of type Field for Frames of type 'block'
    * @param {frame} frame
    */
    private configFieldBlock;
    /**
     * @description Creates an array of fragments of type Field for Frames of type 'line', This function must be called every time a new line is created on the screen
     * @param {frame} frame
    */
    addLine(frame: frame): void;
    /**
     * @description Creates an object respecting the parent property hierarchy.
     * @return {*}
     */
    createObject(): any;
    /**
     * @description Creates an object bringing without respecting the hierarchy of the parent property
     * @return {*}
    */
    createObjectSeparete(): any;
    createObjectForAlias(alias: string): any;
    setValue(fragmentField: fragmentField, value: any): void;
    createConfigurationField(config: string): entityConfiguration;
    getValueInObjectFragment(object: any, propertDto: string, line?: number): any;
    fieldType(identityField: string): string;
    convertAliasToIdenty(config: string): string;
    setValueContextAlias(config: string, value: any): void;
    setValueContextIdentity(identity: string, type: string | string[2], value: any): void;
    objectFull(): any;
    objectSeparate(): any;
    objectUnique(alias: string): any;
    objectUniqueLine(alias: string, line: number): any;
    count(identity: string): number;
    removeLine(identity: string, line: number): void;
    getPropert(config: string): any;
    getFragmentForIdentity(identity: string): fragmentField;
    removeFragmentsLine(objectIDentity: string, line: number): void;
    removeFragment(identity: string): void;
}
