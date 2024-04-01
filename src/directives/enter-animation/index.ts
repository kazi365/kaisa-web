import type { Directive } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

interface IEnterAnimationBinding {
    animateClass?: string;
    duration?: number;
    threshold?: number;
}

export const enterAnimation: Directive<HTMLElement, IEnterAnimationBinding> = {
    created(el: HTMLElement) {
        el.style.visibility = 'hidden'
    },
    mounted(el: HTMLElement, binding) {
        const {
            animateClass = 'animating',
            duration = 0.25,
            threshold = 0.25,
        } = binding.value
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
            if (isIntersecting) {
                el.classList.add(animateClass)
                el.style.visibility = 'visible'
                setTimeout(() => {
                    el.classList.remove(animateClass)
                    stop()
                }, duration * 1000)
            }
        }, { threshold })
    }
}
