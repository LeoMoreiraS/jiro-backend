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
`;
