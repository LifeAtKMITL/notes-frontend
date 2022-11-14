export interface INote {
    subjectId: string;
    subjectName: string;
    teachers: Array<string>;
    exam: string;
    year: string;
    description: string;
    date: Date;
    files: Array<IFile>;
    sharenoteCollectionName: string;
    sharenoteCollectionNameVersion: string;
    noteImage?:string;
    image: string;
    username: string;
    userId: string;
    viewCount: number;
    likeCount: number;
    _id:string;
}

export interface IFile{
    userIdMongo: string;
    collectionName: string;
    filename: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    sizeByte: number;
    uploadDate: Date;
    url:string;
}

// Find NOte

export interface IFindNote {
    image: string;
    sharenote: INote;
    username: string;
}

export interface IShareNote {
    subjectId: string;
    subjectName: string;
    teachers: Array<string>;
    exam: string;
    year: string;
    description: string;
    date: Date;
    files: File;
    sharenoteCollectionName?: string;
    sharenoteCollectionNameVersion?: string;
    noteImage:string;
    userId: string;
    viewCount: number;
    likeCount: number;
    _id:string;
}