export interface ISubject {
    subjectId: string;
    name: string;
  }
  
export interface IForm {
    subjectId: string;
    subjectName: string;
    teachers: string;
    exam: string;
    year: string;
    description: string;
    files: any;
    sharenoteCollectionName: string;
  }