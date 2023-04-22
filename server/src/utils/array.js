const extractUniqueObjects = (array, items, attributeNames) => {
    return items.reduce((uniqueArray, item) => {
        const isDuplicate = uniqueArray.some((existingItem) =>
            compareObjectsByAttributes(existingItem, item, attributeNames)
        );

        if (!isDuplicate) {
            const newItem = attributeNames.reduce((acc, attributeName) => {
                acc[attributeName] = item[attributeName];
                return acc;
            }, {});
            uniqueArray.push(newItem);
        }

        return uniqueArray;
    }, array);
}

const extractUniqueValuesByObjects = (array, attributeName) => {
    return array.reduce((acc, current) => {
        const searchResult = acc.find(item => item === current[attributeName]);
        if (!searchResult) {
            return acc.concat([current[attributeName]]);
        } else {
            return acc;
        }
    }, []);
}

const objectToArray = (obj, attributeName) => {
    return obj.map((item) => {
        return item[attributeName];
    });
}

const compareObjectsByAttributes = (obj1, obj2, attributeNames) => {
    return attributeNames.every((attributeName) => obj1[attributeName] === obj2[attributeName]);
}

module.exports = {
    extractUniqueObjects,
    extractUniqueValuesByObjects,
    objectToArray
}
