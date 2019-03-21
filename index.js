const safeRegex = require('safe-regex');

const options = {
    keys: ['where'],
}

const isArray = (o) => {
    return Object.prototype.toString.call(o) === '[object Array]'
}

const traverse = (key, val, func, parentObj) => {
    if (isArray(val)) {
        val.forEach((e, i) => traverse(i, e, func, val));
    } else if (val && (typeof val === 'object') && Object.keys(val).length) {
        Object.keys(val).forEach(k => traverse(k, val[k], func, val));
    } else {
        func(key, val, parentObj);
    }
}

const traverseObject = (obj, func) => {
    traverse(null, obj, func);
}


const sanitizeMongoQuery = (selector) => {
    traverseObject(selector, (key, val, parentObj) => {
        let keyRegex = new RegExp(options.keys.join('|'), 'i');
        if (key) {
            const match = key.match(keyRegex);
            if (match) throw new Error(`${match.join(',')} operator not allowed`)
        }
        if (
            (/like|regex/i.test(key) || (val instanceof RegExp))
            && !safeRegex(val)
        ) throw new Error('unsafe regex');
    });
}

const setOptions = (requiredOptions) => {
    Object.assign(options, requiredOptions);
}

module.exports = {
    sanitizeMongoQuery,
    setOptions
}
