import React, { useState, setState } from 'react'
import { useSelector, useDispatch,  } from 'react-redux'
import { fetcher, bcReducer, testReducer } from './ballchasingSlice'
import { MDBBtn } from 'mdb-react-ui-kit';
import { MDBDataTableV5 } from 'mdbreact';

import _ from 'lodash';
import { BC_PULL, bcPull, BC_PUSH, bcPush, TEST_TYPE, testType } from './ActionTypes';



export function Config() {
    const fetch = useSelector((state) => state.chasing)
    const bc = useSelector((state) => state.bcReducer)
    //console.log(fetch)
    const apiKey = useState(bc)
    const groupId = useState(bc)

    let test1 = 'test1'
    let test2 = 'test2'

    const setApiKey = e => test1 = e
    const setGroupId = e => test2 = e

    const onApiKeyChanged = e => setApiKey(e)
    const onGroupIdChanged = e => setGroupId(e)


    //const playerArrs = fetch.players
    //const playerData = _.concat(playerArrs)

    const dispatch = useDispatch()


    const onPullClicked = () => {
        if (apiKey && groupId) {
            //console.log('test' + test1 + test2)
          dispatch(testReducer({groupId: test2, apiKey: test1}))
        }
    }

    return (
        <div>
            <div className="form-group">
                <label htmlFor="formGroupExampleInput">API Key</label>
                <input
                    type="text"
                    className="form-control"
                    id="apikey"
                    name="apikey"
                    onChange={(event) => onApiKeyChanged(event.target.value)}
                />
                <label htmlFor="formGroupExampleInput">Group ID</label>
                <input
                    type="text"
                    className="form-control"
                    id="groupId"
                    name="groupId"
                    onChange={(event) => onGroupIdChanged(event.target.value)}
                />
            </div>
            <MDBBtn className="my-4"
                onClick={onPullClicked}
            >
                Set and Pull
            </MDBBtn>
            <span></span>
        </div>
    )
}




export function Table() {
    const fetch = useSelector((state) => state.chasing)
    console.log(fetch)
    const mappy = fetch.playerRows
    //console.log(mappy)
    //const playerArrs = JSON.stringify(fetch.players)
    //const playerData = _.concat(playerArrs)
    const dispatch = useDispatch()
    //console.log('arrs' + playerArrs)

    const data = {
        columns: [
            {
                label: 'Name',
                field: 'name',
                width: 150,
                sort: 'asc',
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
            },
            {
                label: 'MVPR',
                field: 'mvpr',
                width: 100,
            },
            {
                label: 'Games Played',
                field: 'gp',
                width: 100,
            },
            {
                label: 'Score per game',
                field: 'score',
                width: 100,
            },
            {
                label: 'Goals per game',
                field: 'goals',
                width: 100,
            },
            {
                label: 'Assists per game',
                field: 'assists',
                width: 100,
            },
            {
                label: 'Saves per game',
                field: 'saves',
                width: 100,
            },
            {
                label: 'Shots per game',
                field: 'shots',
                width: 100,
            },
        ],
        rows: mappy,
    }

    const [datatable, setDatatable] = React.useState({
        columns: [
            {
                label: 'Name',
                field: 'name',
                width: 150,
                sort: 'asc',
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
            },
            {
                label: 'MVPR',
                field: 'mvpr',
                width: 100,
            },
            {
                label: 'Games Played',
                field: 'gp',
                width: 100,
            },
            {
                label: 'Score per game',
                field: 'score',
                width: 100,
            },
            {
                label: 'Goals per game',
                field: 'goals',
                width: 100,
            },
            {
                label: 'Assists per game',
                field: 'assists',
                width: 100,
            },
            {
                label: 'Saves per game',
                field: 'saves',
                width: 100,
            },
            {
                label: 'Shots per game',
                field: 'shots',
                width: 100,
            },
        ],
        rows: mappy,
    });

    const updateState = () => setDatatable(data)

    return (
        <div>
        <MDBBtn className="my-4" onClick={updateState}>Update</MDBBtn>
        <MDBDataTableV5 hover searchTop searchBottom={false} entriesOptions={[15, 25, 50, 100, 150]} entries={5} pagesAmount={4} data={datatable} />
        </div>
    )
}