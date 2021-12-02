import React, { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Checkbox } from '@mui/material';





function PlaneView(props){   //function component declaration
  const [selected,setSelected] = useState([]);
  const [flight,setFlight] = useState([]);
  const {id,setFunc} = props;
  let i =0;

  const handleSubmit=(e)=>{//method called when submiting to send a request and clear the fields of the form
    e.preventDefault();//prevent refresh
    //replace with a method that sets parent state(seats of flight)
    setFunc(selected);

    console.log(selected);
  }
//checkbtn
  const handleChange=(e)=>{
    let id=e.target.id;
    let seats = selected
    if(e.target.checked){
        if(!seats.includes(id)){
            seats.push(id);
        }
    }
    else{
    seats = seats.filter(seat=>(seat!=id))
    }
    setSelected(seats)

    console.log(seats)
  }

  useEffect(()=>{
    console.log(selected)
  },[selected])
  
  useEffect(()=>{
    async function fetchData(){
    let data = (await axios.get(`http://localhost:8000/getFlight/${id}`)).data
    setFlight(data.reservedEconomySeats);
    console.log(data.reservedEconomySeats);
    console.log(data);
    }


    fetchData();
  },[id]) //<==== empty dependency list meaning it only runs (initially) on creation of the component only 
  

  //when the flight data arrives or when the flight variable is updated just rerender the component and populate the fields
  //with the flight data captured from the request
  useEffect(()=>{
      console.log('flight loaded successfully')
  },[flight])

      return(
        <div>

        <h1>Reserve your departure seats :</h1> 
        
        <form onSubmit={handleSubmit} id="form">
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
            {flight.map((fly,index)=>
            <div style={{width:'14%'}}>
                {(fly?
                    <Checkbox
                    id={index.toString()}
                    key={index.toString()}
                    disabled
                    checked
                    
                    />:
                    <Checkbox
                    id={index.toString()}
                    key={index.toString()}
                    color="success"
                    onChange={handleChange}
                    />)}
                    </div>
                )
            }   
            </div>
         
          <Button value="Submit" type="submit" variant="contained" endIcon={<SendIcon />}>
              Submit
          </Button>
        </form>
        </div>

      );
    }
  

export default PlaneView ;
