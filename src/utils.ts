import { join } from "path";
import { exec } from "child_process";
import { readdir } from "fs";

export async function getFolderSize(target: string): Promise<number> {
  return new Promise((resolve, reject) => {
    if (process.platform === "win32") {
      exec(
        `"${join(__dirname, "bin", "du.exe")}" -nobanner -accepteula -q -c .`,
        { cwd: target },
        (err, stdout) => {
          if (err) reject(err);
          const stats = stdout.split("\n")[1].split(",");
          resolve(+stats.slice(-2)[0]);
        }
      );
    } else if (process.platform === "darwin") {
      exec(`du -sk .`, { cwd: target }, (err, stdout) => {
        if (err) reject(err);
        const match = /^(\d+)/.exec(stdout);
        const bytes = Number(match[1]) * 1024;
        resolve(bytes);
      });
    } else {
      exec(`du -sb .`, { cwd: target }, (err, stdout) => {
        if (err) reject(err);
        const match = /^(\d+)/.exec(stdout);
        const bytes = Number(match[1]);
        resolve(bytes);
      });
    }
  });
}

export async function getSubItemCount(path: string): Promise<number> {
  return new Promise((resolve, reject) => {
    readdir(path, (err, files) => {
      if (err) reject(err);
      else resolve(files.length);
    });
  });
}

export function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function bytesToSize(bytes: number) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Bytes";
  var i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}

export function timeConversion(duration: number) {
  const portions: string[] = [];
  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(duration / msInHour);
  if (hours > 0) {
    portions.push(hours + "h");
    duration = duration - hours * msInHour;
  }
  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(duration / msInMinute);
  if (minutes > 0) {
    portions.push(minutes + "m");
    duration = duration - minutes * msInMinute;
  }
  const seconds = Math.trunc(duration / 1000);
  if (seconds > 0) {
    portions.push(seconds + "s");
  }
  return portions.join(" ");
}

export async function parseArgs() {
  
}