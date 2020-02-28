# Redux-meta
Automatically stores and updates metadata for redux promise actions, and provides methods to access it.

### Requirements
- Actions must have types ending with `*_REQUEST`, `*_SUCCESS`, and `*_FAILURE`.
- Actions passed to redux-meta functions cannot be bound to dispatch.

### Available Methods
| Function | Return | Description |
| ------------- | ------ | ----------- |
| getMeta(action) | { loading: bool, success: bool, failure: bool, message: string } | Returns all metadata for action. |
| getLoading(action(s),default=false) | bool | Returns loading status of action. If array of actions is passed in, returns true if any action is loading. Optionally you may default to true if you want to set loading before the action is called. |
| getSuccess(action) | bool | Returns success status of action. Will return false if action has never been called. |
| getFailure(action) | bool | Returns failure status of action. Will return false if action has never been called. |
| resetMeta(action) | void | Resets the metadata of the action passed in. If no action passed in, resets all. |
### Setup
##### Combine redux-meta with your Redux Store
configureStore.js
```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from './reducers'; // Path to your reducers
import { reducer as metaReducer } from 'redux-meta'

const condenseReducers = (reducers) => {
  let condensed = {
    meta: metaReducer,
  };

  Object.keys(reducers).forEach((key) => {
    condensed[key] = reducers[key]
  })

  return condensed
}

export default function() {
  const condensed = condenseReducers(reducers);
  const reducer = combineReducers(condensed)

  const store = createStore(
    reducer
  );

  return store;
}
```

##### Connect your Component
Wrap your component with `connectMeta`:

App.js
```javascript
import React from 'react';
import { connect } from 'react-redux';
import { operations } from '../../redux'; // Path to your actions/operations
import { connectMeta } from 'redux-meta';

const mapStateToProps = function(state) {
  return {
    myReducer: state.myReducer
  };
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    myAction: operations.myAction,
  }, dispatch)
};

function MyApp(props) {
    console.log(props); // { myReducer, myAction, getMeta, getLoading, getSuccess, getFailure, resetMeta }
    return (
        <div>Hello World</div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(connectMeta(MyApp));
```

### Usage
Redux-meta will automatically update the meta values. You may access them like this:

App.js
```javascript
import React from 'react';
import { connect } from 'react-redux';
import { operations } from '../../redux'; // Path to your actions/operations
import { connectMeta } from 'redux-meta';

const mapStateToProps = function(state) {
  return {
    myReducer: state.myReducer
  };
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    myAction: operations.myAction,
  }, dispatch)
};

const MyApp = (props) => {
    // Get all metadata about the action "myAction"
    const myActionMetaData = props.getMeta(operations.myAction);
    console.log(myActionMetaData); // {loading: false, success: false, failure: false, message: ''}
    
    // Check whether myAction is loading
    const myActionLoading = props.getLoading(operations.myAction);
    console.log(myActionLoading); // false
    
    const myResetFunction = () => {
        props.resetMeta(myAction); // Resets metadata for "myAction"
    }
    
    return (
        <div>Hello World</div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(connectMeta(MyApp));
```