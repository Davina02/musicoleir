import { AuthControllerHandler } from "../../main/handler/AuthControllerHandler";

async function main(): Promise<void> {
  const handler = new AuthControllerHandler();

  // try {
  //   handler.Login("Dav02", "ubah2kalidav02");
  //   console.log("Login Function Passed");
  // } catch (error: any) {
  //   console.log("Login Function Error: "+ error.message);
  // }  

  // try {
  //   handler.changePassword("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lX3ZpcnR1YWxfYXR0cmlidXRlcyI6Ikh1YWEgRGF2MDIiLCJpZCI6MSwiZnVsbF9uYW1lIjoiSHVhYSIsInVzZXJuYW1lIjoiRGF2MDIiLCJjcmVhdGVkQXQiOiIyMDIyLTA3LTE3VDA0OjAyOjM2LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA3LTE3VDA0OjIzOjIyLjAwMFoiLCJkZWxldGVkQXQiOm51bGwsImlhdCI6MTY1ODA1NDIyNCwiZXhwIjoxNjg5NTkwMjI0fQ.g9MZxd3i-jepH6pUAeSvDCIEP5m8mySHbdPEI17Unnw", "Dav02", "ubah2kalidav02");
  //   console.log("changePassword Function Passed");
  // } catch (error: any) {
  //   console.log("changePassword Function Error: "+ error.message);
  // }  

}

export default main();