BEGIN

TRUNCATE
 yourmoon_user,
 categories,
 items,
 item_scent,
 item_color,
 cart,
 review
 RESTART IDENTITY CASCADE;

 INSERT INTO yourmoon_user (user_name, full_name, password)
 VALUES
 ('test1', 'test1' , 'password'),
 ('test2', 'test2' , 'password2'),
 ('test3', 'test3' , 'password3');

 INSERT INTO categories ()


COMMIT;