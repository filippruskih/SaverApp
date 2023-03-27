import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Section from '../HOC/Section';
import bgImage from '../assets/info_bg.jpg';
import Link from './UI/Link/Link';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import blogImage1 from '../assets/blog1.jpg';
import blogImage2 from '../assets/blog2.jpg';
import blogImage3 from '../assets/blog3.jpg';

const Info = () => {
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
            //alert("An error occurred while fetching user data");
        }
    };

    useEffect(() => {
        fetchUserName();
    }, []);

    setTimeout(fetchUserName, 300);

    return (
        <Section id='home'>
            <div>
                <div
                    className='home-content p-5'
                    style={{ backgroundImage: `url(${bgImage})` }}
                >
                    <div className='intro container text-center text-light'>
                        <h1 className='title'>Useful Information</h1>
                        <h3>Picked just for</h3>
                        <h3>{name}</h3>
                        <h2 className='sub-title mb-4'>
                            Welcome to SAVER, where we meet all of your energy needs and help you save money by consulting you,
                            showing you your energy usage and give you hints on how to save energy consumption.
                        </h2>
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
                            <h3 className='section-title'>
                                <span>More </span>Information
                            </h3>
                            <h6 className='aboutsection'>
                                By following our expert advice and recommendations, you can easily and efficiently reduce your energy consumption, diminish your expenses and contribute towards a greener future by decreasing your carbon footprint. Regardless of whether you own a property, are a tenant in either private or social accommodation, are pursuing your studies or reside with your family, you have the potential to implement a number of practical and simple steps to curb your energy consumption.
                            </h6>
                            <h6>
                                As inhabitants of our homes, it is our responsibility to actively take charge of our energy usage, and the good news is that it doesn't have to be a daunting task. Our comprehensive set of suggestions, ranging from minor tweaks to significant modifications, can be implemented with ease and result in notable savings of up to €566 per annum* on your bills.
                            </h6>
                            <h6>
                                So, why not explore our recommendations and become a part of the solution for a more sustainable future while simultaneously experiencing the benefits of a reduced energy bill? Start today, and take a step towards a greener and more affordable lifestyle.
                            </h6>
                            <div className='section-content'>
                                <div className='row'>
                                    <div className='col-lg-4 mb-3'>
                                        <div className='card rounded-0'>
                                            <img src={blogImage1} className='card-img-top' alt='Blog 1' />
                                            <div className='card-body'>
                                                <h5 className='card-title'>Amazon Alexa features coming soon!</h5>
                                                <p className='card-text'>
                                                    Alexa, the voice assistant developed by Amazon, has several energy consumption-saving features, such as the ability to control smart home devices, including smart thermostats and smart plugs, which can help users reduce their energy usage. Additionally, Alexa can provide energy-saving tips, track energy usage, and even suggest changes to users' daily routines to optimize energy consumption.
                                                </p>
                                                <a href='https://www.amazon.com/b?ie=UTF8&node=21576558011' className='btn btn-sm btn-primary'>
                                                    Amazon Alexa
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 mb-3'>
                                        <div className='card rounded-0'>
                                            <img src={blogImage2} className='card-img-top' alt='Blog 2' />
                                            <div className='card-body'>
                                                <h5 className='card-title'>A more in depth graph implementation!</h5>
                                                <p className='card-text'>
                                                    We are currently working on integrating new pie charts, bar charts, histograms and more! this will bring your energy consumption observation to a whole new level. 3D graphs, machine learning algorithms and more! Click read more to see more on this topic.
                                                </p>
                                                <a href='/info' className='btn btn-sm btn-primary'>
                                                    Read More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 mb-3'>
                                        <div className='card rounded-0'>
                                            <img src={blogImage3} className='card-img-top' alt='Blog 3' />
                                            <div className='card-body'>
                                                <h5 className='card-title'>New Business Deal Incoming</h5>
                                                <p className='card-text'>
                                                    We plan to include partnerships with energy companies, utility providers, and smart home device manufacturers to offer the app as a value-added service to their customers. Collaborations with building management companies could provide opportunities for the app to be integrated into smart buildings and homes, offering a comprehensive energy management solution for tenants and homeowners.
                                                </p>
                                                <a href='/info' className='btn btn-sm btn-primary'>
                                                    Read More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className='section-title'>
                                <span>Reference </span>Section
                            </h3>
                            <h6 className='aboutsection'>
                                <ul>
                                    <li>https://energysavingtrust.org.uk/hub/quick-tips-to-save-energy/</li>
                                    <li>https://www.amazon.com/b?ie=UTF8&node=21576558011</li>
                                </ul>
                            </h6>
                            <h6>

                            </h6>
                            <h6>

                            </h6>
                        </div>
                    </div>
                </div>

            </div>
        </Section>
    );
};

export default Info;
