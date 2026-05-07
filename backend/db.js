const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'data', 'tanthanh.db'));

// Bảng bài viết thông thường (từ Tiền Phong)
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    image_url TEXT,
    source_url TEXT UNIQUE,
    slug TEXT,
    category TEXT DEFAULT 'Thời sự',
    published_at TEXT DEFAULT (datetime('now','localtime')),
    created_at TEXT DEFAULT (datetime('now','localtime'))
  );
`);

// Bảng bài viết đặc biệt (VIETNIPA – pinned đầu trang)
db.exec(`
  CREATE TABLE IF NOT EXISTS featured_articles (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    chapeau TEXT,
    content_html TEXT,
    image_url TEXT,
    infobox_html TEXT,
    contact_html TEXT,
    slug TEXT,
    is_active INTEGER DEFAULT 1
  );
`);

// Seed bài viết VIETNIPA nếu chưa có
const featured = db.prepare('SELECT count(*) as count FROM featured_articles').get();
if (featured.count === 0) {
  const insert = db.prepare(`
    INSERT INTO featured_articles (id, title, chapeau, content_html, image_url, infobox_html, contact_html, slug)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  insert.run(
    50,
    'Người Việt bắt đầu "ăn ngọt" theo cách khác: Xu hướng mới trong lựa chọn thực phẩm lành mạnh',
    'Trong bối cảnh xu hướng sống lành mạnh ngày càng lan rộng, việc cắt giảm đường tinh luyện đang trở thành mối quan tâm của nhiều người Việt. Tuy nhiên, thay vì từ bỏ hoàn toàn vị ngọt quen thuộc, người tiêu dùng đang tìm kiếm một giải pháp cân bằng hơn – nơi họ vẫn có thể thưởng thức vị ngọt mà không phải lo lắng về sức khỏe lâu dài.',
    `<h2>Áp lực từ vị ngọt quen thuộc trong đời sống hiện đại</h2>
    <p>Đường tinh luyện từ lâu đã trở thành một phần quen thuộc trong chế độ ăn uống của người Việt, xuất hiện từ đồ uống hằng ngày đến các món ăn gia đình. Tuy nhiên, cùng với sự thay đổi trong nhận thức, nhiều người bắt đầu đặt câu hỏi về mức độ ảnh hưởng của việc tiêu thụ đường thường xuyên.</p>
    <p>Theo khuyến nghị của World Health Organization, lượng đường tự do nên được kiểm soát dưới 10% tổng năng lượng nạp vào mỗi ngày.</p>
    <h2>Giữ vị ngọt, nhưng theo cách "thông minh" hơn</h2>
    <p>Trong bối cảnh đó, các chất tạo ngọt có nguồn gốc tự nhiên đang dần trở thành lựa chọn thay thế. Một trong những giải pháp đáng chú ý là mật dừa nước – nguyên liệu được khai thác từ hệ sinh thái dừa nước Cần Giờ.</p>`,
    'https://vietnipa.com/wp-content/uploads/mat-dua-nuoc-vietnipa.jpg',
    `<div class="infobox">
      <h4>THÔNG TIN SẢN PHẨM – VIETNIPA – Mật dừa nước cô đặc</h4>
      <ul>
        <li>Chỉ số GI thấp (~16–17)</li>
        <li>Nguồn gốc: dừa nước Cần Giờ (khu dự trữ sinh quyển UNESCO)</li>
        <li>Phù hợp: người ăn kiêng, eat clean, người kiểm soát đường huyết</li>
        <li>Website: <a href="https://vietnipa.com" target="_blank">vietnipa.com</a></li>
      </ul>
    </div>`,
    `<div class="contact-box">
      <strong>CÔNG TY CỔ PHẦN DỪA NƯỚC VIỆT NAM (VIETNIPA)</strong><br>
      Địa chỉ: 680 Ấp Bình Phước, xã Bình Khánh, TP. Hồ Chí Minh<br>
      Hotline: 097 694 5611<br>
      Website: <a href="https://vietnipa.com" target="_blank">vietnipa.com</a>
    </div>`,
    'nguoi-viet-bat-dau-an-ngot-theo-cach-khac-xu-huong-moi-trong-lua-chon-thuc-pham-lanh-manh'
  );

  // Also seed into main articles table for detail page access
  db.prepare(`
    INSERT OR REPLACE INTO articles (id, title, summary, content, image_url, slug, category)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    50,
    'Người Việt bắt đầu "ăn ngọt" theo cách khác: Xu hướng mới trong lựa chọn thực phẩm lành mạnh',
    'Trong bối cảnh xu hướng sống lành mạnh ngày càng lan rộng, việc cắt giảm đường tinh luyện đang trở thành mối quan tâm của nhiều người Việt.',
    'Nội dung đầy đủ của bài báo đặc biệt...',
    'https://vietnipa.com/wp-content/uploads/mat-dua-nuoc-vietnipa.jpg',
    'nguoi-viet-bat-dau-an-ngot-theo-cach-khac-xu-huong-moi-trong-lua-chon-thuc-pham-lanh-manh',
    'Sức khỏe'
  );
}

module.exports = db;
