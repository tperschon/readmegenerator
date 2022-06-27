function raiseSubQuestions(objArr) {
    objArr.forEach((obj, i) => {
        if (obj.sub && Array.isArray(obj.sub)) {
            objArr.splice(i + 1, 0, ...obj.sub);
            delete obj.sub;
        };
    });
};

module.exports = raiseSubQuestions;