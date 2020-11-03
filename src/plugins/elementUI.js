// 按需全局引入 element组件
import Vue from 'vue'
import { Button, Form, FormItem, Input, Table, TableColumn } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Table).use(TableColumn)
