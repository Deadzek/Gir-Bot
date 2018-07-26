const Discord = require('discord.js');
const bot = new Discord.Client();
const Client = require('fortnite');
const PREFIX = 'g!';
const YTDL = require("ytdl-core");
const Servers = {};
const fortnite = new Client("fba1ede0-da53-47a4-a17c-0c808e6003ed");

function play(connection,message) {
    var server = Servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
      if(server.queue[0]) play(connection, message);
      else connection.disconnect();
    });
  }

var fortunes = [
"yeah",
"nah",
"that's never gonna happen,you fucking dumbass",
"of course yeah dude",
"maybe",
"idk bruh"
];

bot.on("ready", function() {
  console.log("ready spagetti");
});


bot.on("message", function(message) {
  if (message.author.equals(bot.user)) return;

  if (message.content == 'hello') {
    message.channel.sendMessage("hi " + message.author + " have a nice day i guess");
  }

    if(!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    // substring could be replaced by toLowerCase

    switch (args[0]) {

      case "ping":
      message.channel.sendMessage("**Ping** | [`" + `${Date.now() - message.createdTimestamp}`+ "` ms]" );
      if(Date.now() - message.createdTimestamp == message.content.startsWith("")) message.channel.sendMessage("YAY! Bmo is fast!");
      break;

      case "myavatar":
      var embed = new Discord.RichEmbed()
      .setAuthor(message.author.username + "'s Profile Picture")
      .setImage(message.author.avatarURL)
      .setColor("#6eb522")
      message.channel.sendEmbed(embed);
      break;

      case "girinfo":
      var embed = new Discord.RichEmbed()
      .setAuthor("Gir Bot")
      .setDescription("--------------------")
      .setColor("#6eb522")
      .addField("Full Name:", `Gir Bot#2497`)
      .addField("ID", "471475071031181333")
      .addField("Owner", "Deadzek#9435")
      .addField("Developers", "Deadzek#9435 (Message Me For Dev)")
      .setThumbnail("https://lh3.googleusercontent.com/TC5cCepeabNRHyk1MRZ6sGcUcLHr2Hx_xayci1ONPqaHjh7JbwMNktcEqoamxEOsZfxdwHpEV49z3NFxelo2S25-40Xlo8wUZDrIZggDX8r_s8SZAbCbREE6UVAXa6v7VMi99E8UdnOC6t_B7KxFqP_aMmW_VePI0uPxILdmzRFy4CtLnvr-W14yA_JhCSXB-palTG1bURZ9qSXuBmOdVP4ha212ejn1VBOjoJ1-NukDNS-QZpJEvKi8fdj82VVM3xC9umAogLkrsADRfceA3YelCXrZRQ9xjLm6YTQv1CzOzDhl1UR8YALQTTjW3nSQiyGvh6j7SHNJk_YmD-Ko0XFuNEnnV8d_4vKTXrKN6_QmGIEYhIYHaygIzXqxH42KRVQvulM6egzeTH-UOoTN2PiB91DPPn8rOciqOc4zLI4N_ymdpl-pkAcjGCLNwl5YkjuwJpHTv3N5VxmnQ200MndjPZKqsy1vIQVNmK4wUKugbZWR_TcIiO-6zc_3CCTWmCL1nplhw1dYLZNn7VnQ_buzN85ji4nUAaEjjBN1zUHJMTQndoaHUtpUmHtW72FNDiyh-Qp5nqZgHYYvVhkuEbKQUSXav6jm4Ad6bQ=w841-h974-no")
      message.channel.sendEmbed(embed);
      break;

      case "myinfo":
      var embed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setDescription("--------------------")
      .setColor("#6eb522")
      .addField("Full Name:", `${message.author.username}#${message.author.discriminator}`)
      .addField("ID", message.author.id)
      .addField("Created at:", message.author.createdAt)
      .addField("Joined Guild at:", message.guild.joinedAt)
      .setThumbnail(message.author.avatarURL)
      message.channel.sendEmbed(embed);
      break;

      case "purge":
      if(!message.member.hasPermission("MANAGE_MESSAGES")) {
          message.channel.sendMessage(message.author.toString() + "You don't have the permissions, Brushhead!");
          return;
      } else {
          if (args[1]){
              let messagecount = args[1];
              message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
              message.channel.send("Purged `" + messagecount + "` messages.");
          } else {
              message.channel.send("Usage: e>purge (number)");
          }
      }
      break;

      case "guildinfo":
      var embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name)
      .setDescription("--------------------")
      .setColor("#6eb522")
      .addField ("Ammount of Users:", message.guild.memberCount + " members")
      .addField ("Region:", message.guild.region, true)
      .addField ("Created at:", message.guild.createdAt, true)
      .addField ("Owner:", message.guild.owner)
      .addField ("Verification Level", message.guild.verificationLevel)
      .setThumbnail(message.guild.iconURL)
      message.channel.sendEmbed(embed);
      break;

      case "dmtest":
      message.author.sendMessage("Hi!")
      break;

      case "online":
      bot.user.setStatus("online")
      message.channel.sendMessage("I'm now online...yay!")
      console.log("Gir's gone online.")
      break;

      case "dnd":
      bot.user.setStatus("dnd")
      message.channel.sendMessage("CAN YOU READ?!? THIS SAYS DO NOT DISTURB FOR A REASON!! FFS MAN")
      console.log("Don't disturb Gir, man.")
      break;

      case "idle":
      bot.user.setStatus("idle")
      message.channel.sendMessage("i've gone idle. get away.")
      console.log("Gir's gone idle.")
      break;

      case "logthis":
      console.log("A message from " + message.author.username + "... " + '"' + message.content + '"')
      message.channel.sendMessage("Logged succesfully.")
      break;

      case "8ball":
      if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
      else message.channel.SendMessage("wtf is that shit")
      break;

      case "play":
      if(!args[1]) {
        message.channel.sendMessage("Provide a link. Please provide a valid link to a YouTube video! No keywords!cas");
        return;
      }

      if(!message.member.voiceChannel) {
        message.channel.sendMessage("You must be in a voice channel!");
        return;
      }


      if(!Servers[message.guild.id]) Servers[message.guild.id] = {
        queue: []
      };



      message.channel.sendMessage("Added!")

      var server = Servers[message.guild.id];

      server.queue.push(args[1]);

      if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);
      });
      break;

      case "pause":
      var server = Servers[message.guild.id];

      if (server.dispatcher) server.dispatcher.pause();
      message.channel.sendMessage("Paused. Use e>resume to play again.")
      break;

      case "resume":
      var server = Servers[message.guild.id];

      if(server.dispatcher) server.dispatcher.resume();
      message.channel.sendMessage("Resumed.")
      break;


      case "skip":
      var server = Servers[message.guild.id];

      if (server.dispatcher) server.dispatcher.end();
      message.channel.sendMessage("Skipped")
      break;

      case "invite":
      var embed = new Discord.RichEmbed()
      .setAuthor("Gir's Invite Link!")
      .setDescription("----------------")
      .setColor("#6eb522")
      .addField("Link:", "https://discordapp.com/oauth2/authorize?client_id=471475071031181333&scope=bot&permissions=8")
      .setThumbnail("https://lh3.googleusercontent.com/TC5cCepeabNRHyk1MRZ6sGcUcLHr2Hx_xayci1ONPqaHjh7JbwMNktcEqoamxEOsZfxdwHpEV49z3NFxelo2S25-40Xlo8wUZDrIZggDX8r_s8SZAbCbREE6UVAXa6v7VMi99E8UdnOC6t_B7KxFqP_aMmW_VePI0uPxILdmzRFy4CtLnvr-W14yA_JhCSXB-palTG1bURZ9qSXuBmOdVP4ha212ejn1VBOjoJ1-NukDNS-QZpJEvKi8fdj82VVM3xC9umAogLkrsADRfceA3YelCXrZRQ9xjLm6YTQv1CzOzDhl1UR8YALQTTjW3nSQiyGvh6j7SHNJk_YmD-Ko0XFuNEnnV8d_4vKTXrKN6_QmGIEYhIYHaygIzXqxH42KRVQvulM6egzeTH-UOoTN2PiB91DPPn8rOciqOc4zLI4N_ymdpl-pkAcjGCLNwl5YkjuwJpHTv3N5VxmnQ200MndjPZKqsy1vIQVNmK4wUKugbZWR_TcIiO-6zc_3CCTWmCL1nplhw1dYLZNn7VnQ_buzN85ji4nUAaEjjBN1zUHJMTQndoaHUtpUmHtW72FNDiyh-Qp5nqZgHYYvVhkuEbKQUSXav6jm4Ad6bQ=w841-h974-no")
      message.channel.sendEmbed(embed);
      break;

      case "kick":
      let kickmember = message.mentions.members.first();
      kickmember.kick();
      message.channel.sendMessage( "okay i don't know how to say who got kicked but i think we all know who got kicked");
      return;

      case "ban":
      let banmember = message.mentions.members.first();
      banmember.ban();
      message.channel.sendMessage( "okay i don't know how to say who got banned but i think we all know who got banned");
      return;


 //fba1ede0-da53-47a4-a17c-0c808e6003ed


      //WIP
      //case "emoji":
      //if (!args[1]) message.reply("A link and then a name.Ex:g!createEmoji twitter.com/??????.png nigger")
      //message.guild.createEmoji(args[1] +  args[2]);
      //message.channel.sendMessage("made an emoji");
      //break;

      //case "fortnite" :
      //let username = args[1];
      //let platform = args[2] || 'pc';
      //if(!username) return message.reply("Put a username dumbass.")
      //let data = fortnite.user(username, platform).then(data => {
        //console.log(data);
        //let stats = data.stats;
        //let lifetime = stats.lifetime;
        //console.log(lifetime);
    //let score = lifetime[6]['Score'];
//let mplayed = lifetime[6]['Matches Played'];
  //let wins = lifetime[6]['Wins'];
        //let winper = lifetime[6]['Win%'];
        //let kills = lifetime[6]['Kills'];
//let kd = lifetime[6]['K/d'];
        //let embed = new Discord.RichEmbed()
       //.setTitle("Fortnite Tracker Lifetime Stats")
       //.setAuthor(data.username)
       //.setDescription("--------------------")
       //.setColor("#6eb522")
       //.addField('Wins', wins, true)
       //.addField('Kills', kills, true)
       //.addField('Score', score, true)
       //.addField('Matches Played', mplayed, true)
     //.addField('Kill/Death Ratio', kd, true)
       //.setThumbnail('https://seeklogo.com/images/F/fortnite-logo-1F7897BD1E-seeklogo.com.png')
       //message.channel.sendEmbed(embed);
      //});


    }
});


//message.reply @s the user
//message.channel.sendMessage is a normal response

bot.login('"' +`${BOT_TOKEN}' + '"');
