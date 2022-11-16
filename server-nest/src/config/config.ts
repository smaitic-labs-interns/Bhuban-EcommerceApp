export const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 5001,
    // MONGO_URL: process.env.MONGO_URL
    MONGO_URL: 'mongodb://localhost:27017/eCommerceApp'
})