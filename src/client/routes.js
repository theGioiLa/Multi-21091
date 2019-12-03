import { HomePage, AudioPage, MVPage } from './pages';
export const routes = [
    {
        label: 'Home',
        path: '/home',
        component: HomePage
    },
    {
        label: 'MV',
        path: '/mv',
        component: MVPage
    },
    {
        label: 'Audio',
        path: '/audio',
        component: AudioPage
    },
];
