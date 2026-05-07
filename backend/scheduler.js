const cron = require('node-cron');
const { scrapeTienPhong } = require('./scraper');

// Chạy mỗi 30 phút
cron.schedule('*/30 * * * *', () => {
  console.log('Running scheduled scraper...');
  scrapeTienPhong();
});

// Chạy ngay khi khởi động
scrapeTienPhong();

console.log('Scheduler started: Scraper will run every 30 minutes.');
