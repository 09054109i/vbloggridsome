import util from './src/utils/util'
import store from './src/store/'

export default function (Vue, options, context) {
    context.appOptions.store = store

  
  
    Vue.prototype.$markdown = function (value) {
      return mavonEditor.markdownIt.render(value)
    }
  
    Vue.prototype.$reload = function (context) {
        let NewPage = '/empty'
        context.$router.push(NewPage)
        context.$nextTick(() => (context.$router.go(-1)))
    }
  
    Vue.prototype.$setTitle = function (title) {
        if (title) {
            document.title = store.state.configuration.htmlTitle + " - " + title
        } else {
            document.title = store.state.configuration.htmlTitle
        }
    }
    Vue.prototype.$share = function (message) {
        if (!message) {
            message = window.location
        } else {
            let arr = (window.location + "").split("#")
            message = arr[0] + "#" + message
        }
        if (util.copy(message)) {
            Vue.prototype.$confirm('链接已复制,去分享给好友吧!!', '分享', {
                showCancelButton: false,
                showClose: false,
                type: 'success'
            })
        } else {
            Vue.prototype.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
                showCancelButton: false,
                showClose: false,
                type: 'warning'
            })
        }
    }
  
    Vue.prototype.$mobileShare = function (message) {
        if (!message) {
            message = window.location
        } else {
            let arr = (window.location + "").split("#")
            message = arr[0] + "#" + message
        }
        if (util.copy(message)) {
            Vue.prototype.$dialog.alert({
                title: '分享',
                message: '链接已复制,去分享给好友吧!!'
            })
        } else {
            Vue.prototype.$dialog.alert({
                title: '分享',
                message: '链接复制失败,可能因为浏览器不兼容'
            })
        }
    }
  
  
  
    Vue.prototype.$util = util
  
    Vue.config.productionTip = false
}
  