const mongoose = require('mongoose');


const uri = `mongodb://127.0.0.1:27017/portalDb`;
mongoose.connect(uri, { useNewUrlParser: true });

const client = mongoose.connection;

export const Db_conn = (async (client) => {
    try {
      client.once("open", () => {
        console.log("connection successful");
      });
    } catch (error) {
      console.log(error);
    }
  })(client).catch(console.error);
