
const onChangeFile = async (mediainfo,filename) => {
  const res = await fetch("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
  const file = await res.blob();
  
  if (file) {   

    const getSize = () => file.size
    const readChunk = (chunkSize, offset) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target.error) {
            reject(event.target.error)
          }
          resolve(new Uint8Array(event.target.result))
        }
        reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
      })
    console.log(readChunk());
    mediainfo
      .analyzeData(getSize, readChunk)
      .then((result) => {
        alert(result);
        console.log(result);
        console.log(JSON.stringify({ "filename": "bigbunny_345678", "metadata": result }));
        navigator.sendBeacon("https://ybtb9i7rg8.execute-api.eu-north-1.amazonaws.com/prod/storemetadata", JSON.stringify({ "filename": "jungle_45688", "metadata": result }));
      })
      .catch((error) => {
        console.log(`An error occured:\n${error.stack}`)
      })
  }
}

const getSignedUrl = (filename) =>{
  //Call the AWS API passing file name to get the signed url for the cloudfront and s3
  console.log(filename);
 const signedUrl= "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
 const signedCloudFrontUrl="http://dash.edgesuite.net/envivio/EnvivioDash3/manifest.mpd"

}

MediaInfo(
  {
    format: 'text',
    locateFile: (path, prefix) => prefix + path, // Make sure WASM file is loaded from CDN location
  },
  (mediainfo) => {
    document.getElementById("mediabutton1").addEventListener('click', () => onChangeFile(mediainfo,"filename"))
  }
)