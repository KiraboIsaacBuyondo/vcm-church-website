import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

const ContactPage = () => {
    // State for the contact form
    const [formData, setFormData] = useState({
        topic: '',
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.topic || !formData.name || !formData.email || !formData.message) {
            setStatusMessage('Please fill out all required fields.');
            return;
        }
        setIsSubmitting(true);
        setStatusMessage('');

        try {
            // We'll save submissions to a new 'contactSubmissions' collection
            await addDoc(collection(db, 'contactSubmissions'), {
                ...formData,
                timestamp: serverTimestamp()
            });
            setStatusMessage('Thank you! Your message has been sent successfully. We will get back to you shortly.');
            setFormData({ topic: '', name: '', email: '', phone: '', message: '' }); // Reset form
        } catch (error) {
            setStatusMessage('An error occurred. Please try again later.');
            console.error("Error submitting form: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white">
            {/* Section 1: Hero Banner */}
            {/* The background color is now a clean, light gray */}
            <section className="bg-gray-100 text-gray-800 py-24 text-center">
                 {/* The dark overlay div has been removed from here */}
                 <div className="relative">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-extrabold text-blue-800">Get In Touch</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-600 mt-4">We're here for you. Let's connect.</motion.p>
                 </div>
            </section>

            {/* Section 2: Main Content (Form and Info) */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Left Column: Contact Form */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
                            <p className="text-gray-600 mb-8">For any inquiries, questions, or prayer requests, please fill out the form below.</p>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="topic" className="block font-bold text-gray-700 mb-1">Topic of Inquiry <span className="text-red-500">*</span></label>
                                    <select id="topic" value={formData.topic} onChange={handleInputChange} required className="input-field">
                                        <option value="" disabled>Select an option</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Pastoral Question">Pastoral Question</option>
                                        <option value="Becoming a Member">Becoming a Member</option>
                                        <option value="Counseling Request">Counseling Request</option>
                                        <option value="Testimony">Share a Testimony</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="name" className="block font-bold text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                                    <input type="text" id="name" value={formData.name} onChange={handleInputChange} required className="input-field" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block font-bold text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                                    <input type="email" id="email" value={formData.email} onChange={handleInputChange} required className="input-field" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block font-bold text-gray-700 mb-1">Phone Number</label>
                                    <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} className="input-field" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block font-bold text-gray-700 mb-1">Comment or Message <span className="text-red-500">*</span></label>
                                    <textarea id="message" value={formData.message} onChange={handleInputChange} required rows="6" className="input-field"></textarea>
                                </div>
                                <button type="submit" disabled={isSubmitting} className="btn-primary text-lg px-8 py-3">
                                    {isSubmitting ? 'Submitting...' : 'Send Message'}
                                </button>
                                {statusMessage && <p className="mt-4 text-center">{statusMessage}</p>}
                            </form>
                        </div>

                        {/* Right Column: Info Panel */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 p-8 rounded-lg">
                                <h3 className="text-2xl font-bold text-blue-800 mb-6">Church Office</h3>
                                <div className="space-y-4 text-gray-700">
                                    <p><i className="fas fa-map-marker-alt w-6"></i>Masajja, off Entebbe Highway, Kampala, Uganda</p>
                                    <p><i className="fas fa-phone w-6"></i>+256 772 648 479</p>
                                    <p><i className="fas fa-envelope w-6"></i>victorychurchmasajja1@gmail.com</p>
                                </div>

                                <hr className="my-8"/>

                                <h3 className="text-2xl font-bold text-blue-800 mb-6">Weekly Services</h3>
                                <div className="space-y-4 text-gray-700">
                                    <div>
                                        <h4 className="font-bold">Sunday Services</h4>
                                        <p>First Service: 8:00AM - 10:00AM</p>
                                        <p>Second Service: 10:30AM - 12:30PM</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Bible Study</h4>
                                        <p>Wednesdays: 5:30PM - 7:00PM</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Worship Tabernacle</h4>
                                        <p>Fridays: 5:30PM - 9:00PM</p>
                                    </div>
                                </div>
                                
                                <hr className="my-8"/>

                                <h3 className="text-2xl font-bold text-blue-800 mb-6">Specific Inquiries</h3>
                                <div className="space-y-2 text-sm">
                                    <p><span className="font-bold">Children's Ministry:</span> <a href="#" className="text-blue-600">victorychurchmasajja@gmail.com</a></p>
                                    <p><span className="font-bold">Youth Ministry:</span> <a href="#" className="text-blue-600">victorychurchmasajja@gmail.com</a></p>
                                    <p><span className="font-bold">Finance/Giving:</span> <a href="#" className="text-blue-600">victorychurchmasajja@gmail.com</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Map */}
            <section>
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.721112467145!2d32.57220211475338!3d0.2709163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbdd09d16da05%3A0x149fc755e7ebba0b!2sVictory%20Church%20Masajja!5e0!3m2!1sen!2sug!4v1719784534832!5m2!1sen!2sug" 
                    width="100%" 
                    height="450" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Church Location Map"
                ></iframe>
            </section>
        </div>
    );
};

export default ContactPage;
