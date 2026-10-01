import { type SQLiteDatabase } from "expo-sqlite";

export const initSchema = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      created_at TEXT NOT NULL
    );

     CREATE TABLE IF NOT EXISTS Customer (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS Measurement (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    shirt_length REAL NOT NULL,
  chest REAL NOT NULL,
  shoulder REAL NOT NULL,
  sleeve REAL NOT NULL,
  collar REAL NOT NULL,
  ghera REAL NOT NULL,
    shalwar_length REAL NOT NULL,
  paoncha_width REAL NOT NULL,
    collar_style TEXT NOT NULL,
  cuff_style TEXT NOT NULL,
   ghera_style TEXT NOT NUll,
  pocket_config TEXT NOT NULL,
  bottom_type TEXT NOT NULL,
  waist_attachment TEXT NOT NULL,
  number_of_pockets TEXT NOT NULL,
   created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES Customer(id)
    );
    CREATE TABLE IF NOT EXISTS "Order" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    measurement_id INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (
  status IN ('Pending', 'Cutting Fabric', 'Stitching', 'Buttonholes', 'Pressing', 'Ready','Delivered')
),

    due_date TEXT,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity >= 1),
    progress INTEGER NOT NULL DEFAULT 0
    CHECK(progress>=0 AND progress<=100),
     created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES Customer(id) ON DELETE CASCADE,
      FOREIGN KEY (measurement_id) REFERENCES Measurement(id) ON DELETE SET NULL
    );
    
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ActivityLog (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entity_type TEXT NOT NULL,
      entity_id INTEGER NOT NULL,
      customer_id INTEGER NOT NULL,
      customer_name TEXT NOT NULL,
      activity TEXT NOT NULL,
      occurred_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_activity_log_occurred_at
      ON ActivityLog(occurred_at DESC);

    CREATE TRIGGER IF NOT EXISTS customer_activity_insert
    AFTER INSERT ON Customer
    BEGIN
      INSERT INTO ActivityLog
        (entity_type, entity_id, customer_id, customer_name, activity)
      VALUES ('customer', NEW.id, NEW.id, NEW.name, 'Added customer');
    END;

    CREATE TRIGGER IF NOT EXISTS customer_activity_update
    AFTER UPDATE OF name, phone, address, notes ON Customer
    WHEN OLD.name IS NOT NEW.name
      OR OLD.phone IS NOT NEW.phone
      OR OLD.address IS NOT NEW.address
      OR OLD.notes IS NOT NEW.notes
    BEGIN
      INSERT INTO ActivityLog
        (entity_type, entity_id, customer_id, customer_name, activity)
      VALUES ('customer', NEW.id, NEW.id, NEW.name, 'Updated customer');
    END;

    CREATE TRIGGER IF NOT EXISTS measurement_activity_insert
    AFTER INSERT ON Measurement
    BEGIN
      INSERT INTO ActivityLog
        (entity_type, entity_id, customer_id, customer_name, activity)
      SELECT 'measurement', NEW.id, NEW.customer_id, name, 'Added measurements'
      FROM Customer
      WHERE id = NEW.customer_id;
    END;

    CREATE TRIGGER IF NOT EXISTS measurement_activity_update
    AFTER UPDATE ON Measurement
    WHEN OLD.shirt_length IS NOT NEW.shirt_length
      OR OLD.chest IS NOT NEW.chest
      OR OLD.shoulder IS NOT NEW.shoulder
      OR OLD.sleeve IS NOT NEW.sleeve
      OR OLD.collar IS NOT NEW.collar
      OR OLD.ghera IS NOT NEW.ghera
      OR OLD.shalwar_length IS NOT NEW.shalwar_length
      OR OLD.paoncha_width IS NOT NEW.paoncha_width
      OR OLD.collar_style IS NOT NEW.collar_style
      OR OLD.cuff_style IS NOT NEW.cuff_style
      OR OLD.ghera_style IS NOT NEW.ghera_style
      OR OLD.pocket_config IS NOT NEW.pocket_config
      OR OLD.bottom_type IS NOT NEW.bottom_type
      OR OLD.waist_attachment IS NOT NEW.waist_attachment
      OR OLD.number_of_pockets IS NOT NEW.number_of_pockets
    BEGIN
      INSERT INTO ActivityLog
        (entity_type, entity_id, customer_id, customer_name, activity)
      SELECT 'measurement', NEW.id, NEW.customer_id, name, 'Updated measurements'
      FROM Customer
      WHERE id = NEW.customer_id;
    END;

    CREATE TRIGGER IF NOT EXISTS order_activity_insert
    AFTER INSERT ON "Order"
    BEGIN
      INSERT INTO ActivityLog
        (entity_type, entity_id, customer_id, customer_name, activity)
      SELECT 'order', NEW.id, NEW.customer_id, name, 'Added order'
      FROM Customer
      WHERE id = NEW.customer_id;
    END;

    CREATE TRIGGER IF NOT EXISTS order_activity_update
    AFTER UPDATE OF title, description, status, due_date, quantity, progress ON "Order"
    WHEN OLD.title IS NOT NEW.title
      OR OLD.description IS NOT NEW.description
      OR OLD.status IS NOT NEW.status
      OR OLD.due_date IS NOT NEW.due_date
      OR OLD.quantity IS NOT NEW.quantity
      OR OLD.progress IS NOT NEW.progress
    BEGIN
      INSERT INTO ActivityLog
        (entity_type, entity_id, customer_id, customer_name, activity)
      SELECT 'order', NEW.id, NEW.customer_id, name, 'Updated order'
      FROM Customer
      WHERE id = NEW.customer_id;
    END;
  `);

  await db.execAsync(`
    INSERT INTO ActivityLog
      (entity_type, entity_id, customer_id, customer_name, activity, occurred_at)
    SELECT 'customer', c.id, c.id, c.name, 'Added customer',
           COALESCE(c.created_at, CURRENT_TIMESTAMP)
    FROM Customer c
    WHERE NOT EXISTS (
      SELECT 1 FROM ActivityLog a
      WHERE a.entity_type = 'customer' AND a.entity_id = c.id
    );

    INSERT INTO ActivityLog
      (entity_type, entity_id, customer_id, customer_name, activity, occurred_at)
    SELECT 'measurement', m.id, m.customer_id, c.name, 'Added measurements',
           COALESCE(m.created_at, CURRENT_TIMESTAMP)
    FROM Measurement m
    JOIN Customer c ON c.id = m.customer_id
    WHERE NOT EXISTS (
      SELECT 1 FROM ActivityLog a
      WHERE a.entity_type = 'measurement' AND a.entity_id = m.id
    );

    INSERT INTO ActivityLog
      (entity_type, entity_id, customer_id, customer_name, activity, occurred_at)
    SELECT 'order', o.id, o.customer_id, c.name, 'Added order',
           COALESCE(o.created_at, CURRENT_TIMESTAMP)
    FROM "Order" o
    JOIN Customer c ON c.id = o.customer_id
    WHERE NOT EXISTS (
      SELECT 1 FROM ActivityLog a
      WHERE a.entity_type = 'order' AND a.entity_id = o.id
    );
  `);
};
