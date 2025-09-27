import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const SermonsPage = () => {
    const [sermons, setSermons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSermon, setSelectedSermon] = useState(null);

    useEffect(() => {
        const sermonsColRef = collection(db, 'sermons');
        const q = query(sermonsColRef, orderBy('date', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const sermonsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSermons(sermonsData);
            if (sermonsData.length > 0) {
                setSelectedSermon(sermonsData[0]); // Select the latest sermon by default
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return <div className="text-center p-8">Loading Sermons...</div>;

    return (
        <div className="bg-white py-12">
            <section className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">Recent Sermons</h2>

                {/* Main Video Player */}
                {selectedSermon && (
                    <div className="mb-10">
                        <div className="aspect-w-16 aspect-h-9 mb-4 shadow-2xl rounded-lg overflow-hidden">
                            <iframe
                                src={`https://www.youtube.com/embed/${selectedSermon.youtubeVideoId}`}
                                title={selectedSermon.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800">{selectedSermon.title}</h3>
                        <p className="text-gray-600">
                            Speaker: {selectedSermon.speaker} | Date: {new Date(selectedSermon.date.seconds * 1000).toLocaleDateString()}
                        </p>
                    </div>
                )}

                {/* Horizontal Scrollable Thumbnails */}
                <div className="mt-8">
                    <h4 className="text-2xl font-bold mb-4 text-gray-700">Sermon Archive</h4>
                    <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                        {sermons.map((sermon) => (
                            <div
                                key={sermon.id}
                                onClick={() => setSelectedSermon(sermon)}
                                className={`min-w-[240px] max-w-[240px] cursor-pointer rounded-lg shadow-md transition transform hover:scale-105 ${
                                    selectedSermon?.id === sermon.id ? 'ring-4 ring-blue-600 shadow-lg' : 'bg-white'
                                }`}
                            >
                                {/* Thumbnail */}
                                <img
                                    src={`https://img.youtube.com/vi/${sermon.youtubeVideoId}/hqdefault.jpg`}
                                    alt={sermon.title}
                                    className="w-full h-40 object-cover rounded-t-lg"
                                />
                                {/* Details */}
                                <div className="p-4">
                                    <p className="font-bold text-gray-900 text-sm truncate">{sermon.title}</p>
                                    <p className="text-gray-600 text-xs mt-1">{sermon.speaker}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SermonsPage;
