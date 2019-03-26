const safeRegex = require('safe-regex');

const options = {
    keys: ['where'],
}

const traverse = (key, val, func, parentObj) => {
    if (Array.isArray(val)) {
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
    const keyRegex = new RegExp(options.keys.join('|'), 'i');
    traverseObject(selector, (key, val, parentObj) => {
        if (key) {
            const match = keyRegex.exec(key);
            if (match) throw new Error(`${match[0]} operator not allowed`)
        }
        if (
            (/like|regex/i.test(key) || (val instanceof RegExp))
            && !safeRegex(val)
        ) throw new Error('unsafe regex');
    });
    return selector;
}

const setOptions = (requiredOptions) => {
    Object.assign(options, requiredOptions);
}

module.exports = {
    sanitizeMongoQuery,
    setOptions
}
