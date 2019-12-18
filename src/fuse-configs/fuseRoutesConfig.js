import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {LoginConfig} from 'main/content/login/LoginConfig';
import {authRoleExamplesConfigs} from 'main/content/auth/authRoleExamplesConfigs';
import {appsConfigs} from 'main/content/apps/appsConfigs';
import {DashboardConfig} from 'main/content/dashboard/DashboardConfig';

const routeConfigs = [
    ...appsConfigs,
    ...authRoleExamplesConfigs,
    LoginConfig,
    DashboardConfig
];

export const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/login"/>
    }
];
