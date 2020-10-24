<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tag border-1px">
      <div class="tag-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tag-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tag-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { urlParse } from '@/common/js/util'
import header from '@/components/header/header'
import { getSeller } from 'api'

export default {
  name: 'App',
  components: {
    'v-header': header
  },
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      getSeller().then(data => {
        // this.seller = {...this.seller, ...data}
        this.seller = Object.assign({}, this.seller, data)
      })
    }
  }
}
</script>

<style lang="stylus">
@import "~@/common/stylus/mixin.styl"
#app
  .tag
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7,17,27,.1))
    .tag-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77,85,93)
        &.active
          color: rgb(240,20,20)
</style>
