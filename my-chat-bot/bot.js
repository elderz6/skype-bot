// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes } = require('botbuilder');
const axios = require('axios');

class MyBot {
    /**
     *
     * @param {TurnContext} on turn context object.
     */

    async onTurn(turnContext) {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {
            // envia requisição para o orchestrator
            await axios.post('https://orchestrator-skype-bot.herokuapp.com/orchestrator', {
                text: turnContext._activity.text,
                context: this.contexto
            })
                .then(async (res) => {
                    // verifica se existe mais de uma mensagem
                    const textLen = res.data.output.text.length;
                    if (textLen > 1) {
                        for (var i = 0; i < textLen; i++) {
                            await turnContext.sendActivity(res.data.output.text[i]);
                        }
                    } else {
                        await turnContext.sendActivity(res.data.output.generic[0].text);
                    }
                    this.contexto = res.data.context;
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
    }
}

module.exports.MyBot = MyBot;
