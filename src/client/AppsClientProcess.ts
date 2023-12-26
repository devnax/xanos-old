import AppsClientData from './AppsClientData'


export interface AppClientData {
    appId: string;
    main: (app: any) => void;
}

export default () => {
    AppsClientData.forEach(({ main }: AppClientData) => {
        main({})
    })
}