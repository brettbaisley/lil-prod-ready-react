import { useMemo, useReducer } from 'react';
import Card from './components/Card';
import Layout from './components/Layout';
import './App.css';

const photos = []

const initialState = {
  items: photos,
  count: photos.length,
  inputs: { title: null, file: null, path: null },
  isCollapsed: false
}

const handleOnChange = (state, e) => {
  if (e.target.name === 'file') {
    return{ ...state.inputs, file: e.target.files[0], path: URL.createObjectURL(e.target.files[0])}
  } else {
    return{...state.inputs, title: e.target.value}
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case "setItems":
      return {
        ...state,
        items: [state.inputs, ...state.items],
        count: state.items.length + 1,
        inputs: { title: null, file: null, path: null }
      }
    case "setInputs":
      return {
        ...state,
        inputs: handleOnChange(state, action.payload.value)
      }
    case 'collapse':
      return {
        ...state,
        isCollapsed: action.payload.bool
      }
    default: return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const toggle = (bool) => dispatch({ type: "collapse", payload: { bool } });
  const handleOnChange = (e) => dispatch( {type: 'setInputs', payload: {value: e}})
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "setItems"})
    toggle(!state.isCollapsed)
  }

  const count = useMemo(() => {
    return `you have ${state.items.length} photo${state.items.length > 1 ? "s" : ''} in your gallery`

  }, [state.items])

  return (
    <Layout
      state={state}
      onChange={handleOnChange}
      onSubmit={handleOnSubmit}
      toggle={toggle}
    >
      <h1 className="text-center">Gallery</h1>
      {count}
      <div className="row">
        {
          state.items.map((item, index) => <Card key={index} {...item} /> )
        }
      </div>
    </Layout>
  );
}

export default App;
