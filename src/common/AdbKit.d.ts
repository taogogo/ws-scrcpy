import { EventEmitter } from 'events';
import { AdbKitLogcatReader } from './AdbKitLogcat';
import { Stream } from 'stream';
import { Socket } from 'net';

type Callback<T> = (err: Error | null, result?: T) => void;

interface PushTransfer extends EventEmitter {}

export interface AdbKitTracker extends EventEmitter {
    deviceList: AdbKitDevice[];
    deviceMap: Record<string, AdbKitDevice>;
}

export interface AdbKitDevice {
    id: string;
    type: string;
}

export interface AdbKitClient {
    listDevices(): Promise<AdbKitDevice[]>;
    trackDevices(): Promise<AdbKitTracker>;
    getProperties(serial: string): Promise<Record<string, string>>;
    openLogcat(serial: string, options?: {clear?: boolean}, callback?: Callback<AdbKitLogcatReader>): AdbKitLogcatReader;
    push(serial: string, contents: string | Stream, path: string, mode?: number, callback?: Callback<PushTransfer>): Promise<PushTransfer>;
    shell(serial: string, command: string, callback?: Callback<Socket>): Promise<Socket>;
    waitBootComplete(serial: string): Promise<string>;
}

export interface AdbKitChangesSet {
    added: AdbKitDevice[];
    removed: AdbKitDevice[];
    changed: AdbKitDevice[];
}
