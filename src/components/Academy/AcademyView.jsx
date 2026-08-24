import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  Download, 
  ChevronRight, 
  RotateCcw,
  Scale,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { academyCourses } from '../../data/academyCoursesData';

export default function AcademyView({ currentUser, showToast }) {
  const [selectedCourse, setSelectedCourse] = useState(academyCourses[0]);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [completedCourses, setCompletedCourses] = useState([]);

  const isCurrentCourseCompleted = completedCourses.includes(selectedCourse.id);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setCurrentLessonIdx(0);
    setSelectedAnswer(null);
    setIsQuizSubmitted(false);
  };

  const handleAnswerSelect = (index) => {
    if (isQuizSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer === null) {
      showToast('Please select an answer to test your legal knowledge', 'error');
      return;
    }

    setIsQuizSubmitted(true);
    const isCorrect = selectedAnswer === selectedCourse.quiz.correctIndex;

    if (isCorrect) {
      if (!completedCourses.includes(selectedCourse.id)) {
        setCompletedCourses([...completedCourses, selectedCourse.id]);
      }
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 }
      });
      showToast(`Congratulations! You earned the "${selectedCourse.badgeEarned}" credential!`, 'success');
    } else {
      showToast('Incorrect. Review the lesson materials and try again.', 'error');
    }
  };

  const handleDownloadCertificate = () => {
    const certText = `================================================================================
JUSTICE PULSE CIVIL RIGHTS ACADEMY
CERTIFICATE OF CONSTITUTIONAL MASTERY

THIS CERTIFIES THAT:
${currentUser.name.toUpperCase()}

HAS SUCCESSFULLY COMPLETED THE ADVANCED LEGAL CURRICULUM:
"${selectedCourse.title.toUpperCase()}"

EARNED CREDENTIAL: ${selectedCourse.badgeEarned.toUpperCase()}
DATE OF CERTIFICATION: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
VERIFICATION HASH: SHA256:ACAD-${Date.now().toString(16).toUpperCase()}-VERIFIED

ISSUED UNDER THE CONSTITUTIONAL JURISPRUDENCE OVERSIGHT INITIATIVE
JUSTICE PULSE CIVIC INTELLIGENCE & LEGAL OBSERVER NETWORK
================================================================================`;

    const element = document.createElement('a');
    const file = new Blob([certText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `CERTIFICATE_${selectedCourse.id.toUpperCase()}.TXT`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    confetti({ particleCount: 40, spread: 60 });
    showToast('Official Certificate of Constitutional Mastery downloaded!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/70 to-slate-900 rounded-3xl p-6 border border-purple-800/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 mb-1">
            <GraduationCap className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Civic Rights Legal Academy</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            Interactive Constitutional Law & Legal Observer Academy
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Master the legal doctrines governing police encounters, test your knowledge with interactive bar-reviewed quizzes, and earn verifiable civic credentials.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950/90 p-3 rounded-2xl border border-purple-800/50 flex-shrink-0 text-xs">
          <Award className="w-6 h-6 text-amber-400" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Completed Badges</span>
            <p className="text-sm font-extrabold font-mono text-emerald-400">{completedCourses.length} of {academyCourses.length}</p>
          </div>
        </div>
      </div>

      {/* Main Course Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Course Catalog (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Curriculum Courses:
          </span>
          {academyCourses.map(course => {
            const isSelected = selectedCourse.id === course.id;
            const isCompleted = completedCourses.includes(course.id);
            return (
              <div
                key={course.id}
                onClick={() => handleSelectCourse(course)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 shadow-xl ${
                  isSelected
                    ? 'bg-slate-900 border-purple-500 shadow-glow'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-purple-400 font-bold">{course.level}</span>
                  {isCompleted && (
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.2 rounded-full border border-emerald-800 font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Certified
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-white leading-snug">{course.title}</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{course.duration}</span>
                  <span className="text-amber-400 truncate max-w-[150px]">{course.badgeEarned}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Interactive Lesson & Quiz Canvas (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
          <div className="space-y-5">
            {/* Course Header */}
            <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-mono">
                  {selectedCourse.level} • {selectedCourse.duration}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display mt-1.5 leading-snug">
                  {selectedCourse.title}
                </h3>
              </div>

              {isCurrentCourseCompleted && (
                <button
                  onClick={handleDownloadCertificate}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-glow-emerald flex items-center gap-1.5 transition-all flex-shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Certificate</span>
                </button>
              )}
            </div>

            {/* Lesson Carousel Tabs */}
            <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-2 overflow-x-auto">
              {selectedCourse.lessons.map((lesson, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentLessonIdx(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    currentLessonIdx === idx
                      ? 'bg-purple-600 text-white shadow-glow'
                      : 'text-slate-400 hover:text-white bg-slate-950'
                  }`}
                >
                  Lesson {idx + 1}: {lesson.title}
                </button>
              ))}
            </div>

            {/* Current Lesson Content */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>{selectedCourse.lessons[currentLessonIdx].title}</span>
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-sans text-xs">
                {selectedCourse.lessons[currentLessonIdx].content}
              </p>
            </div>

            {/* Knowledge Check Interactive Quiz */}
            <div className="p-5 bg-gradient-to-br from-purple-950/30 to-slate-950 rounded-2xl border border-purple-800/40 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Knowledge Check & Certification Quiz
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">1-Question Mastery Test</span>
              </div>

              <p className="text-xs font-bold text-white leading-snug">
                {selectedCourse.quiz.question}
              </p>

              {/* Quiz Options */}
              <div className="space-y-2">
                {selectedCourse.quiz.options.map((option, oIdx) => {
                  const isSelected = selectedAnswer === oIdx;
                  let optionStyle = 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200';

                  if (isQuizSubmitted) {
                    if (oIdx === selectedCourse.quiz.correctIndex) {
                      optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected) {
                      optionStyle = 'bg-crimson-950/80 border-crimson-500 text-crimson-200';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-purple-950/80 border-purple-500 text-white font-bold shadow-glow';
                  }

                  return (
                    <div
                      key={oIdx}
                      onClick={() => handleAnswerSelect(oIdx)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start space-x-3 ${optionStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="leading-snug">{option}</span>
                    </div>
                  );
                })}
              </div>

              {/* Quiz Feedback & Explanation */}
              {isQuizSubmitted && (
                <div className={`p-4 rounded-xl text-xs space-y-1 animation-fade-in ${
                  selectedAnswer === selectedCourse.quiz.correctIndex
                    ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                    : 'bg-crimson-950/60 border border-crimson-800 text-crimson-300'
                }`}>
                  <p className="font-bold flex items-center gap-1.5">
                    {selectedAnswer === selectedCourse.quiz.correctIndex ? (
                      <><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Correct! Credential Unlocked.</>
                    ) : (
                      <><AlertCircle className="w-4 h-4 text-crimson-400" /> Incorrect Answer</>
                    )}
                  </p>
                  <p className="text-slate-300 leading-relaxed">{selectedCourse.quiz.explanation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-mono">
              Badge: <strong className="text-amber-400">{selectedCourse.badgeEarned}</strong>
            </span>

            {!isQuizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={selectedAnswer === null}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-glow transition-all"
              >
                Submit Answer & Certify
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedAnswer(null);
                  setIsQuizSubmitted(false);
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
