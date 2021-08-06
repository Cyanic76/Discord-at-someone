const Discord = require("discord.js");
const client = new Discord.Client({
  fetchAllMembers: true
});
login();

function login(){
  client.login(process.env.TOKEN)
}

client.on("ready", () => {
  client.guilds.cache.map(g => {
    g.members.cache.map(m => {
      client.users.cache.get(m.id);
    })
  })
  console.log(`@someone is ready.`);
})

client.on("message", message => {
  if(message.author.bot) return;
  const p = message.mentions.users.first();
  if(p && p.id === client.user.id || p && p.id === client.id){
    var args = message.content.split(" ").slice(1)
    if(args[0] === 'help'){
      message.channel.send("Hello there, I'm the @someone bot.\nWhen you ping me, I randomly choose a member from your server and ping them. It can even be a bot.\nTo invite me and learn more about me, follow this link:\nhttps://github.com/Cyanic76/Discord-at-someone#README")
      return;
    }
    let members = [];
    message.guild.members.cache.map(member => {
      members.push(member.user.id);
    });
    let guildMember = members[Math.floor(Math.random()*members.length)]
    message.channel.send(`<@${guildMember}>`)
    return;
  } else return;
});
