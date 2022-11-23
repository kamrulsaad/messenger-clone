import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: process.env.app_id,
  key: process.env.key,
  secret: process.env.secret,
  cluster: process.env.cluster,
  useTLS : true
});

export const clientPusher = new ClientPusher("200c46f8808c7fd40c97", {
  cluster: "ap2",
  forceTLS: true,
});
