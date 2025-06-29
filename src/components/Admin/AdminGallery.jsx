import React, { useState, useEffect, useRef } from 'react';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, appId } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const AdminGallery = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [newGalleryItem, setNewGalleryItem] = useState({ title: '', description: '', file: null, type: '' });
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);
    const { userId } = useAuth();

    useEffect(() => {
        if (!userId) return;
        const galleryColRef = collection(db, `artifacts/${appId}/public/data/gallery`);
        const q = query(galleryColRef, orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setGalleryItems(items);
            setLoading(false);
        }, (err) => {
            setMessage('Error fetching gallery items.');
            setLoading(false);
        });
        return () => unsubscribe();
    }, [userId]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewGalleryItem({
                ...newGalleryItem,
                file: file,
                type: file.type.startsWith('image/') ? 'image' : (file.type.startsWith('video/') ? 'video' : '')
            });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!newGalleryItem.title || !newGalleryItem.file || !newGalleryItem.type) {
            setMessage('Please provide a title and select a valid image/video file.');
            return;
        }
        setUploading(true);
        setMessage('Uploading...');
        try {
            const file = newGalleryItem.file;
            const storagePath = `artifacts/${appId}/public/${newGalleryItem.type}s/${Date.now()}_${file.name}`;
            const fileRef = ref(storage, storagePath);
            await uploadBytes(fileRef, file);
            const fileUrl = await getDownloadURL(fileRef);

            await addDoc(collection(db, `artifacts/${appId}/public/data/gallery`), {
                title: newGalleryItem.title,
                description: newGalleryItem.description,
                url: fileUrl,
                type: newGalleryItem.type,
                storagePath: storagePath, // Store path for easier deletion
                timestamp: new Date().toISOString(),
            });
            setMessage('Gallery item added successfully!');
            setNewGalleryItem({ title: '', description: '', file: null, type: '' });
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            setMessage('Error adding gallery item: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteClick = async (item) => {
        if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
            setMessage('Deleting...');
            try {
                // Delete from Firestore
                await deleteDoc(doc(db, `artifacts/${appId}/public/data/gallery`, item.id));
                // Delete from Storage
                const fileRef = ref(storage, item.storagePath || item.url); // Use storagePath if available
                await deleteObject(fileRef);
                setMessage('Gallery item deleted successfully!');
            } catch (error) {
                setMessage('Error deleting item. It might have been already removed from storage. ' + error.message);
            }
        }
    };
    
    return (
        <div className="p-4 bg-blue-50 rounded-lg shadow-inner">
            {message && <p className="mb-4 text-center p-2 bg-yellow-100 text-yellow-800 rounded">{message}</p>}

            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Add New Gallery Item</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4 mb-8 p-4 border rounded-lg bg-white">
                <div>
                    <label className="block font-bold">Title</label>
                    <input type="text" value={newGalleryItem.title} onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })} required className="input-field" />
                </div>
                <div>
                    <label className="block font-bold">Description (Optional)</label>
                    <textarea value={newGalleryItem.description} onChange={(e) => setNewGalleryItem({ ...newGalleryItem, description: e.target.value })} className="input-field" rows="2"></textarea>
                </div>
                <div>
                    <label className="block font-bold">Image/Video File</label>
                    <input type="file" onChange={handleFileChange} ref={fileInputRef} accept="image/*,video/*" required className="input-field" />
                </div>
                <button type="submit" disabled={uploading} className="btn-primary">
                    {uploading ? 'Uploading...' : 'Add Gallery Item'}
                </button>
            </form>

            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Existing Gallery Items</h3>
            {loading ? <p>Loading gallery...</p> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {galleryItems.map(item => (
                        <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden relative">
                            {item.type === 'image' && <img src={item.url} alt={item.title} className="w-full h-40 object-cover" />}
                            {item.type === 'video' && <video src={item.url} controls className="w-full h-40 object-cover bg-black" />}
                            <div className="p-3">
                                <h4 className="font-semibold truncate">{item.title}</h4>
                                <p className="text-sm text-gray-600 truncate">{item.description}</p>
                                <button onClick={() => handleDeleteClick(item)} className="btn-delete w-full mt-2">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminGallery;