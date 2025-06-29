import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, appId } from '../firebase';


const EventCard = ({ event }) => (
  <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
    <h3 className="text-2xl font-semibold text-blue-800 mb-2">{event.title}</h3>
    <p className="text-blue-600 font-bold mb-2">
      <i className="far fa-calendar-alt mr-2"></i>{new Date(event.date).toLocaleDateString()}
    </p>
    <p className="text-gray-700">{event.description}</p>
  </div>
);

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const eventsColRef = collection(db, `artifacts/${appId}/public/data/events`);
    const q = query(eventsColRef, orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching events:", err);
      setError("Failed to load events. You may need to create a Firestore index.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-600">{error}</div>;

  return (
    <div className="bg-white">
        <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">Upcoming Events</h2>
        {events.length === 0 && !loading ? (
            <p className="text-center text-gray-600 text-lg">No upcoming events. Please check back soon!</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => <EventCard key={event.id} event={event} />)}
            </div>
        )}
        </section>
    </div>
  );
};

export default EventsPage;