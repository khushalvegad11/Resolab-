import React, { Component, useEffect, useState } from 'react';
import '../style/css/People.min.css';
import ReactPaginate from 'react-paginate';
import '../style/css/People.min.css';
import { Container, CardDeck, Form, Button, Row, Col, Card } from 'react-bootstrap';

import CardTemplateForProvider from './CardTemplateForProvider';
import CardTemplateForSeeker from './CardTemplateForSeeker';
import LoadingElement from './Loader';


function SeekerMfPagination() {

    const [cards, setCards] = useState([])

    const [pageCount, setPageCount] = useState(0)

    let cardsTotal = 10

    useEffect(() => {
        const getCards = async () => {
            const res = await fetch(`https://www.resolabindia.com/api/core/list_seekers_people_all_mf/?page=1&cards=${cardsTotal}`)
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
        const res = await fetch(`https://www.resolabindia.com/api/core/list_seekers_people_all_mf/?page=${currentPage}&cards=${cardsTotal}`)

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

    const seeker_list = cards.map((seeker) =>
                <div className="resource-seeker-list">

                    <CardTemplateForSeeker  className="seeker-card"
                        key={seeker.id}
                        cardId={seeker.id}
                        date_of_birth={seeker.user.date_of_birth}
                        email={seeker.user.email}
                        name={seeker.user.name}
                        phone_number={seeker.user.phone_number}
                        profile_pic_url={seeker.user.profile_pic_url}
                        registered_region={seeker.user.registered_region}
                        company_name={seeker.pia_tp_name}
                        active_index="Contact"
                        designation={seeker.designation}
                        //cCategory={seeker.job.category.category_name}
                        cSubCategory={seeker.job}
                        cLoc={seeker.job_district}
                        cSalaryUpper={seeker.max_salary}
                        cSalaryLower={seeker.min_salary}
                        cId={seeker.user.id}
                        additional_req={seeker.additional_req}
                        employee_id={seeker.employee_id}
                        experience_details={seeker.experience_details}
                        job_district={seeker.job_district}
                        joining_requirement={seeker.joining_requirement}
                        legal_status={seeker.legal_status}
                        manager_contact_number={seeker.manager_contact_number}
                        manager_designation={seeker.manager_designation}
                        manager_email_id={seeker.manager_email_id}
                        max_salary={seeker.max_salary}
                        min_salary={seeker.min_salary}
                        pia_tp_name={seeker.pia_tp_name}
                        pref_qualification={seeker.pref_qualification}
                        qualification={seeker.qualification}
                        reporting_manager_name={seeker.reporting_manager_name}
                        cImg={seeker.user.profile_pic_url}
                        // plan_id={this.state.plan_id}
                    /><br /><br />
                </div>
            );
    return (
        <div>
            <CardDeck style={{ margin: "auto"}}>{seeker_list ? seeker_list :
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

export default SeekerMfPagination