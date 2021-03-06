export const config = {
    SECRET: process.env.SECRET || 'ndu5y8tn945y6hm6y',
    PORT: process.env.PORT || 3000,
    CITY: 'philadelphia',
    FILE_PATH: '/home/dev/drive_one/projects/bixie/bike-app/db/db.json',
    WEATHER_API_KEY: process.env.WEATHER_API_KEY || '25456',
    WEATHER_API_BASE_URL: 'http://api.openweathermap.org/data/2.5/weather?q=',
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL,
    PAGE_LIMIT: 100,
    PAGE_OFFSET: 0
}