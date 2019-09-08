import Carnival from "react-native-carnival";

const sectionIdCommerce = "fc2b679a-d0bf-11e9-a006-002590d1a41a";
const sectionIdMedia = "0af7e114-d038-11e9-b727-002590d1a2f6";

const itemRecs = [];
const articleRecs = [];
const messageStream = [];

const getItemRecs = () => {
  Carnival.getRecommendations(sectionIdCommerce).then(function(recs) {
    recs.forEach(rec => {
      itemRecs.push(rec);
    });
  }, function(error) {
    console.log(error);
  });
};

const getArticleRecs = () => {
  Carnival.getRecommendations(sectionIdMedia).then(function(recs) {
    recs.forEach(rec => {
      articleRecs.push(rec);
    });
  }, function(error) {
    console.log(error);
  });
};

const getMessageStream = () => {

  Carnival.getMessages().then(messages => {
    messages.forEach(message => {
      messageStream.push(message);
    });
  }).catch(error => {
    console.log(error);
  });
};

getItemRecs();
getArticleRecs();
getMessageStream();

export { itemRecs, articleRecs, messageStream };