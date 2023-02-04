const { getDatabase } = require('./mongo');
const collectionName = 'ads';
const { objectID } = require('mongodb');



async function insertAd(ad) {
    const database = await getDatabase();
    const { insertedId } = await database.collection(collectionName).insertOne(ad);
    return insertedId;
}

async function getAds() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function deleteAd(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteone({
        _id: new objectID(id)
    });
}
async function updateAd(id, ad) {
    const database = await getDatabase();
    delete ad._id;
    await database.collection(collectionName).update(
        { _id: new objectID(id), },
        {
            $set: {
                ...ad,
            },
        },
    );
}

module.exports = {
    insertAd,
    getAds,
    deleteAd,
    updateAd
};