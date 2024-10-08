const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
require('winston-daily-rotate-file');
require('winston-mongodb');

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.MongoDB({
            db: process.env.MONGODB_URI, // MongoDB bağlantı URI'si buraya geliyor
            options: {
                useUnifiedTopology: true
            },
            collection: 'loggings', // Logların saklanacağı koleksiyon ismi
            capped: true, // Koleksiyonun belirli bir boyutta sınırlandırılması
            cappedMax: 1000000, // 1 milyon kayıt saklanacak
        })
    ]
});

module.exports = logger;