BEGIN

TRUNCATE
 cart,
 review,
 items,
 item_scent,
 item_color,
 categories,
 yourmoon_user,
 RESTART IDENTITY CASCADE;

INSERT INTO yourmoon_user (user_name, full_name, password)
VALUES
 ('test1', 'test1' , '$2a$12$x2T6pugBEvuK/Uxv9VA6tuNKIWC2zJWOJWFYphQQX9zL0bFcMHhlG'),
 ('test2', 'test2' , '$2a$12$i8loVdrufWKwj4Iu6xUNbupLrtG71n29YwUlvasIRQhGsYth4PqBa'),
 ('test3', 'test3' , '$2a$12$dw7UAFeIDa3.NpvWbqoUtu6sE1nW8MK6RviXA3FOgdm3MZfkOibGO');

INSERT INTO categories (category_name)
VALUES
 ('Candle'),
 ('ETC');


INSERT INTO items (item_name, price, qty, img, description, category_id)
VALUES
('Zigzag Soy Wax', 16.00, 10, './src/img/zig-zag-soy-wax.jpg', 'description!', 1 ),
('Extra Item', 20.00, 10, './src/img/sample.jpg', 'description', 2);

INSERT INTO item_scent (item_id, scent)
VALUES
(1, 'NONE'),
(1, 'LAVENDER') ,
(1, 'BLACK PEPPERMINT EUCALYPTUS'),
(1, 'COTTON AND IRIS'),
(2, 'NONE');

INSERT INTO item_color (item_id, color)
 VALUES
 (1, 'YELLOW'),
 (1, 'IVORY'),
 (1, 'PINK'),
 (2, 'NONE');

INSERT INTO review (text, rating, user_id, item_id)
VALUES
('good!', 4, 1, 1),
('good!', 5, 1, 2),
('nice', 3, 2, 1);



COMMIT;