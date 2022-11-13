// Get from API profile
export interface IData {
    userId: string;
    username: string;
    image: string;
    sharenotes: INote[];
    collectionCount: number;
    totalViewCount: number;
    likeCount: number;
    likedNotes?: string[];
}
export interface IMyInfo {
    userName: string;
    userImage: string;
    allLikes: number;
    allNotes: number;
    allViews: number;
}

export interface IMyData{
    userName: string;
    userImage: string;
    allLikes: number;
    allNotes: number;
    allViews: number;
    myNotes: Array<INote>;
}