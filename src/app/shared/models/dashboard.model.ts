import { StorageNode } from "./node.model";

export interface DashboardResponse {

    totalDevices: number;

    totalStorage: number;

    availableStorage: number;

    nodes: StorageNode[];

}