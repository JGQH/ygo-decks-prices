import Uploader from './components/Uploader';
import { useState } from 'react';

const App = () => {
  const [file, setFile] = useState(null);
  return (<>
    <Uploader file={file} setFile={setFile} />
  </>);
}
export default App;