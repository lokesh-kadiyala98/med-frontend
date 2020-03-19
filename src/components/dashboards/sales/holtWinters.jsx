import holtWinters from 'holtwinters'

const HoltWinters = (dataset, predictionLength) => {
    var getAugumentedDataset = holtWinters
    var result = getAugumentedDataset(dataset, predictionLength)
    
    return result
}
 
export default HoltWinters;
