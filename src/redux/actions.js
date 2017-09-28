export const SAVE_VIDEO= 'SAVE_VIDEO'

export function saveVideo(collection,videoId){
    return{
        type: SAVE_VIDEO,
        payload:{
                collection: collection,
                videoId: videoId
              }
    }
}