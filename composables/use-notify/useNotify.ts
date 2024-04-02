import { Notify } from 'quasar'

type TNotifyOptions =  {
    msg: string;
    position?: 'top' | 'bottom';
    type?: 'info' | 'negative' | 'positive' | 'warning';
}

export type TUseNotifyReturn = {
    notify: (notifyOptions: TNotifyOptions) => void;
}

export function useNotify(): TUseNotifyReturn {
    const notify = (notifyOptions: TNotifyOptions) => {
        const {
            msg,
            position = 'top',
            type,
        } = notifyOptions
        Notify.create({
            color: type === 'info' ? 'primary' : type,
            message: msg,
            position: position,
            textColor: 'white',
            type,
        })
    }

    return { notify };
}
