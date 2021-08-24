const Discord = require("discord.js");
const cliente = new Discord.Client();
const configuracion = require("./config.json");
const GoogleImages = require("google-images");
const google = new GoogleImages(
  configuracion["google-engine"],
  configuracion["google-api-key"]
);

let prefijo = configuracion.prefijo;

cliente.on("ready", () => {
  console.log("Conectado correctamente");
  cliente.user.setPresence({
    status: "dnd",
    activity: {
      name: "Muerte y destrucción",
      url: "https://www.twitch.tv/dashducks",
      type: "STREAMING",
    },
  });
});

cliente.on("message", async (message) => {
  if (!message.content.startsWith(prefijo)) return;

  if (message.author.bot) return;

  const args = message.content
    .slice(configuracion.prefijo.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.content.startsWith("$dios")) {
    const args = message.content.trim().split(/ +/g).splice(1).join(" ");
    const result = await google.search(args);
    message.channel.send(result[Math.floor(Math.random() * result.length)].url);
  }

  switch (command) {
    case "sorprendeme":
      message.channel.send({
        embed: {
          color: 3476403,
          author: {
            name: cliente.user.username,
            icon_url: cliente.user.avatarURL(),
          },
          title: "Cuando fui a filipinas :)",
          image: {
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbmB-iuoxqhloc-U9iRlt-bpMWQb-WeNO6Dw&usqp=CAU",
          },
        },
      });
      break;
  }
});

cliente.login(configuracion.token);
