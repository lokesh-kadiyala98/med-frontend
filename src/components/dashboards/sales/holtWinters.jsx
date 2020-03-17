import holtWinters from 'holtwinters'

const HoltWinters = () => {
    var getAugumentedDataset = holtWinters
    var data = [1235, 752, 278, 365, 295, 485, 280, 220, 443, 408, 1310, 1250, 1378, 868, 311, 201, 315, 200, 350, 300, 510, 578, 1415, 1280, 1350, 865, 348, 220, 200, 285, 390, 320, 470, 510, 1470, 1300, 1490, 940, 360, 290, 315, 300, 370, 340, 570, 695, 1530, 1460]
    var predictionLength = 2
 
    var result = getAugumentedDataset(data, predictionLength)
    console.log(result)
}
 
export default HoltWinters;
