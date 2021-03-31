BEGIN

TRUNCATE
 cart,
 review,
 items,
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



INSERT INTO items (item_name, price, img, description, category_id)
VALUES
('Zigzag Soy Wax', 16.99, 'https://i.etsystatic.com/23622696/r/il/fb795c/2583878936/il_1588xN.2583878936_n7e6.jpg', 'Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.', 1),
('Seahell candle', 13.99, 'https://i.etsystatic.com/23622696/r/il/ef09c7/2463096324/il_1588xN.2463096324_oj8n.jpg', 'Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.', 1),
('Bubble Cube soy candle', 12.99, 'https://i.etsystatic.com/23622696/r/il/5125e8/2375657224/il_1588xN.2375657224_83zu.jpg', 'Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1),
('Figure candle', 14.99,'https://i.etsystatic.com/23622696/r/il/85fb1f/2712303734/il_1588xN.2712303734_8hbb.jpg','Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1),
('Mini Cube Candle - Bubble Soy Wax Candle', 4.99,'https://i.etsystatic.com/23622696/r/il/1e44b1/2696612598/il_1588xN.2696612598_fpfm.jpg','Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1),
('Pastel tone Candle', 17.99,'https://i.etsystatic.com/23622696/r/il/2080c2/2387355376/il_1588xN.2387355376_jg6p.jpg','Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1),
('Terrazzo Soy wax Candle', 11.99,'https://i.etsystatic.com/23622696/r/il/3a3d40/2965170657/il_1588xN.2965170657_j8dy.jpg','Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1),
('U objet bees & soy wax candle', 17.99,'https://i.etsystatic.com/23622696/r/il/2f3a63/2544605822/il_1588xN.2544605822_dz4z.jpg','Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1),
('Venus face candle', 34.99,'https://i.etsystatic.com/23622696/r/il/2d9a00/2839946790/il_1588xN.2839946790_585u.jpg','Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1),
('Flower soy & bees wax candles', 16.99, 'https://i.etsystatic.com/23622696/r/il/4c1243/2655985355/il_1588xN.2655985355_3ibh.jpg','Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1),
('Vintage glass flower vase-buble vases', 19.99,'https://i.etsystatic.com/23622696/r/il/b0765a/2970293359/il_1588xN.2970293359_qixn.jpg','Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',2);


INSERT INTO review (text, rating, user_id, item_id)
VALUES
('good!', 4, 1, 1),
('good!', 5, 1, 2),
('nice', 3, 2, 1);



COMMIT;