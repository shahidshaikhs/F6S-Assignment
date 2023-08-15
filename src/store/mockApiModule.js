import { currentUser, conversation } from '@/utils/mockapi.js';

const state = {
    currentUser: JSON.parse(currentUser),
    conversation: JSON.parse(conversation),
};

const actions = {
    fetchCurrentUser({ commit }) {
        setTimeout(() => {
            commit('setCurrentUser', JSON.parse(currentUser));
        }, 0);
    },

    fetchConversation({ commit }) {
        setTimeout(() => {
            commit('setConversation', JSON.parse(conversation));
        }, 0);
    },

    async simulateReply({ commit, state }, newMessage) {
        // 10% failure chance
        const fails = Math.random() < 0.1;
        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (fails) {
                        reject(new Error('Simulated failure'));
                    } else {
                        resolve();
                    }
                }, 500);
            });
            commit('addMessage', newMessage);
        } catch (error) {
            console.error('An error occurred:', error);

            // Revert to the previous state 
            // Remove the last added message from the conversation array
            const updatedConversation = state.mockApi.conversation.slice(0, -1);
            commit('updateConversation', updatedConversation);
        }
    },
};

const mutations = {
    setCurrentUser(state, user) {
        state.currentUser = user;
    },

    setConversation(state, conversation) {
        state.conversation = conversation;
    },

    addMessage(state, message) {
        state.conversation.push(message);
    },

    updateConversation(state, updatedConversation) {
        state.conversation = updatedConversation;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
