import { defineStore } from 'pinia'

export enum pageType {
  HOME = 'home',
  CATEGORY = 'category',
  MY = 'my',
  LIST = 'list',
}
export const usePageStore = defineStore('usePageStore', {
  state: () => ({
    currentPage: pageType.HOME,
    isPageOpen: true,
  }),

  getters: {
    getCurrentPage: state => {
      return state.currentPage
    },
    getIsPageOpen: state => {
      return state.isPageOpen
    }
  },

  actions: {
    setCurrentPage(page:pageType)  {
      if (this.currentPage === page && this.isPageOpen) {
        this.setTogglePage(false)
      } else {
        this.currentPage = page
        this.setTogglePage(true)
      }
    },

    setTogglePage(isShow: boolean)  {
      this.isPageOpen = isShow
    }
  }

})
