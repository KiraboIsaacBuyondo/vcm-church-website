import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, appId } from '../firebase';

const AboutPage = () => {
  const [aboutContent, setAboutContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const docRef = doc(db, `artifacts/${appId}/public/data/churchInfo`, 'aboutUs');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      // **CHANGE 1: Only set content if it exists, otherwise set to empty string**
      if (docSnap.exists() && docSnap.data().content) {
        setAboutContent(docSnap.data().content);
      } else {
        setAboutContent('');
      }
      setLoading(false);
    }, (err) => {
      console.error("Error fetching about content:", err);
      setError("Failed to load content.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-600">{error}</div>;

  return (
    <div className="bg-white">
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2">
            <img
              src="https://placehold.co/600x400/87CEEB/FFFFFF?text=Our+Community"
              alt="Our Church Community"
              className="rounded-lg shadow-xl w-full h-auto object-cover transform transition duration-500 hover:scale-105"
            />
          </div>

          {/* **CHANGE 2: Conditionally render the text block only if content exists** */}
          {aboutContent && (
            <div className="md:order-1 text-gray-700 leading-relaxed text-lg">
              {aboutContent.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          )}
          
        </div>
      </section>
    </div>
  );
};

export default AboutPage;