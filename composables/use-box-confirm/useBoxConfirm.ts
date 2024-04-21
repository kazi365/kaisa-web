import type { RenderFunction } from 'vue'
import { Dialog } from 'quasar'
import type { QBtnProps } from 'quasar'

interface IConfirmOptions {
    cancelProps?: QBtnProps;
    cancelText?: any;
    content: string | RenderFunction;
    okProps?: QBtnProps;
    okText?: any;
    okVisible?: boolean;
    title?: string;
    width?: string;
}

export type TUseBoxConfirmReturn = {
    confirm: (confirmOptions: IConfirmOptions) => Promise<boolean>;
}

export function useBoxConfirm(): TUseBoxConfirmReturn {
    const confirm = (confirmOptions: IConfirmOptions) => {
        return new Promise<boolean>((resolve, reject) => {
            const { okVisible = true } = confirmOptions
            Dialog.create({
                cancel: {
                    label: confirmOptions.cancelText ?? 'Cancel',
                    color: void 0,
                    flat: true,
                    noCaps: true,
                    ...confirmOptions.cancelProps,
                },
                message: confirmOptions.content as string,
                html: true,
                ok: okVisible ? {
                    label: confirmOptions.okText ?? 'Confirm Sure',
                    noCaps: true,
                    unelevated: true,
                    ...confirmOptions.okProps,
                } : false,
                persistent: true,
                title: confirmOptions.title ?? 'Confirm',
            }).onOk(() => {
                resolve(true);
            }).onCancel(() => {
                reject(new Error());
            })
        })
    }

    return { confirm };
}
