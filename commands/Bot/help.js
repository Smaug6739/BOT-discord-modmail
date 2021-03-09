const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const categoryList = readdirSync('./commands');
module.exports.run = (client, message, args) => {
    if (!args.length) {
      const embed = new MessageEmbed()
        .setColor('#a9c5e2')
        .setAuthor('Liste  des commandes :',`${client.user.avatarURL()}`)
        .addField("Liste des commandes", `Une liste de toutes les sous-catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, executez \`${client.config.PREFIX}help <command_name>\`.`)
        .setTimestamp()
        if(message.guild.iconURL()) embed.setFooter(`BOT ID : ${client.user.id}`, `${message.guild.iconURL()}`);
        else embed.setFooter(`BOT ID : ${client.user.id}`);
      for (const category  of categoryList) { 
        embed.addField(
          `${category}`,
          `${client.commands.filter(cat => cat.help.category === category.toLowerCase())
            .map(cmd => '__'+`${client.config.PREFIX}`+cmd.help.name +' __ - '+ cmd.help.description).join(`\r\n`)}`
        );
      };
      return message.channel.send(embed);
    } else {
      const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
      if (!command) return message.channel.send(`${client.config.emojis.FALSE} Je n'ai pas trouver cette commande.`);
      const embed = new MessageEmbed()
      
        .setColor('#a9c5e2')
        .setAuthor(`Commande : ${client.config.PREFIX}${command.help.name}`,`${client.user.avatarURL()}`)
        .addField("**__Description :__**", `${command.help.description} (cd: ${command.help.cooldown}secs)`)
        .addField("**__Utilisation :__**", command.help.usage ? `${client.config.PREFIX}${command.help.name} ${command.help.usage}` : `${client.config.PREFIX}${command.help.name}`, true)
        .setTimestamp()
        if(message.guild.iconURL()) embed.setFooter(`BOT ID : ${client.user.id}`, `${message.guild.iconURL()}`);
        else embed.setFooter(`BOT ID : ${client.user.id}`);
      if (command.help.aliases.length > 1) embed.addField("**__Alias :__**", `${command.help.aliases.join(`, `)}`);
      if (command.help.exemple && command.help.exemple.length > 0) embed.addField("**__Exemples :__**", `${client.config.PREFIX}${command.help.exemple.join(`\r\n${client.config.PREFIX}`)}`);
      if (command.help.sousCommdandes && command.help.sousCommdandes.length > 0) embed.addField("**__Sous commandes :__**", `${client.config.PREFIX}${command.help.sousCommdandes.join(`\r\n${client.config.PREFIX}`)}`);
      return message.channel.send(embed);
    }
  };
  
  module.exports.help = {
    name: "help",
    aliases: ['help','cmds'],
    category: 'bot',
    description: "Liste des commandes du bot.",
    cooldown: 3,
    usage: '<command_name>',
    exemple :["help","help ping"],
    isUserAdmin: false,
    permissions: false,
    args: false,
    sousCommdandes : ["help <command>"]
  };