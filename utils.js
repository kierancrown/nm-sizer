"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.timeConversion = exports.bytesToSize = exports.numberWithCommas = exports.getSubItemCount = exports.getFolderSize = void 0;
var path_1 = require("path");
var child_process_1 = require("child_process");
var fs_1 = require("fs");
function getFolderSize(target) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve, reject) {
                    if (process.platform === "win32") {
                        child_process_1.exec("\"" + path_1.join(__dirname, "bin", "du.exe") + "\" -nobanner -accepteula -q -c .", { cwd: target }, function (err, stdout) {
                            if (err)
                                reject(err);
                            var stats = stdout.split("\n")[1].split(",");
                            resolve(+stats.slice(-2)[0]);
                        });
                    }
                    else if (process.platform === "darwin") {
                        child_process_1.exec("du -sk .", { cwd: target }, function (err, stdout) {
                            if (err)
                                reject(err);
                            var match = /^(\d+)/.exec(stdout);
                            var bytes = Number(match[1]) * 1024;
                            resolve(bytes);
                        });
                    }
                    else {
                        child_process_1.exec("du -sb .", { cwd: target }, function (err, stdout) {
                            if (err)
                                reject(err);
                            var match = /^(\d+)/.exec(stdout);
                            var bytes = Number(match[1]);
                            resolve(bytes);
                        });
                    }
                })];
        });
    });
}
exports.getFolderSize = getFolderSize;
function getSubItemCount(path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve, reject) {
                    fs_1.readdir(path, function (err, files) {
                        if (err)
                            reject(err);
                        else
                            resolve(files.length);
                    });
                })];
        });
    });
}
exports.getSubItemCount = getSubItemCount;
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
exports.numberWithCommas = numberWithCommas;
function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0)
        return "0 Bytes";
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}
exports.bytesToSize = bytesToSize;
function timeConversion(duration) {
    var portions = [];
    var msInHour = 1000 * 60 * 60;
    var hours = Math.trunc(duration / msInHour);
    if (hours > 0) {
        portions.push(hours + "h");
        duration = duration - hours * msInHour;
    }
    var msInMinute = 1000 * 60;
    var minutes = Math.trunc(duration / msInMinute);
    if (minutes > 0) {
        portions.push(minutes + "m");
        duration = duration - minutes * msInMinute;
    }
    var seconds = Math.trunc(duration / 1000);
    if (seconds > 0) {
        portions.push(seconds + "s");
    }
    return portions.join(" ");
}
exports.timeConversion = timeConversion;
