const discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let embed = new discord.MessageEmbed().setColor("BLUE");
    if(!args[0]) return message.channel.send(embed.setDescription("<:hayir:834394285067206706> Geçerli bir argüment belirtmen gerek: **paylaş**, **paylaşımcı**"))
    if(args[0] == "paylaşımcı") {
      if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(embed.setDescription("<:hayir:834394285067206706> Bunu yapmak için yetkin yok: `Sunucuyu Yönet`"))
      let kanal = message.mentions.roles.first();
      if(!kanal) return message.channel.send(embed.setDescription("<:hayir:834394285067206706> Bir rol belirtmen gerek: `@rol`"))
      if(kanal == db.fetch(`plas.${message.guild.id}`)) {
        return message.channel.send(embed.setDescription("<:hayir:834394285067206706> Kod paylaşımcı rolü zaten bu role ayarlı!"))
      }
      db.set(`plas.${message.guild.id}`, kanal.id)
      return message.channel.send(embed.setDescription("<a:evet:833304711288455188> Kod paylaşımcı ayarlandı: <@&"+kanal+">"))
    } else if(args[0] == "gönder" || args[0] == "paylaş") {
            let kodlog = db.fetch(`plas.${message.guild.id}`);
      if(!kodlog) return message.channel.send(embed.setDescription("<:hayir:834394285067206706> Kod paylaşımcı ayarlı değil!"))
      if(!message.member.roles.cache.has(db.fetch(`plas.${message.guild.id}`))) return message.channel.send(embed.setDescription("<:hayir:834394285067206706> Bunu yapmak için gerekli rol yok: <@&"+db.fetch(`plas.${message.guild.id}`)+">"))
      if(!args[1]) return message.channel.send(embed.setDescription("<:hayir:834394285067206706> Geçerli bir argüment belirtmen gerek: **js**, **ts**, **py**, **html**"))
      let kod = args.slice(2).join(" ");
      if(args[1] == "ts" || args[1] == "typescript") {
      if(!kod) return message.channel.send(embed.setDescription("<:hayir:834394285067206706> Geçerli bir kod girmen gerek:\n```ts\nimport * as discord from 'discord.js'...```"))
      message.delete();
      message.channel.send(embed.setTitle("Yeni bir **TypeScript** kodu paylaşıldı!").setDescription("```ts\n"+kod+"```").setFooter(""+message.author.tag+" tarafından paylaşıldı!").setTimestamp())
      } else if(args[1] == "js" || args[1] == "javascript") {
      if(!kod) return message.channel.send(embed.setDescription("<:hayir:834394285067206706> Geçerli bir kod girmen gerek:\n```js\nconst discord = require('discord.js')...```"))
      message.delete();
      message.channel.send(embed.setTitle("Yeni bir **JavaScript** kodu paylaşıldı!").setDescription("```js\n"+kod+"```").setFooter(""+message.author.tag+" tarafından paylaşıldı!").setTimestamp())
      }  else if(args[1] == "py" || args[1] == "python") {
      if(!kod) return message.channel.send(embed.setDescription("<:hayir:834394285067206706> Geçerli bir kod girmen gerek:\n```py\nfrom discord.ext import commands\nimport discord...```"))
      message.delete();
      message.channel.send(embed.setTitle("Yeni bir **Python** kodu paylaşıldı!").setDescription("```py\n"+kod+"```").setFooter(""+message.author.tag+" tarafından paylaşıldı!").setTimestamp())
      }  else if(args[1] == "html") {
      if(!kod) return message.channel.send(embed.setDescription("<:hayir:834394285067206706> Geçerli bir kod girmen gerek:\n```html\n<!DOCTYPE html>\n><html>\n<h1>"+client.user.tag+"</h1>\n</html>...```"))
      message.delete();
      message.channel.send(embed.setTitle("Yeni bir **HTML** kodu paylaşıldı!").setDescription("```html\n"+kod+"```").setFooter(""+message.author.tag+" tarafından paylaşıldı!").setTimestamp())
      }
    }
};

exports.config = {
  name: "kod",
  aliases: [],
};