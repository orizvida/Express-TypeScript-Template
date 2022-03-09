import pino from 'pino'
import uuid from 'uuid';
const levels = {
    info:10,
    warn:20,
    error:30
    // emerg: 80,
    // alert: 70,
    // crit: 60,
    // error: 50,
    // warn: 40,
    // notice: 30,
    // info: 20,
    // debug: 10,
};
export default pino({
    timestamp: ()=>{return ', "time":"'+ new Date(Date.now()).toISOString()},
    level: 'info',
    customLevels: levels,
    useOnlyCustomLevels: true,
    formatters: {
        level: (label) => {
          return { level: label };
        },
    },
    redact: { paths: ['req.body.password', '*.headers.authorization','cookie.session','session'], remove: true },

});