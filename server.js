const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/api/send', async (req, res) => {
  const { name, phone, service, option, price, date, timeSlot, comment } = req.body;
  const token = process.env.TELEGRAM_TOKEN?.trim();
  
  // Массив с ID всех нужных получателей
  const chatIds = ['873332217', '1609383002'];

  const message = [
    `🪷 <b>НОВАЯ ЗАЯВКА — MANTRA SPA 39</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Гость:</b> ${name}`,
    `📞 <b>Телефон:</b> ${phone}`,
    `💆‍♀️ <b>Процедура:</b> ${service}`,
    option ? `⏱ <b>Формат:</b> ${option}` : null,
    price ? `💳 <b>Стоимость:</b> ${price}` : null,
    `📅 <b>Желаемая дата:</b> ${date || 'Не указана'}`,
    `🕒 <b>Удобное время:</b> ${timeSlot || 'Обсудим время'}`,
    comment ? `💬 <b>Пожелания:</b> ${comment}` : null,
  ].filter(Boolean).join('\n');

  try {
    // Отправляем заявку всем получателям из списка
    // Отправляем заявку всем получателям из списка
    await Promise.all(
      chatIds.map((chatId) =>
        axios.post(
          `https://api.telegram.org/bot${token}/sendMessage`,
          {
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
          },
          {
            family: 4,
            timeout: 10000,
          }
        )
      )
    );

    // ДОБАВЬ ВОТ ЭТУ СТРОЧКУ СЮДА:
    console.log(`✅ [${new Date().toLocaleTimeString()}] Заявка успешно отправлена всем 3 администраторам!`);

    return res.status(200).json({ success: true });

    return res.status(200).json({ success: true });
  } catch (error) {
    const tgError = error.response?.data?.description || error.message;
    console.error('Детали ошибки Telegram:', tgError);
    return res.status(500).json({
      success: false,
      error: `Ошибка соединения: ${tgError}`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});