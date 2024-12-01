const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, result, suggestion) {
    const db = new Firestore();
    
    
    const predictCollection = db.collection('predictions');
    
    if (result == 'Non-cancer') {
        suggestion = "Anda sehat!"
    }
  
    const data = {
        id: id,
        result: result,
        suggestion: suggestion,
        createdAt: new Date().toISOString() 
    };
    
  
    await predictCollection.doc(id).set(data);
    console.log('Data berhasil disimpan di Firestore');
}

module.exports = storeData;
