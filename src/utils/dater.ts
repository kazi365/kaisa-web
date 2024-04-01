export type TFormatTarget = Date | number | string
export type TFormatterOption = {
    YYYY: number;
    M: number;
    MM: string;
    D: number;
    DD: string;
    h: number;
    hh: string;
    m: number;
    mm: string;
    s: number;
    ss: string;
}
export interface IFormatterFn<R> {
    (newDate: Date, formatterOption: TFormatterOption): R;
}
export type TFormatOption = {
    locale?: string;
}

export function format(target: TFormatTarget, formatter?: 'Date' | 'Utc', config?: TFormatOption): Date | undefined
export function format(target: TFormatTarget, formatter?: 'timestamp', config?: TFormatOption): number | undefined
export function format(target: TFormatTarget, formatter: 'd' | 'dt' | 't' | string, config?: TFormatOption): string | undefined
export function format<R>(target: TFormatTarget, formatter: IFormatterFn<R>, config?: TFormatOption): R
export function format<R>(
    target: TFormatTarget,
    formatter: 'Date' | 'Utc' | 'timestamp' | 'd' | 'dt' | 't' | string | IFormatterFn<R> = 'Date',
    config?: TFormatOption
) {
    if (!target) return;
    // TODO 兼容性处理

    const newDate = new Date(target)
    if (Number.isNaN(newDate.getTime())) {
        console.warn('format: invalid target.')
        return;
    }

    if (formatter === 'Date') return newDate;
    if (formatter === 'Utc') return new Date(
        newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate(),
        newDate.getUTCHours(), newDate.getUTCMinutes(), newDate.getUTCSeconds(),
        newDate.getUTCMilliseconds()
    );
    if (formatter === 'timestamp') return newDate.getTime();
    if (formatter === 'd') return newDate.toLocaleDateString(config?.locale);
    if (formatter === 'dt') return newDate.toLocaleString(config?.locale);
    if (formatter === 't') return newDate.toLocaleTimeString(config?.locale);
    const [YYYY, M, D, h, m, s] = [
        newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate(),
        newDate.getHours(), newDate.getMinutes(), newDate.getSeconds(),
    ]
    const formatterOption: TFormatterOption = {
        YYYY,
        M,
        MM: M.toString().padStart(2, '0'),
        D,
        DD: D.toString().padStart(2, '0'),
        h,
        hh: h.toString().padStart(2, '0'),
        m,
        mm: m.toString().padStart(2, '0'),
        s,
        ss: s.toString().padStart(2, '0'),
    }
    // TODO more formatterOption property

    if (typeof formatter === 'string') {
        const rege = new RegExp(Object.keys(formatterOption).map(o => `(%${o}%)`).join('|'), 'gm')
        return formatter.replace(rege, (m) => (formatterOption as Record<string, any>)[m.split('%')[1]] || m);
    }
    if (typeof formatter === 'function') return formatter(newDate, formatterOption);
    return newDate;
}

export function getLocaleByUtc(utc: TFormatTarget) {
    const utcDate = format(utc, 'Date')
    if (!utcDate) {
        console.warn('getLocaleByUtc: invalid target.')
        return;
    }
    return new Date(Date.UTC(
        utcDate.getFullYear(),
        utcDate.getMonth(),
        utcDate.getDate(),
        utcDate.getHours(),
        utcDate.getMinutes(),
        utcDate.getSeconds(),
        utcDate.getMilliseconds(),
    ));
}

export function getRecent(
    base: TFormatTarget,
    config: {
        year?: number | string,
        month?: number | string,
        day?: number | string,
        hour?: number | string,
        minute?: number | string,
        second?: number | string
    }
) {
    const baseDate = format(base, 'Date')
    if (!baseDate) {
        console.warn('getRecent: invalid target.')
        return;
    }
    const year = parseInt((config.year ?? '').toString(), 10) || 0
    const month = parseInt((config.month ?? '').toString(), 10) || 0
    const day = parseInt((config.day ?? '').toString(), 10) || 0
    const hour = parseInt((config.hour ?? '').toString(), 10) || 0
    const minute = parseInt((config.minute ?? '').toString(), 10) || 0
    const second = parseInt((config.second ?? '').toString(), 10) || 0
    baseDate.setFullYear(
        baseDate.getFullYear() + year,
        baseDate.getMonth() + month,
        baseDate.getDate() + day
    )
    baseDate.setHours(
        baseDate.getHours() + hour,
        baseDate.getMinutes() + minute,
        baseDate.getSeconds() + second
    )
    return baseDate;
}

export default {
    format,
    getLocaleByUtc,
    getRecent,
}
