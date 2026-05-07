const db = require('./backend/db');

try {
  const article = db.prepare("SELECT id, content FROM articles WHERE id = 50").get();
  if (article) {
    // Xóa "Ảnh: " hoặc "Ảnh:" (có phân biệt hoa thường và dấu cách)
    const newContent = article.content.replace(/Ảnh:\s*/g, '');
    
    db.prepare("UPDATE articles SET content = ? WHERE id = ?").run(newContent, article.id);
    console.log("Đã xóa toàn bộ chữ 'Ảnh:' trong các dòng chú thích.");
  }
} catch (err) {
  console.error("Lỗi xóa chữ Ảnh:", err);
}
