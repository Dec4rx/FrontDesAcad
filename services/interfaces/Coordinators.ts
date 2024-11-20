export interface FormCourseRegistration {
    diagnosis: number;
    dateRegistration: Date;
    departament: string;
    //coordinator_id: number; // TO DO: Cambiar por el ID del coordinador
    courseName: string;
    aimedAt: string; // dirigido a
    type: string;
    approach: string;
    personToTeach: string;
    institutionOrAcademic: string;
    startDate: Date;
    endDate: Date;
    numberHours: number;
    shift: string;
    place: string;
    requirements: string;
    justification: string;
    objective: string;
    thematicContents: string;
    resources: string;
    informationSources: string;
    authorization: string;
    review: string;
    capacity: number;
}

export interface CourseRegistered {
    id: number
    diagnosis_id: number;
    dateRegistration: Date;
    departament: string;
    coordinator_id: number; // TO DO: Cambiar por el ID del coordinador
    name: string;
    aimedAt: string; // dirigido a
    type: string;
    approach: string;
    personToTeach: string;
    institutionOrAcademic: string;
    startDate: Date;
    endDate: Date;
    numberHours: number;
    shift: string;
    place: string;
    requirements: string;
    justification: string;
    objective: string;
    thematicContents: string;
    resources: string;
    informationSources: string;
    authorization: string;
    review: string;
    capacity: number;
}