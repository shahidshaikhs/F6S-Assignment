// store/index.js
import { createStore } from 'vuex';
import mockApiModule from './mockApiModule';

export default createStore({
  modules: {
    mockApi: mockApiModule,
  },
});