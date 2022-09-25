import { MusicControllerHandler } from "../../main/handler/MusicControllerHandler";

async function main(): Promise<void> {
    const handler = new MusicControllerHandler();
  
    // try {
    //   handler.createMusic(5, "Apple", "05:00");
    //   console.log("createMusic Function Passed");
    // } catch (error: any) {
    //   console.log("createMusic Function Error: "+ error.message);
    // }  
  
    // try {
    //   handler.updateMusic(3, 2, "Love Bug", "04:22");
    //   console.log("updateMusic Function Passed");
    // } catch (error: any) {
    //   console.log("updateMusic Function Error: "+ error.message);
    // }  
  
    // try {
    //   handler.deleteMusic(6);
    //   console.log("deleteMusic Function Passed");
    // } catch (error: any) {
    //   console.log("deleteMusic Function Error: "+ error.message);
    // }  
  
  }
  
  export default main();