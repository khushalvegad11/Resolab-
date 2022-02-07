import React from 'react';
import { Container, Row, Col, Jumbotron, Image } from 'react-bootstrap';
import CardTemplate from './CardTemplate';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Cookies from "universal-cookie";

import CardTemplateForSeeker from '../CardTemplateForSeeker';

import '../style/css/People.min.css';

let cards=[{
    cId: 1,
    cUser: 'frank',
    cName: 'Frank Abagnale',
    cPosition: 'Domain Trainer',
    cMoney: 30000,
    cLoc: 'Ahmedabad',
    jobTypeVal: 0,
    postedByVal: 2,
}, {
    cId: 2,
    cUser: 'frank',
    cName: 'Will Smith',
    cPosition: 'Domain Trainer',
    cMoney: 20000,
    cLoc: 'Ayodhya',
    jobTypeVal: 0,
    postedByVal: 2,
}, {
    cId: 3,
    cUser: 'frank',
    cName: 'Abhas K D',
    cPosition: 'Domain Trainer',
    cMoney: 20000,
    cLoc: 'Andheri',
    jobTypeVal: 0,
    postedByVal: 2,
}, {
    cId:4,
    cUser: 'frank',
    cName: 'Tracy Smith',
    cPosition: 'Logistics Manager',
    cMoney: 35000,
    cLoc: 'Dharavi',
    jobTypeVal: 0,
    postedByVal: 2,
}, {
    cId: 5,
    cUser: 'frank',
    cName: 'Heinrisch Schindler',
    cPosition: 'Factory Manager',
    cMoney: 23000,
    cLoc: 'Jacksonville',
    jobTypeVal: 0,
    postedByVal: 2,
}, {
    cId: 6,
    cUser: 'frank',
    cName: 'Heinrisch Schindler',
    cPosition: 'Factory Manager',
    cMoney: 23000,
    cLoc: 'Jacksonville',
    jobTypeVal: 0,
    postedByVal: 2,
},];

let cardsForSeeker=[{
    cCategory: 'Trainer',
    cSubCategory: 'Domain Trainer',
    cSalaryLower: 20000,
    cSalaryUpper: 50000,
    postedByVal: 0,
    cImg: 'frank',
    cLoc: 'Rajkot',
    cId: 0,
}, {
    cCategory: 'Trainer',
    cSubCategory: 'IT Trainer',
    cSalaryLower: 25000,
    cSalaryUpper: 50000,
    postedByVal: 0,
    cImg: 'frank',
    cLoc: 'Rajkot',
    cId: 1,
}, {
    cCategory: 'Operation',
    cSubCategory: 'MIS Executive',
    cSalaryLower: 30000,
    cSalaryUpper: 50000,
    postedByVal: 0,
    cImg: 'frank',
    cLoc: 'Rajkot',
    cId: 2,
}, {
    cCategory: 'Quality',
    cSubCategory: 'State Quality Head',
    cSalaryLower: 15000,
    cSalaryUpper: 50000,
    postedByVal: 1,
    cImg: 'frank',
    cLoc: 'Rajkot',
    cId: 3,
}, {
    cCategory: 'Finance',
    cSubCategory: 'Finance Head',
    cSalaryLower: 30000,
    cSalaryUpper: 50000,
    postedByVal: 1,
    cImg: 'frank',
    cLoc: 'Rajkot',
    cId: 4,
}, ];

class People extends React.Component{


    constructor(){
    	super();
    	this.state={
    		search:'',
            searchClick: '',
            salaryRangeState: {
                salaryFromState:0,
                salaryToState:100000,
            },
            postedByState: [false,false,false],
            jobTypesState: [false,false],

            salaryRangeClick:{
                salaryFromClick: 0,
                salaryToClick: 100000,
            },
            postedByClick: [true,true,true],
            jobTypesClick: [true,true],

            selectCategory: 1,

            listOfSeekers: [],
            listOfProviders: [],

    	};
    }

    componentDidMount(){
        const cookies = new Cookies();
        axios.get("https://resolab-backend.herokuapp.com/core/create_list_seekers",{
            params:{
                complete_list : true
            },
            headers:{
                'Authorization': `Token ${cookies.get("token")}`
            }
        }).then((response) => {
            console.log(cookies.get("token"));
            response.data.map((ele)=>{
                var curState=this.state.listOfSeekers;
                curState.push({
                cId: ele.id,
                cCategory: ele.job,
                cSubCategory: 'Sub',
                cImg: 'frank',
                postedByVal: 0,
                cLoc: ele.job_district,
                cSalaryUpper: ele.max_salary,
                cSalaryLower: ele.min_salary,
                });
                this.setState({
                    listOfSeekers: curState,
                });
            });
            console.log(this.state.listOfSeekers)
        }, (error) => {
            console.log(cookies.get("token"));
            console.log(error);
        });

        axios.get("https://resolab-backend.herokuapp.com/core/create_list_providers",{
            params:{
                complete_list : true
            },
            headers:{
                'Authorization': `Token ${cookies.get("token")}`
            }
        }).then((response) => {
            console.log(cookies.get("token"));
            response.data.map((ele)=>{
                var curProviders=this.state.listOfProviders;
                curProviders.push({
                    cId: ele.id,
                    cUser: 'frank',
                    cName: 'Name',
                    cPosition: ele.designation_1,
                    cMoney: 'Money',
                    cLoc: ele.current_work_district,
                    jobTypeVal: 0,
                    postedByVal: 0,
                });
                this.setState({
                    listOfProviders: curProviders,
                })
            });
            console.log(this.state.listOfProviders);
            
        }, (error) => {
            console.log(cookies.get("token"));
            console.log(error);
        });


    }

    updateSearch(e){
        this.setState({search: e.target.value});
    }

    updateSalaryFrom(e){
        this.setState({salaryRangeState: {
            salaryFromState: e.target.value
        }});
    }
    updateSalaryTo(e){
        this.setState({salaryRangeState: {
            salaryToState: e.target.value
        }});
    }

    updateJobTypesState(e){
        const jobTypesState= this.state.jobTypesState.slice();
        let idx = parseInt(e.target.id.substr(0,1));
        jobTypesState[idx] = !jobTypesState[idx];
        this.setState({
                jobTypesState: jobTypesState,
            
        })
    }

    updatePostedByState(e){
        let postedByArray= this.state.postedByState.slice();
        let idx = parseInt(e.target.id.substr(0,1));
        postedByArray[idx]=!postedByArray[idx];
        this.setState({   
                postedByState: postedByArray,  
        })
    }


    handleSelectCategory(e){
        this.setState({selectCategory: e.target.value,});
    }

    handleSearchGo(){
        this.setState({searchClick: this.state.search});
    }

    handleFilterGo(e){
        this.setState({
            salaryRangeClick: {
                salaryFromClick: this.state.salaryRangeState.salaryFromState,
                salaryToClick: this.state.salaryRangeState.salaryToState,
            },
            jobTypesClick: this.state.jobTypesState,
            postedByClick: this.state.postedByState,
        });
    }

	render(){

        let filteredCards=cards.filter((card)=>{
            return (card.cPosition.toLowerCase().indexOf(this.state.searchClick.toLowerCase()) !== -1 || card.cLoc.toLowerCase().indexOf(this.state.searchClick.toLowerCase()) !== -1);
        });
        let filteredCardsTest=this.state.listOfProviders.filter((card)=>{
            return (this.state.jobTypesClick[card.jobTypeVal])&&(this.state.postedByClick[card.postedByVal])&&(card.cPosition.toLowerCase().indexOf(this.state.searchClick.toLowerCase()) !== -1 || card.cLoc.toLowerCase().indexOf(this.state.searchClick.toLowerCase()) !== -1);
        });
        let filteredCardsCMoney=cards.filter((card)=>{
            return (card.cMoney<=this.state.salaryRangeClick.salaryToClick)&&(card.cMoney>=this.state.salaryRangeClick.salaryFromClick);
        });
        let filteredCardsTestFinal=filteredCardsTest.filter((card)=>{
            return (card.cMoney<=Number(this.state.salaryRangeClick.salaryToClick))&&(card.cMoney>=Number(this.state.salaryRangeClick.salaryFromClick));
        });
    
    if(this.state.selectCategory==3){

        return(
        	<div>
                <Jumbotron className="mb-0">
                <Container>
                <Form>
                <Form.Row>
                <Form.Group as={Col} sm={12} md={2}>
                    <Form.Control as="select" value={this.state.selectCategory} onChange={this.handleSelectCategory.bind(this)}>
                        <option value={1}>All Categories</option>
                        <option value={2}>Resource Seeker</option>
                        <option value={3}>Resoure Provider</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={12} md={9}>
            		<Form.Control type="text"
                    placeholder="Enter Keywords" 
                    value={this.state.search} 
                    onChange={this.updateSearch.bind(this)} />
                 </Form.Group>
                 
                 <Form.Group as={Col} sm={12} md={1}>
                    <Button variant="primary" onClick={this.handleSearchGo.bind(this)}>Search</Button>
                </Form.Group>
                </Form.Row>
                <div className="people-page-marginer"></div>
                <Form.Row>
                            

                            <Form.Group as={Col} controlId="peopleFilter.jobType">
                                <Form.Row>
                                <Form.Label as={Col} xs={4}>Resource type</Form.Label>
                                <div as={Col} xs={8} className="filter-data-col">
                                <Form.Check
                                    checked={this.state.jobTypesState[0]}
                                    type={'checkbox'}
                                    id={'0j'}
                                    label={'Resource Seeker'}
                                    onChange={this.updateJobTypesState.bind(this)}
                                    />
                                    <Form.Check
                                    checked={this.state.jobTypesState[1]}   
                                    type={'checkbox'}
                                    id={'1j'}
                                    label={'Resource Provider'}
                                    onChange={this.updateJobTypesState.bind(this)}
                                    />
                                    </div>
                                    </Form.Row>


                            </Form.Group>

                            <Form.Group as={Col} className="filter-data-col" controlId="peopleFilter.postedBy">
                            <Form.Row>
                                <Form.Label as={Col} xs={3}>Posted By</Form.Label>
                                <div as={Col} xs={9}>
                                <Form.Check
                                    checked={this.state.postedByState[0]}
                                    type={'checkbox'}
                                    id={'0p'}
                                    label={'Management'}
                                    onChange={this.updatePostedByState.bind(this)}
                                    />
                                <Form.Check
                                    checked={this.state.postedByState[1]}
                                    type={'checkbox'}
                                    id={'1p'}
                                    label={'HR'}
                                    onChange={this.updatePostedByState.bind(this)}
                                    />
                                <Form.Check
                                    checked={this.state.postedByState[2]}
                                    type={'checkbox'}
                                    id={'2p'}
                                    label={'Individual'}
                                    onChange={this.updatePostedByState.bind(this)}
                                    />
                                </div>
                            </Form.Row>


                            </Form.Group>

                            <Form.Group as={Col} controlId="peopleFilter.salaryRange">
                            <Form.Row>
                                <Form.Label as={Col}>Salary Range</Form.Label><br/>
                                <div as={Col}>
                                <span>&#8377;</span> <Form.Control type="text" className="salary-input" 
                                value={this.state.salaryRangeState.salaryFromState}
                                onChange={this.updateSalaryFrom.bind(this)}
                                />
                                <span>- &#8377;</span> <Form.Control type="text" className="salary-input" 
                                value={this.state.salaryRangeState.salaryToState}
                                onChange={this.updateSalaryTo.bind(this)}
                                />
                                </div>
                                </Form.Row>
                       
                            </Form.Group>

                            </Form.Row>

                            <Form.Row>
                            <Form.Group as={Col}>
                                <Button variant="primary" onClick={this.handleFilterGo.bind(this)}>Apply Filter</Button>
                            </Form.Group>
                            </Form.Row>
                </Form>
                </Container>
                </Jumbotron>
                <div id="people-resource-provider">
                <Container>
                    <Row>
                        <Col>
                            <div class="people-page-marginer"></div>
                            <h2>Resource Providers</h2>
                        </Col>
                    </Row>
                    <Row>
                    <Col >
    {/*                    <CardDeck>
                            {filteredCards.map((card)=>{
                                return(<CardTemplate cUser={card.cUser}
                                             cName={card.cName}
                                             cPosition={card.cPosition}
                                             cMoney={card.cMoney}
                                             cLoc={card.cLoc}
                                             cImg={card.cStat}
                                             key={card.cId}
                                             cdType={card.cdType}
                                              />)
                            })}
                        </CardDeck>*/}
                        <div class="people-page-marginer"></div>
                        <CardDeck>
                            {filteredCardsTest.map((card)=>{
                                return(<CardTemplate cUser={card.cUser}
                                             cName={card.cName}
                                             cPosition={card.cPosition}
                                             cMoney={card.cMoney}
                                             cLoc={card.cLoc}
                                             cImg={card.cStat}
                                             key={card.cId}
                                             cdType={card.cdType}
                                              />)
                            })}
                        </CardDeck>
                        <div class="people-page-marginer"></div>
                    </Col>  
                    </Row>
                </Container>
                </div>
        	</div>  
        	);
        }
        else if(this.state.selectCategory==2){
            return(
                <div>
                <Jumbotron className="mb-0">
                <Container>
                <Form>
                <Form.Row>
                <Form.Group as={Col} sm={12} md={2}>
                    <Form.Control as="select" value={this.state.selectCategory} onChange={this.handleSelectCategory.bind(this)}>
                        <option value={1}>All Categories</option>
                        <option value={2}>Resource Seeker</option>
                        <option value={3}>Resoure Provider</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={12} md={9}>
                    <Form.Control type="text"
                    placeholder="Enter Keywords" 
                    value={this.state.search} 
                    onChange={this.updateSearch.bind(this)} />
                 </Form.Group>
                 
                 <Form.Group as={Col} sm={12} md={1}>
                    <Button variant="primary" onClick={this.handleSearchGo.bind(this)}>Search</Button>
                </Form.Group>
                </Form.Row>
                <div className="people-page-marginer"></div>
                <Form.Row>
                            

                            <Form.Group as={Col} controlId="peopleFilter.jobType">
                                <Form.Row>
                                <Form.Label as={Col} xs={4}>Resource type</Form.Label>
                                <div as={Col} xs={8} className="filter-data-col">
                                <Form.Check
                                    checked={this.state.jobTypesState[0]}
                                    type={'checkbox'}
                                    id={'0j'}
                                    label={'Resource Seeker'}
                                    onChange={this.updateJobTypesState.bind(this)}
                                    />
                                    <Form.Check
                                    checked={this.state.jobTypesState[1]}   
                                    type={'checkbox'}
                                    id={'1j'}
                                    label={'Resource Provider'}
                                    onChange={this.updateJobTypesState.bind(this)}
                                    />
                                    </div>
                                    </Form.Row>


                            </Form.Group>

                            <Form.Group as={Col} className="filter-data-col" controlId="peopleFilter.postedBy">
                            <Form.Row>
                                <Form.Label as={Col} xs={3}>Posted By</Form.Label>
                                <div as={Col} xs={9}>
                                <Form.Check
                                    checked={this.state.postedByState[0]}
                                    type={'checkbox'}
                                    id={'0p'}
                                    label={'Management'}
                                    onChange={this.updatePostedByState.bind(this)}
                                    />
                                <Form.Check
                                    checked={this.state.postedByState[1]}
                                    type={'checkbox'}
                                    id={'1p'}
                                    label={'HR'}
                                    onChange={this.updatePostedByState.bind(this)}
                                    />
                                <Form.Check
                                    checked={this.state.postedByState[2]}
                                    type={'checkbox'}
                                    id={'2p'}
                                    label={'Individual'}
                                    onChange={this.updatePostedByState.bind(this)}
                                    />
                                </div>
                            </Form.Row>


                            </Form.Group>

                            <Form.Group as={Col} controlId="peopleFilter.salaryRange">
                            <Form.Row>
                                <Form.Label as={Col}>Salary Range</Form.Label><br/>
                                <div as={Col}>
                                <span>&#8377;</span> <Form.Control type="text" className="salary-input" 
                                value={this.state.salaryRangeState.salaryFromState}
                                onChange={this.updateSalaryFrom.bind(this)}
                                />
                                <span>- &#8377;</span> <Form.Control type="text" className="salary-input" 
                                value={this.state.salaryRangeState.salaryToState}
                                onChange={this.updateSalaryTo.bind(this)}
                                />
                                </div>
                                </Form.Row>
                       
                            </Form.Group>

                            </Form.Row>

                            <Form.Row>
                            <Form.Group as={Col}>
                                <Button variant="primary" onClick={this.handleFilterGo.bind(this)}>Apply Filter</Button>
                            </Form.Group>
                            </Form.Row>
                </Form>
                </Container>
                </Jumbotron>
                <div id="people-resource-seeker">
                <Container>
                    <Row>
                        <Col>
                            <div class="people-page-marginer"></div>
                            <h2>Resource Seekers</h2>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                        <div class="people-page-marginer"></div>
                        <CardDeck>
                            {cardsForSeeker.map((card)=>{
                                return(<CardTemplateForSeeker
                                             cCategory={card.cCategory}
                                             cSubCategory={card.cSubCategory}
                                             cSalaryLower={card.cSalaryLower}
                                             cSalaryUpper={card.cSalaryUpper}
                                             cPostedByVal={card.cPostedByVal}
                                             cImg={card.cImg}
                                             cLoc={card.cLoc}
                                             key={card.cId}

                                              />)
                            })}
                        </CardDeck>
                        <div class="people-page-marginer"></div>
                    </Col>  
                    </Row>
                </Container>
                </div>
            </div>
            );
        }
        else if(this.state.selectCategory==1){
            return(
            <div>
            <Jumbotron className="mb-0">
                <Container>
                <Form>
                <Form.Row>
                <Form.Group as={Col} sm={12} md={2}>
                    <Form.Control as="select" value={this.state.selectCategory} onChange={this.handleSelectCategory.bind(this)}>
                        <option value={1}>All Categories</option>
                        <option value={2}>Resource Seeker</option>
                        <option value={3}>Resoure Provider</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} sm={12} md={9}>
                    <Form.Control type="text"
                    placeholder="Enter Keywords" 
                    value={this.state.search} 
                    onChange={this.updateSearch.bind(this)} />
                 </Form.Group>
                 
                 <Form.Group as={Col} sm={12} md={1}>
                    <Button variant="primary" onClick={this.handleSearchGo.bind(this)}>Search</Button>
                </Form.Group>
                </Form.Row>
                <div className="people-page-marginer"></div>
                <Form.Row>
                            

                            <Form.Group as={Col} controlId="peopleFilter.jobType">
                                <Form.Row>
                                <Form.Label as={Col} xs={4}>Resource type</Form.Label>
                                <div as={Col} xs={8} className="filter-data-col">
                                <Form.Check
                                    checked={this.state.jobTypesState[0]}
                                    type={'checkbox'}
                                    id={'0j'}
                                    label={'Resource Seeker'}
                                    onChange={this.updateJobTypesState.bind(this)}
                                    />
                                    <Form.Check
                                    checked={this.state.jobTypesState[1]}   
                                    type={'checkbox'}
                                    id={'1j'}
                                    label={'Resource Provider'}
                                    onChange={this.updateJobTypesState.bind(this)}
                                    />
                                    </div>
                                    </Form.Row>


                            </Form.Group>

                            <Form.Group as={Col} className="filter-data-col" controlId="peopleFilter.postedBy">
                            <Form.Row>
                                <Form.Label as={Col} xs={3}>Posted By</Form.Label>
                                <div as={Col} xs={9}>
                                <Form.Check
                                    checked={this.state.postedByState[0]}
                                    type={'checkbox'}
                                    id={'0p'}
                                    label={'Management'}
                                    onChange={this.updatePostedByState.bind(this)}
                                    />
                                <Form.Check
                                    checked={this.state.postedByState[1]}
                                    type={'checkbox'}
                                    id={'1p'}
                                    label={'HR'}
                                    onChange={this.updatePostedByState.bind(this)}
                                    />
                                <Form.Check
                                    checked={this.state.postedByState[2]}
                                    type={'checkbox'}
                                    id={'2p'}
                                    label={'Individual'}
                                    onChange={this.updatePostedByState.bind(this)}
                                    />
                                </div>
                            </Form.Row>


                            </Form.Group>

                            <Form.Group as={Col} controlId="peopleFilter.salaryRange">
                            <Form.Row>
                                <Form.Label as={Col}>Salary Range</Form.Label><br/>
                                <div as={Col}>
                                <span>&#8377;</span> <Form.Control type="text" className="salary-input" 
                                value={this.state.salaryRangeState.salaryFromState}
                                onChange={this.updateSalaryFrom.bind(this)}
                                />
                                <span>- &#8377;</span> <Form.Control type="text" className="salary-input" 
                                value={this.state.salaryRangeState.salaryToState}
                                onChange={this.updateSalaryTo.bind(this)}
                                />
                                </div>
                                </Form.Row>
                       
                            </Form.Group>

                            </Form.Row>

                            <Form.Row>
                            <Form.Group as={Col}>
                                <Button variant="primary" onClick={this.handleFilterGo.bind(this)}>Apply Filter</Button>
                            </Form.Group>
                            </Form.Row>
                </Form>
                </Container>
                </Jumbotron>
                <div id="people-all-resource-seeker">
                <Container>
                    <Row>
                        <Col>
                            <div class="people-page-marginer"></div>
                            <h2>Resource Seekers</h2>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                        <div class="people-page-marginer"></div>
                        <CardDeck>
                            {this.state.listOfSeekers.map((card)=>{
                                return(<CardTemplateForSeeker
                                             cCategory={card.cCategory}
                                             cSubCategory={card.cSubCategory}
                                             cSalaryLower={card.cSalaryLower}
                                             cSalaryUpper={card.cSalaryUpper}
                                             cPostedByVal={card.cPostedByVal}
                                             cImg={card.cImg}
                                             cLoc={card.cLoc}
                                             key={card.cId}
                                              />)
                            })}
                        </CardDeck>
                        <div class="people-page-marginer"></div>
                    </Col>  
                    </Row>
                </Container>
                </div>
                <div id="people-all-resource-provider">
                <Container>
                    <Row>
                        <Col>
                            <div class="people-page-marginer"></div>
                            <h2>Resource Providers</h2>
                        </Col>
                    </Row>
                    <Row>
                    <Col >
    {/*                    <CardDeck>
                            {filteredCards.map((card)=>{
                                return(<CardTemplate cUser={card.cUser}
                                             cName={card.cName}
                                             cPosition={card.cPosition}
                                             cMoney={card.cMoney}
                                             cLoc={card.cLoc}
                                             cImg={card.cStat}
                                             key={card.cId}
                                             cdType={card.cdType}
                                              />)
                            })}
                        </CardDeck>*/}
                        <div class="people-page-marginer"></div>
                        <CardDeck>
                            {this.state.listOfProviders.map((card)=>{
                                return(<CardTemplate cUser={card.cUser}
                                             cName={card.cName}
                                             cPosition={card.cPosition}
                                             cMoney={card.cMoney}
                                             cLoc={card.cLoc}
                                             cImg={card.cStat}
                                             key={card.cId}
                                             cdType={card.cdType}
                                              />)
                            })}
                        </CardDeck>
                        <div class="people-page-marginer"></div>
                    </Col>  
                    </Row>
                </Container>
                </div>
            </div>
            );
        }
    }
}



export default People;