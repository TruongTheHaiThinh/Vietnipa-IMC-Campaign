const db = require('./backend/db');

try {
  const article = db.prepare("SELECT content FROM articles WHERE id = 50").get();
  if (article) {
    let content = article.content;

    // 1. Xóa bỏ các thẻ img cũ liên quan đến detail4 và detail5 để sắp xếp lại từ đầu
    content = content.replace(/<img src="\/image\/detail4\.jpg"[\s\S]*?<\/div>/g, '');
    content = content.replace(/<img src="\/image\/detail5\.jpg"[\s\S]*?<\/div>/g, '');
    content = content.replace(/<img src="\/image\/detail3\.png"[\s\S]*?<\/div>/g, ''); // Xóa luôn detail3 nếu nó bị thừa

    // 2. Chèn detail4 vào sau câu "...khai thác từ hệ sinh thái dừa nước."
    const marker1 = "nguyên liệu được khai thác từ hệ sinh thái dừa nước.</p>";
    const img4 = `
    <img src="/image/detail4.jpg" alt="Các sản phẩm Vietnipa">
    <div class="image-caption">Ảnh: Các dòng sản phẩm từ mật dừa nước của VIETNIPA được phát triển từ nguồn nguyên liệu dừa nước tại Cần Giờ.</div>`;
    content = content.replace(marker1, marker1 + img4);

    // 3. Chèn detail5 vào sau câu "...được UNESCO công nhận."
    const marker2 = "khu dự trữ sinh quyển được UNESCO công nhận.</p>";
    const img5 = `
    <img src="/image/detail5.jpg" alt="Rừng dừa nước Cần Giờ">
    <div class="image-caption">Ảnh: Hệ sinh thái dừa nước tại Cần Giờ — nguồn nguyên liệu gắn với định hướng phát triển bền vững của VIETNIPA.</div>`;
    content = content.replace(marker2, marker2 + img5);

    db.prepare("UPDATE articles SET content = ? WHERE id = 50").run(content);
    console.log("Đã sắp xếp lại vị trí hình ảnh detail4 và detail5 chuẩn theo yêu cầu.");
  }
} catch (err) {
  console.error("Lỗi sắp xếp lại hình ảnh:", err);
}
