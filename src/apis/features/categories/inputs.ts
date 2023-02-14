export const addCategory = {
    body: {
        name: {
            type: 'string',
            presence: true
        },
        description: {
            type: 'string'
        }
    }
}