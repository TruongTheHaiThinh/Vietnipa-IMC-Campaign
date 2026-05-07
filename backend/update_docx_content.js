const db = require('./backend/db');
const content = `
  <div class="article-content">
    <h2>Áp lực từ vị ngọt quen thuộc trong đời sống hiện đại</h2>
    <p>Đường tinh luyện từ lâu đã trở thành một phần quen thuộc trong chế độ ăn uống của người Việt, xuất hiện từ đồ uống hằng ngày đến các món ăn gia đình. Tuy nhiên, cùng với sự thay đổi trong nhận thức, nhiều người bắt đầu đặt câu hỏi về mức độ ảnh hưởng của việc tiêu thụ đường thường xuyên.</p>
    <p>Theo khuyến nghị của World Health Organization, lượng đường tự do nên được kiểm soát dưới 10% tổng năng lượng nạp vào mỗi ngày. Dù vậy, việc duy trì mức tiêu thụ hợp lý không hề dễ dàng khi đường vẫn hiện diện phổ biến trong thực phẩm.</p>
    
    <h2>Không dễ “cắt ngọt”: Bài toán khó của người theo đuổi lối sống lành mạnh</h2>
    <p>Các nghiên cứu dinh dưỡng cho thấy đường tinh luyện có chỉ số đường huyết (GI) cao, khoảng 65 trở lên, có thể khiến đường huyết tăng nhanh sau khi sử dụng. Khảo sát thị trường ghi nhận 41% người tiêu dùng đã chủ động giảm lượng đường trong khẩu phần ăn, phản ánh xu hướng sống khỏe đang gia tăng.</p>
    <p>Tuy nhiên, phần lớn không lựa chọn loại bỏ hoàn toàn vị ngọt. Thay vào đó, họ tìm kiếm một giải pháp dung hòa: vẫn giữ được cảm giác ngon miệng quen thuộc nhưng ít gây áp lực hơn cho cơ thể.</p>

    <img src="/image/hop_10_goi_x_15g_mat_dua_nuoc_tuoi_vietnipa2r.png" alt="Mật dừa nước VIETNIPA">
    <div class="image-caption">Mật dừa nước – giải pháp tạo ngọt tự nhiên đang được quan tâm nhờ chỉ số GI thấp.</div>

    <h2>Giữ vị ngọt, nhưng theo cách “thông minh” hơn</h2>
    <p>Trong bối cảnh đó, các chất tạo ngọt có nguồn gốc tự nhiên đang dần trở thành lựa chọn thay thế. Một trong những giải pháp đáng chú ý là <strong>mật dừa nước</strong> – nguyên liệu được khai thác từ hệ sinh thái dừa nước.</p>
    <p>Khác với đường tinh luyện, mật dừa nước có chỉ số đường huyết thấp, khoảng 16 – 17, giúp hạn chế sự tăng đột ngột của đường huyết. Nhờ đó, sản phẩm phù hợp với:</p>
    <ul>
      <li>Người ăn kiêng, eat clean</li>
      <li>Người cần kiểm soát đường huyết</li>
      <li>Người theo đuổi lối sống lành mạnh</li>
    </ul>

    <h2>Từ lựa chọn cá nhân đến xu hướng tiêu dùng bền vững</h2>
    <p>Tại Việt Nam, <strong>VIETNIPA</strong> là một trong những doanh nghiệp tiên phong nghiên cứu và phát triển sản phẩm mật dừa nước từ nguồn nguyên liệu tại Cần Giờ – khu dự trữ sinh quyển được UNESCO công nhận.</p>
    <p>Xu hướng “ăn ngọt thông minh” không chỉ phản ánh sự thay đổi trong nhận thức, mà còn mở ra những lựa chọn mới giúp người tiêu dùng cân bằng giữa sức khỏe và trải nghiệm ẩm thực.</p>

    <div style="background:#f9f9f9; padding:20px; border-radius:8px; margin-top:40px; border-left:4px solid #e31e24;">
      <h3 style="margin-bottom:10px;">THÔNG TIN SẢN PHẨM VIETNIPA</h3>
      <p>• Chỉ số GI thấp (~16–17)<br>• Nguồn gốc: dừa nước Cần Giờ<br>• Phù hợp: người ăn kiêng, người kiểm soát đường huyết</p>
      <hr style="margin:15px 0; border:0; border-top:1px solid #ddd;">
      <h3 style="margin-bottom:10px;">THÔNG TIN LIÊN HỆ</h3>
      <p><strong>CÔNG TY CỔ PHẦN DỪA NƯỚC VIỆT NAM (VIETNIPA)</strong><br>
      Địa chỉ: 680 Ấp Bình Phước, xã Bình Khánh, TP. Hồ Chí Minh<br>
      Hotline: 097 694 5611 | Website: vietnipa.com</p>
    </div>
  </div>
`;
const chapeau = 'Trong bối cảnh xu hướng sống lành mạnh ngày càng lan rộng, việc cắt giảm đường tinh luyện đang trở thành mối quan tâm của nhiều người Việt. Tuy nhiên, thay vì từ bỏ hoàn toàn vị ngọt quen thuộc, người tiêu dùng đang tìm kiếm một giải pháp cân bằng hơn – nơi họ vẫn có thể thưởng thức vị ngọt mà không phải lo lắng về sức khỏe lâu dài.';

db.prepare('UPDATE featured_articles SET content_html = ?, chapeau = ?').run(content, chapeau);
db.prepare('UPDATE articles SET content_html = ?, summary = ? WHERE id = 50').run(content, chapeau);
console.log('Database updated with full Docx content.');
