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
            await axios.post('http://localhost:8080/orchestrator', {
                text: turnContext._activity.text
            })
                .then(async (res) => {
                    await turnContext.sendActivity(res.data.output.generic[0].text);
                })
                .catch((err) => {
                    console.log('error during request');
                    console.log(err);
                });
        } else {
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
    }
}

module.exports.MyBot = MyBot;