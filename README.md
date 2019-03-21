[![Build Status](https://travis-ci.com/MohammedEssehemy/mongo-query-sanitize.svg?branch=master)](https://travis-ci.com/MohammedEssehemy/mongo-query-sanitize)

# Mongo query sanitize

clear mongo query from malicious operators (where) and unsafe regex expressions.

# install

```
npm install mongo-query-sanitize
```

# usage 

```
const { sanitizeMongoQuery } = require('mongo-query-sanitize');

const maliciousQuery = {$where: "sleep(1000)"}; // or unsafe regex
sanitizeMongoQuery(maliciousQuery); // will throw error
```
