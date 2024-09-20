export interface Diagnosis {
    id: number;
    departament: string;
    headDepartment: string;
    presidentAcademy: string;
    titleSubdirectorate: string;
    requiredSubjects: string;
    thematicContents: string;
    typeSubject: string;
    activityEvent: string;
    objective: string;
    careersAttended: string;
    period: string;
    status: string;
    facilitators: string;
    dateDiagnosis: string;
    startDate: string;
    endDate: string;
    numberProfessors: number;
    shift: string;
}


export interface DiagnosisForm {
  departament: string;
  headDepartment: string;
  presidentAcademy: string;
  titleSubdirectorate: string;
  requiredSubjects: string;
  thematicContents: string;
  typeSubject: string;
  activityEvent: string;
  objective: string;
  careersAttended: string;
  period: string;
  status: string;
  facilitators: string;
  dateDiagnosis: Date;
  startDate: Date;
  endDate: Date;
  numberProfessors: number;
  shift: string;
}

export interface DiagnosisFormString {
    departament: string;
    headDepartment: string;
    presidentAcademy: string;
    titleSubdirectorate: string;
    requiredSubjects: string;
    thematicContents: string;
    typeSubject: string;
    activityEvent: string;
    objective: string;
    careersAttended: string;
    period: string;
    status: string;
    facilitators: string;
    dateDiagnosis: string;  
    startDate: string;  
    endDate: string;    
    numberProfessors: number;
    shift: string;
  }