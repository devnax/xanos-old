import AppsClientData from './AppsClientData';
export default () => {
    AppsClientData.forEach(({ main }) => {
        main({});
    });
};
