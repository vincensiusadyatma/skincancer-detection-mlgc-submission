const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, result, suggestion) {
    const db = new Firestore();
    
    // Dapatkan koleksi "predictions" dan dokumen berdasarkan id
    const predictCollection = db.collection('predictions');
    
    // Struktur data yang akan disimpan di Firestore
    const data = {
        id: id,
        result: result,
        suggestion: suggestion,
        createdAt: new Date().toISOString() // Menambahkan timestamp saat data disimpan
    };
    
    // Simpan data ke Firestore
    await predictCollection.doc(id).set(data);
    console.log('Data berhasil disimpan di Firestore');
}

module.exports = storeData;
