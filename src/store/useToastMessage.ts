import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export type ToastType = 'success' | 'error'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[]
  }),
  actions: {
    /**
     * 새로운 토스트를 하나만 띄웁니다.
     * 기존에 떠 있던 모든 토스트는 즉시 제거됩니다.
     */
    show(message: string, type: ToastType = 'success') {
      // 1) 기존 토스트 모두 제거
      this.toasts = []

      // 2) 새 토스트 추가
      const id = nanoid()
      this.toasts.push({ id, message, type })

      // 3) 2초 뒤 자동 제거
      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t.id !== id)
      }, 2000)
    },
    clear() {
      this.toasts = []
    }
  }


})
