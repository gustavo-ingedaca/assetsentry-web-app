import { 
  type User, 
  type InsertUser, 
  type Asset, 
  type InsertAsset,
  type MaintenanceTask,
  type InsertMaintenanceTask,
  type Alert,
  type InsertAlert,
  type PerformanceMetric,
  type InsertPerformanceMetric,
  AssetStatus,
  MaintenanceType,
  Priority,
  AlertLevel
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Assets
  getAssets(): Promise<Asset[]>;
  getAsset(id: string): Promise<Asset | undefined>;
  getAssetByAssetId(assetId: string): Promise<Asset | undefined>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  updateAsset(id: string, asset: Partial<InsertAsset>): Promise<Asset | undefined>;
  deleteAsset(id: string): Promise<boolean>;

  // Maintenance Tasks
  getMaintenanceTasks(): Promise<MaintenanceTask[]>;
  getMaintenanceTask(id: string): Promise<MaintenanceTask | undefined>;
  getMaintenanceTasksByAsset(assetId: string): Promise<MaintenanceTask[]>;
  createMaintenanceTask(task: InsertMaintenanceTask): Promise<MaintenanceTask>;
  updateMaintenanceTask(id: string, task: Partial<InsertMaintenanceTask>): Promise<MaintenanceTask | undefined>;
  deleteMaintenanceTask(id: string): Promise<boolean>;

  // Alerts
  getAlerts(): Promise<Alert[]>;
  getAlert(id: string): Promise<Alert | undefined>;
  getActiveAlerts(): Promise<Alert[]>;
  getAlertsByAsset(assetId: string): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  updateAlert(id: string, alert: Partial<InsertAlert>): Promise<Alert | undefined>;
  deleteAlert(id: string): Promise<boolean>;

  // Performance Metrics
  getPerformanceMetrics(assetId: string, limit?: number): Promise<PerformanceMetric[]>;
  createPerformanceMetric(metric: InsertPerformanceMetric): Promise<PerformanceMetric>;

  // Dashboard Analytics
  getDashboardMetrics(): Promise<{
    totalAssets: number;
    activeMaintenance: number;
    uptimeRate: number;
    criticalAlerts: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private assets: Map<string, Asset>;
  private maintenanceTasks: Map<string, MaintenanceTask>;
  private alerts: Map<string, Alert>;
  private performanceMetrics: Map<string, PerformanceMetric>;

  constructor() {
    this.users = new Map();
    this.assets = new Map();
    this.maintenanceTasks = new Map();
    this.alerts = new Map();
    this.performanceMetrics = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Create default user
    const defaultUser: User = {
      id: randomUUID(),
      username: "admin",
      password: "admin123",
      name: "John Smith",
      role: "Maintenance Manager",
      email: "john.smith@assetsentry.com",
      createdAt: new Date(),
    };
    this.users.set(defaultUser.id, defaultUser);

    // Create sample assets
    const sampleAssets: Asset[] = [
      {
        id: randomUUID(),
        assetId: "AS001",
        name: "Centrifugal Pump A1",
        type: "Pump System",
        status: AssetStatus.OPERATIONAL,
        location: "Building A - Floor 1",
        description: "Primary water circulation pump for cooling system",
        manufacturer: "FlowTech Industries",
        model: "FT-2500X",
        serialNumber: "FT2500X-2024-001",
        installDate: new Date("2024-01-15"),
        lastMaintenance: new Date("2024-03-15"),
        nextMaintenance: new Date("2024-06-15"),
        performance: "85.00",
        specifications: {
          power: "15kW",
          flow_rate: "250 L/min",
          pressure: "3.5 bar"
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        assetId: "AS002",
        name: "Generator Unit B3",
        type: "Generator",
        status: AssetStatus.MAINTENANCE,
        location: "Building B - Basement",
        description: "Backup power generator for emergency situations",
        manufacturer: "PowerGen Corp",
        model: "PG-500E",
        serialNumber: "PG500E-2024-003",
        installDate: new Date("2024-02-01"),
        lastMaintenance: new Date("2024-03-10"),
        nextMaintenance: new Date("2024-04-25"),
        performance: "60.00",
        specifications: {
          power_output: "500kW",
          fuel_type: "Diesel",
          runtime: "24 hours"
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        assetId: "AS003",
        name: "HVAC System C2",
        type: "HVAC",
        status: AssetStatus.OPERATIONAL,
        location: "Building C - Rooftop",
        description: "Climate control system for office areas",
        manufacturer: "ClimateControl Systems",
        model: "CC-HVAC-1000",
        serialNumber: "CC1000-2024-007",
        installDate: new Date("2024-01-20"),
        lastMaintenance: new Date("2024-03-20"),
        nextMaintenance: new Date("2024-06-20"),
        performance: "92.00",
        specifications: {
          cooling_capacity: "100 tons",
          heating_capacity: "150kW",
          efficiency_rating: "SEER 15"
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    sampleAssets.forEach(asset => this.assets.set(asset.id, asset));

    // Create sample alerts
    const sampleAlerts: Alert[] = [
      {
        id: randomUUID(),
        assetId: sampleAssets[0].id,
        title: "Pump System A1 - Pressure Drop",
        description: "Critical pressure drop detected in main circulation pump",
        level: AlertLevel.CRITICAL,
        status: "active",
        triggerType: "performance",
        metadata: { pressure_reading: "2.1 bar", threshold: "3.0 bar" },
        acknowledgedBy: null,
        acknowledgedAt: null,
        resolvedAt: null,
        createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      },
      {
        id: randomUUID(),
        assetId: sampleAssets[1].id,
        title: "Generator B3 - Maintenance Due",
        description: "Scheduled maintenance window approaching in 2 days",
        level: AlertLevel.WARNING,
        status: "active",
        triggerType: "maintenance",
        metadata: { due_date: "2024-04-25", days_remaining: 2 },
        acknowledgedBy: null,
        acknowledgedAt: null,
        resolvedAt: null,
        createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      },
      {
        id: randomUUID(),
        assetId: sampleAssets[2].id,
        title: "HVAC System C2 - Efficiency Update",
        description: "Energy efficiency improved by 8% after recent optimization",
        level: AlertLevel.INFO,
        status: "active",
        triggerType: "performance",
        metadata: { efficiency_improvement: "8%", previous_rating: "84%", current_rating: "92%" },
        acknowledgedBy: null,
        acknowledgedAt: null,
        resolvedAt: null,
        createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      }
    ];

    sampleAlerts.forEach(alert => this.alerts.set(alert.id, alert));

    // Create sample maintenance tasks
    const sampleTasks: MaintenanceTask[] = [
      {
        id: randomUUID(),
        assetId: sampleAssets[1].id,
        title: "Monthly Generator Inspection",
        description: "Routine monthly inspection and maintenance of backup generator",
        type: MaintenanceType.PREVENTIVE,
        priority: Priority.MEDIUM,
        status: "scheduled",
        assignedTo: defaultUser.id,
        scheduledDate: new Date("2024-04-25"),
        completedDate: null,
        estimatedDuration: 120,
        actualDuration: null,
        cost: "250.00",
        notes: "Check fuel levels, test startup sequence, inspect filters",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    sampleTasks.forEach(task => this.maintenanceTasks.set(task.id, task));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Asset methods
  async getAssets(): Promise<Asset[]> {
    return Array.from(this.assets.values());
  }

  async getAsset(id: string): Promise<Asset | undefined> {
    return this.assets.get(id);
  }

  async getAssetByAssetId(assetId: string): Promise<Asset | undefined> {
    return Array.from(this.assets.values()).find(asset => asset.assetId === assetId);
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const id = randomUUID();
    const now = new Date();
    const asset: Asset = { 
      ...insertAsset, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.assets.set(id, asset);
    return asset;
  }

  async updateAsset(id: string, updateData: Partial<InsertAsset>): Promise<Asset | undefined> {
    const asset = this.assets.get(id);
    if (!asset) return undefined;

    const updatedAsset: Asset = {
      ...asset,
      ...updateData,
      updatedAt: new Date()
    };
    this.assets.set(id, updatedAsset);
    return updatedAsset;
  }

  async deleteAsset(id: string): Promise<boolean> {
    return this.assets.delete(id);
  }

  // Maintenance Task methods
  async getMaintenanceTasks(): Promise<MaintenanceTask[]> {
    return Array.from(this.maintenanceTasks.values());
  }

  async getMaintenanceTask(id: string): Promise<MaintenanceTask | undefined> {
    return this.maintenanceTasks.get(id);
  }

  async getMaintenanceTasksByAsset(assetId: string): Promise<MaintenanceTask[]> {
    return Array.from(this.maintenanceTasks.values()).filter(task => task.assetId === assetId);
  }

  async createMaintenanceTask(insertTask: InsertMaintenanceTask): Promise<MaintenanceTask> {
    const id = randomUUID();
    const now = new Date();
    const task: MaintenanceTask = { 
      ...insertTask, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.maintenanceTasks.set(id, task);
    return task;
  }

  async updateMaintenanceTask(id: string, updateData: Partial<InsertMaintenanceTask>): Promise<MaintenanceTask | undefined> {
    const task = this.maintenanceTasks.get(id);
    if (!task) return undefined;

    const updatedTask: MaintenanceTask = {
      ...task,
      ...updateData,
      updatedAt: new Date()
    };
    this.maintenanceTasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteMaintenanceTask(id: string): Promise<boolean> {
    return this.maintenanceTasks.delete(id);
  }

  // Alert methods
  async getAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values());
  }

  async getAlert(id: string): Promise<Alert | undefined> {
    return this.alerts.get(id);
  }

  async getActiveAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values()).filter(alert => alert.status === "active");
  }

  async getAlertsByAsset(assetId: string): Promise<Alert[]> {
    return Array.from(this.alerts.values()).filter(alert => alert.assetId === assetId);
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = randomUUID();
    const alert: Alert = { 
      ...insertAlert, 
      id,
      createdAt: new Date()
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async updateAlert(id: string, updateData: Partial<InsertAlert>): Promise<Alert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;

    const updatedAlert: Alert = {
      ...alert,
      ...updateData
    };
    this.alerts.set(id, updatedAlert);
    return updatedAlert;
  }

  async deleteAlert(id: string): Promise<boolean> {
    return this.alerts.delete(id);
  }

  // Performance Metrics methods
  async getPerformanceMetrics(assetId: string, limit: number = 30): Promise<PerformanceMetric[]> {
    return Array.from(this.performanceMetrics.values())
      .filter(metric => metric.assetId === assetId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async createPerformanceMetric(insertMetric: InsertPerformanceMetric): Promise<PerformanceMetric> {
    const id = randomUUID();
    const metric: PerformanceMetric = { 
      ...insertMetric, 
      id,
      timestamp: insertMetric.timestamp || new Date(),
      createdAt: new Date()
    };
    this.performanceMetrics.set(id, metric);
    return metric;
  }

  // Dashboard Analytics
  async getDashboardMetrics(): Promise<{
    totalAssets: number;
    activeMaintenance: number;
    uptimeRate: number;
    criticalAlerts: number;
  }> {
    const totalAssets = this.assets.size;
    const activeMaintenance = Array.from(this.maintenanceTasks.values())
      .filter(task => task.status === "in_progress" || task.status === "scheduled").length;
    
    const operationalAssets = Array.from(this.assets.values())
      .filter(asset => asset.status === AssetStatus.OPERATIONAL).length;
    const uptimeRate = totalAssets > 0 ? (operationalAssets / totalAssets) * 100 : 100;
    
    const criticalAlerts = Array.from(this.alerts.values())
      .filter(alert => alert.level === AlertLevel.CRITICAL && alert.status === "active").length;

    return {
      totalAssets,
      activeMaintenance,
      uptimeRate: Math.round(uptimeRate * 10) / 10,
      criticalAlerts
    };
  }
}

export const storage = new MemStorage();
