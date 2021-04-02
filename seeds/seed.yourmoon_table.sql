BEGIN

TRUNCATE
 review,
 items,
 categories,
 yourmoon_user,
 scent_item,
 color_item,
 scent,
 color
 RESTART IDENTITY CASCADE;

INSERT INTO yourmoon_user (user_name, full_name, password)
VALUES
 ('admin', 'admin', '$2a$12$nZbs6VqlYFQejbRzUSwr9e6bHj8swIbZFRVkGp8WyV4ZLnCwmwu52'),
 ('test1', 'Alex' , '$2a$12$x2T6pugBEvuK/Uxv9VA6tuNKIWC2zJWOJWFYphQQX9zL0bFcMHhlG'),
 ('test2', 'Brad' , '$2a$12$i8loVdrufWKwj4Iu6xUNbupLrtG71n29YwUlvasIRQhGsYth4PqBa'),
 ('test3', 'Cat' , '$2a$12$dw7UAFeIDa3.NpvWbqoUtu6sE1nW8MK6RviXA3FOgdm3MZfkOibGO');

INSERT INTO categories (category_name)
VALUES
 ('Candle'),
 ('ETC');



INSERT INTO items (item_name, price, img, description, user_id, category_id)
VALUES
('Zigzag Soy Wax', 16.99, ARRAY ['https://i.etsystatic.com/23622696/r/il/fb795c/2583878936/il_1588xN.2583878936_n7e6.jpg', 'https://i.etsystatic.com/23622696/r/il/395040/2631557319/il_1588xN.2631557319_sshx.jpg', 'https://i.etsystatic.com/23622696/r/il/e29ffa/2510876326/il_1588xN.2510876326_irya.jpg', 'https://i.etsystatic.com/23622696/r/il/c37b5f/2583888814/il_1588xN.2583888814_cmfd.jpg'], 'Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1, 1),
('Seahell candle', 13.99, ARRAY ['https://i.etsystatic.com/23622696/r/il/ef09c7/2463096324/il_1588xN.2463096324_oj8n.jpg', 'https://i.etsystatic.com/23622696/r/il/e1bcc8/2510762959/il_1588xN.2510762959_oq1u.jpg', 'https://i.etsystatic.com/23622696/r/il/cbece3/2510765541/il_1588xN.2510765541_kel8.jpg', 'https://i.etsystatic.com/23622696/r/il/c17990/2696546158/il_1588xN.2696546158_nvsh.jpg'], 'Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1, 1),
('Bubble Cube soy candle', 12.99, ARRAY ['https://i.etsystatic.com/23622696/r/il/5125e8/2375657224/il_1588xN.2375657224_83zu.jpg','https://i.etsystatic.com/23622696/r/il/d49094/2602788115/il_1588xN.2602788115_t3ow.jpg','https://i.etsystatic.com/23622696/r/il/576845/2555140416/il_1588xN.2555140416_9iy3.jpg', 'https://i.etsystatic.com/23622696/r/il/8dc2fb/2696555390/il_1588xN.2696555390_3d6t.jpg'], 'Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1,1),
('Figure candle', 14.99,ARRAY ['https://i.etsystatic.com/23622696/r/il/85fb1f/2712303734/il_1588xN.2712303734_8hbb.jpg', 'https://i.etsystatic.com/23622696/r/il/8228f1/2759919293/il_1588xN.2759919293_5ia3.jpg', 'https://i.etsystatic.com/23622696/r/il/ddb14a/2759919429/il_1588xN.2759919429_ktj6.jpg', 'https://i.etsystatic.com/23622696/r/il/5678d7/2759919683/il_1588xN.2759919683_7e63.jpg'],'Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1,1),
('Mini Cube Candle - Bubble Soy Wax Candle', 4.99,ARRAY ['https://i.etsystatic.com/23622696/r/il/1e44b1/2696612598/il_1588xN.2696612598_fpfm.jpg', 'https://i.etsystatic.com/23622696/r/il/cbede6/2744294719/il_794xN.2744294719_g9tb.jpg','https://i.etsystatic.com/23622696/r/il/b948cf/2744294827/il_1588xN.2744294827_h34q.jpg', 'https://i.etsystatic.com/23622696/r/il/4fd6e2/2696612896/il_1588xN.2696612896_282l.jpg'],'Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1,1),
('Pastel tone Candle', 17.99,ARRAY ['https://i.etsystatic.com/23622696/r/il/2080c2/2387355376/il_1588xN.2387355376_jg6p.jpg', 'https://i.etsystatic.com/23622696/r/il/83c7c0/2473425660/il_1588xN.2473425660_4jv6.jpg', 'https://i.etsystatic.com/23622696/r/il/33442b/2387354584/il_1588xN.2387354584_oitn.jpg', 'https://i.etsystatic.com/23622696/r/il/606d8a/2387354630/il_1588xN.2387354630_5ne4.jpg'],'Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1,1),
('Terrazzo Soy wax Candle', 11.99,ARRAY['https://i.etsystatic.com/23622696/r/il/3a3d40/2965170657/il_1588xN.2965170657_j8dy.jpg', 'https://i.etsystatic.com/23622696/r/il/242287/2908277020/il_1588xN.2908277020_7xpu.jpg', 'https://i.etsystatic.com/23622696/r/il/2e3810/2965152493/il_1588xN.2965152493_c05c.jpg', 'https://i.etsystatic.com/23622696/r/il/a4e9d0/2965152641/il_1588xN.2965152641_stxz.jpg'],'Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1,1),
('U objet bees & soy wax candle', 17.99,ARRAY ['https://i.etsystatic.com/23622696/r/il/2f3a63/2544605822/il_1588xN.2544605822_dz4z.jpg', 'https://i.etsystatic.com/23622696/r/il/4cb910/2592245953/il_1588xN.2592245953_tfwr.jpg', 'https://i.etsystatic.com/23622696/r/il/21b182/2592246059/il_1588xN.2592246059_1g46.jpg', 'https://i.etsystatic.com/23622696/r/il/ef8f91/2546266588/il_1588xN.2546266588_atmx.jpg'],'Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1,1),
('Venus face candle', 34.99,ARRAY ['https://i.etsystatic.com/23622696/r/il/2d9a00/2839946790/il_1588xN.2839946790_585u.jpg', 'https://i.etsystatic.com/23622696/r/il/2eed48/2843965607/il_1588xN.2843965607_d1dt.jpg', 'https://i.etsystatic.com/23622696/r/il/674ead/2839947298/il_1588xN.2839947298_p6kp.jpg', 'https://i.etsystatic.com/23622696/r/il/e28411/2796294002/il_1588xN.2796294002_gxsw.jpg'],'Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1,1),
('Flower soy & bees wax candles', 16.99, ARRAY ['https://i.etsystatic.com/23622696/r/il/4c1243/2655985355/il_1588xN.2655985355_3ibh.jpg', 'https://i.etsystatic.com/23622696/r/il/97a5e4/2639780570/il_300x300.2639780570_2zeb.jpg', 'https://i.etsystatic.com/23622696/r/il/c3b832/2639780586/il_1588xN.2639780586_1fxg.jpg' , 'https://i.etsystatic.com/23622696/r/il/7f4038/2700722442/il_1588xN.2700722442_46ke.jpg'],'Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1,1),
('Vintage glass flower vase-buble vases', 19.99,ARRAY ['https://i.etsystatic.com/23622696/r/il/b0765a/2970293359/il_1588xN.2970293359_qixn.jpg', 'https://i.etsystatic.com/23622696/r/il/fc7193/2970270913/il_1588xN.2970270913_fvfn.jpg', 'https://i.etsystatic.com/23622696/r/il/0e0485/2970287797/il_1588xN.2970287797_9eb3.jpg', 'https://i.etsystatic.com/23622696/r/il/b8d4c8/2922578758/il_1588xN.2922578758_9wr3.jpg'],'Light up your life and warm the people you love！ Yourmoon Candle is a natural soy candle made from soy wax made by processing oil extracted from soybeans and blended with white beeswax. Because it does not contain chemical substances, which are the cause of carcinogenesis, pregnant women and babies can use it with confidence.',1,2);


INSERT INTO review (text, rating, user_id, item_id)
VALUES
('good!', 4, 2, 1),
('good!', 5, 3, 1),
('nice', 3, 4, 1),
('nice', 5, 2, 2),
('nice', 5, 4, 2),
('good', 3, 3, 3),
('very nice', 5, 4, 4),
('very nice', 5, 3, 4),
('very nice', 4, 2, 4);

INSERT INTO scent(name)
VALUES
('LEMON'),
('APPLE'),
('PINEAPPLE');

INSERT INTO scent_item(item_id, scent_id)
VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2);

INSERT INTO color(name)
VALUES
('red'),
('yellow'),
('none');

INSERT INTO color_item(item_id, color_id)
VALUES
(1,1),
(1,2),
(1,3),
(2, 1),
(2, 3);

COMMIT;