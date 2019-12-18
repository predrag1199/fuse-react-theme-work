import {FuseLoadable} from '@fuse';
// import {authRoles} from 'auth';

export const UsersAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/users',
            component: FuseLoadable({
                loader: () => import('./UsersApp')
            })
        },
        {
            path     : '/apps/user/:id',
            component: FuseLoadable({
                loader: () => import('./UserDetailApp')
            })
        },
        {
            path     : '/apps/guest',
            component: FuseLoadable({
                loader: () => import('./UserGuest')
            })
        },
        {
            path     : '/google_auth',
            component: FuseLoadable({
                loader: () => import('./UsersApp')
            })
        },
    ]
};
