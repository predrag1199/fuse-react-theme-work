import React, {Component} from 'react';
import {FusePageSimple/*, FuseAnimate*/} from '@fuse';
import ZonesList from 'main/content/apps/zones/ZonesList';

class ZonesApp extends Component {

    render()
    {

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-20 pb-80",
                        leftSidebar       : "w-256",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136",
                        toolbar           : "min-h-62 h-62 sm:h-50 sm:min-h-80"
                    }}
                    content={
                        <ZonesList/>
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
            </React.Fragment>
        )
    };
}



export default ZonesApp;
