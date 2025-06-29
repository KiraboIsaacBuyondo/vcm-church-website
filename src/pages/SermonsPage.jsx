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
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Video Player */}
                    <div className="lg:col-span-2">
                        {selectedSermon ? (
                            <div>
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
                        ) : (
                            <p>No sermon selected.</p>
                        )}
                    </div>

                    {/* Playlist of other sermons */}
                    <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg h-fit max-h-[600px] overflow-y-auto">
                        <h4 className="text-xl font-bold mb-4">Sermon Archive</h4>
                        <ul className="space-y-3">
                            {sermons.map(sermon => (
                                <li 
                                    key={sermon.id} 
                                    onClick={() => setSelectedSermon(sermon)}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedSermon?.id === sermon.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white hover:bg-blue-100'}`}
                                >
                                    <p className="font-bold">{sermon.title}</p>
                                    <p className="text-sm">{sermon.speaker}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SermonsPage;