export const migrations = `
  CREATE TABLE IF NOT EXISTS employees (
    cpf VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    dtNasc DATE NOT NULL,
    admin BOOLEAN DEFAULT FALSE,  
    role VARCHAR(255) NOT NULL
  );

  INSERT INTO employees (cpf, name, password, dtNasc, admin, role) 
  SELECT 'admin', 'admin', '$2a$12$okqCGvt1iglepFnMg/9zJud8itKI6PumqVmF2WpFmpxVP68gVXwr6', '01-01-0001', 'true', 'System admin'
  WHERE NOT EXISTS (SELECT * FROM employees WHERE cpf = 'admin');

  CREATE TABLE IF NOT EXISTS sprints (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL
  );


  CREATE TABLE IF NOT EXISTS stories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    bdd VARCHAR(255) NOT NULL,
    sprint_id INTEGER NOT NULL,
    acceptanceCriteria VARCHAR(255) NOT NULL,
    FOREIGN KEY (sprint_id) REFERENCES sprints (id) ON DELETE CASCADE ON UPDATE CASCADE
  );

  CREATE TABLE IF NOT EXISTS bussiness_Rules (
    rule VARCHAR(255) NOT NULL,
    story_id INTEGER NOT NULL,
    PRIMARY KEY (story_id, rule),
    FOREIGN KEY (story_id) REFERENCES stories (id) ON DELETE CASCADE ON UPDATE CASCADE
  );

`;
