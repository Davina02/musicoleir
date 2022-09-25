import { AlbumControllerHandler } from "../../main/handler/AlbumControllerHandler";


async function main(): Promise<void> {
  const handler = new AlbumControllerHandler();

    // try {
    //   handler.createAlbum(11, "Not Shy");
    //   console.log("createAlbum Function Passed");
    // } catch (error: any) {
    //   console.log("createAlbum Function Error: "+ error.message);
    // }  
  
    // try {
    //   handler.updateAlbum(1, "Snowflake");
    //   console.log("updateAlbum Function Passed");
    // } catch (error: any) {
    //   console.log("updateAlbum Function Error: "+ error.message);
    // }  
  
    // try {
    //   handler.deleteAlbum(11);
    //   console.log("deleteAlbum Function Passed");
    // } catch (error: any) {
    //   console.log("deleteAlbum Function Error: "+ error.message);
    // }  

}

export default main();