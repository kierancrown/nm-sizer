import {
  bytesToSize,
  getFolderSize,
  getSubItemCount,
  numberWithCommas,
} from "./utils";
import { promises as fs } from "fs";
import { homedir } from "os";
import { join } from "path";

let directories = {};
let totalBytes = 0;
let totalModules = 0;

async function buildDirectoryMap(path = "./") {
  try {
    const entries = await fs.readdir(path, { withFileTypes: true });
    const folders = entries.filter((folder) => folder.isDirectory());
    for (const folder of folders) {
      const joinedPath = join(path, folder.name);
      if (folder.name === "node_modules") {
        const bytes = await getFolderSize(joinedPath);
        totalBytes += bytes;
        const moduleCount = await getSubItemCount(joinedPath);
        totalModules += moduleCount;
        directories[joinedPath] = {
          size: bytes,
          moduleCount,
        };
        process.stdout.write(
          `${joinedPath}: ${bytesToSize(bytes)}\r\nFound ${
            Object.keys(directories).length
          } "node_modules" directories. Total Size: ${bytesToSize(
            totalBytes
          )} Total Modules: ${numberWithCommas(totalModules)}\r`
        );
      }
      await buildDirectoryMap(joinedPath);
    }
  } catch (error) {}
}

(async () => {
  const start = new Date().getTime();
  await buildDirectoryMap(join(homedir()));
  console.log(`Found ${Object.keys(directories).length} directories`);
  const elapsed = new Date().getTime() - start;
  console.log(`This took ${elapsed}ms`);
})();
