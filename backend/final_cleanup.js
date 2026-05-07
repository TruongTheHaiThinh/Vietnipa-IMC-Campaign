const db = require('./db');
const f = db.prepare('SELECT content_html FROM featured_articles WHERE id = 50').get();
if (f && f.content_html) {
  const target = '<div class="image-caption">Đường tinh luyện hiện diện phổ biến trong thực phẩm hàng ngày gây áp lực cho sức khỏe.</div>';
  let clean = f.content_html.split(target).join('');
  
  db.prepare('UPDATE featured_articles SET content_html = ? WHERE id = 50').run(clean);
  db.prepare('UPDATE articles SET content = ? WHERE id = 50').run(clean);
  console.log('Final cleanup successful. Removed orphan caption.');
}
