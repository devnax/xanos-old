import ServerAppsData from './ServerAppsData'

export interface AppClientData {
    appId: string;
    main: (app: any) => void;
}

const processing = () => {
    ServerAppsData.forEach((_app: AppClientData) => {

    })
}

export default processing