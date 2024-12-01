const tf = require('@tensorflow/tfjs-node'); 

async function predictClassification(model, imageBuffer) {
    try {
      
        const tensor = tf.node
            .decodeJpeg(imageBuffer) 
            .resizeBilinear([224, 224]) 
            .expandDims() 
            .toFloat() 
      

        const classes = ['Non-cancer', 'Cancer']; 

       
        const prediction = model.predict(tensor);
        
      
        const score = await prediction.data();
        const confidenceScore = score[0] * 100; 


        const label = confidenceScore > 50 ? 'Cancer' : 'Non-cancer'; 
        
        const suggestions = [
            'Penyakit kanker tidak terdeteksi.',
            'Segera periksa ke dokter!',
        ];

   
        const suggestion = suggestions[confidenceScore > 50 ? 1 : 0]; 

     
        return {
            label,
            suggestion,
        };
    } catch (error) {
        throw new Error('Error during prediction: ' + error.message);
    }
}

module.exports = predictClassification;
