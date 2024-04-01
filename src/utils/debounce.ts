export class Debouncer {
    private timer: NodeJS.Timeout | null = null
    
    run(fn: () => any, timeout: number) {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(fn, timeout)
    }
}
