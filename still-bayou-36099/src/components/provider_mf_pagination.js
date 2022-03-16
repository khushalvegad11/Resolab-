import React, { Component, useEffect, useState } from 'react';
import '../style/css/People.min.css';
import ReactPaginate from 'react-paginate';
import CardTemplateForProvider from './CardTemplateForProvider';
import '../style/css/People.min.css';
import { Container, CardDeck, Form, Button, Row, Col, Card } from 'react-bootstrap';


function ProviderMfPagination() {

    const [cards, setCards] = useState([])

    const [pageCount, setPageCount] = useState(0)

    let cardsTotal = 10

    useEffect(() => {
        const getCards = async () => {
            const res = await fetch(`https://www.resolabindia.com/api/core/list_providers_people_all_mf/?page=1&cards=${cardsTotal}`)
            const jsonData = await res.json()
            const data = jsonData.results
            const total = jsonData.count
            console.log(data);
            setPageCount(Math.ceil(total / cardsTotal))
            setCards(data)
        }
        getCards()
    }, [])

    const fetchCards = async (currentPage) => {
        const res = await fetch(`https://www.resolabindia.com/api/core/list_providers_people_all_mf/?page=${currentPage}&cards=${cardsTotal}`)

        const jsonData = await res.json()
        const data = jsonData.results
        return data
    }


    const handlePageClick = async (data) => {
        console.log(data.selected);

        let currentPage = data.selected + 1
        const cardsFromServer = await fetchCards(currentPage)
        setCards(cardsFromServer)
    }

    const provider_list =  cards.map((card) =>
        <div className="resource-provider-list" >

            <CardTemplateForProvider className="provider-card"
                key={card.id}
                cardId={card.id}
                cName={card.user.name}
                cDob={card.user.date_of_birth}
                cPhone={card.user.phone_number}
                cEmail={card.user.email}
                cPosition={card.job}
                cLoc={card.current_work_state}
                cExp={card.exp_skill_industry}
                cId={card.user.id}
                cSalary={card.current_salary}
                eSalary={card.expected_salary}
                aadhar_no={card.aadhar_no}
                achievement={card.achievement}
                current_work_district={card.current_work_district}
                current_work_state={card.current_work_state}
                educational_qualification={card.educational_qualification}
                exp_skill_industry={card.exp_skill_industry}
                exp_non_skill={card.exp_non_skill}
                project_name={card.project_name}
                designation_1={card.designation_1}
                organization_1_name={card.organization_1_name}
                total_tenure_1={card.total_tenure_1}
                designation_2={card.designation_2}
                organization_2_name={card.organization_2_name}
                total_tenure_2={card.total_tenure_2}
                designation_3={card.designation_3}
                organization_3_name={card.organization_3_name}
                total_tenure_3={card.total_tenure_3}
                cImg={card.user.profile_pic_url}
            // plan_id={this.state.plan_id}
            /><br /><br />
        </div>
    )
    return (
        <div>
            <CardDeck style={{ margin: "auto"}}>{provider_list ? provider_list :
                <Container>
                    <Card style={{ width: '18rem', margin: 'auto' }}>
                        <h3>No data available</h3>
                    </Card>
                </Container>
            }
            </CardDeck>

            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                marginPagesDisplayed={'3'}
                pageCount={pageCount}
                breakLabel={'...'}
                pageRangeDisplayed={6}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
            />
        </div>
    )
}

export default ProviderMfPagination