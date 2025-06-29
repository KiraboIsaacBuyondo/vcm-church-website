import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, appId } from '../firebase';

const GalleryItem = ({ item }) => (
  <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
    {item.type === 'image' && <img src={item.url} alt={item.title} className="w-full h-48 object-cover" />}
    {item.type === 'video' && (
      <video controls className="w-full h-48 object-cover">
        <source src={item.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )}
    <div className="p-4">
      <h3 className="text-xl font-semibold text-blue-800 mb-1">{item.title}</h3>
      <p className="text-gray-700 text-sm">{item.description}</p>
    </div>
  </div>
);

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const galleryColRef = collection(db, `artifacts/${appId}/public/data/gallery`);
    const q = query(galleryColRef, orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGalleryItems(items);
      setLoading(false);
    }, (err) => {
      setError("Failed to load gallery items.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-600">{error}</div>;

  return (
    <div className="bg-white">
        <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">Our Gallery</h2>
        {galleryItems.length === 0 && !loading ? (
            <p className="text-center text-gray-600 text-lg">No gallery items uploaded yet.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryItems.map(item => <GalleryItem key={item.id} item={item} />)}
            </div>
        )}
        </section>
    </div>
  );
};

export default GalleryPage;