import { useState, useEffect, useReducer } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import UploadForm from './components/UploadForm';
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
    return { ...state.inputs, file: e.target.files[0], path: URL.createObjectURL(e.target.files[0])}
  } else {
    return {...state.inputs, title: e.target.value}
  }
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'setItem':
      return {
        ...state,
        items: [state.inputs, ...state.items]
      }
    case 'setInputs':
      return {
        ...state,
        inputs: handleOnChange(state, action.payload.value)
      }
    case 'collapse':
      return {
        ...state,
        isCollapsed: action.payload.bool
      }
      default : return state
  }
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [count, setCount] = useState();
  const toggle = (bool) => dispatch({ type: 'collapse', payload: { bool }})
  const handleOnChange = (e) => dispatch({ type: 'setInputs', payload: { value: e }})
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'setItem' })
    toggle(!state.isCollapsed)
  }

  useEffect(() => {
    console.log(state)
  }, [state.items])

  useEffect(() => {
    setCount(`you have ${state.items.length} photo${state.items.length > 1 ? "s" : ''} in your gallery`)
  }, [state.items])

  return (
    <>
    <Navbar />
    <div className="container text-center mt-5">
      <button className="btn btn-success float-end" onClick={toggle}>{!state.isCollapsed ? 'Close' : '+ Add'}</button>
      <div className="clearfix mb-4"></div>
      <UploadForm 
        inputs={state.inputs}
        isVisible={state.isCollapsed} 
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      />
      <h1>Gallery</h1>
      {count}
      <div className="row">
        { state.items.map((photo,index) => <Card key={index} src={photo.path} />) }
      </div>
    </div>
    </>
  );
}

export default App;
