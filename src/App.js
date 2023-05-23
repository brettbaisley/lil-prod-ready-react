import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import UploadForm from './components/UploadForm';
import './App.css';

const photos = [
  'https://picsum.photos/id/1001/200/200',
  'https://picsum.photos/id/1002/200/200',
  'https://picsum.photos/id/1003/200/200',
  'https://picsum.photos/id/1004/200/200',
  'https://picsum.photos/id/1005/200/200',
  'https://picsum.photos/id/1006/200/200',
]

function App() {
  const [count, setCount] = useState();
  const [inputs, setInputs] = useState( { title: null, file: null, path: null });
  const [items, setItems] = useState(photos);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggle = () => setIsCollapsed(!isCollapsed);
  const handleOnChange = (e) => {
    if (e.target.name === 'file') {
      setInputs({ ...inputs, file: e.target.files[0], path: URL.createObjectURL(e.target.files[0])})
    } else {
      setInputs({...inputs, title: e.target.value})
    }
  }
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setItems([inputs.path, ...items])
  }

  useEffect(() => {
    setCount(`you have ${items.length} photo${items.length > 1 ? "s" : ''} in your gallery`)
  }, [items])

  return (
    <>
    <Navbar />
    <div className="container text-center mt-5">
      <button className="btn btn-success float-end" onClick={toggle}>{isCollapsed ? 'Close' : '+ Add'}</button>
      <div className="clearfix mb-4"></div>
      <UploadForm 
        isVisible={isCollapsed} 
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      />
      <h1>Gallery</h1>
      {count}
      <div className="row">
        {
          items.map((photo) => <Card src={photo} /> )
        }
      </div>
    </div>
    </>
  );
}

export default App;
