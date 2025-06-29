import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// A reusable component for the feature cards in the Call to Action section
const FeatureCard = ({ icon, title, text, link, linkText }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-lg shadow-lg text-center"
  >
    <div className="text-blue-600 text-5xl mb-4"><i className={icon}></i></div>
    <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6">{text}</p>
    <Link to={link} className="font-bold text-blue-600 hover:text-blue-800 transition-colors">
      {linkText} →
    </Link>
  </motion.div>
);

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      {/* Section 1: Hero Welcome Banner with Video Background */}
      <section className="relative h-[calc(100vh-68px)] bg-gray-700 flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        >
          <source src="/videos/church-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay to make text readable */}
        <div className="absolute z-10 inset-0 bg-black bg-opacity-60"></div>

        {/* Text Content */}
        <div className="relative z-20 text-center text-white p-8">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight"
            >
                Welcome Home to <span className="text-blue-300">Victory Church Masajja</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
                A community of faith, hope, and love. Growing together in Kampala.
            </motion.p>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-bold text-lg"
            >
                Service Times: Sundays at 8:00AM and 10:30 AM in Masajja
            </motion.p>
        </div>
      </section>

      {/* Section 2: Our Core Beliefs (Vision & Mission - Hardcoded) */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Our Purpose
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg max-w-3xl mx-auto mb-12"
          >
            We exist to lead people into a growing relationship with Jesus Christ. This is at the core of everything we do.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="p-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-3">Our Vision</h3>
              <p className="text-gray-700">To create a community of victorious believers ready to go for God.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="p-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-3">Our Mission</h3>
              <p className="text-gray-700">Becoming a people of excellence exhibiting a passion for God and love for others.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="p-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-3">Our Values</h3>
              <p className="text-gray-700">We are guided by love, rooted in scripture, empowered by the Holy Spirit, and committed to serving our city with humility and joy.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Call to Action Cards */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon="fas fa-tv" 
                    title="Watch a Sermon" 
                    text="Catch up on our latest messages and be encouraged throughout your week." 
                    link="/sermons"
                    linkText="Watch Now"
                />
                <FeatureCard 
                    icon="fas fa-map-marker-alt" 
                    title="Plan Your Visit" 
                    text="Ready to join us in person? Get directions and find out what to expect." 
                    link="/contact"
                    linkText="Get Directions"
                />
                <FeatureCard 
                    icon="fas fa-hands-helping" 
                    title="Get Involved" 
                    text="Discover how you can use your gifts to serve the church and our community." 
                    link="/pray"
                    linkText="Prayer Requests"
                />
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;