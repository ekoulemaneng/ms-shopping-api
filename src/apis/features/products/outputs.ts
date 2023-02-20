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
                pattern: /^[a-f\d]{24}$/,
                flags: 'g'
            }
        },
        brand: {
            type: 'string',
            presence: true,
            format: {
                pattern: /^[a-f\d]{24}$/,
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

export const getProducts = {
    query: {
        name: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        brand: {
            type: 'string',
            format: {
                pattern: /^[a-f\d]{24}$/,
                flags: 'g'
            }
        },
        category:  {
            type: 'string',
            format: {
                pattern: /^[a-f\d]{24}$/,
                flags: 'g'
            }
        }, 
        min_quantity: {
            type: 'integer',
            numericality: {
                greaterThanOrEqualTo: 0
            }
        }, 
        max_quantity: {
            type: 'integer',
            numericality: {
                greaterThanOrEqualTo: 0
            }
        }, 
        min_price: {
            type: 'number',
            numericality: {
                greaterThanOrEqualTo: 0
            }
        }, 
        max_price: {
            type: 'number',
            numericality: {
                greaterThanOrEqualTo: 0
            }
        }, 
        min_date: {
            type: 'string',
            format: {
                pattern: /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\dZ$/,
                flags: 'g',
                message: 'must be formatted like \'yyyy-mm-ddThh:mm:ssZ\''
            }
        }, 
        max_date: {
            type: 'string',
            format: {
                pattern: /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\dZ$/,
                flags: 'g',
                message: 'must be formatted like \'yyyy-mm-ddThh:mm:ssZ\''
            }
        }
    }
}

export const getProduct = {
    params: {
        id: {
            type: 'string',
            presence: true,
            format: {
                pattern: /^[a-f\d]{24}$/,
                flags: 'g'
            }
        }
    }
}

export const updateProduct = {
    params: {
        id: {
            type: 'string',
            presence: true,
            format: {
                pattern: /^[a-f\d]{24}$/,
                flags: 'g'
            }
        }
    },
    body: {
        name: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        category: {
            type: 'string',
            format: {
                pattern: /^[a-f\d]{24}$/,
                flags: 'g'
            }
        },
        brand: {
            type: 'string',
            format: {
                pattern: /^[a-f\d]{24}$/,
                flags: 'g'
            }
        },
        quantity: {
            type: 'integer',
            numericality: {
                greaterThanOrEqualTo: 0
            }
        },
        price: {
            type: 'number',
            numericality: {
                greaterThanOrEqualTo: 0
            }
        }
    }
}

export const deleteProduct = {
    params: {
        id: {
            type: 'string',
            presence: true,
            format: {
                pattern: /^[a-f\d]{24}$/,
                flags: 'g'
            }
        }
    }
}