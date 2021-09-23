export const BC_PULL = 'BC_PULL'
export const BC_PUSH = 'BC_PUSH'
export const TEST_TYPE = 'TEST_TYPE'

export const testType = (groupId, apiKey) => ({ 
    type: TEST_TYPE,
    groupId: groupId,
    apiKey: apiKey
});
export const bcPull = (groupId, apiKey) => ({ 
    type: BC_PULL,
    groupId: groupId,
    apiKey: apiKey
});
export const bcPush = (groupId, apiKey) => ({ 
    type: BC_PUSH,
    payload: {
        groupId,
        apiKey
    }
});
