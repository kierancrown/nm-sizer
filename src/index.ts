import {
  bytesToSize,
  dateTimeString,
  getFolderSize,
  getSubItemCount,
  numberWithCommas,
  parseArgs,
} from "./utils";
import { promises as fs } from "fs";
import { homedir } from "os";
import { join } from "path";

// Arguments
let scanDir = homedir();

// Outputs
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

async function generateOutput(path: string) {
  const fileName = join(path, `output--${dateTimeString()}.json`);
  const output = JSON.stringify(
    {
      overview: {
        totalFolders: Object.keys(directories).length,
        totalModules: numberWithCommas(totalModules),
        totalFileSize: bytesToSize(totalBytes),
      },
      directories,
    },
    null,
    2
  );
  await fs.writeFile(fileName, output, "utf8");
  console.log(`File saved to ${fileName}`);
}

(async () => {
  const start = new Date().getTime();
  // Parse args
  const args = parseArgs(["--output", "--dir"]);
  if (args.hasOwnProperty("--dir")) scanDir = args["--dir"];
  await buildDirectoryMap(scanDir);
  console.log(`Found ${Object.keys(directories).length} directories`);
  const elapsed = new Date().getTime() - start;
  console.log(`Whew! That took ${elapsed}ms`);
  if (args.hasOwnProperty("--output")) {
    const outputPath = args["--output"];
    await generateOutput(
      typeof outputPath === "string" ? outputPath : join(homedir(), "Desktop")
    );
  }
})();
