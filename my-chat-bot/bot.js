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
            await axios.post('https://orchestrator-skype-bot.herokuapp.com/orchestrator', {
                text: turnContext._activity.text
            })
                .then(async (res) => {
                    console.log(res.data.output);
                    await turnContext.sendActivity(res.data.output.generic[0].text);
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
