const predictClassification = require('../services/inference');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const firestoreData = require('../services/getDataFromFirestore');

const test = function (request, h) {
    const response = h.response({
        status: "success",
        message: "berhasil terkoneksi ke API",
    });
    response.code(200);
    return response;
};


async function postPredictHandler(request, h) {
    const { image } = request.payload;

    try {
        const { model } = request.server.app; 
        const { confidenceScore, label, suggestion } = await predictClassification(model, image); 

     
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

       
         await storeData(id, label, suggestion);

       
        const data = {
            id: id,
            result: label,
            suggestion: suggestion,
            confidenceScore: confidenceScore,
            createdAt: createdAt,
        };

      
        return h.response({
            status: 'success',
            message: 'Model is predicted successfully',
            data: data,
        }).code(201); 

    } catch (error) {
        console.error('Prediksi error:', error);
        
      
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi',
        }).code(400); 
    }
}


   



async function getHistoriesHandler(request, h) {
    try {
       
        const allData = await firestoreData();
        const histories = allData.docs.map(doc => {
            const data = doc.data();
            return {
                id: data.id,
                history: {
                    result: data.result,
                    createdAt: data.createdAt,
                    suggestion: data.suggestion,
                    id: data.id
                }
            };
        });

 
        return h.response({
            status: 'success',
            data: histories,
        }).code(200); 

    } catch (error) {
        console.error('Error fetching histories:', error);

        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam mengambil riwayat prediksi',
        }).code(500); 
    }
}

module.exports = { test, postPredictHandler, getHistoriesHandler };