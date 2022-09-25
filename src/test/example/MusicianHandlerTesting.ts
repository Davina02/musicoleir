import { MusicianControllerHandler } from "../../main/handler/MusicianControllerHandler";

async function main(): Promise<void> {
    const handler = new MusicianControllerHandler();
  
    // try {
    //   handler.createMusician("David");
    //   console.log("createMusician Function Passed");
    // } catch (error: any) {
    //   console.log("createMusician Function Error: "+ error.message);
    // }  
  
    // try {
    //   handler.updateMusician(6, "David");
    //   console.log("updateMusician Function Passed");
    // } catch (error: any) {
    //   console.log("updateMusician Function Error: "+ error.message);
    // }  
  
    // try {
    //   handler.deleteMusician(7);
    //   console.log("deleteMusician Function Passed");
    // } catch (error: any) {
    //   console.log("deleteMusician Function Error: "+ error.message);
    // }  
  
  }
  
  export default main();