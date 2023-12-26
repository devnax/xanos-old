import AppsServerData from './AppsServerData'

export interface AppClientData {
    appId: string;
    main: (app: any) => void;
}

const processing = () => {
    AppsServerData.forEach((_app: AppClientData) => {

    })
}

export default processing