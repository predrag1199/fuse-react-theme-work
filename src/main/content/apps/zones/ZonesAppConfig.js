import {FuseLoadable} from '@fuse';
// import {authRoles} from 'auth';

export const ZonesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/zones',
            component: FuseLoadable({
                loader: () => import('./ZonesApp')
            })
        }
    ]
};
