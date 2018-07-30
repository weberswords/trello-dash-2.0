
var Trello = require('trello');
trello = new Trello(process.env.KEY, process.env.TOKEN);

function getCards() {
    trello.getCardsOnBoard(process.env.BOARD_ID,
        function (error, cards) {
            if (error) {
                console.log('No cards found:', error);
            }
            else {
                // console.log('Got cards?:', cards);
                getLabels(cards);
            }
        }

)};

function getLabels(cards) {
    trello.getLabelsForBoard(process.env.BOARD_ID,
        function (error, labels) {
            if (error) {
                console.log('Could not get label:', error);
            }
            else {
                // console.log('Got labels?:', labels);
                getLabelCount(cards, labels);
            }
        });
}

function getLabelCount(cards, labels) {

    const arrayToObject = (array) =>
        array.reduce((obj, item) => {
            obj[item.id] = item;
            obj[item.id]["count"] = 0;
            return obj;
        }, {});

    let labelCount = arrayToObject(labels);

        cards.forEach(function (card) {
            let cardLabels = card.idLabels;
            cardLabels.forEach(function (cardLabel) {
                labelCount[cardLabel]['count'] += 1;
            })
        });
    return labelCount;
}


// exports.getCardLabels = getLabels();
exports.getLabelCount = getCards();
