
import React, { useState, useEffect, useCallback } from 'react';
import { LeftPanel } from './components/LeftPanel';
import { CenterPanel } from './components/CenterPanel';
import { RightPanel } from './components/RightPanel';
import { Modal } from './components/Modal';
import { GameMode, Student, Question, Reward, Score } from './types';

const DEFAULT_STUDENTS: Student[] = [
  { id: '1', name: 'Nguyễn Văn An', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Trần Thị Bích', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Lê Văn Cường', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Phạm Thị Dung', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'Hoàng Văn Em', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: '6', name: 'Vũ Thị Giang', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: '7', name: 'Đỗ Văn Hùng', avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: '8', name: 'Bùi Thị Lan', avatar: 'https://i.pravatar.cc/150?u=8' },
];

const DEFAULT_QUESTIONS: Question[] = [
    { id: 'q1', text: 'Nguyễn Hữu Cầu lãnh đạo khởi nghĩa ở đâu?' },
    { id: 'q2', text: 'Khẩu hiệu nổi tiếng của cuộc khởi nghĩa Nguyễn Danh Phương là gì?' },
    { id: 'q3', text: 'Ai là người lãnh đạo cuộc khởi nghĩa lớn nhất Đàng Ngoài?' },
];

const DEFAULT_REWARDS: Reward[] = [
    { id: 'r1', name: 'Một tràng pháo tay' },
    { id: 'r2', name: 'Cộng 10 điểm' },
    { id: 'r3', name: 'Hộp quà bí mật' },
    { id: 'r4', name: 'Quyền chọn bạn cùng chơi' },
    { id: 'r5', name: 'Miễn trả lời 1 lần' },
    { id: 'r6', name: 'Thêm một lượt quay' },
];

const App: React.FC = () => {
    const [students, setStudents] = useState<Student[]>(DEFAULT_STUDENTS);
    const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS);
    const [rewards] = useState<Reward[]>(DEFAULT_REWARDS);
    const [scores, setScores] = useState<Score[]>([]);
    
    const [activeMode, setActiveMode] = useState<GameMode>(GameMode.CALL_STUDENT);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [winner, setWinner] = useState<{ name: string; [key: string]: any } | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Settings
    const [removeStudentAfterCall, setRemoveStudentAfterCall] = useState(false);
    const [removeQuestionAfterUse, setRemoveQuestionAfterUse] = useState(false);
    const [spinDuration, setSpinDuration] = useState(5);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [effectsEnabled, setEffectsEnabled] = useState(true);

    const getWheelItems = useCallback(() => {
        switch (activeMode) {
            case GameMode.CALL_STUDENT:
                return students;
            case GameMode.ANSWER_QUESTION:
                return questions.map(q => ({...q, name: q.text}));
            case GameMode.GET_REWARD:
                return rewards;
            default:
                return [];
        }
    }, [activeMode, students, questions, rewards]);

    const handleSpin = () => {
        const items = getWheelItems();
        if (items.length === 0 || isSpinning) return;

        setIsSpinning(true);
        const winnerIndex = Math.floor(Math.random() * items.length);
        const winnerItem = items[winnerIndex];
        const sliceAngle = 360 / items.length;
        const winningAngle = 360 - (winnerIndex * sliceAngle + sliceAngle / 2);
        const totalRotation = rotation + 360 * 5 + winningAngle;
        
        setRotation(totalRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setWinner(winnerItem);
            setModalOpen(true);

            if (activeMode === GameMode.CALL_STUDENT && removeStudentAfterCall) {
                setStudents(prev => prev.filter(s => s.id !== winnerItem.id));
            }
            if (activeMode === GameMode.ANSWER_QUESTION && removeQuestionAfterUse) {
                setQuestions(prev => prev.filter(q => q.id !== winnerItem.id));
            }
        }, spinDuration * 1000);
    };

    const handleAddQuestion = (questionText: string) => {
        const newQuestion: Question = {
            id: `q${Date.now()}`,
            text: questionText,
        };
        setQuestions(prev => [...prev, newQuestion]);
    };
    
    const handleAddScore = (student: Student, points: number) => {
        setScores(prevScores => {
            const existingScoreIndex = prevScores.findIndex(s => s.studentId === student.id);
            if (existingScoreIndex > -1) {
                const newScores = [...prevScores];
                newScores[existingScoreIndex].points += points;
                return newScores;
            } else {
                return [...prevScores, { studentId: student.id, studentName: student.name, studentAvatar: student.avatar, points }];
            }
        });
    };

    const renderModalContent = () => {
        if (!winner) return null;
        switch (activeMode) {
            case GameMode.CALL_STUDENT:
                return (
                    <div className="text-center">
                        <img src={(winner as Student).avatar} alt={winner.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-yellow-400 shadow-lg"/>
                        <h2 className="text-3xl font-bold text-gray-800">Chúc mừng!</h2>
                        <p className="text-5xl font-extrabold text-[#2D9CDB] my-4">{winner.name}</p>
                        <div className="mt-6 flex justify-center gap-4">
                            <button onClick={() => { handleAddScore(winner as Student, 10); setModalOpen(false); }} className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg">Cộng 10 điểm</button>
                            <button onClick={() => setModalOpen(false)} className="bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg">Đóng</button>
                        </div>
                    </div>
                );
            case GameMode.ANSWER_QUESTION:
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Câu hỏi</h2>
                        <p className="text-xl text-gray-700 bg-gray-100 p-4 rounded-lg">{winner.name}</p>
                        <p className="text-sm text-gray-500 mt-4">Tính năng trả lời trắc nghiệm đang được phát triển.</p>
                    </div>
                );
            case GameMode.GET_REWARD:
                return (
                     <div className="text-center">
                        <p className="text-6xl mb-4">🎉</p>
                        <h2 className="text-3xl font-bold text-gray-800">Phần thưởng của bạn là</h2>
                        <p className="text-4xl font-extrabold text-[#F39C12] my-4">{winner.name}</p>
                    </div>
                );
            default:
                return <p>Kết quả: {winner.name}</p>;
        }
    };

    const saveData = () => {
        try {
            const dataToSave = {
                students, questions, scores, removeStudentAfterCall, removeQuestionAfterUse
            };
            localStorage.setItem('learningWheelData', JSON.stringify(dataToSave));
            alert('Dữ liệu đã được lưu thành công!');
        } catch (error) {
            alert('Lỗi khi lưu dữ liệu.');
        }
    };
    
    const loadData = () => {
        try {
            const savedData = localStorage.getItem('learningWheelData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                setStudents(parsedData.students || DEFAULT_STUDENTS);
                setQuestions(parsedData.questions || DEFAULT_QUESTIONS);
                setScores(parsedData.scores || []);
                setRemoveStudentAfterCall(parsedData.removeStudentAfterCall || false);
                setRemoveQuestionAfterUse(parsedData.removeQuestionAfterUse || false);
                alert('Dữ liệu đã được tải thành công!');
            } else {
                alert('Không tìm thấy dữ liệu đã lưu.');
            }
        } catch (error) {
            alert('Lỗi khi tải dữ liệu.');
        }
    };
    
    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#DCC7F7] via-[#F8C1C7] to-[#FFE29A] p-4 sm:p-6 lg:p-8">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-extrabold text-white" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>Vòng Quay Học Tập</h1>
                <p className="text-white text-lg mt-1">Môn: Lịch sử và Địa lý 8 - Bài: Khởi nghĩa nông dân Đàng Ngoài thế kỉ XVIII</p>
                <p className="text-white text-md">Giáo viên: Bùi Đức Toàn</p>
            </header>
            <main className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                <div className="lg:col-span-1">
                    <LeftPanel 
                        activeMode={activeMode}
                        setMode={setActiveMode}
                        questionCount={questions.length}
                        onAddQuestion={handleAddQuestion}
                        onClearQuestions={() => setQuestions([])}
                        removeStudentAfterCall={removeStudentAfterCall}
                        setRemoveStudentAfterCall={setRemoveStudentAfterCall}
                        removeQuestionAfterUse={removeQuestionAfterUse}
                        setRemoveQuestionAfterUse={setRemoveQuestionAfterUse}
                        spinDuration={spinDuration}
                        setSpinDuration={setSpinDuration}
                    />
                </div>
                <div className="lg:col-span-2 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-4">
                    <CenterPanel
                        items={getWheelItems()}
                        isSpinning={isSpinning}
                        rotation={rotation}
                        duration={spinDuration}
                        onSpin={handleSpin}
                        title={activeMode}
                    />
                </div>
                <div className="lg:col-span-1">
                    <RightPanel
                        scores={scores}
                        onClearScores={() => setScores([])}
                        soundEnabled={soundEnabled}
                        setSoundEnabled={setSoundEnabled}
                        effectsEnabled={effectsEnabled}
                        setEffectsEnabled={setEffectsEnabled}
                        onSaveData={saveData}
                        onLoadData={loadData}
                        onClearHistory={() => { if(window.confirm('Bạn có chắc muốn xóa lịch sử?')) { setScores([]); } }}
                    />
                </div>
            </main>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {renderModalContent()}
            </Modal>
        </div>
    );
};

export default App;
