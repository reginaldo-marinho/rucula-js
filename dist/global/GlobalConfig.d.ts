import { enviroment } from "../entities/global/Enviroments";
import { globalConfiguration } from "../entities/global/GlobalConfiguration";
import { localization } from "../entities/global/Localization";
export declare let ruculaGlobal: {
    initGlobalConfiguration: (config: globalConfiguration) => void;
    setLocalization: (locales?: string | number) => void;
    setEnviroment: (enviroment?: string | number) => void;
    getEnvironment: () => enviroment;
    getLocalization: () => localization;
    getConfigurationGlobal: () => globalConfiguration;
};
