const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env['TOKEN']);

client.on("ready", () => {
  console.log(`@someone is ready!`);
})

client.on("message", message => {
  if(message.mentions.users.first().id === client.user.id || message.mentions.users.first().id === client.id || message.content.includes("@someone")){
    let members = [];
    message.guild.members.cache.map(member => {
      if(member.user.bot) return;
      members.push(member.user.id);
    });
    let guildMember = members[Math.floor(Math.random()*members.length)]
    message.channel.send(`<@${guildMember}>`)
    return;
  }
});
