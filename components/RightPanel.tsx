
import React from 'react';
import { Score } from '../types';

interface RightPanelProps {
  scores: Score[];
  onClearScores: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (value: boolean) => void;
  effectsEnabled: boolean;
  setEffectsEnabled: (value: boolean) => void;
  onSaveData: () => void;
  onLoadData: () => void;
  onClearHistory: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  scores,
  onClearScores,
  soundEnabled,
  setSoundEnabled,
  effectsEnabled,
  setEffectsEnabled,
  onSaveData,
  onLoadData,
  onClearHistory,
}) => {
  const sortedScores = [...scores].sort((a, b) => b.points - a.points);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 h-full flex flex-col">
      <div className="flex-grow flex flex-col border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold text-xl text-gray-700 mb-4 text-center">🏆 Bảng Điểm</h3>
        <ul className="space-y-3 flex-grow overflow-y-auto pr-2">
          {sortedScores.map((score) => (
            <li key={score.studentId} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
              <div className="flex items-center">
                <img src={score.studentAvatar} alt={score.studentName} className="w-10 h-10 rounded-full mr-3 border-2 border-white shadow" />
                <span className="font-semibold text-gray-800">{score.studentName}</span>
              </div>
              <span className="bg-red-500 text-white text-sm font-bold w-10 h-10 flex items-center justify-center rounded-full">
                {score.points}
              </span>
            </li>
          ))}
          {scores.length === 0 && <p className="text-center text-gray-500 mt-4">Chưa có điểm số.</p>}
        </ul>
        <button onClick={onClearScores} className="mt-4 bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition w-full">
          Xóa điểm số
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-gray-700 mb-2">Âm thanh & Hiệu ứng</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 text-gray-600">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Bật âm thanh</span>
            </label>
            <label className="flex items-center space-x-3 text-gray-600">
              <input
                type="checkbox"
                checked={effectsEnabled}
                onChange={(e) => setEffectsEnabled(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Bật hiệu ứng</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-700 mb-2">Lưu trữ dữ liệu</h3>
          <div className="grid grid-cols-1 gap-2">
            <button onClick={onSaveData} className="bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition">
              Lưu dữ liệu
            </button>
            <button onClick={onLoadData} className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition">
              Tải dữ liệu
            </button>
            <button onClick={onClearHistory} className="bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition">
              Xóa lịch sử trả lời
            </button>
          </div>
        </div>

        <p className="text-xs text-center text-gray-400 pt-2">
          Dữ liệu được lưu trong Local Storage
        </p>
      </div>
    </div>
  );
};
