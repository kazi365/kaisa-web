export declare interface IPlan {
    configType: string;
    maxConfig: number;
    maxFplmn: number;
    maxMember: number;
    maxOplmn: number;
    maxRedownload: number;
    planType: string;
    records: { downloadTimes: number, price: number }[];
}
export declare interface IEImPlan {
    planType: string;
    records: { devices: number, price: number }[];
}
