import {
  createSlice
} from '@reduxjs/toolkit';


import _ from 'lodash';
import axios from 'axios';

import store from '../store';

const baseurl = 'http://localhost:8080/https://ballchasing.com/api/groups/'



const initialState = {
  value: '',
  groupId: 'fettuccine-league-2blw98c6pp',
  apiKey: '',
  players: [],
  playerRows: [],
  isBroken: false
}

export const chasingSlice = createSlice({
  name: 'chasing',
  initialState: initialState,
  reducers: {
    apiPush: (state, action) => {

      console.log('apiPush action:')
      console.log(action)

      return {
        ...state,
        value: action.payload.value,
        playerRows: action.payload.playerRows,
        players: action.payload.players
      }

    },
    testReducer: (state, action) => {
      //console.log('reducer fired')
      //console.log(state)
      //console.log('testReducer action:')
      //console.log(action)

      let req
      let pMap
      let groupId = action.payload.groupId
      let apiKey = action.payload.apiKey

      const rth = (e) => {
        return _.round(e, 3)
      }
      const mvpr = (goals, assists, saves, shots) => {
        let e = ((goals * 1) + (assists * 0.75) + (saves * 0.6) + (shots / 3))
        return rth(e)
      }


      axios.get(baseurl + groupId, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Target-URL': 'https://ballchasing.com/api/',
          'crossorigin': true,
          'Authorization': apiKey,
        }
      })
      .then((res) => {
        console.log(res)
        req = res.data
        pMap = req.players.map(player => ({
          name: player.name,
          mvpr: mvpr(player.game_average.core.goals, player.game_average.core.assists, player.game_average.core.saves, player.game_average.core.shots),
          gp: player.cumulative.games,
          score: rth(player.game_average.core.score),
          goals: rth(player.game_average.core.goals),
          assists: rth(player.game_average.core.assists),
          saves: rth(player.game_average.core.saves),
          shots: rth(player.game_average.core.shots)
        }))

        store.dispatch(apiPush({value: req, players: req.players, playerRows: pMap}))

      })
      .catch((error) => {
        console.log(apiKey)
        console.error(error)
        return error
      })

      return {
        ...state,
        groupId: groupId,
        apiKey: apiKey,
      }

    //ohBoy(sug, ma)
    //console.log('req check: ' + req)
      /*if(req != undefined) {
      return {
        ...state,
        value: req,
        players: req.players,
        playerRows: pMap
      }
    } else {
      return {...state,
      isBroken: true
    }*/
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  testReducer,
  apiPush
} = chasingSlice.actions

export default chasingSlice.reducer