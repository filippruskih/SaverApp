import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Section from './Section';
import bgImage from '../assets/infobg.jpg';
import Link from './Link';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import aboutImage from '../assets/alexa.jpg';
import aboutImage2 from '../assets/rev.jpg';
import { Card, Row, Col } from "react-bootstrap";

const Info = () => {
    //provides data for barchart for ways of saving
    const data = [
        { typeOfSaving: 'Switch off standby', savings: 78.23 },
        { typeOfSaving: 'draught proof gaps', savings: 198.32 },
        { typeOfSaving: 'Turn off the lights', savings: 42.98 },
        { typeOfSaving: 'Wash at lower temp and fill washing machine', savings: 37.23 },
        { typeOfSaving: 'Avoid tumble dryer', savings: 92.97 },
        { typeOfSaving: 'Shorter showers', savings: 182.32 },
        { typeOfSaving: 'Avoid baths', savings: 19.21 },
        { typeOfSaving: 'Fill kettle to needs', savings: 54.44 },
        { typeOfSaving: 'Hand wash dishes', savings: 69.01 },
        { typeOfSaving: 'Insulate internal/externals of house', savings: 495.33 },
        { typeOfSaving: 'Insulate hot water cylinder', savings: 103.42 }
    ];

    const sqData = [
        { BER: 'A and B rating', consump: 87 },
        { BER: 'C rating', consump: 100 },
        { BER: 'D rating', consump: 112 },
        { BER: 'E rating', consump: 118 },
        { BER: 'F and Grating', consump: 120 },
    ];
    //provides a link to an image to display in the cards along with some info on it
    const cardsData = [
        {
            title: "Close doors",
            description: "Keeping the doors closed between rooms in your house or apartment can reduce heat loss by up to 5%, ",
            image: "https://deantawood.co.uk/wp-content/uploads/2021/12/Seville_Oak_4L_S_L-watermark.jpg",
        },
        {
            title: "Fill the dishwasher",
            description: "Either fill it or don't use it, using a dishwasher is more sustainable than hand-washing dishes. Saving up to 50% on energy and 30% on water.",
            image: "https://pyxis.nymag.com/v1/imgs/a1c/cf9/ff4231b2b6be410074c6d985158c91a0da-dishwasher-lede.rsquare.w1200.jpg",
        },
        {
            title: "Keep radiator item free",
            description: "Keeping curtains, sofas and other items away from your radiators so they can work to maximum efficiency can save up to 12% on their energy consumption.",
            image: "https://st.hzcdn.com/simgs/pictures/salons/600x990mm-anthracite-square-panel-designer-horizontal-radiator-img~ec9124a307ed5c19_4-7673-1-19dc890.jpg",
        },
        {
            title: "Thermostat settings",
            description: "Turning your thermostat down by just 1°C can save around 7% of the energy you use to heat your home.",
            image: "https://ezewarm.com/wp-content/uploads/2020/12/Pro-Wifi-Thermostat-with-App-Control.jpg",
        },
        {
            title: "Smart devices",
            description: "Using smart devices allows for utomation and scheduling to reduce energy consumption",
            image: "https://i1.wp.com/flowboxinteractive.com/wp-content/uploads/2019/04/cropped-pixasquare-622732-min-1.jpg?zoom=2.5&w=3840&ssl=1",
        },
        {
            title: "Go LED",
            description: "Switching to LED lights throughout the household can help save up to 80% of energy consumption",
            image: "https://media.architecturaldigest.com/photos/5d3f35c70921870009ed7e13/master/pass/Vintage_LargeGroup_Clear_Final.jpg",
        },
    ];

    // comments for code below in Home.js lines 12-36
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "userss"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUserName();
    }, []);

    setTimeout(fetchUserName, 300);

    return (
        <Section id='about'>
            <div>
                <div className='home-content p-5' style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                    <div className='intro container text-center text-light'>
                        <h1 className='title'>Useful Information</h1>
                        <h3>Picked just for</h3>
                        <h3>{name}</h3>
                        <h5 className='sub-title mb-6'>
                            Welcome to SAVER, where we meet all of your energy needs and help you save money by consulting you,
                            showing you your energy usage and give you hints on how to save energy consumption.
                        </h5>
                        <Link classes='btn btn-dark rounded-1' target='about'>
                            Learn More
                        </Link><span></span>
                        <Link target='contact' classes='btn btn-light text-dark rounded-1'>
                            Contact Us
                        </Link>
                    </div>
                </div>
                <div className='container pt-2 pb-5'>
                    <div className='row'>
                        <div className='section-header pt-5 pb-5 text-center'>
                            <div>
                                <h3 className='section-title'>
                                    <span>Bar Chart </span>On Annual Savings
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <BarChart width={800} height={700} data={data} layout="vertical" margin={{ top: 10, right: 10, bottom: 50, left: 10 }}>
                                        <XAxis type="number" label={{ value: "Savings in € per annum", position: "top" }} />
                                        <YAxis dataKey="typeOfSaving" type="category" angle={-15} fontSize={8} />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="savings" fill="#8884d8" />
                                    </BarChart>
                                </div>
                            </div>
                            <div>
                                <h3 className='section-title'>
                                    <span>More </span>Information
                                </h3>
                                <p className='aboutsection'>
                                    By following our expert advice and recommendations, you can easily and efficiently reduce your energy consumption, diminish your expenses and contribute towards a greener future by decreasing your carbon footprint. Regardless of whether you own a property, are a tenant in either private or social accommodation, are pursuing your studies or reside with your family, you have the potential to implement a number of practical and simple steps to curb your energy consumption.
                                </p>
                                <p>
                                    As inhabitants of our homes, it is our responsibility to actively take charge of our energy usage, and the good news is that it doesn't have to be a daunting task. Our comprehensive set of suggestions, ranging from minor tweaks to significant modifications, can be implemented with ease and result in notable savings of up to €566 per annum* on your bills.
                                </p>
                                <p>
                                    So, why not explore our recommendations and become a part of the solution for a more sustainable future while simultaneously experiencing the benefits of a reduced energy bill? Start today, and take a step towards a greener and more affordable lifestyle.
                                </p>
                            </div>
                            <div className='container pt-2 pb-5'>
                                <div className='section-header pt-5 pb-5 text-center'>
                                    <h3 className='section-title'>
                                        <span>Links </span>And Tips
                                    </h3>
                                    <h6 className='aboutsection'>
                                        Some brief information on how to save money, energy used and some general tips, along with some links.
                                    </h6>
                                </div>
                                <div className='section-content'>
                                    <div className='row'>
                                        <div style={{ display: 'inline-block', width: '30%', margin: '0 auto' }}>
                                            <div className='aboutImage'>
                                                <img src={aboutImage} alt='about company' />
                                            </div>
                                        </div>
                                        <div style={{ display: 'inline-block', width: '30%', margin: '8% auto' }}>
                                            <a href='https://www.amazon.com/b?ie=UTF8&node=21576558011' className='btn btn-sm btn-primary'>Amazon Alexa</a>
                                        </div>
                                        <div style={{ display: 'inline-block', width: '30%', margin: '0 auto' }}>
                                            <h3 className='about-title'>Amazon Alexa</h3>
                                            <div className='about-description'>
                                                <p>
                                                    Alexa, the voice assistant developed by Amazon, has several energy consumption-saving features, such as the ability to control smart home devices, including smart thermostats and smart plugs, which can help users reduce their energy usage. Additionally, Alexa can provide energy-saving tips, track energy usage, and even suggest changes to users' daily routines to optimize energy consumption.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-content'>
                                    <div className='row'>

                                        <div style={{ display: 'inline-block', width: '30%', margin: '0 auto' }}>
                                            <h3 className='about-title'>Revenue hints</h3>
                                            <div className='about-description'>
                                                <p>
                                                    €600 Electricity Credit available to all Irish households, the final payment of which will be made in March 2023.

                                                    A new grant for businesses using LPG or kerosene.

                                                    €700 - €8000 grants available for attic and cavity wall insulation depending on the upgrades selected.

                                                    €64 estimated savings through the extension of VAT reduction on energy bills, which has now been extended to 31 October 2023.

                                                    €89 estimated savings from the PSO Levy Reduction
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'inline-block', width: '30%', margin: '8% auto' }}>
                                            <a href='https://www.gov.ie/en/campaigns/6ca43-reduce-your-use/?gclid=CjwKCAjw_YShBhAiEiwAMomsEGQGBSvKHm30gywY9i5K-EJqdMBw33VFwzIFJ_UKEicGXVVBbd5T_hoCO4IQAvD_BwE' className='btn btn-sm btn-primary'>Revenue Hints</a>
                                        </div>
                                        <div style={{ display: 'inline-block', width: '30%', margin: '0 auto' }}>
                                            <div className='aboutImage'>
                                                <img src={aboutImage2} alt='about company' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='container pt-2 pb-5'>
                                <div className='section-header pt-5 pb-5 text-center'>
                                    <h3 className='section-title'>
                                        <span>Quick </span>Tips
                                    </h3>
                                    <h6 className='aboutsection'>
                                        Some quick tips that can save you hundreds in the long run.
                                    </h6>
                                </div>
                                <div>
                                    <Row>
                                        {cardsData.slice(0, 3).map((card, index) => (
                                            <Col key={index}>
                                                <Card style={{ height: "100%", width: '100%', margin: '10px 10px' }}>
                                                    <Card.Img variant="top" src={card.image} />
                                                    <Card.Body>
                                                        <Card.Title>{card.title}</Card.Title>
                                                        <Card.Text>{card.description}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                    <Row>
                                        {cardsData.slice(3, 6).map((card, index) => (
                                            <Col key={index}>
                                                <Card style={{ height: "100%", width: '100%', margin: '10px 10px' }}>
                                                    <Card.Img variant="top" src={card.image} />
                                                    <Card.Body>
                                                        <Card.Title>{card.title}</Card.Title>
                                                        <Card.Text>{card.description}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                                <br />
                            </div>
                            <div>
                                <h3 className='section-title'>
                                    <span>Bar Chart on BER</span> Consumption per sq. metre
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <BarChart width={800} height={700} data={sqData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="BER" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="consump" fill="#1184d8" />
                                    </BarChart>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div>
                                <h3 className='section-title'>
                                    <span>Insulation </span>Tips
                                </h3>
                                <h6 className='aboutsection'>
                                Insulating your home is a crucial step in improving your Building Energy Rating (BER) and offers numerous benefits. Proper insulation not only enhances the energy efficiency of your property but also provides a more comfortable living environment by maintaining consistent indoor temperatures throughout the year. By reducing heat loss in winter and heat gain in summer, you can significantly lower your energy consumption, leading to reduced utility bills and a smaller carbon footprint. Furthermore, a well-insulated home contributes to better indoor air quality and reduces the risk of mold and dampness. As a result, investing in insulation not only helps you save money and reduce your environmental impact, but also contributes to a healthier and more enjoyable living space.
                                </h6>
                                <br />
                                <h6>
                                    Considering Checking this <a href="https://www.seai.ie/publications/BER-Homeowner-Leaftlet.pdf">link</a> out to find out more about how insulating your home can improve your overall energy consumption.  

                                    <a href="https://www.seai.ie/publications/BER-Homeowner-Leaftlet.pdf"> SEAI</a> provides grants to the public to insulate your home.
                                </h6>

                                <h6>
                                    Many companies provide free quotes for home insulation and work with SEAI in order to avail of the grant and save you money! <a href="https://myinsulation.ie">MyInsulation</a> provide quality service for your home improvements.
                                </h6>
                                <br />
                            </div>
                            <div>
                                <h3 className='section-title'>
                                    <span>Reference </span>Section
                                </h3>
                                <h6 className='aboutsection'>
                                    <ul>
                                        <li>https://energysavingtrust.org.uk/hub/quick-tips-to-save-energy/</li>
                                        <li>https://www.amazon.com/b?ie=UTF8&node=21576558011</li>
                                    </ul>
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Info;
