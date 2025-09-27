import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// A reusable card for each ministry
const MinistryCard = ({ icon, title, description }) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-white p-8 rounded-lg shadow-lg text-left"
    >
        <div className="text-blue-600 text-4xl mb-4"><i className={icon}></i></div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
);

const MinistriesPage = () => {
    const ministries = [
        { icon: "fas fa-music", title: "Worship Team", description: "This team leads our congregation into God's presence through music, vocals, and creative expression during our services." },
        { icon: "fas fa-child", title: "VCM Kids", description: "Our passionate ministry, dedicated to providing a safe, fun, and faith-filled environment for the children of our church and community." },
        { icon: "fas fa-handshake", title: "Welcome & Hospitality", description: "This team is the first impression of VCM! They greet everyone with a smile, help visitors find their way, and create a warm atmosphere." },
        { icon: "fas fa-users", title: "Ushering Ministry", description: "A vital team that ensures our services run smoothly by assisting with seating, collecting offerings, and maintaining order." },
        { icon: "fas fa-video", title: "Media & Production", description: "The technical team behind our online services and in-person experience, managing sound, lighting, cameras, and projections." },
        { icon: "fas fa-bullhorn", title: "Outreach & Evangelism", description: "This team takes the love of Jesus beyond our church walls, organizing community service events and sharing the gospel." },

        // ✅ Newly added ministries
        { icon: "fas fa-female", title: "Ladies Ministry", description: "A vibrant fellowship that empowers women through prayer, mentorship, outreach, and spiritual growth tailored for women in the church." },
        { icon: "fas fa-user-graduate", title: "Youth Ministry", description: "A dynamic ministry that raises young men and women in faith through mentorship, discipleship, worship, and engaging youth programs." },
        { icon: "fas fa-ring", title: "Marrieds Fellowship", description: "A ministry dedicated to strengthening marriages through counseling, fellowship, mentorship, and family-building activities." },
        { icon: "fas fa-praying-hands", title: "Intercessors", description: "A committed team devoted to standing in the gap through prayer, fasting, and covering the church, families, and nation spiritually." },
    ];

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="bg-blue-700 text-white py-24 text-center">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-extrabold">Our Ministries</motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-blue-100 mt-4 max-w-2xl mx-auto">Discover a place to belong, a place to serve, and a place to grow.</motion.p>
            </section>

            {/* Ministries Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ministries.map(ministry => <MinistryCard key={ministry.title} {...ministry} />)}
                    </div>
                </div>
            </section>
            
            {/* Call to Action */}
            <section className="bg-white py-20 text-center">
                 <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Serve?</h2>
                 <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">If you're interested in joining a team, we'd love to hear from you. Let's find the perfect place for you to use your gifts.</p>
                 <Link to="/contact" className="btn-primary text-lg">Get in Touch</Link>
            </section>
        </div>
    );
};

export default MinistriesPage;
