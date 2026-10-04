import * as SQLite from 'expo-sqlite';

export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

class NativeStorageService {
  private db: SQLite.SQLiteDatabase | null = null;

  async init(): Promise<void> {
    try {
      const dbName = 'cda_tasks_mobile.db';
      this.db = await SQLite.openDatabaseAsync(dbName);
      await this.createTables();
      console.log('SQLite database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER DEFAULT 0,
        priority TEXT DEFAULT 'medium',
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );
    `);
    await this.db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
    `);
  }

  async getAllTasks(): Promise<Task[]> {
    if (!this.db) throw new Error('Database not initialized');
    // SQLite stores booleans as 0/1, so rows come back with a numeric `completed`
    type TaskRow = Omit<Task, 'completed'> & { completed: number };
    const result = await this.db.getAllAsync<TaskRow>(`
      SELECT * FROM tasks ORDER BY createdAt DESC
    `);
    return result.map(row => ({
      ...row,
      completed: Boolean(row.completed),
    }));
  }

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    if (!this.db) throw new Error('Database not initialized');
    const now = new Date().toISOString();
    const taskWithTimestamps = {
      ...task,
      createdAt: now,
      updatedAt: now,
    };
    
    const result = await this.db.runAsync(`
      INSERT INTO tasks (title, description, completed, priority, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      taskWithTimestamps.title,
      taskWithTimestamps.description,
      taskWithTimestamps.completed ? 1 : 0,
      taskWithTimestamps.priority,
      taskWithTimestamps.createdAt,
      taskWithTimestamps.updatedAt,
    ]);
    
    return {
      ...taskWithTimestamps,
      id: result.lastInsertRowId,
    };
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<Task | null> {
    if (!this.db) throw new Error('Database not initialized');
    type TaskRow = Omit<Task, 'completed'> & { completed: number };
    const existing = await this.db.getFirstAsync<TaskRow>(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );
    if (!existing) return null;

    const updatedTask: Task = {
      ...existing,
      completed: Boolean(existing.completed),
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };

    await this.db.runAsync(`
      UPDATE tasks
      SET title = ?, description = ?, completed = ?, priority = ?, updatedAt = ?
      WHERE id = ?
    `, [
      updatedTask.title,
      updatedTask.description,
      updatedTask.completed ? 1 : 0,
      updatedTask.priority,
      updatedTask.updatedAt,
      id,
    ]);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized');
    const result = await this.db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
    return result.changes > 0;
  }

  // Additional CRUD methods...
}
export default new NativeStorageService();
