import { UserControllerHandler } from "../../main/handler/UserControllerHandler";

async function main(): Promise<void> {
  const handler = new UserControllerHandler();

  // try {
  //   handler.createBOUser("Kamu", "kamu", "kkaa");
  //   console.log("createBOUser Function Passed");
  // } catch (error: any) {
  //   console.log("createBOUser Function Error: "+ error.message);
  // }  

//   try {
//     handler.updateBOUser(1, "Huaa");
//     console.log("updateBOUser Function Passed");
//   } catch (error: any) {
//     console.log("updateBOUser Function Error: "+ error.message);
//   }  

//   try {
//     handler.deleteBOUser(3);
//     console.log("deleteBOUser Function Passed");
//   } catch (error: any) {
//     console.log("deleteBOUser Function Error: "+ error.message);
//   }  

}

export default main();