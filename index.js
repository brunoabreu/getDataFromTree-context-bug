import React from 'react';
import ReactDom from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';

const { Provider, Consumer } = React.createContext({ parent: '' });

const Node = (props) => (
  <Consumer>
    {({ parent }) => {
      console.log(`ID: ${props.id} | PARENT: ${parent}`)
      return (
        <div>
          <Provider value={{parent: parent ? `${parent}/${props.id}` : props.id }}>
            {props.children}
          </Provider>
        </div>
      )
    }}
  </Consumer>
)

const App = (
  <Node id='root'>
    <Node id='one'>
      <Node id='a' />
      <Node id='b' />
    </Node>
    <Node id='two'>
      <Node id='a' />
      <Node id='b' />
    </Node>
  </Node>
)

console.log('without getDataFromTree:')
ReactDom.renderToStaticMarkup(App);

console.log('\nduring getDataFromTree:')
getDataFromTree(App)
