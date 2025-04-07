const pino = require('pino');
const fs = require('fs');
const path = require('path');

const prettyTransport = pino.transport({ // Настройки для pretty
	target: 'pino-pretty',
	options: {
		colorize: true,
		translateTime: 'yyyy-mm-dd HH:MM:ss.l'

	}

});

const logDir = path.resolve('./logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Транспорт для записи только ошибок
const errorLogStream = fs.createWriteStream(path.join(logDir, 'errors.log'), { flags: 'a' });

// Собственный поток для ошибок
const errorTransport = {
  write(chunk) {
    try {
      const log = JSON.parse(chunk);
      if (log.level >= 50) {
        errorLogStream.write(chunk);
      }
    } catch (e) {
      // если не JSON — пропустить
    }
  },
};

const logger = pino({

  level: 'info',
  redact: {
    paths: [
		'message',
		'chat.lastMessage',
		'account.password',
		'*.account.password',
		'cookie',
		'*.cookie',
    ],
    remove: true,
  },

}, pino.multistream([

  { stream: prettyTransport },
  { stream: errorTransport },

]));

module.exports = logger;