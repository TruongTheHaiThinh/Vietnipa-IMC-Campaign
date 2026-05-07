const db = require('./db');
const f = db.prepare('SELECT content_html FROM featured_articles WHERE id = 50').get();
if (f && f.content_html) {
  // Gỡ thẻ img đầu tiên và caption đi kèm
  let clean = f.content_html.replace(/<img[^>]*detail1\.png[^>]*>/i, '');
  clean = clean.replace(/<div class="image-caption">Áp lực từ đường tinh luyện hiện diện phổ biến trong thực phẩm hàng ngày gây áp lực cho sức khỏe.<\/div>/i, '');
  
  db.prepare('UPDATE featured_articles SET content_html = ? WHERE id = 50').run(clean);
  db.prepare('UPDATE articles SET content = ? WHERE id = 50').run(clean);
  console.log('Successfully removed the first image.');
}
