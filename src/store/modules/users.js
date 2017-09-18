import { i18n } from '../../app'
import * as _ from 'lodash'
import utils from '../../utils'

import UsersApi from '../../api/users'

const state = {
  userDetails: null,
  userMissions: null
}

const getters = {
  userDetails() {
    return state.userDetails
  },
  userMissions() {
    return state.userMissions
  }
}

const actions = {
  clearUserDetails({ commit }) {
    commit({
      type: 'clearUserDetails'
    })
  },
  getUserDetails({ commit, dispatch }, payload) {
    dispatch('startWorking', i18n.t('store.getUserDetails'))

    return UsersApi.getUserDetails(payload)
      .then(function (response) {
        if (response.status !== 200) {
          console.error(response)
          throw "Retrieving user details failed"
        }

        if (_.isEmpty(response.data)) {
          console.error(response)
          throw "Received empty response"
        }

        if (_.isNil(response.data.user) || !_.isObject(response.data.user)) {
          console.error(response)
          throw "Received invalid user"
        }

        commit({
          type: 'setUserDetails',
          userDetails: response.data.user
        })

        dispatch('stopWorking', i18n.t('store.getUserDetails'))
      }).catch((error) => {
        dispatch('stopWorking', i18n.t('store.getUserDetails'))

        if (error.response) {
          console.error('getUserDetails', error.response)
          dispatch('showAlert', {
            showAlert: true,
            alertVariant: 'danger',
            alertMessage: `<i class="fa fa-bolt" aria-hidden="true"></i> ${i18n.t('store.getUserDetails.error')} - ${error.response.data.message}`
          })
        } else if (error.request) {
          console.error('getUserDetails', error.request)
          dispatch('showAlert', {
            showAlert: true,
            alertVariant: 'danger',
            alertMessage: `<i class="fa fa-bolt" aria-hidden="true"></i> ${i18n.t('store.getUserDetails.error')} - ${i18n.t('failed.request')}`
          })
        } else {
          console.error('getUserDetails', error.message)
          dispatch('showAlert', {
            showAlert: true,
            alertVariant: 'danger',
            alertMessage: `<i class="fa fa-bolt" aria-hidden="true"></i> ${i18n.t('store.getUserDetails.error')} - ${i18n.t('failed.something')}`
          })
        }
      })
  },
  getUserMissions({ commit, dispatch }, payload) {
    dispatch('startWorking', i18n.t('store.getUserMissions'))

    return UsersApi.getUserMissions(payload)
      .then(function (response) {
        if (response.status !== 200) {
          console.error(response)
          throw "Retrieving user missions failed"
        }

        if (_.isEmpty(response.data)) {
          console.error(response)
          throw "Received empty response"
        }

        if (_.isNil(response.data.missions) || !_.isArray(response.data.missions)) {
          console.error(response)
          throw "Received invalid user missions"
        }

        commit({
          type: 'setUserMissions',
          userMissions: response.data.missions
        })

        dispatch('stopWorking', i18n.t('store.getUserMissions'))
      }).catch((error) => {
        dispatch('stopWorking', i18n.t('store.getUserMissions'))

        if (error.response) {
          console.error('getUserMissions', error.response)
          dispatch('showAlert', {
            showAlert: true,
            alertVariant: 'danger',
            alertMessage: `<i class="fa fa-bolt" aria-hidden="true"></i> ${i18n.t('store.getUserMissions.error')} - ${error.response.data.message}`
          })
        } else if (error.request) {
          console.error('getUserMissions', error.request)
          dispatch('showAlert', {
            showAlert: true,
            alertVariant: 'danger',
            alertMessage: `<i class="fa fa-bolt" aria-hidden="true"></i> ${i18n.t('store.getUserMissions.error')} - ${i18n.t('failed.request')}`
          })
        } else {
          console.error('getUserMissions', error.message)
          dispatch('showAlert', {
            showAlert: true,
            alertVariant: 'danger',
            alertMessage: `<i class="fa fa-bolt" aria-hidden="true"></i> ${i18n.t('store.getUserMissions.error')} - ${i18n.t('failed.something')}`
          })
        }
      })
  }
}

const mutations = {
  clearUserDetails(state) {
    state.userDetails = null
    state.userMissions = null
  },
  setUserDetails(state, payload) {
    state.userDetails = payload.userDetails
    state.userMissions = payload.userDetails.missions

    utils.setTitle(`${i18n.t('user')} ${state.userDetails.nickname}`)
  },
  setUserMissions(state, payload) {
    state.userMissions = payload.userMissions
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
