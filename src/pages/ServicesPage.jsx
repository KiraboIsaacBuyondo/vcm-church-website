import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, appId } from '../firebase';

/* ─────────────────────────────────────────────
   Re‑usable card component
   ─────────────────────────────────────────── */
const ServiceCard = ({ icon, title, description, time, times }) => (
  <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
    <div className="text-blue-600 text-5xl mb-4 text-center">
      <i className={icon}></i>
    </div>

    <h3 className="text-2xl font-semibold text-blue-800 mb-2 text-center">
      {title}
    </h3>

    <p className="text-gray-700 text-center mb-3 whitespace-pre-line">
      {description}
    </p>

    {/* One time or multiple times */}
    {times ? (
      <ul className="text-blue-600 font-bold text-center space-y-1">
        {times.map((t, idx) => (
          <li key={idx}>{t}</li>
        ))}
      </ul>
    ) : (
      <p className="text-blue-600 font-bold text-center">{time}</p>
    )}
  </div>
);

/* ─────────────────────────────────────────────
   Page component
   ─────────────────────────────────────────── */
const ServicesPage = () => {
  const [serviceContent, setServiceContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const docRef = doc(
      db,
      `artifacts/${appId}/public/data/churchInfo`,
      'services'
    );
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        setServiceContent(docSnap.exists() ? docSnap.data().content || '' : '');
        setLoading(false);
      },
      () => {
        setError('Failed to load content.');
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error)   return <div className="text-center p-8 text-red-600">{error}</div>;

  return (
    <div className="bg-white">
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
          Our Programmes
        </h2>

        {serviceContent && (
          <div className="text-gray-700 leading-relaxed text-lg prose max-w-none mb-10">
            {serviceContent.split('\n').map((p, i) => (
              <p key={i} className="mb-4">
                {p}
              </p>
            ))}
          </div>
        )}

        {/* Programme cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sunday worship with dual services */}
          <ServiceCard
            icon="fas fa-church"
            title="Sunday Worship Services"
            description="Join us for a vibrant worship experience, inspiring sermons, and warm fellowship."
            times={[
              '1st Service (English): 8:00 AM – 10:00 AM',
              '2nd Service (Luganda): 10:30 AM – 1:00 PM',
            ]}
          />

          {/* Bible Study */}
          <ServiceCard
            icon="fas fa-bible"
            title="Bible Study"
            description="Deepen your understanding of the Scriptures in our weekly interactive Bible‑study groups."
            time="Wednesdays, 5:30 PM"
          />

          {/* Worship Tabernacle */}
          <ServiceCard
            icon="fas fa-hands-praying"
            title="Worship Tabernacle"
            description="Gather to intercede for our community, nation, and personal needs."
            time="Fridays, 5:00 PM"
          />
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
