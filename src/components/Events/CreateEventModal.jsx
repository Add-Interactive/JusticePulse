import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  Sparkles, 
  Users, 
  Send 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CreateEventModal({ isOpen, onClose, onAddEvent, currentUser, showToast }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Vigil & Memorial');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !date.trim()) {
      showToast('Please fill out event title, date, and location', 'error');
      return;
    }

    const newEvent = {
      id: `evt-user-${Date.now()}`,
      title: title.trim(),
      type: type,
      date: date,
      time: time || 'TBD',
      location: location.trim(),
      organizer: currentUser.name,
      attendees: 1,
      isRsvp: true,
      description: description.trim() || 'Community assembly organized via JusticePulse.',
      tags: ['Community Action', 'Grassroots Assembly']
    };

    onAddEvent(newEvent);
    confetti({ particleCount: 50, spread: 70 });
    showToast('Community action organized & published to the national calendar!', 'success');
    onClose();
    setTitle('');
    setDate('');
    setTime('');
    setLocation('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animation-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-base text-white">Organize Community Action / Vigil</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Action Title *</label>
            <input
              type="text"
              placeholder="e.g. County Board Peaceful Vigil & Public Comment"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              >
                <option value="Vigil & Memorial">Vigil & Memorial</option>
                <option value="Townhall / Hearing">Townhall / Hearing</option>
                <option value="Training Webinar">Training Webinar</option>
                <option value="Rally & Demonstration">Rally & Demonstration</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Date *</label>
              <input
                type="text"
                placeholder="e.g. Saturday, Sept 12"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Time Range</label>
              <input
                type="text"
                placeholder="e.g. 5:00 PM – 7:00 PM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Location / Venue *</label>
              <input
                type="text"
                placeholder="e.g. City Hall Steps or Zoom Link"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Description & Demands</label>
            <textarea
              rows={3}
              placeholder="What is the goal? What should attendees bring (signs, candles, legal observer vests)?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
            ></textarea>
          </div>

          <div className="pt-3 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-glow"
            >
              Publish Community Action
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
