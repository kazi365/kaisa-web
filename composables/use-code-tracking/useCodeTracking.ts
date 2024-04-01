export type TUseCodeTrackingOptions = {}

export type TUseCodeTrackingReturn = {
    trackPageView: () => void;
    trackPath: (path: string) => void;
}

export function useCodeTracking(options?: TUseCodeTrackingOptions): TUseCodeTrackingReturn {
    const _hsq = (globalThis as any)._hsq ||= [];

    const trackPath: TUseCodeTrackingReturn['trackPath'] = (path) => {
        if (!path) return;
        _hsq.push?.(['setPath', path]);
    }

    const trackPageView: TUseCodeTrackingReturn['trackPageView'] = () => {
        _hsq.push?.(['trackPageView']);
    }

    return { trackPageView, trackPath };
}
