import ClientAppsData from './ClientAppsData'


export interface AppClientData {
    appId: string;
    main: (app: any) => void;
}

export default () => {
    ClientAppsData.forEach(({ main }: AppClientData) => {
        main({})
    })
}