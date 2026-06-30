import mongoose from 'mongoose';

const connectDB = async () =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`\n MongoDB connected:${connectionInstance.connection.host}\n`);

    }catch(error){
        console.log(`\n Error: ${error.message}\n`);
        process.exit(1);

    }
}
export default connectDB;