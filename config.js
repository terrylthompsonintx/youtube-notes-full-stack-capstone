exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
        'mongodb://admin:admin@ds241677.mlab.com:41677/youtube-notes-full-stack-capstone' :
        'mongodb://admin:admin@ds241677.mlab.com:41677/youtube-notes-full-stack-capstone');
exports.PORT = process.env.PORT || 5002;
