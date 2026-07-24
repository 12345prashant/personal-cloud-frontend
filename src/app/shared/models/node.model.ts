export interface StorageNode {

    nodeId: string;

    nodeName: string;

    status: string;

    totalSpace: number;

    usedSpace: number;

    freeSpace: number;

    ipAddress: string;

    port: number;

    lastHeartbeat: string;

}