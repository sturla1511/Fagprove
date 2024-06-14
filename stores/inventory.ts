import { defineStore } from "pinia";

interface State {
    Assets: Array<Asset>;
    Employees: Array<Employee>;
}

interface Asset {
    id: string;
    name: string;
    serialNumber: string;
    type: string;
    employee: string;
}
interface Employee {
    id: string;
    name: string;
    assets: Array<string>;
}

// chatGpt generated mock data
const mockAssets: Array<Asset> = [
    { id: "1", name: "Dell Laptop", serialNumber: "DL12345", type: "PC", employee: "1" },
    { id: "2", name: "iPhone 12", serialNumber: "IP12001", type: "Mobile", employee: "1" },
    { id: "3", name: "Logitech Mouse", serialNumber: "LM34567", type: "Mouse", employee: "1" },
    { id: "4", name: "Sony Headset", serialNumber: "SH56789", type: "Headset", employee: "1" },

    { id: "5", name: "MacBook Pro", serialNumber: "MBP67890", type: "Mac", employee: "2" },
    { id: "6", name: "Samsung Galaxy S21", serialNumber: "SGS21002", type: "Mobile", employee: "2" },
    { id: "7", name: "Mechanical Keyboard", serialNumber: "MK90876", type: "Keyboard", employee: "2" },

    { id: "8", name: "HP Laptop", serialNumber: "HP34567", type: "PC", employee: "3" },
    { id: "9", name: "Google Pixel 5", serialNumber: "GP56789", type: "Mobile", employee: "3" },
    { id: "10", name: "Wireless Mouse", serialNumber: "WM12345", type: "Mouse", employee: "3" },

    { id: "11", name: "Lenovo ThinkPad", serialNumber: "LT89012", type: "PC", employee: "4" },
    { id: "12", name: "iPhone 11", serialNumber: "IP11003", type: "Mobile", employee: "4" },
    { id: "13", name: "Razer Headset", serialNumber: "RH89012", type: "Headset", employee: "4" },

    { id: "14", name: "Microsoft Surface", serialNumber: "MS23456", type: "PC", employee: "5" },
    { id: "15", name: "Samsung Galaxy Note 20", serialNumber: "SGN20004", type: "Mobile", employee: "5" },
    { id: "16", name: "Bluetooth Keyboard", serialNumber: "BK67890", type: "Keyboard", employee: "5" },
    { id: "17", name: "Gaming Mouse", serialNumber: "GM34567", type: "Mouse", employee: "5" },
];

// chatGpt generated mock data
const mockEmployees: Array<Employee> = [
    { id: "1", name: "Alice", assets: ["1", "2", "3", "4"] },
    { id: "2", name: "Bob", assets: ["5", "6", "7"] },
    { id: "3", name: "Charlie", assets: ["8", "9", "10"] },
    { id: "4", name: "David", assets: ["11", "12", "13"] },
    { id: "5", name: "Eve", assets: ["14", "15", "16", "17"] },
];

export const useInventoryStore = defineStore("Inventory", {
    state: (): State => ({ Assets: mockAssets, Employees: mockEmployees }),
    actions: {
        async getAssets(): Promise<Array<Asset>> {
            return this.Assets;
            /*try {
                const { data } = await useFetch(`/api/asset`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json",},
                });
                this.Assets = data.value
                return this.Assets;
            } catch (error) {
                console.error("Failed to fetch assets:", error);
                throw error;
            }*/
        },
        async getAsset(id: string): Promise<Asset> {
            /*if (this?.Assets?.length === 0) {
                await getEmployees():
            }*/
            const index = this.Assets.findIndex((asset: Asset) => asset.id === id);
            if (index !== -1) {
                return this.Assets[index];
            } 
            /*else {
                try {
                    const { data } = await useFetch(
                        `/api/assets/${id}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        },
                    );
                    return data?.value;
                } catch (error) {
                    throw error;
                }
            }*/
        },
        async updateAssets(asset: Asset) {
            const index = this.Assets.findIndex((a: Asset) => a.id === asset.id);
            if (index !== -1) {
                this.Assets[index] = asset
            }
            /*try {
                const result = await useFetch(
                    `/api/assets/${asset.id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(asset),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
                if (result?.status?.value === "error") {
                    return result;
                }
                return result?.data?.value;
            } catch (error) {
                console.error("Failed to update asset:", error);
                throw error;
            }*/
        },
        async getEmployees(): Promise<Array<Employee>> {
            return this.Employees;
            /*try {
                const { data } = await useFetch(`/api/employees`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                this.Employees = data.value
                return this.Employees;
            } catch (error) {
                console.error("Failed to fetch employees:", error);
                throw error;
            }*/
        },
        async getEmployeeByName(name: string): Promise<Employee> {
            /*if (this?.Employees?.length === 0) {
                await getEmployees()
            }*/
            const index = this.Employees.findIndex((e: Employee) => e.name === name);
            return this.Employees[index];
        },
        async getEmployeesNames(): Promise<Array<Employee>> {
            /*if (this?.Employees?.length === 0) {
                await getEmployees()
            }*/
            return this.Employees?.map((employee: Employee) => employee.name);
        },
        async getEmployeeName(id: string): string {
            /*if (this?.Employees?.length === 0) {
                await getEmployees()
            }*/
            const index = this.Employees.findIndex((e: Employee) => e.id === id);
            return this.Employees[index]?.name;
        },
        async updateEmployees(employee: Employee) {
            const index = this.Employees.findIndex((e: Employee) => e.id === employee.id);
            if (index !== -1) {
                this.Employees[index] = employee
            }
            /*try {
                const result = await useFetch(
                    `/api/assets/${employee.id}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(employee),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
                if (result?.status?.value === "error") {
                    return result;
                }
                return result?.data?.value;
            } catch (error) {
                console.error("Failed to update employee:", error);
                throw error;
            }*/
        },
    },
});
