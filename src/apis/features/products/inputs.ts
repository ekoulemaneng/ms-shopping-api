export const addProduct = {
    body: {
        name: {
            type: 'string',
            presence: true
        },
        description: {
            type: 'string'
        },
        category: {
            type: 'string',
            presence: true,
            format: {
                pattern: '^[a-f\\d]{24}$',
                flags: 'g'
            }
        },
        brand: {
            type: 'string',
            presence: true,
            format: {
                pattern: '^[a-f\\d]{24}$',
                flags: 'g'
            }
        },
        quantity: {
            type: 'integer',
            presence: true,
            numericality: {
                greaterThanOrEqualTo: 0
            }
        },
        price: {
            type: 'number',
            presence: true,
            numericality: {
                greaterThanOrEqualTo: 0
            }
        }
    }
}