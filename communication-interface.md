# Server -> Client -- Basic Interface
> ````json
> {
>   "action": "actionName",
> 
>   "details": {
>     /* ... */
>   }
> }
> ````

# Server -> Client -- Turn Communication
> ## Select Territory
> > ````json
> > {
> >   "action": "turnChange",
> > 
> >   "details": {
> >     "turnType": "selectTerritory",
> >     "playerNumber": 1
> >   }
> > }
> > ````
>
> ## Turn Change
> > * Place Armies Turn Change
> > 
> > ````json
> > {
> >   "action": "turnChange",
> > 
> >   "details": {
> >     "turnType": "placeArmies",
> >     "playerNumber": 1,
> >     "numberOfUnitsToPlace": 3
> >   }
> > }
> > ````
> > 
> > * Attack Turn Change
> > 
> > ````json
> > {
> >   "action": "turnChange",
> > 
> >   "details": {
> >     "turnType": "attack",
> >     "playerNumber": 1
> >   }
> > }
> > ````
> > 
> > * Reinforce Turn Change
> > 
> > ````json
> > {
> >   "action": "turnChange",
> > 
> >   "details": {
> >     "turnType": "reinforceArmies",
> >     "playerNumber": 1
> >   }
> > }
> > ````

# Client -> Service -- Actions (Player Number known by Server)
> * Join Game
> 
> ````json
> {
>   "name": "John Doe"
> }
> 
> * Territory Selection
> 
> ````json
> {
>   "action": "selectTerritory",
> 
>   "details": {
>     "territory": 1,
>   }
> }
> ````
> 
> * Place Units
> 
> ````json
> {
>   "action": "unitPlacement",
> 
>   "details": [
>     {
>       "terrority": 1,
>       "units": 5
>     },
>     {
>       "terrority": 2,
>       "units": 2
>     },
>     /* ... */
>   ]
> }
> ````
> 
> * Attack Action
> 
> ````json
> {
>   "action": "attack",
> 
>   "details": {
>     "attackingTerritory": 1,
>     "defendingTerritory": 2,
> 
>     "attackingUnits": 10 
>   }
> }
> ````
> 
> * Complete Turn -- Done Attacking
> 
> ````json
> {
>   "action": "completeTurn"
> }
> ````
> 
> * Reinforce Action
> 
> ````json
> {
>   "action": "reinforce",
> 
>   "details": [
>     {
>       "from": 1,
>       "to": 2,
>       "units": 4
>     },
>     {
>       "from": 5,
>       "to": 6,
>       "units": 4
>     },
>     /* ... */
>   ]
> }
> ````

# Server -> Client -- Result
> * Game Joined
> 
> ````json
> {
>   "result": "gameJoined",
> 
>   "details": {
>     "userId": 1
>   }
> }
> ````
> 
> * Error Joining Game
> 
> ````json
> {
>   "result": "error",
> 
>   "details": {
>     "reason": "..."
>   }
> }
> ````
> 
> * Territory Selected
> 
> ````json
> {
>   "result": "territorySelected",
> 
>   "details": {
>     "territory": 1
>   }
> }
> ````
> 
> * Unit Placements
> 
> ````json
> {
>   "result": "unitPlacement",
> 
>   "details": [
>     {
>       "territory": 1,
>       "units": 3
>     },
>     {
>       "territory": 2,
>       "units": 4
>     },
>     /* ... */
>   ]
> }
> ````
> 
> * Territory Attacked
> 
> ````json
> {
>   "result": "attack",
> 
>   "details": {
>     "attackingTerritory": 1,
>     "defendingTerritory": 2,
> 
>     "attackingUnitsLost": 2,
>     "defendingUnitsLost": 1
>   }
> }
> ````
> 
> * Reinforcement Made
> 
> ````json
> {
>   "result": "reinforcement",
> 
>   "details": [
>     {
>       "from": 1,
>       "to": 2,
>       "units": 4
>     },
>     {
>       "from": 5,
>       "to": 6,
>       "units": 4
>     },
>     /* ... */
>   ]
> }
> ````
> 
> * Invalid Action -- Goes only to client who requested the invalid action
> 
> ````json
> {
>   "result": "error",
> 
>   "request": {
>     /* previous JSON request */
>   },
> 
>   "territoryState": [
>     {
>       "id": 1,
>       "controllingPlayer": 1,
>       "units": 5
>     },
>     /* ... for all territorys on map */
>   ]
> }
> ````
