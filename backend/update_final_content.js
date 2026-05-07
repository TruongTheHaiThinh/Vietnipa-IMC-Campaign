const db = require('./db');
const content = `
  <div class="article-content">
    <p><i>(Bản tin PR) - Trong những năm gần đây, xu hướng thay thế đường tinh luyện bằng các chất tạo ngọt tự nhiên đang bùng nổ mạnh mẽ tại Việt Nam, mở ra kỷ nguyên mới cho lối sống lành mạnh.</i></p>

    <h2>Áp lực từ vị ngọt quen thuộc trong đời sống hiện đại</h2>
    <p>Đường tinh luyện từ lâu đã trở thành một phần quen thuộc trong chế độ ăn uống của người Việt, xuất hiện từ đồ uống hằng ngày đến các món ăn gia đình. Tuy nhiên, cùng với sự thay đổi trong nhận thức, nhiều người bắt đầu đặt câu hỏi về mức độ ảnh hưởng của việc tiêu thụ đường thường xuyên.</p>
    
    <img src="/image/detail1.png" alt="Áp lực từ đường tinh luyện">
    <div class="image-caption">Đường tinh luyện hiện diện phổ biến trong thực phẩm hàng ngày gây áp lực cho sức khỏe.</div>

    <p>Theo khuyến nghị của World Health Organization, lượng đường tự do nên được kiểm soát dưới 10% tổng năng lượng nạp vào mỗi ngày. Dù vậy, việc duy trì mức tiêu thụ hợp lý không hề dễ dàng khi đường vẫn hiện diện phổ biến trong thực phẩm.</p>
    
    <h2>Không dễ “cắt ngọt”: Bài toán khó của người theo đuổi lối sống lành mạnh</h2>
    <p>Các nghiên cứu dinh dưỡng cho thấy đường tinh luyện có chỉ số đường huyết (GI) cao, khoảng 65 trở lên, có thể khiến đường huyết tăng nhanh sau khi sử dụng. Điều này trở thành mối quan tâm lớn đối với những người cần kiểm soát chế độ ăn uống.</p>
    
    <img src="/image/detail2.webp" alt="Bài toán cắt giảm đường">
    <div class="image-caption">Khảo sát cho thấy 41% người tiêu dùng chủ động giảm lượng đường nhưng không muốn bỏ vị ngọt.</div>

    <p>Khảo sát thị trường ghi nhận 41% người tiêu dùng đã chủ động giảm lượng đường trong khẩu phần ăn, phản ánh xu hướng sống khỏe đang gia tăng. Tuy nhiên, phần lớn trong số đó không lựa chọn loại bỏ hoàn toàn vị ngọt. Thay vào đó, họ tìm kiếm một giải pháp dung hòa: vẫn giữ được cảm giác ngon miệng quen thuộc nhưng ít gây áp lực hơn cho cơ thể.</p>

    <h2>Giữ vị ngọt, nhưng theo cách “thông minh” hơn</h2>
    <img src="/image/detail3.png" alt="Mật dừa nước VIETNIPA">
    <div class="image-caption">Mật dừa nước – giải pháp tạo ngọt tự nhiên đang được quan tâm đặc biệt.</div>

    <p>Trong bối cảnh đó, các chất tạo ngọt có nguồn gốc tự nhiên đang dần trở thành lựa chọn thay thế. Một trong những giải pháp đáng chú ý là <strong>mật dừa nước</strong> – nguyên liệu được khai thác từ hệ sinh thái dừa nước.</p>
    <p>Khác với đường tinh luyện, mật dừa nước có chỉ số đường huyết thấp, khoảng 16 – 17, giúp hạn chế sự tăng đột ngột của đường huyết sau khi sử dụng. Nhờ đó, sản phẩm phù hợp với:</p>
    <ul>
      <li>Người ăn kiêng, eat clean</li>
      <li>Người cần kiểm soát đường huyết</li>
      <li>Người theo đuổi lối sống lành mạnh</li>
    </ul>
    <p>Đồng thời, vị ngọt thanh tự nhiên của mật dừa nước giúp người dùng dễ dàng thay thế trong các món ăn và thức uống quen thuộc mà không làm thay đổi khẩu vị.</p>

    <h2>Từ lựa chọn cá nhân đến xu hướng tiêu dùng bền vững</h2>
    <img src="/image/detail4.jpg" alt="Vùng nguyên liệu Cần Giờ">
    <div class="image-caption">VIETNIPA khai thác bền vững từ vùng nguyên liệu dừa nước Cần Giờ.</div>

    <p>Tại Việt Nam, <strong>VIETNIPA</strong> là một trong những doanh nghiệp tiên phong nghiên cứu và phát triển sản phẩm mật dừa nước từ nguồn nguyên liệu tại Cần Giờ – khu dự trữ sinh quyển được UNESCO công nhận.</p>
    <p>Doanh nghiệp theo đuổi hướng khai thác bền vững, vừa mang đến giải pháp thay thế đường tinh luyện, vừa góp phần bảo tồn hệ sinh thái và hỗ trợ sinh kế cho cộng đồng địa phương.</p>
    <p>Xu hướng “ăn ngọt thông minh” không chỉ phản ánh sự thay đổi trong nhận thức, mà còn mở ra những lựa chọn mới giúp người tiêu dùng cân bằng giữa sức khỏe, trải nghiệm ẩm thực và trách nhiệm với môi trường.</p>

    <div style="background:#fefefe; border:1px solid #ddd; padding:25px; border-radius:10px; margin-top:40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      <h3 style="color:#e31e24; border-bottom:2px solid #e31e24; display:inline-block; margin-bottom:20px;">THÔNG TIN SẢN PHẨM</h3>
      <p><strong>VIETNIPA – Mật dừa nước cô đặc</strong></p>
      <ul style="list-style:none; padding-left:0;">
        <li>✅ Chỉ số GI thấp (~16–17)</li>
        <li>✅ Nguồn gốc: dừa nước Cần Giờ</li>
        <li>✅ Phù hợp: người ăn kiêng, eat clean, người kiểm soát đường huyết</li>
        <li>✅ Định hướng: sống lành mạnh – bền vững</li>
      </ul>
      
      <h3 style="color:#e31e24; border-bottom:2px solid #e31e24; display:inline-block; margin:25px 0 15px;">THÔNG TIN LIÊN HỆ</h3>
      <p><strong>CÔNG TY CỔ PHẦN DỪA NƯỚC VIỆT NAM (VIETNIPA)</strong><br>
      📍 Địa chỉ: 680 Ấp Bình Phước, xã Bình Khánh, TP. Hồ Chí Minh<br>
      📧 Email: kinhdoanh@vietnipa.com<br>
      📞 Hotline: 097 694 5611<br>
      🌐 Website: <a href="https://vietnipa.com" style="color:#e31e24; font-weight:700;">vietnipa.com</a></p>
    </div>
  </div>
`;

const title = 'Người Việt bắt đầu “ăn ngọt” theo cách khác: Xu hướng mới trong lựa chọn thực phẩm lành mạnh';
const chapeau = 'Trong bối cảnh xu hướng sống lành mạnh ngày càng lan rộng, việc cắt giảm đường tinh luyện đang trở thành mối quan tâm của nhiều người Việt. Tuy nhiên, thay vì từ bỏ hoàn toàn vị ngọt quen thuộc, người tiêu dùng đang tìm kiếm một giải pháp cân bằng hơn – nơi họ vẫn có thể thưởng thức vị ngọt mà không phải lo lắng về sức khỏe lâu dài.';

db.prepare('UPDATE featured_articles SET title = ?, content_html = ?, chapeau = ?').run(title, content, chapeau);
db.prepare('UPDATE articles SET title = ?, content = ?, summary = ? WHERE id = 50').run(title, content, chapeau);

console.log('Cập nhật nội dung bài viết và hình ảnh thành công!');
