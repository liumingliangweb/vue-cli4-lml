import { Loading } from 'element-ui'

let loadingCount = 0
let loading

const startLoading = () => {
  loading = Loading.service({
    lock: false,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

const endLoading = () => {
  const timeout = setTimeout(function() {
    loading.close()
    clearTimeout(timeout)
  }, 500)
}

export const showLoading = () => {
  if (loadingCount === 0) {
    startLoading()
  }
  loadingCount += 1
}

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  if (loadingCount === 0) {
    endLoading()
  }
}
