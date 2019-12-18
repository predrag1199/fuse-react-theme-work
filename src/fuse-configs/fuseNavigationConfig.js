export const fuseNavigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'useradmin-component',
                'title': 'Change Server',
                'type' : 'collapse',
                'icon' : 'whatshot',
                'url'  : '/apps/users',
                'children': [
                    {
                        'id'   : 'production-component',
                        'title': 'Production',
                        'type' : 'item',
                        'icon' : 'whatshot',
                        'url'  : '/login?s=prod',
                    },
                    {
                        'id'   : 'staging-component',
                        'title': 'Staging',
                        'type' : 'item',
                        'icon' : 'whatshot',
                        'url'  : '/login?s=stag',
                    }
                ]
            },
            {
                'id'   : 'zoneadmin-component',
                'title': 'User Admin',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/apps/users'
            },
            {
                'id'   : 'zoneadmin-component',
                'title': 'Zone Admin',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/apps/zones'
            }
        ]
    }
];
