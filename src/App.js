import "./App.css"
import React from "react"
import { useEffect, useState } from "react";
import oip from './oip.png'

const Card = ({id,email,first_name,last_name,avatar}) =>{
  return (
  <div className="card" key={id} >
    <div className="card-head">
      <img src={avatar} alt="avatar" />
      <h2>{first_name} {last_name}</h2>
    </div>
    <div className="card-body">
      <p>Contact : {email}</p>
    </div>
  </div>
  )
}

class App extends React.Component{
  constructor(props){
    super(props);
     this.state = {shouldDisplay: 0};
     this.changeState = this.changeState.bind(this);
  }
  changeState = function (){
    if(this.state.shouldDisplay === 0){
      this.setState({
    shouldDisplay : 1,
  });
    }
    else{
      this.setState({
        shouldDisplay : 0,
      });
    }
    console.log(this.state.shouldDisplay);
  };

  renderData = ()=>{
    const [cards,setCards] = useState([])
      useEffect( () => {
        fetch("https://reqres.in/api/users?page=1").then((res)=>res.json()).then((data)=>{
          console.log(data);
          setCards(data.data)
        })
      
        return () => {}
        
      }, [])
      console.log(cards);

    return <div className="container">
          { cards.map((item)=><Card id={item.id} first_name={item.first_name} last_name={item.last_name} email={item.email} avatar={item.avatar} />)}
         </div>;
  };
  render(){  
    if(this.state.shouldDisplay){
      return <div>
        <div class="Banner"><img src={oip} alt="Brand"/></div>
        <br/>
          <center>
            <button onClick={this.changeState}>Click Me!</button>
          </center>
          <this.renderData/>
        </div>
    }
    else{

      return <center>
        <img src={oip} alt="Brand"/>
        <br/>
        <button onClick={this.changeState}>Click Me</button>
        </center>
    }
  }
}

export default App
