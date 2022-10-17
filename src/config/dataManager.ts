import Database from 'better-sqlite3';

export default class DataManager {
    private readonly database; //Note: Type is BetterSqlite3. Couldn't set type because the type is not exposed outside the package scope.
    constructor() {
        this.database = new Database("database.db");
        this.initialize();
    }
    /*** Public Methods ***/
    public run(query: string, params: any[]): Database.RunResult {
        const statement = this.database.prepare(query);
        return statement.run(params);
    }
    public get(query: string, params: any[], isAll: boolean = false) {
        const statement = this.database.prepare(query);
        return isAll ? statement.all(params) : statement.get(params);
    }
    /*** Private Methods ***/
    private initialize(): void {
        this.database.exec(`
            CREATE TABLE IF NOT EXISTS dogs (
                id   INTEGER PRIMARY KEY,
                name TEXT,
                age  INTEGER,
                breed TEXT,
                gender INTEGER
            );
        `);
    }
}