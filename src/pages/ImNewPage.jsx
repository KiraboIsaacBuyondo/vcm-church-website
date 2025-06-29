import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Reusable Components for this Page ---

// Accordion Item for the FAQ Section
const FAQItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-gray-200 py-4">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800"
        >
            <span>{question}</span>
            <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <i className="fas fa-chevron-down"></i>
            </motion.span>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600 leading-relaxed"
                >
                    {answer}
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

// Card for the Leadership Section
const StaffCard = ({ imageSrc, name, title }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center"
    >
        <img src={imageSrc} alt={name} className="w-48 h-48 mx-auto rounded-full object-cover mb-4 shadow-lg"/>
        <h4 className="text-xl font-bold text-gray-900">{name}</h4>
        <p className="text-blue-600">{title}</p>
    </motion.div>
);

// --- The Main Page Component ---

const ImNewPage = () => {
    const [openFAQ, setOpenFAQ] = useState(0); // Open the first question by default

    const staff = [
        { name: "Vincent & Julie Mbalangu", title: "Senior Pastors", imageSrc: "https://placehold.co/400x400/667eea/FFFFFF?text=V%26J" },
        { name: "Augustine Nsubuga", title: "Pastor", imageSrc: "https://placehold.co/400x400/718096/FFFFFF?text=AN" },
        { name: "Daniel Matovu", title: "Pastor", imageSrc: "https://placehold.co/400x400/9f7aea/FFFFFF?text=DM" },
        { name: "Willy Wamboka", title: "Pastor", imageSrc: "https://placehold.co/400x400/48bb78/FFFFFF?text=WW" },
        { name: "Naomi Nsubuga", title: "Bible Study Coordinator", imageSrc: "https://placehold.co/400x400/ed64a6/FFFFFF?text=NN" },
        { name: "Tabitha Muganga", title: "Head of Intercession", imageSrc: "https://placehold.co/400x400/f56565/FFFFFF?text=TM" },
    ];
    
    const faqs = [
        { q: "What are your service times?", a: "We are delighted to have you join us! Our Sunday services are at 8:00 AM and a second service at 10:30 AM here in Masajja. We recommend arriving 15 minutes early to find parking and a good seat." },
        { q: "What is the worship music like?", a: "Our worship experience is a vibrant and contemporary blend of modern worship songs and beloved hymns, led by a full band. Our focus is on heartfelt praise and creating an atmosphere where you can connect with God." },
        { q: "What should I wear?", a: "There is no dress code! You'll see people in everything from their Sunday best (like a Gomesi or Kanzu) to jeans and a t-shirt. Please come in whatever makes you feel comfortable." },
        { q: "What about my children?", a: "We have a wonderful and secure children's program called 'VCM Kids' for all ages, from toddlers to pre-teens. Our trained volunteers will ensure your children have a fun, safe, and faith-filled time while you enjoy the main service." },
        { q: "How do I get to the church?", a: "We are located in Masajja, just off the Entebbe-Express highway. You can find a detailed map and get directions on our Contact page. Boda-boda riders in the area know us well!" },
        { q: "Do you have mid-week services?", a: "Yes! We have our powerful 'Worship Tabernacle' prayer service every Friday evening at 5:00 PM and Bible Study every Wednesday at 5:30 PM. All are welcome." },
        // { q: "How can I join a small group (Cell Group)?", a: "Cell Groups are the heart of our church family! They meet in homes throughout the week across Kampala. You can find a group near you and sign up through the 'Join a Cell Group' link in our website footer." },
        { q: "How can I contribute or donate?", a: "Your generosity helps us impact the community. You can give during our services or online through Mobile Money and Bank Deposit. All details are on our 'Give' page." },
        { q: "How can I start serving at VCM?", a: "We believe every member is a minister! There are many opportunities to use your talents to serve God and others, from the Welcome Team to the Worship Ministry. Please visit our new Ministries page to see where you can best fit in." },
    ];

    return (
        <div className="bg-white">
            {/* Section 1: Hero Welcome */}
            <section className="bg-gray-100 py-24 text-center">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-extrabold text-blue-800">Your Journey Begins Here</motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-700 mt-4">Welcome to the family. We're so glad you're considering visiting us.</motion.p>
            </section>

            {/* Section 2: Frequently Asked Questions */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Have a Question?</h2>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        {faqs.map((faq, index) => (
                            <FAQItem 
                                key={index} 
                                question={faq.q}
                                answer={faq.a}
                                isOpen={openFAQ === index}
                                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: How Can We Pray For You? */}
            <section className="bg-blue-700 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <h2 className="text-4xl font-extrabold mb-4">How can we pray for you?</h2>
                        {/* CHANGE 1: The text in the "Prayer" section has been paraphrased. */}
                        <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
                            Life can be overwhelming, and it's easy to feel burdened by the pressures around us. Please know you are not alone. We believe in a God who listens and a church family that cares. We would be honoured to stand with you in prayer.
                        </p>
                        <Link to="/pray" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-colors shadow-lg">
                            Send Your Request
                        </Link>
                    </motion.div>
                </div>
            </section>
            
            {/* Section 4: Your Next Steps */}
            <section className="py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12">Your Next Steps</h2>
                     <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-blue-800 mb-2">Become a Member</h3>
                            <p className="text-gray-600 mb-4">Register and learn how you can become a registered member of the VCM family.</p>
                            <button className="btn-primary">Membership</button>
                        </div>
                         <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-blue-800 mb-2">Serve With Us</h3>
                            <p className="text-gray-600 mb-4">Participate in the work of the Lord with your gifts and talents in one of our ministries.</p>
                            <button className="btn-primary">Volunteer</button>
                        </div>
                        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-blue-800 mb-2">Join a Team</h3>
                            <p className="text-gray-600 mb-4">Make a difference by serving with your gifts on one of our ministry teams. It's a great way to build relationships.</p>
                            <Link to="/ministries" className="btn-primary">Explore Ministries</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CHANGE 2: The "Meet Our Staff" section is now at the bottom. */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-6 text-center">
                    {/* CHANGE 3: The heading now says "Meet Our Staff". */}
                    <h2 className="text-4xl font-bold text-gray-800 mb-12">Meet Our Staff</h2>
                    {/* CHANGE 4: The grid layout is now 3 columns on larger screens. */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-6xl mx-auto">
                        {staff.map(member => <StaffCard key={member.name} {...member} />)}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ImNewPage;