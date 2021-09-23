import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

import { UrlParse, AltReq } from "../../utils/AltReq";
import { SimpleTabs } from '../components/nav/Tabs';
//import { ClippedDrawer } from '../components/nav/ClippedDrawer'

// Since routes are regular React components, they
// may be rendered anywhere in the app, including in
// child elements.
//
// This helps when it's time to code-split your app
// into multiple bundles because code-splitting a
// React Router app is the same as code-splitting
// any other React app.



let Generatelinks = props => {
    const [list, setList] = React.useState("");

    const { id, path, } = props;
    //console.log(id, path)

    let link = path && path !== undefined ? path + '/' : ''

    React.useEffect(() => {
        const fetchListData = async () => {
            const res = await AltReq(id)
            const { list } = await res.data
            setList(list)
            //console.log(list)
        }
        fetchListData()
        // eslint-disable-next-line
    }, [id])

    let links = list && typeof list !== undefined ? list.map(item => <li><Link to={link + item.id}>{item.name}</Link> - {item.id}</li>) : 'waiting'

    return (
        <>
            {links}
        </>
    )
}



export const GroupContainer = (e) => {
    let parse = UrlParse('season-10-j1nooa6jlw', 'group-list')
    let { path, url } = useRouteMatch();
    return (
        <Router>
            
            <div>
                <ul>
                    <li>
                        <Link to="/group/">Home</Link>
                    </li>
                    <li>
                        <Link to="/group/topics">Topics</Link>
                    </li>
                    <Generatelinks id={parse} path='/group' />
                </ul>

                <hr />

                <Switch>
                    <Route exact path="/group/">
                        <Home />
                    </Route>
                    <Route path="/group/topics">
                        <Topics />
                    </Route>
                    <Route path='/group/:id'>
                        <Sublinks path={path} url={url} e={e} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}



function Sublinks(e) {
    // The <Route> that rendered this component has a
    // path of `/topics/:topicId`. The `:topicId` portion
    // of the URL indicates a placeholder that we can
    // get from `useParams()`.
    let { id } = useParams();
    let { url } = useRouteMatch();
    let parse = UrlParse(id, 'group-list')
    //console.log(url)
    //console.log(e)
    return (
        <div>
            <h3>{id}</h3>

            {id !== undefined ? <Generatelinks id={parse} path={url} /> : 'huh'}
            <hr />

            <Switch>
                <Route path={`${url}/:id`}>
                    <SimpleTabs />
                </Route>
            </Switch>

        </div>
    );
}

/*
function Tester(e) {
    let { id } = useParams();
    return (
        <div>
            {id}
        </div>
    )
}*/

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function Topics() {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { path, url } = useRouteMatch();
    let { id } = useParams();


    let link = `${path}/:topicId`
    let parse = UrlParse(link, 'group-list')
    //console.log(path)
    //console.log(url)
    //console.log(link)
    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${url}/rendering`}>Rendering with React</Link>
                </li>
                <li>
                    <Link to={`${url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${url}/props-v-state`}>Props v. State</Link>
                </li>
                <Generatelinks id={parse} path={url} />
            </ul>

            <Switch>
                <Route exact path={path}>
                    <h3>Please select a topic.</h3>
                </Route>
                <Route path={`${path}/:id`}>
                    {id}
                    <Sublinks />

                </Route>
            </Switch>
        </div>
    );
}

