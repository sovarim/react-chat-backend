import mongoose from 'mongoose';

export const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Mongo connection success');
  } catch (err) {
    console.log(err);
  }
};
