//import logo from '../logo.svg';
import React from "react";
import { ClippedDrawer } from '../common/components/nav/ClippedDrawer'


//import  BallchaseRequest  from '../utils/BallchaseRequest.js'

function ExplorePage(e) {

    //const { season, league, week, match } = useParams()
    //BallchaseRequest('united-rogue-d1hs10f4dh', 'group-list')
    

    return (
        <div>
            < ClippedDrawer origin={e.match.params.origin} />
        </div>
    );
}

export default ExplorePage;
