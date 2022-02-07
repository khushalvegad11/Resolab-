import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//import Footer from './footer';

const ListofPeople = [
  {
    subcategory:"Trainer",
  },
  {
    subcategory:"Operation",
  },
  {
    subcategory:"Quality",
  },
  {
    subcategory:"Finance",
  }
];

const ListofServices = [
  {
    subcategory:"Advisory Services",
    providerlink:"/adpf",
    seekerlink:"/adsf",
  },
  {
    subcategory:"Infrastructure Services",
    providerlink:"/ipf",
    seekerlink:"/isf",
  },
  {
    subcategory:"Allied Services",
    providerlink:"/alpf",
    seekerlink:"/alsf",
  }


];

function Title(){
  return(
    <div>
    <h2>Please specify resource category</h2>
    </div>
  )
};

function GetPeople(props){
    const list = ListofPeople.map((resource) =>
    <div className = "item" key = {resource.subcategory} style ={{height:"50px"}}>
      <div className = "content" style = {{marginTop:"0px"}}>
        <Link to={{pathname:props.pathname,
          state:{category:"people",provider:props.provider,
          seeker:props.seeker,subcategory:`${resource.subcategory}`}}}>
        <h4>{resource.subcategory}</h4>
        </Link>
      </div>
    </div>);
    console.log("provider " + props.provider);
    return (
      <div>
      <Title/>
      <div class="ui celled list" style ={{backgroundColor:"aliceblue"}}>{list}
    </div>
  </div>);
};

function GetServices(props){

  const list = ListofServices.map((service)=>
  <div className = "item" key = {service.subcategory} style ={{height:"50px"}}>
    <div className = "content" style = {{marginTop:"0px"}}>
      <Link to={props.provider===true? service.providerlink:service.seekerlink}>
      <h4> {service.subcategory}</h4>
      </Link>
      </div>
      </div>
    );
    return  ( <div>
      <Title/>
      <div class="ui celled list" style ={{backgroundColor:"aliceblue"}}>{list}
    </div>
  </div>);
}

class Form3 extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    };


    render(){
        if (this.props.location.state.provider===true){
            if (this.props.location.state.category === "people")
            return(
                <div>
                <br />
                <GetPeople provider={true} seeker={false} pathname = {"/provider"} />

                </div>
            );
            else if (this.props.location.state.category === "services")
            return(
                <div>
                <br />
                <GetServices provider = {true}/>
                <br/>

                </div>

            );
            else
            return(<h1>Error</h1>);
        }
        else if (this.props.location.state.seeker===true){
            if (this.props.location.state.category === "people")
            return(
                <div>
                <br />
                <GetPeople provider={false} seeker = {true} pathname = {"/seeker"}/>

                <br/>
                </div>
            );
            else if (this.props.location.state.category === "services")
            return(
                <div>
                <br />
                <GetServices provider={false}/>

                <br/>
                </div>

            );
            else
            return(
              <div>
              <h1>Error</h1>

            </div>);

        }

    }
}

export default Form3;
