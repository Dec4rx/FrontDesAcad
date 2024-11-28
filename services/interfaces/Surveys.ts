export interface CreateSurvey {
    courseId: number;
    professorId: number;
}

export interface Answers {
    questionId: number;
    response: string;
}

export interface Questions {
    id: number;
    text: string;
}

export interface SurveyResponse {
    surveyId: number;
    answers: Answers[];
}