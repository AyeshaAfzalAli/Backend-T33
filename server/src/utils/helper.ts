import type { Status } from "./types";

export function getBatch(date: Date) {
    const year = date.getFullYear() - 2025;
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    return { year, quarter };
};

export function getYandQ(batch_no: number) {
    const year = Math.floor(batch_no / 4);
    const quarter = batch_no % 4 + 1;
    return { year, quarter };
};

export function getBatchNo(year: number, quarter: number) {
    return (year - 2025) * 4 + quarter - 1;
}

export function getCurrentStatus(statusHistory: { status: Status; date: Date }[]) {
    let n = statusHistory.length;
    if (n==0) return null;
    return statusHistory[n-1].status;
}

