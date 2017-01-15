/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Advent Calendar for a verse"
 *  Alexa: "Here's your verse: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = 'amzn1.ask.skill.a12228a0-4d76-43a7-9b9a-4bbb951b36fe'; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing the advent story text.
 */
var FACTS = [
"In the sixth month, God sent the angel Gabriel to Nazareth, a town in Galilee, to a virgin pledged to be married to a man named Joseph, a descendant of David. The virgins name was Mary. The angel went to her and said, Greetings, you who are highly favored! The Lord is with you… You will be with child and give birth to a son, and you are to give him the name Jesus.",
"This is how the birth of Jesus Christ came about: His mother Mary was pledged to be married to Joseph, but before they came together, she was found to be with child through the Holy Spirit.",
"And Mary said: My soul glorifies the Lord and my spirit rejoices in God my Savior, for he has been mindful of the humble state of his servant. From now on all generations will call me blessed, for the Mighty One has done great things for me—holy is his name. His mercy extends to those who fear him, from generation to generation. He has performed mighty deeds with his arm; he has scattered those who are proud in their inmost thoughts. He has brought down rulers from their thrones but has lifted up the humble. He has filled the hungry with good things but has sent the rich away empty. He has helped his servant Israel, remembering to be merciful to Abraham and his descendants forever, even as he said to our fathers.",
"An angel of the Lord appeared to [Joseph] in a dream and said, Joseph son of David, do not be afraid to take Mary home as your wife, because what is conceived in her is from the Holy Spirit.",
"Mary will give birth to a son, and you are to give him the name Jesus, because he will save his people from their sins.",
"All this took place to fulfill what the Lord had said through the prophet: The virgin will be with child and will give birth to a son, and they will call him Immanuel — which means, God with us. Therefore the Lord himself will give you a sign: The virgin will be with child and will give birth to a son, and will call him Immanuel.",
"So Joseph also went up from the town of Nazareth in Galilee to Judea, to Bethlehem the town of David, because he belonged to house and line of David.",
"Joseph went to Bethlehem to register with Mary, who was pledged to be married to him and was expecting a child.",
"But you, Bethlehem Ephrathah, though you are small among the clans of Judah, out of you will come for me one who will be ruler over Israel, whose origins are from of old,from ancient times.",
"While they were in Bethlehem, the time came for the baby to be born, and Mary gave birth to her firstborn, a son",
"Mary wrapped Jesus in cloths and placed him in a manger, because there was no room for them in the inn.",
"For to us a child is born, to us a son is given, and the government will be on his shoulders. And he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.",
"And there were shepherds living out in the fields nearby, keeping watch over their flocks at night. An angel of Lord appeared to them, and the glory of the Lord shone around them, and they were terrified. But the angel said to them, Do not be afraid. I bring you good news of great joy that will be for all the people. Today in the town of David a Savior has been born to you; he is Christ the Lord.",
"This will be a sign to you: You will find a baby wrapped in cloths and lying in a manger.",
"Suddenly a great company of the heavenly host appeared with the angel, praising God and saying, Glory to God in the highest; and on earth peace to men on whom his favor rests.",
"When the angels had left them and gone into heaven, the shepherds said to one another, Lets go to Bethlehem and see this thing that has happened, which the Lord has told us about. So they hurried off and found Mary and Joseph, and the baby, who was lying in the manger. When they had seen him, they spread the word concerning what had been told them about this child, and all who heard it were amazed at what the shepherds said to them.",
"Come, let us bow down in worship, let us kneel before the Lord our Maker; for he is our God and we are the people of his pasture, the flock under his care.",
"But Mary treasured up all these things and pondered them in her heart. The shepherds returned, glorifying and praising God for all the things they had heard and seen, which were just as they had been told. The childs father and mother marveled at what was said about [Jesus]. Then Simeon blessed them and said to Mary, his mother: This child is destined to cause the falling and rising of many in Israel, and to be a sign that will be spoken against, so that the thoughts of many hearts will be revealed. And a sword will pierce your own soul too.",
"On the eighth day, when it was time to circumcise him, he was named Jesus, the name the angel had given him before he had been conceived.",
"When the time of their purification according to the Law of Moses had been completed, Joseph and Mary took [Jesus] to Jerusalem to present him to the Lord (as it is written in the Law of the Lord, Every firstborn male is to be consecrated to the Lord), and to offer a sacrifice in keeping with what is said in the Law of the Lord: a pair of doves or two young pigeons. When all the people were being baptized, Jesus was baptized too. And as he was praying, heaven was opened and the Holy Spirit descended on him in bodily form like a dove. And a voice came from heaven: You are my Son, whom I love; with you I am well pleased.",
"Now there was a man in Jerusalem called Simeon, who was righteous and devout. He was waiting for the consolation of Israel, and the Holy Spirit was upon him. It had been revealed to him by the Holy Spirit that he would not die before he had seen the Lords Christ. Moved by the Spirit, he went into the temple courts. When the parents brought in the child Jesus to do for him what the custom of the Law required, Simeon took him in his arms and praised God, saying: Sovereign Lord, as you have promised, you now dismiss your servant in peace. For my eyes have seen your salvation, which you have prepared in sight of all people, a light for revelation to the Gentiles and for glory to your people Israel.",
"After Jesus was born in Bethlehem in Judea, during the time of King Herod, Magi from the east came to Jerusalem.",
"Magi from the east came to Jerusalem and asked, Where is the one who has been born king of the Jews? We saw his star in the east and have come to worship him.",
"After [the Magi] had heard the king, they went on their way, and the star they had seen in the east went ahead of them until it stopped over the place where the child was. When they saw the star, they were overjoyed.",
"On coming to the house, they saw the child with his mother Mary, and they bowed down and worshiped him. Then they opened their treasures and presented him with gifts of gold and of incense and of myrrh."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * adventCalendar is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a verse, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}
/**
 * Gets the current day's fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a fact from the list based on the date

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if( mm === 12 ) {
        if( dd < 26 ) {
            var adventIndex = dd;
            var adventPrefix = "Here's your advent verse. You can open number " + adventIndex + " today! ";
        } else {
            var adventIndex = Math.floor(Math.random() * FACTS.length);
            var adventPrefix = "Merry Christmas! Christ is born. Thanks for using Advent Calendar! Here's a verse for you today: ";
        }
        var adventText = FACTS[adventIndex];
    } else {
        // set Dec 1 of this year. Note: month starts at 0
        var date2 = new Date(yyyy,11,1);

        var diffDays = Math.abs(daysBetween(date2, today));

        var adventPrefix = "";
        var adventText = "Won't be long! It is only "  + Math.floor(diffDays) + " more days until we start the advent story.";
    }

    // Create speech output
    var speechOutput = adventPrefix + adventText;
    var cardTitle = "Your Advent Calendar for Today";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the advent skill.
    var fact = new Fact();
    fact.execute(event, context);
};

