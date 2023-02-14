INSERT INTO department(name)
VALUES
('Management'),
('Sales'),
('Service'),
('Warehouse'),
('Administration'),
('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
('Regional Manager', 130000, 1),
('Sales Rep', 110000, 2),
('Technician', 90000, 3),
('Warehouse Worker', 45000, 4),
('Receptionist', 70000, 5),
('Accountant', 89000, 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('Adam', 'Pilato', 1),
('Liam', 'Pilato', 5),
('Elijah', 'Pilato', 2),
('Jonah', 'Pilato', 3),
('Charlotte', 'Pilato', 6),
('Linda', 'Pilato', 3);

UPDATE `employees_db`.`employee` SET `manager_id` = '1' WHERE (`id` > '1');