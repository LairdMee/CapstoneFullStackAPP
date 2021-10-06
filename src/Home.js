import { Card } from './Context';
import './index.css'

function Home(){
  return (
    <Card
      txtcolor="black"
      header="Welcome to Full Stack National Banking"
      
      
      body={(<img src="bank .png" className="img-fluid" alt="Responsive image"/>)}
    />
  );  
  }

  export default Home;