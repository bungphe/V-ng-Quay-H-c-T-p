
export interface Student {
  id: string;
  name: string;
  avatar: string;
}

export interface Question {
  id: string;
  text: string;
}

export interface Reward {
  id: string;
  name: string;
}

export enum GameMode {
  CALL_STUDENT = 'GỌI TÊN HỌC SINH',
  ANSWER_QUESTION = 'TRẢ LỜI CÂU HỎI',
  GET_REWARD = 'NHẬN THƯỞNG',
}

export interface Score {
  studentId: string;
  studentName: string;
  studentAvatar: string;
  points: number;
}
