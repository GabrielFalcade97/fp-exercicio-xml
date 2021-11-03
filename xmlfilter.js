const R = require('ramda');

const contentOfTag = R.curry(
    (xmlNode, tagName) => xmlNode.getElementsByTagName(tagName)[0].textContent
);//Função curried

const contentOfSource = contentOfTag(R.__, 'source');//Função curried
const contentOfAdded = contentOfTag(R.__, 'added');//Função curried
const contentOfUpdated = contentOfTag(R.__, 'lastupdated');//Função curried
const contentOfID = contentOfTag(R.__, 'id');//Função curried
const getGitHubProject = xmlNode => contentOfSource(xmlNode).replace('https://github.com/', '');//Função com side-effects

const getNameAndDates = xmlNode => getGitHubProject(xmlNode) + ' - ' + contentOfAdded(xmlNode) + ' - ' + contentOfUpdated(xmlNode);

const elementsToArray = nodes => {//Função com side-effects
    const arr = [];
    for (let i = 0; i < nodes.length; i++)
        arr.push(nodes[i]);//Função com side-effects
    return arr;
};

const isValid = R.curry(//Função curried
    (app, addedAfterYear, updatedAfterYear) => {
        if (!contentOfSource(app).includes('github.com'))
            return false;

        const addedDate = new Date(contentOfAdded(app));
        if (addedDate.getFullYear() < addedAfterYear)
            return false;

        const lastUpdatedDate = new Date(contentOfUpdated(app));
        if (lastUpdatedDate.getFullYear() < updatedAfterYear)
            return false;

        return true;
    }
);

module.exports = {
    isValid,
    elementsToArray,
    getGitHubProject,
    contentOfSource,
    contentOfID,
    getNameAndDates
};