import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

const AdminSermons = () => {
    const [sermons, setSermons] = useState([]);
    const [newSermon, setNewSermon] = useState({ title: '', speaker: '', date: '', youtubeVideoId: '' });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const sermonsColRef = collection(db, 'sermons');
        const q = query(sermonsColRef, orderBy('date', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const sermonsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSermons(sermonsData);
            setLoading(false);
        }, (err) => {
            setMessage('Error fetching sermons: ' + err.message);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { title, speaker, date, youtubeVideoId } = newSermon;
        if (!title || !speaker || !date || !youtubeVideoId) {
            setMessage('Please fill all sermon fields.');
            return;
        }
        setMessage('Processing...');
        try {
            await addDoc(collection(db, 'sermons'), {
                title,
                speaker,
                youtubeVideoId,
                date: Timestamp.fromDate(new Date(date)),
            });
            setMessage('Sermon added successfully!');
            setNewSermon({ title: '', speaker: '', date: '', youtubeVideoId: '' });
        } catch (error) {
            setMessage('Error adding sermon: ' + error.message);
        }
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this sermon?')) {
            try {
                await deleteDoc(doc(db, 'sermons', id));
                setMessage('Sermon deleted successfully!');
            } catch (error) {
                setMessage('Error deleting sermon: ' + error.message);
            }
        }
    };

    return (
        <div className="p-4 bg-blue-50 rounded-lg shadow-inner">
            {message && <p className="mb-4 text-center p-2 bg-yellow-100 text-yellow-800 rounded">{message}</p>}
            
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Add New Sermon</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4 mb-8 p-4 border rounded-lg bg-white">
                <div>
                    <label className="block font-bold">Sermon Title</label>
                    <input type="text" value={newSermon.title} onChange={(e) => setNewSermon({ ...newSermon, title: e.target.value })} required className="input-field" />
                </div>
                 <div>
                    <label className="block font-bold">Speaker</label>
                    <input type="text" value={newSermon.speaker} onChange={(e) => setNewSermon({ ...newSermon, speaker: e.target.value })} required className="input-field" />
                </div>
                <div>
                    <label className="block font-bold">Date</label>
                    <input type="date" value={newSermon.date} onChange={(e) => setNewSermon({ ...newSermon, date: e.target.value })} required className="input-field" />
                </div>
                <div>
                    <label className="block font-bold">YouTube Video ID</label>
                    <input type="text" value={newSermon.youtubeVideoId} onChange={(e) => setNewSermon({ ...newSermon, youtubeVideoId: e.target.value })} required className="input-field" placeholder="e.g., dQw4w9WgXcQ" />
                </div>
                <button type="submit" className="btn-primary">Add Sermon</button>
            </form>

            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Existing Sermons</h3>
            {loading ? <p>Loading...</p> : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="th-cell">Title</th>
                                <th className="th-cell">Speaker</th>
                                <th className="th-cell">Date</th>
                                <th className="th-cell text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sermons.map(sermon => (
                                <tr key={sermon.id} className="border-b">
                                    <td className="td-cell">{sermon.title}</td>
                                    <td className="td-cell">{sermon.speaker}</td>
                                    <td className="td-cell">{new Date(sermon.date.seconds * 1000).toLocaleDateString()}</td>
                                    <td className="td-cell text-center">
                                        <button onClick={() => handleDeleteClick(sermon.id)} className="btn-delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminSermons;