/**
 * Process watcher
 *  Make sure you don't fuck with `logging.ts`'s log file path.
 */
import "../main/config/Database";

/**
 * WRITING TEST
 *
 * You can specify every unit Tests in here.
 */

async function main() {
    await require("./example/Index");
    await require("./example/AuthHandlerTesting");
    await require("./example/UserHandlerTesting");
    await require("./example/MusicianHandlerTesting");
    await require("./example/AlbumHandlerTesting");
    await require("./example/MusicHandlerTesting");
}

main().then(() => { console.log("Testing Done. Use CTRL+C or COMMAND+C to close this test run.")});