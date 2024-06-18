import { defineStore } from "pinia";

interface State {
    Assets: Array<Asset>;
    Employees: Array<Employee>;
    listTypeTable: boolean
}

interface Asset {
    id: string;
    name: string;
    serialNumber: string;
    type: string;
    date: string;
    employee: string;
}
interface Employee {
    id: string;
    name: string;
    assets: Array<string>;
}

// chatGpt generated mock data
const mockAssets: Array<Asset> = [
    { id: "1", name: "Dell Laptop", serialNumber: "DL12345", type: "PC", date: "2021-12-22" , employee: "1" },
    { id: "2", name: "iPhone 12", serialNumber: "IP12001", type: "Mobile", date: "2022-01-15", employee: "1" },
    { id: "3", name: "Logitech Mouse", serialNumber: "LM34567", type: "Mouse", date: "2022-05-10", employee: "1" },
    { id: "4", name: "Sony Headset", serialNumber: "SH56789", type: "Headset", date: "2021-11-08", employee: "1" },
    
    { id: "5", name: "MacBook Pro", serialNumber: "MBP67890", type: "Mac", date: "2021-10-28", employee: "2" },
    { id: "6", name: "Samsung Galaxy S21", serialNumber: "SGS21002", type: "Mobile", date: "2021-09-30", employee: "2" },
    { id: "7", name: "Mechanical Keyboard", serialNumber: "MK90876", type: "Keyboard", date: "2022-07-19", employee: "2" },
    
    { id: "8", name: "HP Laptop", serialNumber: "HP34567", type: "PC", date: "2021-06-23", employee: "3" },
    { id: "9", name: "Google Pixel 5", serialNumber: "GP56789", type: "Mobile", date: "2021-04-15", employee: "3" },
    { id: "10", name: "Wireless Mouse", serialNumber: "WM12345", type: "Mouse", date: "2021-08-17", employee: "3" },
    
    { id: "11", name: "Lenovo ThinkPad", serialNumber: "LT89012", type: "PC", date: "2022-02-20", employee: "4" },
    { id: "12", name: "iPhone 11", serialNumber: "IP11003", type: "Mobile", date: "2021-05-18", employee: "4" },
    { id: "13", name: "Razer Headset", serialNumber: "RH89012", type: "Headset", date: "2022-03-14" , employee: "4" },
    
    { id: "14", name: "Microsoft Surface", serialNumber: "MS23456", type: "PC", date: "2022-04-04", employee: "5" },
    { id: "15", name: "Samsung Galaxy Note 20", serialNumber: "SGN20004", type: "Mobile", date: "2022-09-25", employee: "5" },
    { id: "16", name: "Bluetooth Keyboard", serialNumber: "BK67890", type: "Keyboard", date: "2021-03-12", employee: "5" },
    { id: "17", name: "Gaming Mouse", serialNumber: "GM34567", type: "Mouse", date:  "2022-08-05", employee: "5" },
];

// chatGpt generated mock data
const mockEmployees: Array<Employee> = [
    { id: "0", name: "Storage", assets: [] },
    { id: "1", name: "Alice", assets: ["1", "2", "3", "4"] },
    { id: "2", name: "Bob", assets: ["5", "6", "7"] },
    { id: "3", name: "Charlie", assets: ["8", "9", "10"] },
    { id: "4", name: "David", assets: ["11", "12", "13"] },
    { id: "5", name: "Eve", assets: ["14", "15", "16", "17"] },
];

// @ts-ignore
export const useInventoryStore = defineStore("Inventory", {
    state: (): State => { 
        return {
            Assets: mockAssets,
            Employees: mockEmployees,
            listTypeTable: true
        }
    },
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
                await getAssets():
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
        async deleteAsset(id: string) {
            /*if (this?.Assets?.length === 0) {
                await getAssets():
            }*/
            const index = this.Assets.findIndex((asset: Asset) => asset.id === id);
            if (index !== -1) {
                const employeeIndex = this.Employees.findIndex((employee: Employee) => employee.id === this.Assets[index].empolyee);
                if (employeeIndex !== -1) {
                    const employeeAssetIndex = this.Employees[employeeIndex].assets.findIndex((asset: string) => asset === id);
                    if (employeeAssetIndex !== -1) {
                        this.Employees[employeeIndex].assets.splice(employeeAssetIndex, 1)
                    }
                }
                this.Assets.splice(index, 1);
            }
            /*else {
                try {
                    const { data } = await useFetch(
                        `/api/assets/${id}`,
                        {
                            method: "DELETE",
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
        async updateAsset(asset: Asset) {
            const index = this.Assets.findIndex((a: Asset) => a.id === asset.id);
            if (index !== -1) {
                if (asset.employee !== this.Assets[index].employee) {
                    const oldEmployeeIndex = this.Employees.findIndex((employee: Employee) => employee.id === this.Assets[index]?.employee);
                    if (oldEmployeeIndex !== -1) {
                        const employeeAssetIndex = this.Employees[oldEmployeeIndex].assets.findIndex((assetId: string) => assetId === asset.id);
                        if (employeeAssetIndex !== -1) {
                            this.Employees[oldEmployeeIndex].assets.splice(employeeAssetIndex, 1)
                        }
                    }
                    const newEmployeeIndex = this.Employees.findIndex((employee: Employee) => employee.id === asset?.employee);
                    if (newEmployeeIndex !== -1) {
                        this.Employees[newEmployeeIndex]?.assets?.push(asset?.id)
                    }
                }
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
        async addAsset(asset: Asset) {
            const newId = (parseInt(this.Assets.sort((a: Asset, b: Asset) => parseInt(a.id) - parseInt(b.id))[this.Assets.length - 1]?.id || '0') + 1).toString();
            this.Assets.push({
                ...asset,
                id: newId,
                date: new Date().toISOString().split('T')[0],
            });
            /*try {
                const result = await useFetch(
                    `/api/assets`,
                    {
                        method: "POST",
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
                console.error("Failed to add asset:", error);
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
        async deleteEmployee(id: string) {
            /*if (this?.Employees?.length === 0) {
                await getEmployees():
            }*/
            const index = this.Employees.findIndex((employee: Employee) => employee.id === id);
            if (index !== -1) {
                for (let i = 0; i < this.Employees[index].assets; i++) {
                    let asset = await this.getAsset(this.Employees[index].assets[i])
                    await this.updateAsset({...asset, employee: "0"})
                }
                this.Employees.splice(index, 1);
            }
            /*else {
                try {
                    const { data } = await useFetch(
                        `/api/employee/${id}`,
                        {
                            method: "DELETE",
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
        async getEmployeeName(id: string): string {
            /*if (this?.Employees?.length === 0) {
                await getEmployees()
            }*/
            const index = this.Employees.findIndex((e: Employee) => e.id === id);
            return this.Employees[index]?.name;
        },
        async addEmployee(employee: Employee) {
            const newId = (parseInt(this.Employees.sort((a: Employee, b: Employee) => parseInt(a.id) - parseInt(b.id))[this.Employees.length - 1]?.id || '0') + 1).toString();
            this.Employees.push({
                ...employee,
                id: newId,
                assets: [],
            });
            /*try {
                const result = await useFetch(
                    `/api/employee`,
                    {
                        method: "POST",
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
                console.error("Failed to add employee:", error);
                throw error;
            }*/
        },
        async updateEmployeesName(employee: Employee) {
            const index = this.Employees.findIndex((e: Employee) => e.id === employee.id);
            if (index !== -1) {
                this.Employees[index] = {...this.Employees[index], name: employee.name}
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
    persist: {
        paths: ['Assets', 'Employees', 'listTypeTable'],
        storage: window.localStorage,
    },
});
