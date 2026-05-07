const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./db');

function createSlug(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/[^a-z0-9 -]/g, ""); // Xóa ký tự đặc biệt
  str = str.replace(/\s+/g, "-"); // Thay khoảng trắng bằng -
  str = str.replace(/-+/g, "-"); // Xóa nhiều - liên tiếp
  return str;
}

async function scrapeTienPhong() {
  try {
    const rssUrl = 'https://tienphong.vn/rss/home.rss';
    const { data } = await axios.get(rssUrl);
    const $ = cheerio.load(data, { xmlMode: true });
    
    const items = $('item').toArray();
    let count = 0;

    for (const el of items) {
      const title = $(el).find('title').text().trim();
      const summary = $(el).find('description').text().trim();
      const source_url = $(el).find('link').text().trim();
      const published_at = $(el).find('pubDate').text();
      const slug = createSlug(title);
      
      const descHtml = $(el).find('description').html();
      const $desc = cheerio.load(descHtml || '');
      const image_url = $desc('img').attr('src');

      let category = 'Đời sống';
      if (source_url.includes('/thoi-su/')) category = 'Thời sự';
      else if (source_url.includes('/kinh-te/')) category = 'Kinh tế';
      else if (source_url.includes('/xa-hoi/')) category = 'Xã hội';
      else if (source_url.includes('/suc-khoe/')) category = 'Sức khỏe';
      else if (source_url.includes('/the-thao/')) category = 'Thể thao';

      const existing = db.prepare('SELECT id FROM articles WHERE source_url = ?').get(source_url);
      if (existing) continue;

      let content = '';
      let original_image_url = image_url; // Fallback to RSS thumbnail
      
      try {
        const detailRes = await axios.get(source_url);
        const $detail = cheerio.load(detailRes.data);
        
        // 1. Get high-quality main image from meta tags
        const metaImage = $detail('meta[property="og:image"]').attr('content') || 
                          $detail('meta[name="twitter:image"]').attr('content');
        if (metaImage) {
          original_image_url = metaImage;
        }

        // 2. Clean and process content
        $detail('script, ins, iframe, .article-related, .cms-link, .video-content, .ads-container, .related-news').remove();
        const contentBox = $detail('.article-content, .cms-body');
        
        contentBox.find('img').each((i, img) => {
          let src = $detail(img).attr('src') || $detail(img).attr('data-src') || $detail(img).attr('data-original');
          if (src && src.startsWith('/')) {
            $detail(img).attr('src', 'https://tienphong.vn' + src);
          } else if (src) {
            $detail(img).attr('src', src);
          }
          $detail(img).removeAttr('data-src').removeAttr('data-original');
        });

        content = contentBox.html() || '';
      } catch (e) {
        console.error(`Failed to fetch content for ${source_url}`);
      }

      try {
        const stmt = db.prepare(`
          INSERT INTO articles (title, summary, content, source_url, image_url, category, slug, published_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const info = stmt.run(title, summary, content, source_url, original_image_url, category, slug, published_at);
        if (info.changes > 0) count++;
      } catch (err) {
        console.error('Database error:', err.message);
      }
    }

    console.log(`Scraped ${count} new articles with slugs.`);
    return count;
  } catch (error) {
    console.error('Scraping error:', error.message);
    return 0;
  }
}

module.exports = { scrapeTienPhong };
