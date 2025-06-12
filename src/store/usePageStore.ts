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
    isOpenSheetView: true,
  }),

  getters: {
    getCurrentPage: state => {
      return state.currentPage
    },
    getIsPageOpen: state => {
      return state.isOpenSheetView
    }
  },

  actions: {
    setCurrentPage(page:pageType)  {
      this.currentPage = page
      // if (page === pageType.HOME && this.isOpenSheetView) {
      //   this.toggleSheetView(false)
      // }
      // else if(page === pageType.HOME && !this.isOpenSheetView){
      //   this.toggleSheetView(true)
      // }
      // else if (page === pageType.MY){
      //   this.currentPage = page
      //   this.toggleSheetView(false)
      // }

      // if (this.currentPage === pageType.HOME) {
      //   this.toggleSheetView(false)
      // } else {
      //   this.currentPage = page
      //   this.toggleSheetView(true)
      // }
    },

    toggleSheetView(isShow: boolean)  {
      this.isOpenSheetView = isShow
    }
  }

})
