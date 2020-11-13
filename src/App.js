import React, { useState } from 'react';
import './App.css';
import axios from "axios";
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

const Result = props => (
  <tr>
      <td>{props.res[0]}</td>
      <td>{props.res[1]}</td>
      

  </tr>
)

function App() {

  const [finalOutput, setFinalOutput] = useState([]);



function buttonClick(e){
    e.preventDefault();
    var value = e.target.toggle.value;
    console.log(value); 
    const requestOptions = {
      fb: value
    }
    axios.post('http://localhost:5000/feedback', requestOptions)
    .then(res => {
      window.alert("Recorded in DB");
    })

}


function displayResult(){
  return finalOutput.map(function(cur, i){
    console.log(cur);
    <span className="badge badge-secondary p-2">
    {cur}
    </span>

      return <Result res={cur} key={i} />;
  })
}





 function handleClick(e){
   e.preventDefault();
   var textValue = e.target.text.value;
   //console.log(textValue);
   const requestOptions = {
     txt: textValue
   }
 
    axios.post('http://localhost:5000/text', requestOptions)
    .then(res => {
      setFinalOutput(res.data.final_data);
      //console.log(typeof(res.data.final_data[0]));
     
      //console.log(data.data.final_data[0][0]);
    });
    

 }
  return (

    
    <div className="App">
      <header className="App-header">
      
      <br/><br/>
   <h1>NAMED ENTITY RECOGNITION</h1><br/>
      <form id="form1" onSubmit= {handleClick}>
      <p>Enter Text:</p>
      <textarea id="w3review" name="text" rows="4" cols="50" /> <br/>
      <br/>
      <Button type="submit"  size="lg" value="process"  className="button" >Submit</Button><br/> <br/> 
        </form>
        <h2>Output:</h2>
        {[          
          'Secondary'
          
].map((variant, idx) => (
  <Card bg={variant.toLowerCase()} border="secondary" text={variant.toLowerCase() === 'light' ? 'dark' : 'white'} style={{ width: '50rem' }}>
        <p>
              {finalOutput.map((val, key) => (
                <span key={key} className="badge badge-light ml-3 p-10" display = "block">
                  
                  {val[0]} <span style={{color: "red", fontSize: "16px"}}>{val[1]}</span>

                </span>
                ))}
        </p>
    </Card>))}
 <br/>
       <form id= "feedback" onSubmit = {buttonClick}>
       <p>Is the Recognition Correct?</p> 
       <span>
        <label htmlFor="toggle-on"><Badge variant="success"  style={{ margin:"10px" }} >YES</Badge>  </label><input id="toggle-on" name="toggle" value = "YES" type="radio" />
        <br/>
        <label htmlFor="toggle-off"><Badge variant="danger" style={{ margin:"10px" }} >NO</Badge>  </label>  <input id="toggle-off" name="toggle" value = "NO" type="radio" />
        

       </span>
        <br/>
        
        <Button type="submit"  value="process" size="lg" className="button" >Submit</Button><br/><br/><br/><br/> 

       </form>
       <h1>OUTPUT TABLE</h1>
                <Table striped bordered hover variant="dark">

                    <thead>
                        <tr>
                            <th>Text</th>
                            <th>Result</th>

                        </tr>
                    </thead>
                    <tbody>
                        { displayResult() }
                    </tbody>
          </Table>

     
       
      </header>
    </div>
  );
}

export default App;
