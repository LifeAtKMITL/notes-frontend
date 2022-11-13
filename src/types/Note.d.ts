export interface INote {
    subjectId: string;
    subjectName: string;
    teachers: Array<string>;
    exam: string;
    year: string;
    description: string;
    date: Date;
    files: File;
    sharenoteCollectionName: string;
    sharenoteCollectionNameVersion: string;
    noteImage?:string;
    userImage?: string;
    userName?: string;
    userId: string;
    viewCount: number;
    likeCount: number;
    _id:string;
}

export interface INoteCard {
    subjectName: string;
    exam: string;
    year: string;
    teachers: string;
    userName: string;
    userImage: string;
    noteImage: string;
    likeCount: number;
    viewCount: number;
}