// 定义修改的操作

import * as types from './mutation-types'

const matutaions = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default matutaions
