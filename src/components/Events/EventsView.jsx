import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  PlusCircle, 
  CheckCircle2, 
  Share2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialEvents } from '../../data/eventsData';
import CreateEventModal from './CreateEventModal';

export default function EventsView({ currentUser, showToast }) {
  const [events, setEvents] = useState(initialEvents);
  const [filterType, setFilterType] = useState('ALL');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleRsvpToggle = (eventId) => {
    setEvents(events.map(evt => {
      if (evt.id === eventId) {
        const nextState = !evt.isRsvp;
        if (nextState) {
          confetti({ particleCount: 40, spread: 60 });
          showToast(`RSVP Confirmed for "${evt.title}"! Calendar invite generated.`, 'success');
        } else {
          showToast('RSVP Cancelled', 'info');
        }
        return {
          ...evt,
          isRsvp: nextState,
          attendees: nextState ? evt.attendees + 1 : evt.attendees - 1
        };
      }
      return evt;
    }));
  };

  const handleAddEvent = (newEvent) => {
    setEvents([newEvent, ...events]);
  };

  const filteredEvents = events.filter(evt => {
    return filterType === 'ALL' || evt.type.includes(filterType);
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/60 to-slate-900 rounded-2xl p-6 border border-purple-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 mb-1">
            <Calendar className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Community Action & Mobilization Hub</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            Vigils, County Hearings, Rallies & Legal Observer Trainings
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Find peaceful gatherings, testify at municipal oversight hearings, and certify as a volunteer legal observer to protect your community.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-glow flex-shrink-0 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Host a Community Action</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {['ALL', 'Vigil', 'Townhall', 'Training'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === type
                ? 'bg-purple-600 text-white shadow-glow'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            {type === 'ALL' ? 'All Gatherings' : `${type} Gatherings`}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map(evt => (
          <div
            key={evt.id}
            className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl flex flex-col justify-between hover:border-purple-600/50 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-mono">
                  {evt.type}
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                  <Users className="w-3.5 h-3.5" /> {evt.attendees} Attending
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white font-display">{evt.title}</h3>
                <p className="text-[11px] text-slate-400 mt-1">Organized by: <strong className="text-slate-200">{evt.organizer}</strong></p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span className="font-semibold">{evt.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="text-slate-400">{evt.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-crimson-400 flex-shrink-0" />
                  <span className="text-slate-300">{evt.location}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                {evt.description}
              </p>
            </div>

            {/* Action Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast('Event link copied to clipboard for community distribution!', 'success');
                }}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Share Event"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleRsvpToggle(evt.id)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                  evt.isRsvp
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700 shadow-glow-emerald'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow'
                }`}
              >
                {evt.isRsvp ? <CheckCircle2 className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                <span>{evt.isRsvp ? 'Attending (RSVP Confirmed)' : 'RSVP & Add to Calendar'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreateEventModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onAddEvent={handleAddEvent}
        currentUser={currentUser}
        showToast={showToast}
      />
    </div>
  );
}
