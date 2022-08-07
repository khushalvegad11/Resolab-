import React from "react";
import PublicIcon from '@mui/icons-material/Public';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CoPresentIcon from '@mui/icons-material/CoPresent';

const Home = () => {
    return (
        <>
            <div className="hero-wrap img">
		<div className="overlay"></div>
		<div className="container">
			<div className="row d-md-flex no-gutters slider-text align-items-center justify-content-center">
				<div className="col-md-10 d-flex align-items-center">
					<div className="text text-center pt-5 mt-md-5">
						<h1 className="mb-5">Our Mission is <br />To Connect Resource with Opportunity</h1>
						<div className="ftco-counter ftco-no-pt ftco-no-pb">
							<div className="row">
								<div className="col-md-4 d-flex justify-content-center counter-wrap">
									<div className="block-18">
										<div className="text d-flex">
											<div className="icon mr-2">
												{/* <span className="flaticon-worldwide"></span> */}
												<PublicIcon sx={{ fontSize: 75}} style={{ color: 'white' }}/>
											</div>
											<div className="desc text-left">
												<strong className="number">46</strong>
												<span>Across India</span>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-4 d-flex justify-content-center counter-wrap">
									<div className="block-18 text-center">
										<div className="text d-flex">
											<div className="icon mr-2">
												{/* <span className="flaticon-visitor"></span> */}
												<SupervisorAccountIcon sx={{ fontSize: 75}} style={{ color: 'white' }}/>
											</div>
											<div className="desc text-left">
												<strong className="number">450</strong>
												<span>Companies</span>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-4 d-flex justify-content-center counter-wrap">
									<div className="block-18 text-center">
										<div className="text d-flex">
											<div className="icon mr-2">
												{/* <span className="flaticon-resume"></span> */}
												<CoPresentIcon sx={{ fontSize: 75}} style={{ color: 'white' }}/>
											</div>
											<div className="desc text-left">
												<strong className="number">80000</strong>
												<span>Active Resource</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="ftco-search my-md-5">
							<div className="row">
								<div className="col-md-12 nav-link-wrap">
									<div className="nav nav-pills text-center" id="v-pills-tab" role="tablist"
										aria-orientation="vertical">
										<a className="nav-link active mr-md-1" id="v-pills-1-tab" data-toggle="pill"
											href="#v-pills-1" role="tab" aria-controls="v-pills-1"
											aria-selected="true">Find Opportunity</a>

										<a className="nav-link" id="v-pills-2-tab" data-toggle="pill" href="#v-pills-2"
											role="tab" aria-controls="v-pills-2" aria-selected="false">Discover Talent</a>

									</div>
								</div>
								<div className="col-md-12 tab-wrap">

									<div className="tab-content p-4" id="v-pills-tabContent">

										<div className="tab-pane fade show active" id="v-pills-1" role="tabpanel"
											aria-labelledby="v-pills-nextgen-tab">
											<form action="#" className="search-job">
												<div className="row no-gutters">
													<div className="col-md mr-md-2">
														<div className="form-group">
															<div className="form-field">
																<div className="icon"><span className="icon-briefcase"></span>
																</div>
																<input type="text" className="form-control"
																	placeholder="eg. Garphic. Web Developer" />
															</div>
														</div>
													</div>
													<div className="col-md mr-md-2">
														<div className="form-group">
															<div className="form-field">
																<div className="select-wrap">
																	<div className="icon"><span
																			className="ion-ios-arrow-down"></span></div>
																	<select name="" id="" className="form-control">
																		<option value="">Category</option>
																		<option value="">Full Time</option>
																		<option value="">Part Time</option>
																		<option value="">Freelance</option>
																		<option value="">Internship</option>
																		<option value="">Temporary</option>
																	</select>
																</div>
															</div>
														</div>
													</div>
													<div className="col-md mr-md-2">
														<div className="form-group">
															<div className="form-field">
																<div className="icon"><span className="icon-map-marker"></span>
																</div>
																<input type="text" className="form-control"
																	placeholder="Location" />
															</div>
														</div>
													</div>
													<div className="col-md">
														<div className="form-group">
															<div className="form-field">
																<button type="submit"
																	className="form-control btn btn-primary">Search</button>
															</div>
														</div>
													</div>
												</div>
											</form>
										</div>

										<div className="tab-pane fade" id="v-pills-2" role="tabpanel"
											aria-labelledby="v-pills-performance-tab">
											<form action="#" className="search-job">
												<div className="row">
													<div className="col-md">
														<div className="form-group">
															<div className="form-field">
																<div className="icon"><span className="icon-user"></span></div>
																<input type="text" className="form-control"
																	placeholder="eg. Adam Scott" />
															</div>
														</div>
													</div>
													<div className="col-md">
														<div className="form-group">
															<div className="form-field">
																<div className="select-wrap">
																	<div className="icon"><span
																			className="ion-ios-arrow-down"></span></div>
																	<select name="" id="" className="form-control">
																		<option value="">Category</option>
																		<option value="">Full Time</option>
																		<option value="">Part Time</option>
																		<option value="">Freelance</option>
																		<option value="">Internship</option>
																		<option value="">Temporary</option>
																	</select>
																</div>
															</div>
														</div>
													</div>
													<div className="col-md">
														<div className="form-group">
															<div className="form-field">
																<div className="icon"><span className="icon-map-marker"></span>
																</div>
																<input type="text" className="form-control"
																	placeholder="Location" />
															</div>
														</div>
													</div>
													<div className="col-md">
														<div className="form-group">
															<div className="form-field">
																<button type="submit"
																	className="form-control btn btn-primary">Search</button>
															</div>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<section className="ftco-section ftco-no-pt ftco-no-pb">
    	<div className="container">
    		<div className="row">
    			<div className="col-md-12">
    				<div className="category-wrap">
    					<div className="row no-gutters">
    						<div className="col-md-2">
    							<div className="top-category text-center no-border-left">
    								<h3><a href="#">Field Team</a></h3>
    								<span className="icon flaticon-contact"></span>
    								<p><span className="number">143</span> <span>Open position</span></p>
    							</div>
    						</div>
    						<div className="col-md-2">
    							<div className="top-category text-center active">
    								<h3><a href="#">HR &amp; Training</a></h3>
    								<span className="icon flaticon-mortarboard"></span>
    								<p><span className="number">143</span> <span>Open position</span></p>
    							</div>
    						</div>
    						<div className="col-md-2">
    							<div className="top-category text-center">
    								<h3><a href="#">Admin &amp; IT Support Operations</a></h3>
    								<span className="icon flaticon-idea"></span>
    								<p><span className="number">143</span> <span>Open position</span></p>
    							</div>
    						</div>
    						<div className="col-md-2">
    							<div className="top-category text-center">
    								<h3><a href="#">Account</a></h3>
    								<span className="icon flaticon-accounting"></span>
    								<p><span className="number">143</span> <span>Open position</span></p>
    							</div>
    						</div>
    						<div className="col-md-2">
    							<div className="top-category text-center">
    								<h3><a href="#">Audit</a></h3>
    								<span className="icon flaticon-resume"></span>
    								<p><span className="number">143</span> <span>Open position</span></p>
    							</div>
    						</div>
    						<div className="col-md-2">
    							<div className="top-category text-center">
    								<h3><a href="#">Business</a></h3>
    								<span className="icon flaticon-stethoscope"></span>
    								<p><span className="number">143</span> <span>Open position</span></p>
    							</div>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </section>

	<section className="ftco-section">
    	<div className="container">
    		<div className="row justify-content-center mb-5">
          <div className="col-md-7 heading-section text-center">
            <h2 className="mb-0">Hire Talent in 3 simple steps</h2>
          </div>
        </div>
		<div className="container">
			<div className="row no-gutters ftco-services">
				<div className="col-lg-4 text-center d-flex align-self-stretch">
					<div className="media block-6 services p-4 py-md-5">
						<div className="icon d-flex justify-content-center align-items-center mb-4">
							<img src={`${process.env.PUBLIC_URL}./images/image_1.jpg`} className="img" />
						</div>
						<div className="media-body">
							<h3 className="heading">1. Register</h3>
							<p>Get started by creating your account</p>
						</div>
					</div>
				</div>
				<div className="col-lg-4 text-center d-flex align-self-stretch">
					<div className="media block-6 services p-4 py-md-5">
						<div className="icon d-flex justify-content-center align-items-center mb-4">
							<img src={`${process.env.PUBLIC_URL}./images/image_2.jpg`} className="img" />
						</div>
						<div className="media-body">
							<h3 className="heading">2. Post</h3>
							<p>Post requirement for any profile and location</p>
						</div>
					</div>
				</div>
				<div className="col-lg-4 text-center d-flex align-self-stretch">
					<div className="media block-6 services p-4 py-md-5">
						<div className="icon d-flex justify-content-center align-items-center mb-4">
							<img src={`${process.env.PUBLIC_URL}./images/image_3.jpg`} className="img" />
						</div>
						<div className="media-body">
							<h3 className="heading">3. Hire</h3>
							<p>Screen and hire using ResoLab</p>
						</div>
					</div>
				</div>
			</div>
		</div>
    	</div>
    </section>

	<section className="services-section">
		<div className="container">
			<div className="row no-gutters ftco-services">
				<div className="col-lg-7">
					<div className="left-wrapper">
						<h1 className="text-white m-0 font-weight-bold">Search Opportunity in <br /> 3 simple steps </h1>
						<p>
							Save time and energy with instant access to thousands of technologists around the world in three easy steps
						</p>
						<div>
							<button className="btn btn-build-dream">
								Build your dream team
							</button>
						</div>
						<p>
							<a href="#">Get the Enterprise advantage &gt;</a>
						</p>
					</div>
				</div>
				<div className="col-lg-5">
					<div className='wrapper'>
						<div className='steps' id='steps'>
							<div className='step'>
								<div className='line-number'>1</div>
								<div className='info'>
									<p className='title m-0'>Register</p>
									<p className='text'>
										Our intuitive machine learning and Al platform finds you the best match for any role.
									</p>
								</div>
							</div>
						
							<div className='step'>
								<div className='line-number'>2</div>
								<div className='info'>
									<p className='title m-0'>Create</p>
									<p className='text'>
										Easily schedule interviews and connect with top technologists curated to fit your team's needs.
									</p>
								</div>
							</div>
			
							<div className='step'>
								<div className='line-number'>3</div>
								<div className='info'>
									<p className='title m-0'>Search</p>
									<p className='text'>
										Integrate your new team members quickly and effectively. Let us manage payroll and compliance.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section className="py-5 ftco-candidates bg-primary">
		<div className="container">
			<div className="row justify-content-center pb-3">
				<div className="col-md-10 heading-section heading-section-white text-center">
					<h2 className="mb-4">Latest Candidates</h2>
				</div>
			</div>
		</div>
    	<div className="container">
        <div className="row">
        	<div className="col-md-12 d-flex">
        		<div className="carousel-candidates owl-carousel d-flex">
        			<div className="item m-1">
		        		<a href="#" className="team text-center">
		        			<div className="img" style={{"backgroundImage": "url(images/person_1.jpg)"}}></div>
		        			<h2>Danica Lewis</h2>
		        			<span className="position">Western City, UK</span>
		        		</a>
        			</div>
        			<div className="item m-1">
	        			<a href="#" className="team text-center">
		        			<div className="img" style={{"backgroundImage": "url(images/person_2.jpg)"}}></div>
		        			<h2>Nicole Simon</h2>
		        			<span className="position">Western City, UK</span>
		        		</a>
	        		</div>
	        		<div className="item m-1">
	        			<a href="#" className="team text-center">
		        			<div className="img" style={{"backgroundImage": "url(images/person_3.jpg)"}}></div>
		        			<h2>Cloe Meyer</h2>
		        			<span className="position">Western City, UK</span>
		        		</a>
	        		</div>
	        		<div className="item m-1">
	        			<a href="#" className="team text-center">
		        			<div className="img" style={{"backgroundImage": "url(images/person_4.jpg)"}}></div>
		        			<h2>Rachel Clinton</h2>
		        			<span className="position">Western City, UK</span>
		        		</a>
	        		</div>
	        		<div className="item m-1">
	        			<a href="#" className="team text-center">
		        			<div className="img" style={{"backgroundImage": "url(images/person_5.jpg)"}}></div>
		        			<h2>Dave Buff</h2>
		        			<span className="position">Western City, UK</span>
		        		</a>
	        		</div>
	        		<div className="item m-1">
	        			<a href="#" className="team text-center">
		        			<div className="img" style={{"backgroundImage": "url(images/person_6.jpg)"}}></div>
		        			<h2>Dave Buff</h2>
		        			<span className="position">Western City, UK</span>
		        		</a>
	        		</div>
        		</div>
        	</div>
        </div>
    	</div>
    </section>

	<section className="py-5 bg-light available-resources">
		<div className="container">
			<div className="row justify-content-center mb-5 pb-3">
				<div className="col-md-7 heading-section text-center">
				</div>
			</div>
			<div className="row d-flex">
				<div className="col-md-3 d-flex ">
					<div className="card">
						<div className="card-body text-center">
							<img src="https://profile-pics-userprofile-resolab.s3.amazonaws.com/98998756311586062457894.jpg"
								className="rounded-circle"/>
							<h6> Chetan Svaroop</h6>
							<span className="text-muted text-dark"> 
								Area Credit Manager<br />Experience: 2 Year<br />Location:
								Rajasthan
							</span>
						</div>
						<button className="m-2 btn btn-info btn btn-outline-success">
							<a  href="#">Details</a>
						</button>
					</div>
				</div>

				<div className="col-md-3 d-flex">
					<div className="card">
						<div className="card-body text-center">
							<img src="https://profile-pics-userprofile-resolab.s3.amazonaws.com/98998756311586062457894.jpg"
								className="rounded-circle" />
							<h6> Chetan Svaroop</h6>
							<span className="text-muted text-dark"> 
								Area Credit Manager<br />Experience: 2 Year<br />Location:
								Rajasthan
							</span>
						</div>
						<button className="m-2 btn btn-info btn btn-outline-success">
							<a  href="#" >Details</a>
						</button>
					</div>
				</div>

				<div className="col-md-3 d-flex">
					<div className="card">
						<div className="card-body text-center" >
							<img src="https://profile-pics-userprofile-resolab.s3.amazonaws.com/98998756311586062457894.jpg"
								className="rounded-circle" />
							<h6> Chetan Svaroop</h6>
							<span className="text-muted text-dark"> 
								Area Credit Manager<br />Experience: 2 Year<br />Location:
								Rajasthan
							</span>
						</div>
						<button className="m-2 btn btn-info btn btn-outline-success">
							<a  href="#">Details</a>
						</button>
					</div>
				</div>

				<div className="col-md-3 d-flex">
					<div className="card" >
						<div className="card-body text-center">
							<img src="https://profile-pics-userprofile-resolab.s3.amazonaws.com/98998756311586062457894.jpg"
								className="rounded-circle"  />
							<h6> Chetan Svaroop</h6>
							<span className="text-muted text-dark"> 
								Area Credit Manager<br/>Experience: 2 Year<br/>Location:
								Rajasthan
							</span>
						</div>
						<button className="m-2 btn btn-info btn btn-outline-success">
							<a  href="#" >Details</a>
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
        </>
    )
}
export default Home;