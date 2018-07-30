var Trello = require('trello');
trello = new Trello(process.env.KEY, process.env.TOKEN);

function getCards(callback) {

    trello.getCardsOnBoard(process.env.BOARD_ID).then((cards) => {
        trello.getLabelsForBoard(process.env.BOARD_ID).then((labels) => {

            let labelCount = labels.reduce((obj, item) => {
                obj[item.id] = item;
                obj[item.id]["count"] = 0;
                return obj;
            }, {});

            cards.forEach(function (card) {
                let cardLabels = card.idLabels;
                cardLabels.forEach(function (cardLabel) {
                    labelCount[cardLabel]['count'] += 1;
                })
            });

            callback(null, labelCount);

        });
    }).catch((error) => {
        callback(error, null)
    });

}

exports.getLabelCount = getCards;