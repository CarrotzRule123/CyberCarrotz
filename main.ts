import {
  createBot,
  Intents,
  startBot,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import { OpenAI } from "https://deno.land/x/openai@1.4.0/mod.ts";

const discord = Deno.env.get("DISCORD_TOKEN");
const openai = new OpenAI(Deno.env.get("OPENAI_TOKEN")!);

const bot = createBot({
  token: discord as string,
  intents: Intents.Guilds | Intents.GuildMessages | Intents.MessageContent,
  events: {
    ready() {
      console.log("Successfully connected to gateway");
    },
  },
});

bot.events.messageCreate = function (_, message) {
  if (message.content.slice(0, 5) == ">chat" && message.content.slice(6)) {
    openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content":
            "You are a helpful assistant. You are CyberCarrotz. You are an AI language model created by CarrotzRule123.",
        },
        { "role": "user", "content": message.content.slice(6) },
      ],
      maxTokens: 200
    }).then((res) =>
      bot.helpers.sendMessage(message.channelId, {
        content: res.choices[0].message.content,
      })
    );
  }
};

await startBot(bot);
