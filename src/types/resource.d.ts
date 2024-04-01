export declare interface IResourceCommentItem {
    commenter: string;
    content: string;
    createTime: string; // YYYY-MM-DDThh:mm:ss.000Z
    id: number;
    prevComment?: IResourceCommentItem;
}

export declare interface IResourceEntryGroupItem {
    data: {
        cover?: string;
        title: string;
        url?: string;
        videoSrc?: string;
    }[];
    title: string;
}
