
import React from 'react';
import { GameMode } from '../types';

interface LeftPanelProps {
  activeMode: GameMode;
  setMode: (mode: GameMode) => void;
  questionCount: number;
  onAddQuestion: (question: string) => void;
  onClearQuestions: () => void;
  removeStudentAfterCall: boolean;
  setRemoveStudentAfterCall: (value: boolean) => void;
  removeQuestionAfterUse: boolean;
  setRemoveQuestionAfterUse: (value: boolean) => void;
  spinDuration: number;
  setSpinDuration: (value: number) => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  activeMode,
  setMode,
  questionCount,
  onAddQuestion,
  onClearQuestions,
  removeStudentAfterCall,
  setRemoveStudentAfterCall,
  removeQuestionAfterUse,
  setRemoveQuestionAfterUse,
  spinDuration,
  setSpinDuration,
}) => {
  const [newQuestion, setNewQuestion] = React.useState('');

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      onAddQuestion(newQuestion.trim());
      setNewQuestion('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 h-full flex flex-col">
      <div className="space-y-3">
        <h3 className="font-bold text-lg text-gray-700">Chế độ</h3>
        <button
          onClick={() => setMode(GameMode.CALL_STUDENT)}
          className={`w-full flex items-center justify-center font-bold py-3 px-4 rounded-lg transition-all duration-200 text-white ${
            activeMode === GameMode.CALL_STUDENT ? 'ring-4 ring-red-300' : ''
          } bg-[#E74C3C] hover:bg-red-600`}
        >
          <span className="mr-3 text-xl">👤</span> GỌI TÊN HỌC SINH
        </button>
        <button
          onClick={() => setMode(GameMode.ANSWER_QUESTION)}
          className={`w-full flex items-center justify-center font-bold py-3 px-4 rounded-lg transition-all duration-200 text-white ${
            activeMode === GameMode.ANSWER_QUESTION ? 'ring-4 ring-blue-300' : ''
          } bg-[#3498DB] hover:bg-blue-600`}
        >
          <span className="mr-3 text-xl">❓</span> TRẢ LỜI CÂU HỎI
        </button>
        <button
          onClick={() => setMode(GameMode.GET_REWARD)}
          className={`w-full flex items-center justify-center font-bold py-3 px-4 rounded-lg transition-all duration-200 text-white ${
            activeMode === GameMode.GET_REWARD ? 'ring-4 ring-orange-300' : ''
          } bg-[#F39C12] hover:bg-orange-500`}
        >
          <span className="mr-3 text-xl">🎁</span> NHẬN THƯỞNG
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 flex-grow flex flex-col">
        <h3 className="font-bold text-gray-700 mb-2">Ngân hàng câu hỏi</h3>
        <textarea
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Nhập câu hỏi mới vào đây..."
          rows={5}
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        ></textarea>
        <p className="text-xs text-gray-500 mt-1 mb-3">Đã có {questionCount} câu hỏi</p>
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button onClick={handleAddQuestion} className="bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition text-sm">
            Thêm câu hỏi
          </button>
          <button onClick={onClearQuestions} className="bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition text-sm">
            Xóa tất cả
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-700 mb-3">Tùy chọn nâng cao</h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-3 text-gray-600">
            <input
              type="checkbox"
              checked={removeStudentAfterCall}
              onChange={(e) => setRemoveStudentAfterCall(e.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Xóa học sinh sau khi gọi</span>
          </label>
          <label className="flex items-center space-x-3 text-gray-600">
            <input
              type="checkbox"
              checked={removeQuestionAfterUse}
              onChange={(e) => setRemoveQuestionAfterUse(e.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Xóa câu hỏi đã dùng</span>
          </label>
          <div>
            <label htmlFor="spin-duration" className="block text-gray-600 mb-1">
              Tốc độ xoay: {spinDuration}s
            </label>
            <input
              id="spin-duration"
              type="range"
              min="2"
              max="10"
              value={spinDuration}
              onChange={(e) => setSpinDuration(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
