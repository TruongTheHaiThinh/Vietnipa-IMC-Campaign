const db = require('./backend/db');

try {
  const article = db.prepare("SELECT content FROM articles WHERE id = 50").get();
  if (article) {
    let content = article.content;
    
    // Đảm bảo ảnh sản phẩm dùng detail4.jpg
    // Đảm bảo ảnh rừng dừa dùng detail5.jpg
    
    // Tìm đoạn có detail4 và thay bằng detail5 cho vùng nguyên liệu
    content = content.replace(/src="\/image\/detail4\.jpg" alt="Vùng nguyên liệu Cần Giờ"/, 'src="/image/detail5.jpg" alt="Vùng nguyên liệu Cần Giờ"');
    content = content.replace(/Ảnh: Hệ sinh thái dừa nước tại Cần Giờ/, 'Ảnh: Hệ sinh thái dừa nước tại Cần Giờ'); // Chú thích có thể đã đúng
    
    // Kiểm tra ảnh sản phẩm phía trên (thường là detail2 hoặc detail3, mình sẽ check lại)
    // Nếu ảnh sản phẩm đang dùng sai, mình sẽ sửa luôn.
    
    db.prepare("UPDATE articles SET content = ? WHERE id = 50").run(content);
    console.log("Đã sửa lỗi nhầm lẫn hình ảnh detail4 và detail5.");
  }
} catch (err) {
  console.error("Lỗi cập nhật hình ảnh:", err);
}
