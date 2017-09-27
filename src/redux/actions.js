export const SAVE_VIDEO= 'SAVE_VIDEO'

export function saveVideo(collection,videoId){
    console.log('saveVideo action creator recieved' ,collection, videoId)
    return{
        type: SAVE_VIDEO,
        payload:{
                collection: collection,
                videoId: videoId
              }
    }
}