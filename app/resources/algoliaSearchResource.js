import algoliasearch from 'algoliasearch';

export function getAlgoliaResult(appId, publicKey, index, keyword) {
    const algoliaClient = algoliasearch(appId, publicKey);
    const algoliaIndex = algoliaClient.initIndex(index);
    const algoliaMaxHits = 7;

    return algoliaIndex.search(keyword, { hitsPerPage: algoliaMaxHits });
}
