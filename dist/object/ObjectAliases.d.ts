type fragmentObject = {
    key: {
        identity: string;
        alias: string;
    };
    config: {
        objectDto: string;
        identity: string;
        object: any;
        objectSnapshot?: any;
        getValueInObjectFragment: any;
    };
};
type fragmentField = {
    key: {
        identity: string;
    };
    config: {
        fragmentObjectIdentity: string;
        alias: string;
        identity: string;
        propertDto: string;
        line: number | undefined;
        dependency: string;
        dependencySnapshot?: string;
    };
};
type entityConfiguration = {
    aliasOrIDentity: string;
    propertDto: string;
    line?: number | undefined;
};
export { fragmentObject, fragmentField, entityConfiguration };
