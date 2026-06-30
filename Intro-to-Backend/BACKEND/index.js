import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import app from './app.js';

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try{
        await connectDB();

        app.on('error', (error)=>{
            console.log(`\n Error: ${error.message}\n`);
            throw error;
        });

        app.listen(process.env.PORT || 7500,()=>{
            console.log(`\n Server running on port ${process.env.PORT || 7500}\n`);
        });
    }catch(error){
    console.log("MongooDB failed to connect");
    }
}
startServer();