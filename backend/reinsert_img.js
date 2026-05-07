const db = require('./db');
const f = db.prepare('SELECT content_html FROM featured_articles WHERE id = 50').get();
if (f && f.content_html) {
  const target = '<p>Theo khuyến nghị của World Health Organization';
  const insertion = `
    <img src="/image/detail1.png" alt="Áp lực từ đường tinh luyện">
    <div class="image-caption">Đường tinh luyện hiện diện phổ biến trong thực phẩm hàng ngày gây áp lực cho sức khỏe.</div>
  `;
  
  let newContent = f.content_html.replace(target, insertion + target);
  
  db.prepare('UPDATE featured_articles SET content_html = ? WHERE id = 50').run(newContent);
  db.prepare('UPDATE articles SET content = ? WHERE id = 50').run(newContent);
  console.log('Successfully added detail1.png back to its section.');
}
