const https = require('https');
const { ocrSpace } = require('ocr-space-api-wrapper');

exports.uploadaadhar = async(req, res) => {

    try {
        // Using the OCR.space default free API key (max 10reqs in 10mins) + remote file
        // const res1 = await ocrSpace('http://dl.a9t9.com/ocrbenchmark/eng.png');
    
        // Using your personal API key + local file
        const res2 = await ocrSpace(req.body.url, { apiKey: 'K86517715388957', 'isOverlayRequired': true, 'iscreatessearchablepdf': true, 'language': 'eng', 'SearchablePDFURL': true });
        console.log(res2)
        return res.status(200).send(res2)
        // Using your personal API key + base64 image + custom language
        // const res3 = await ocrSpace('data:image/png;base64...', { apiKey: 'K86517715388957', language: 'ita' });
      } catch (error) {
        console.error(error);
      }
    
    // try {
        
//         // if(!req.body.phone){
//         //     return res.status(400).send({ message: "please enter phone" });
//         // }
        

// var postData = JSON.stringify({
// 'language':'eng',
// 'isOverlayRequired':true,
// 'url':'https://haptikdev.s3.amazonaws.com/content/user/ac23568eb16b4babf88d178d553f1b4d076860b4cca241a94cac30446d36b743-sample.pdf',
// 'iscreatessearchablepdf':'true',
// 'issearchablepdfhidetextlayer':'false',
// 'filetype': 'application/pdf'
// });

// // function getContentLength(formData) {
// //     const formDataEntries = [...formData.entries()]
  
// //     const contentLength = formDataEntries.reduce((acc, [key, value]) => {
// //       if (typeof value === 'string') return acc + value.length
// //       if (typeof value === 'object') return acc + value.size
  
// //       return acc
// //     }, 0)
  
// //     return contentLength
// //   }

// // let postData = new FormData();
// // postData.set('language', 'eng');
// // postData.set('isOverlayRequired', 'true');
// // postData.set('url', 'https://haptikdev.s3.amazonaws.com/content/user/ac23568eb16b4babf88d178d553f1b4d076860b4cca241a94cac30446d36b743-sample.pdf');
// // postData.set('iscreatessearchablepdf', 'true');
// // postData.set('issearchablepdfhidetextlayer', 'false');

// // console.log(getContentLength(postData))

// var options = {
//   hostname: 'api.ocr.space',
//   path: '/parse/image',
//   method: 'POST',
//   headers: {
//        'apikey': 'K86517715388957',
//        'Content-Type': "application/pdf",
//        'Content-Length': postData.length,
//        'Accept': '*/*',
//        'filetype': 'application/pdf'
//      },
     
// };

// var requesttt = https.request(options, (responseeee) => {
//     responseeee.setEncoding('utf8');
//   console.log('statusCode:', responseeee.statusCode);
//   console.log('headers:', responseeee.headers);

//   responseeee.on('data', (d) => {
//     process.stdout.write(d);
//   });
// });

// requesttt.on('error', (e) => {
//   console.error(e);
// });

// requesttt.write(postData);
// requesttt.end();
//     }catch (error) {
//         return res.status(400).json({ message: error });
//     }
};